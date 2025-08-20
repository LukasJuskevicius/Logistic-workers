-- COMPLETE DATABASE RESET AND NEW SCHEMA FOR RECRUITMENT AGENCY
-- ==============================================================
-- This will create a fresh database with documents stored in database

-- Drop existing tables (clean slate)
DROP TABLE IF EXISTS driver_documents CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create fresh schema
-- ===================

-- 1. USERS TABLE (Consolidated personal information)
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT CHECK (role IN ('driver', 'client', 'admin')) NOT NULL,
    
    -- Personal Information
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    city TEXT,
    country TEXT,
    postal_code TEXT,
    date_of_birth DATE,
    nationality TEXT,
    
    -- Account Status
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    profile_completion_percentage INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- 2. DRIVERS TABLE (Driver-specific information)
CREATE TABLE drivers (
    user_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- License Information
    license_number TEXT,
    license_type TEXT, -- 'B', 'C', 'CE', etc.
    cdl_class TEXT CHECK (cdl_class IN ('A', 'B', 'C')),
    license_expiry_date DATE,
    endorsements TEXT[], -- ['HazMat', 'Passenger', 'School Bus']
    restrictions TEXT[],
    
    -- Experience & Skills
    experience_years INTEGER,
    years_commercial_experience INTEGER,
    driving_record_clean BOOLEAN DEFAULT TRUE,
    
    -- Vehicle Information
    has_own_vehicle BOOLEAN DEFAULT FALSE,
    vehicle_type TEXT,
    vehicle_registration TEXT,
    max_weight TEXT,
    max_volume TEXT,
    
    -- Work Preferences
    is_available BOOLEAN DEFAULT TRUE,
    hourly_rate DECIMAL(10,2),
    salary_expectation_min DECIMAL(10,2),
    salary_expectation_max DECIMAL(10,2),
    currency TEXT DEFAULT 'EUR',
    willing_to_relocate BOOLEAN DEFAULT FALSE,
    max_travel_distance INTEGER, -- in km
    shift_preferences TEXT[], -- ['day', 'night', 'weekend', 'flexible']
    preferred_job_types TEXT[], -- ['local', 'long_haul', 'international']
    availability_start_date DATE,
    
    -- Compliance
    background_check_status TEXT CHECK (background_check_status IN ('not_started', 'in_progress', 'passed', 'failed', 'expired')) DEFAULT 'not_started',
    background_check_date DATE,
    drug_test_date DATE,
    drug_test_status TEXT CHECK (drug_test_status IN ('passed', 'failed', 'pending', 'expired')),
    medical_exam_date DATE,
    medical_exam_expiry DATE,
    
    -- Profile
    bio TEXT,
    profile_picture BYTEA, -- Store image as binary data
    profile_picture_mime_type TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CLIENTS TABLE (Client company information)
CREATE TABLE clients (
    user_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Company Information
    company_name TEXT NOT NULL,
    company_registration TEXT,
    vat_number TEXT,
    industry_type TEXT,
    company_website TEXT,
    
    -- Contact Information
    contact_first_name TEXT NOT NULL,
    contact_last_name TEXT NOT NULL,
    contact_phone TEXT,
    company_address TEXT,
    billing_address TEXT,
    
    -- Business Details
    fleet_size INTEGER,
    annual_volume_estimate INTEGER,
    client_tier TEXT CHECK (client_tier IN ('bronze', 'silver', 'gold', 'platinum')) DEFAULT 'bronze',
    
    -- Account Management
    credit_rating TEXT CHECK (credit_rating IN ('excellent', 'good', 'fair', 'poor')),
    payment_terms INTEGER DEFAULT 30, -- days
    preferred_payment_method TEXT,
    is_active_client BOOLEAN DEFAULT TRUE,
    
    -- Requirements
    preferred_driver_requirements JSONB, -- {min_experience, required_endorsements, etc.}
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ADMINS TABLE (Admin user information)
CREATE TABLE admins (
    user_id UUID PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Admin Details
    department TEXT,
    role_level TEXT CHECK (role_level IN ('super_admin', 'admin', 'manager', 'coordinator')) DEFAULT 'admin',
    
    -- Permissions
    permissions JSONB DEFAULT '["view_users", "manage_jobs"]'::jsonb,
    can_approve_drivers BOOLEAN DEFAULT FALSE,
    can_manage_clients BOOLEAN DEFAULT FALSE,
    can_post_jobs BOOLEAN DEFAULT FALSE,
    can_view_reports BOOLEAN DEFAULT FALSE,
    
    -- Activity
    last_activity TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. DOCUMENTS TABLE (All documents stored as BLOBs)
CREATE TABLE documents (
    document_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Document Information
    document_type TEXT CHECK (document_type IN (
        'drivers_license', 'cdl', 'medical_certificate', 'drug_test', 
        'background_check', 'insurance', 'passport', 'work_permit',
        'resume', 'reference_letter', 'certification', 'other'
    )) NOT NULL,
    
    -- File Data (stored in database)
    file_name TEXT NOT NULL,
    file_data BYTEA NOT NULL, -- The actual file content
    file_size INTEGER NOT NULL,
    mime_type TEXT NOT NULL,
    
    -- Document Status
    document_status TEXT CHECK (document_status IN (
        'pending_review', 'approved', 'rejected', 'expired', 'requires_update'
    )) DEFAULT 'pending_review',
    
    -- Metadata
    expiry_date DATE,
    is_required BOOLEAN DEFAULT FALSE,
    version_number INTEGER DEFAULT 1,
    replaced_document_id UUID REFERENCES documents(document_id),
    
    -- Review Information
    reviewed_by UUID REFERENCES users(user_id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    
    -- Timestamps
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. JOBS TABLE (Job postings)
CREATE TABLE jobs (
    job_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES users(user_id),
    
    -- Job Information
    title TEXT NOT NULL,
    description TEXT,
    job_type TEXT CHECK (job_type IN ('full_time', 'part_time', 'contract', 'temporary')) NOT NULL,
    location TEXT NOT NULL,
    
    -- Compensation
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    currency TEXT DEFAULT 'EUR',
    benefits JSONB, -- {health_insurance, retirement, etc.}
    
    -- Requirements
    required_experience_years INTEGER,
    required_cdl_class TEXT,
    required_endorsements TEXT[],
    shift_type TEXT[], -- ['day', 'night', 'weekend']
    travel_required BOOLEAN DEFAULT FALSE,
    equipment_provided BOOLEAN DEFAULT TRUE,
    
    -- Timeline
    application_deadline DATE,
    start_date DATE,
    
    -- Status
    status TEXT CHECK (status IN ('draft', 'active', 'paused', 'filled', 'cancelled')) DEFAULT 'active',
    
    -- Metadata
    created_by UUID NOT NULL REFERENCES users(user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. JOB APPLICATIONS TABLE
CREATE TABLE job_applications (
    application_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,
    driver_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Application Details
    status TEXT CHECK (status IN (
        'applied', 'screening', 'interview_scheduled', 'interviewed', 
        'offered', 'accepted', 'rejected', 'withdrawn'
    )) DEFAULT 'applied',
    
    cover_letter TEXT,
    notes TEXT,
    
    -- Timestamps
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(job_id, driver_id)
);

-- 8. USER SESSIONS TABLE (Authentication)
CREATE TABLE user_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    
    -- Session Details
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. ACTIVITY LOGS TABLE (Audit trail)
CREATE TABLE activity_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Activity Details
    action TEXT NOT NULL, -- 'login', 'profile_update', 'document_upload', 'job_application'
    entity_type TEXT, -- 'user', 'job', 'document'
    entity_id UUID,
    details JSONB,
    
    -- Request Details
    ip_address INET,
    user_agent TEXT,
    
    -- Timestamp
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. NOTIFICATIONS TABLE
CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Notification Details
    type TEXT NOT NULL, -- 'document_expiry', 'job_match', 'application_update'
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    action_url TEXT,
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- CREATE INDEXES FOR PERFORMANCE
-- ==============================

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_drivers_available ON drivers(is_available);
CREATE INDEX idx_drivers_location ON drivers(user_id) WHERE is_available = true;
CREATE INDEX idx_clients_active ON clients(is_active_client);
CREATE INDEX idx_documents_user_type ON documents(user_id, document_type);
CREATE INDEX idx_documents_status ON documents(document_status);
CREATE INDEX idx_documents_expiry ON documents(expiry_date) WHERE expiry_date IS NOT NULL;
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_client ON jobs(client_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_job_applications_driver ON job_applications(driver_id);
CREATE INDEX idx_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_sessions_active ON user_sessions(user_id, is_active);
CREATE INDEX idx_activity_logs_user_date ON activity_logs(user_id, created_at);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);

-- CREATE USEFUL VIEWS
-- ===================

-- Complete driver profiles with user info
CREATE VIEW driver_profiles AS
SELECT 
    u.user_id,
    u.email,
    u.first_name,
    u.last_name,
    u.phone,
    u.city,
    u.country,
    u.is_active,
    d.license_number,
    d.license_type,
    d.cdl_class,
    d.experience_years,
    d.is_available,
    d.hourly_rate,
    d.currency,
    d.shift_preferences,
    d.preferred_job_types,
    d.background_check_status,
    u.profile_completion_percentage,
    u.created_at
FROM users u
JOIN drivers d ON u.user_id = d.user_id
WHERE u.role = 'driver' AND u.is_active = true;

-- Active jobs with client information
CREATE VIEW active_jobs_with_clients AS
SELECT 
    j.job_id,
    j.title,
    j.description,
    j.job_type,
    j.location,
    j.salary_min,
    j.salary_max,
    j.currency,
    j.required_experience_years,
    j.application_deadline,
    j.start_date,
    j.created_at,
    c.company_name,
    c.contact_first_name,
    c.contact_last_name,
    u.email as client_email
FROM jobs j
JOIN users u ON j.client_id = u.user_id
JOIN clients c ON u.user_id = c.user_id
WHERE j.status = 'active' AND u.is_active = true;

-- Document expiry alerts
CREATE VIEW expiring_documents AS
SELECT 
    d.document_id,
    d.document_type,
    d.file_name,
    d.expiry_date,
    d.document_status,
    u.user_id,
    u.email,
    u.first_name,
    u.last_name,
    u.role
FROM documents d
JOIN users u ON d.user_id = u.user_id
WHERE d.expiry_date IS NOT NULL 
    AND d.expiry_date <= CURRENT_DATE + INTERVAL '30 days'
    AND d.document_status = 'approved'
    AND u.is_active = true;

COMMENT ON DATABASE postgres IS 'Recruitment Agency Platform - Documents stored in database as BLOBs';
