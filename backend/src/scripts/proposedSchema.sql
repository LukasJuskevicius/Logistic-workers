-- PROPOSED IMPROVED DATABASE SCHEMA FOR RECRUITMENT AGENCY
-- =========================================================

-- 1. CORE USER MANAGEMENT (Consolidated)
-- =====================================

-- Enhanced users table (keep all personal info here)
ALTER TABLE users ADD COLUMN IF NOT EXISTS 
    middle_name TEXT,
    preferred_name TEXT,
    gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    emergency_contact_relationship TEXT,
    work_authorization_status TEXT CHECK (work_authorization_status IN ('citizen', 'permanent_resident', 'work_visa', 'pending')),
    background_check_status TEXT CHECK (background_check_status IN ('not_started', 'in_progress', 'passed', 'failed', 'expired')),
    background_check_date DATE,
    profile_completion_percentage INTEGER DEFAULT 0;

-- 2. ENHANCED DRIVER MANAGEMENT
-- ============================

-- Remove duplicate fields from drivers table and add recruitment-specific fields
ALTER TABLE drivers 
    DROP COLUMN IF EXISTS first_name,
    DROP COLUMN IF EXISTS last_name,
    DROP COLUMN IF EXISTS phone,
    DROP COLUMN IF EXISTS address,
    ADD COLUMN IF NOT EXISTS cdl_class TEXT CHECK (cdl_class IN ('A', 'B', 'C')),
    ADD COLUMN IF NOT EXISTS endorsements TEXT[], -- HazMat, Passenger, School Bus, etc.
    ADD COLUMN IF NOT EXISTS restrictions TEXT[],
    ADD COLUMN IF NOT EXISTS driving_record_clean BOOLEAN DEFAULT TRUE,
    ADD COLUMN IF NOT EXISTS years_commercial_experience INTEGER,
    ADD COLUMN IF NOT EXISTS previous_employers JSONB, -- [{company, start_date, end_date, reason_for_leaving}]
    ADD COLUMN IF NOT EXISTS certifications JSONB, -- [{name, issuer, issue_date, expiry_date, certificate_number}]
    ADD COLUMN IF NOT EXISTS insurance_provider TEXT,
    ADD COLUMN IF NOT EXISTS insurance_policy_number TEXT,
    ADD COLUMN IF NOT EXISTS insurance_expiry_date DATE,
    ADD COLUMN IF NOT EXISTS drug_test_date DATE,
    ADD COLUMN IF NOT EXISTS drug_test_status TEXT CHECK (drug_test_status IN ('passed', 'failed', 'pending', 'expired')),
    ADD COLUMN IF NOT EXISTS physical_exam_date DATE,
    ADD COLUMN IF NOT EXISTS physical_exam_expiry DATE,
    ADD COLUMN IF NOT EXISTS willing_to_relocate BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS max_travel_distance INTEGER, -- in miles/km
    ADD COLUMN IF NOT EXISTS shift_preferences TEXT[], -- ['day', 'night', 'weekend', 'flexible']
    ADD COLUMN IF NOT EXISTS salary_expectation_min DECIMAL(10,2),
    ADD COLUMN IF NOT EXISTS salary_expectation_max DECIMAL(10,2),
    ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD',
    ADD COLUMN IF NOT EXISTS availability_start_date DATE,
    ADD COLUMN IF NOT EXISTS notes TEXT;

-- 3. ENHANCED CLIENT MANAGEMENT
-- ============================

ALTER TABLE clients 
    ADD COLUMN IF NOT EXISTS credit_rating TEXT CHECK (credit_rating IN ('excellent', 'good', 'fair', 'poor')),
    ADD COLUMN IF NOT EXISTS payment_terms INTEGER DEFAULT 30, -- days
    ADD COLUMN IF NOT EXISTS preferred_payment_method TEXT,
    ADD COLUMN IF NOT EXISTS account_manager_id UUID REFERENCES users(user_id),
    ADD COLUMN IF NOT EXISTS contract_start_date DATE,
    ADD COLUMN IF NOT EXISTS contract_end_date DATE,
    ADD COLUMN IF NOT EXISTS is_active_client BOOLEAN DEFAULT TRUE,
    ADD COLUMN IF NOT EXISTS client_tier TEXT CHECK (client_tier IN ('bronze', 'silver', 'gold', 'platinum')),
    ADD COLUMN IF NOT EXISTS annual_volume_estimate INTEGER,
    ADD COLUMN IF NOT EXISTS preferred_driver_requirements JSONB, -- {min_experience, required_endorsements, etc.}
    ADD COLUMN IF NOT EXISTS emergency_contact_name TEXT,
    ADD COLUMN IF NOT EXISTS emergency_contact_phone TEXT,
    ADD COLUMN IF NOT EXISTS notes TEXT;

-- 4. ENHANCED DOCUMENT MANAGEMENT
-- ==============================

-- Add document categories and status tracking
ALTER TABLE driver_documents 
    ADD COLUMN IF NOT EXISTS document_type TEXT CHECK (document_type IN (
        'drivers_license', 'cdl', 'medical_certificate', 'drug_test', 
        'background_check', 'insurance', 'w4', 'i9', 'resume', 
        'reference_letter', 'certification', 'other'
    )),
    ADD COLUMN IF NOT EXISTS document_status TEXT CHECK (document_status IN (
        'pending_review', 'approved', 'rejected', 'expired', 'requires_update'
    )) DEFAULT 'pending_review',
    ADD COLUMN IF NOT EXISTS expiry_date DATE,
    ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES users(user_id),
    ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
    ADD COLUMN IF NOT EXISTS is_required BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS version_number INTEGER DEFAULT 1,
    ADD COLUMN IF NOT EXISTS replaced_document_id UUID REFERENCES driver_documents(id);

-- 5. JOB MANAGEMENT SYSTEM
-- =======================

-- Create jobs/opportunities table
CREATE TABLE IF NOT EXISTS jobs (
    job_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES users(user_id),
    title TEXT NOT NULL,
    description TEXT,
    job_type TEXT CHECK (job_type IN ('full_time', 'part_time', 'contract', 'temporary')) NOT NULL,
    location TEXT NOT NULL,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    currency TEXT DEFAULT 'USD',
    required_experience_years INTEGER,
    required_cdl_class TEXT,
    required_endorsements TEXT[],
    shift_type TEXT[], -- ['day', 'night', 'weekend']
    travel_required BOOLEAN DEFAULT FALSE,
    equipment_provided BOOLEAN DEFAULT TRUE,
    benefits JSONB, -- {health_insurance, retirement, etc.}
    application_deadline DATE,
    start_date DATE,
    status TEXT CHECK (status IN ('draft', 'active', 'paused', 'filled', 'cancelled')) DEFAULT 'draft',
    created_by UUID NOT NULL REFERENCES users(user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job applications tracking
CREATE TABLE IF NOT EXISTS job_applications (
    application_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES jobs(job_id),
    driver_id UUID NOT NULL REFERENCES users(user_id),
    status TEXT CHECK (status IN ('applied', 'screening', 'interview_scheduled', 'interviewed', 'offered', 'accepted', 'rejected', 'withdrawn')) DEFAULT 'applied',
    cover_letter TEXT,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    UNIQUE(job_id, driver_id)
);

-- 6. ADMIN ENHANCEMENTS
-- ====================

ALTER TABLE admins 
    ADD COLUMN IF NOT EXISTS role_level TEXT CHECK (role_level IN ('super_admin', 'admin', 'manager', 'coordinator')) DEFAULT 'admin',
    ADD COLUMN IF NOT EXISTS can_approve_drivers BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS can_manage_clients BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS can_post_jobs BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS can_view_reports BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS last_activity TIMESTAMP WITH TIME ZONE;

-- 7. ACTIVITY LOGGING
-- ==================

CREATE TABLE IF NOT EXISTS activity_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    action TEXT NOT NULL, -- 'login', 'profile_update', 'document_upload', 'job_application', etc.
    entity_type TEXT, -- 'user', 'job', 'document', etc.
    entity_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. NOTIFICATIONS SYSTEM
-- ======================

CREATE TABLE IF NOT EXISTS notifications (
    notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    type TEXT NOT NULL, -- 'document_expiry', 'job_match', 'application_update', etc.
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- 9. USEFUL INDEXES
-- ================

CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_client_id ON jobs(client_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_driver_id ON job_applications(driver_id);
CREATE INDEX IF NOT EXISTS idx_driver_documents_type ON driver_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_driver_documents_status ON driver_documents(document_status);
CREATE INDEX IF NOT EXISTS idx_driver_documents_expiry ON driver_documents(expiry_date);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id_unread ON notifications(user_id, is_read);

-- 10. VIEWS FOR COMMON QUERIES
-- ===========================

-- Complete driver profile view
CREATE OR REPLACE VIEW driver_profiles AS
SELECT 
    u.user_id,
    u.email,
    u.first_name,
    u.last_name,
    u.phone,
    u.address,
    u.city,
    u.country,
    u.date_of_birth,
    u.work_authorization_status,
    u.background_check_status,
    d.license_number,
    d.license_type,
    d.cdl_class,
    d.experience_years,
    d.is_available,
    d.hourly_rate,
    d.created_at,
    u.profile_completion_percentage
FROM users u
JOIN drivers d ON u.user_id = d.user_id
WHERE u.role = 'driver';

-- Active jobs with client info
CREATE OR REPLACE VIEW active_jobs_with_clients AS
SELECT 
    j.*,
    u.email as client_email,
    c.company_name,
    c.contact_first_name,
    c.contact_last_name
FROM jobs j
JOIN users u ON j.client_id = u.user_id
JOIN clients c ON u.user_id = c.user_id
WHERE j.status = 'active';

-- Document expiry alerts
CREATE OR REPLACE VIEW expiring_documents AS
SELECT 
    dd.*,
    u.email,
    u.first_name,
    u.last_name
FROM driver_documents dd
JOIN users u ON dd.user_id = u.user_id
WHERE dd.expiry_date IS NOT NULL 
    AND dd.expiry_date <= CURRENT_DATE + INTERVAL '30 days'
    AND dd.document_status = 'approved';

COMMENT ON SCHEMA public IS 'Enhanced recruitment agency database schema with comprehensive driver, client, and job management capabilities';
