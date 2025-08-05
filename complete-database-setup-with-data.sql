-- =====================================================
-- LOGISTIC WORKERS WEBSITE - COMPLETE DATABASE SETUP
-- =====================================================
-- This script creates everything needed for the application
-- Run this in your Supabase SQL Editor

-- Drop existing tables (if they exist)
DROP TABLE IF EXISTS public.job_applications CASCADE;
DROP TABLE IF EXISTS public.vacancies CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.contact_messages CASCADE;
DROP TABLE IF EXISTS public.testimonials CASCADE;
DROP TABLE IF EXISTS public.kv_store_8675f3cb CASCADE;

-- =====================================================
-- CREATE USERS TABLE
-- =====================================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY, -- Remove the foreign key constraint to auth.users
  email TEXT NOT NULL UNIQUE,
  type TEXT CHECK (type IN ('driver', 'client', 'admin')) DEFAULT 'driver',
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  company_name TEXT,
  license_number TEXT,
  experience_years INTEGER,
  address TEXT,
  nationality TEXT,
  license_categories TEXT[],
  languages JSONB,
  preferred_routes TEXT,
  availability TEXT,
  certifications TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CREATE VACANCIES TABLE
-- =====================================================
CREATE TABLE public.vacancies (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  salary TEXT,
  type TEXT DEFAULT 'Full-time',
  requirements TEXT[],
  description TEXT,
  status TEXT DEFAULT 'active',
  deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CREATE JOB APPLICATIONS TABLE
-- =====================================================
CREATE TABLE public.job_applications (
  id SERIAL PRIMARY KEY,
  vacancy_id INTEGER REFERENCES public.vacancies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn')),
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES public.users(id)
);

-- =====================================================
-- CREATE CONTACT MESSAGES TABLE
-- =====================================================
CREATE TABLE public.contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CREATE TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE public.testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INSERT COMPREHENSIVE SAMPLE DATA
-- =====================================================

-- Insert sample users (with valid UUIDs)
INSERT INTO public.users (id, email, type, first_name, last_name, phone, company_name, license_number, experience_years, address, nationality, license_categories, languages, preferred_routes, availability, certifications) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'john.driver@example.com', 'driver', 'John', 'Smith', '+31 6 12345678', NULL, 'NL123456789', 5, 'Amsterdam, Netherlands', 'Dutch', ARRAY['CE'], '{"english": "fluent", "dutch": "native", "german": "basic"}', 'Netherlands-Germany-Belgium', 'Full-time', 'ADR Certificate, Safety Training'),
('550e8400-e29b-41d4-a716-446655440002', 'maria.driver@example.com', 'driver', 'Maria', 'Garcia', '+31 6 23456789', NULL, 'NL234567890', 3, 'Rotterdam, Netherlands', 'Spanish', ARRAY['CE'], '{"english": "fluent", "spanish": "native", "french": "intermediate"}', 'Spain-France-Netherlands', 'Part-time', 'Temperature Control Certificate'),
('550e8400-e29b-41d4-a716-446655440003', 'hans.driver@example.com', 'driver', 'Hans', 'Mueller', '+31 6 34567890', NULL, 'NL345678901', 7, 'Eindhoven, Netherlands', 'German', ARRAY['CE'], '{"english": "fluent", "german": "native", "dutch": "fluent"}', 'Germany-Netherlands-Belgium', 'Full-time', 'Heavy Vehicle License, ADR Certificate'),
('550e8400-e29b-41d4-a716-446655440004', 'sophie.client@example.com', 'client', 'Sophie', 'Dubois', '+31 6 45678901', 'French Logistics BV', NULL, NULL, 'The Hague, Netherlands', 'French', NULL, '{"english": "fluent", "french": "native", "dutch": "basic"}', NULL, 'Business hours', NULL),
('550e8400-e29b-41d4-a716-446655440005', 'carlos.client@example.com', 'client', 'Carlos', 'Rodriguez', '+31 6 56789012', 'Spanish Transport Solutions', NULL, NULL, 'Utrecht, Netherlands', 'Spanish', NULL, '{"english": "fluent", "spanish": "native", "dutch": "intermediate"}', NULL, 'Business hours', NULL),
('550e8400-e29b-41d4-a716-446655440006', 'admin@logisticworkers.com', 'admin', 'Admin', 'User', '+31 6 67890123', 'Logistic Workers Platform', NULL, NULL, 'Amsterdam, Netherlands', 'Dutch', NULL, '{"english": "fluent", "dutch": "native"}', NULL, 'Full-time', 'System Administrator');

-- Insert sample vacancies
INSERT INTO public.vacancies (title, company, location, salary, type, requirements, description, deadline) VALUES
('Long Distance Truck Driver', 'Transport Solutions BV', 'Amsterdam, Netherlands', '€3,200 - €3,800/month', 'Full-time', ARRAY['CE License', '2+ years experience', 'English proficiency'], 'We are looking for experienced truck drivers for long-distance routes across Europe. Must be comfortable with international travel and have excellent time management skills.', '2024-03-15'),
('Local Delivery Driver', 'Quick Logistics', 'Rotterdam, Netherlands', '€2,800 - €3,200/month', 'Full-time', ARRAY['C License', '1+ year experience', 'Dutch proficiency'], 'Local delivery routes within the Netherlands. Perfect for drivers who prefer to stay close to home.', '2024-03-10'),
('International Truck Driver', 'European Transport', 'Eindhoven, Netherlands', '€3,500 - €4,200/month', 'Full-time', ARRAY['CE License', '3+ years experience', 'Multiple languages'], 'International routes across Europe with premium compensation. Experience with customs procedures preferred.', '2024-03-20'),
('Refrigerated Truck Driver', 'Cold Chain Logistics', 'Utrecht, Netherlands', '€3,000 - €3,500/month', 'Full-time', ARRAY['CE License', 'Temperature control experience', 'Food safety certification'], 'Specialized refrigerated transport for food and pharmaceutical products.', '2024-03-12'),
('Part-time Delivery Driver', 'Express Delivery', 'The Hague, Netherlands', '€2,500 - €2,800/month', 'Part-time', ARRAY['C License', 'Flexible schedule', 'Customer service skills'], 'Part-time delivery driver for local routes. Perfect for students or those seeking flexible work.', '2024-03-08'),
('Heavy Goods Vehicle Driver', 'Heavy Transport BV', 'Eindhoven, Netherlands', '€3,500 - €4,200/month', 'Full-time', ARRAY['CE License', 'Heavy vehicle experience', 'Safety training'], 'Transport of heavy machinery and equipment. Experience with specialized loading and securing procedures required.', '2024-04-20'),
('International Truck Driver', 'European Transport Solutions', 'Amsterdam, Netherlands', '€3,800 - €4,500/month', 'Full-time', ARRAY['CE License', '5+ years experience', 'Multiple languages', 'ADR certification'], 'International routes across Europe with premium compensation. Experience with customs procedures and international regulations required.', '2024-04-15'),
('Refrigerated Truck Driver', 'Cold Chain Logistics', 'Rotterdam, Netherlands', '€3,200 - €3,800/month', 'Full-time', ARRAY['CE License', 'Temperature control experience', 'Food safety certification'], 'Specialized refrigerated transport for food and pharmaceutical products. Experience with temperature monitoring systems required.', '2024-04-10'),
('Part-time Delivery Driver', 'Express Delivery Services', 'The Hague, Netherlands', '€2,500 - €3,000/month', 'Part-time', ARRAY['C License', 'Flexible schedule', 'Customer service skills'], 'Part-time delivery driver for local routes. Perfect for students or those seeking flexible work arrangements.', '2024-04-05');

-- Insert sample job applications
INSERT INTO public.job_applications (vacancy_id, user_id, status, cover_letter, resume_url) VALUES
(1, '550e8400-e29b-41d4-a716-446655440001', 'pending', 'I am an experienced driver with 5 years of international experience. I am fluent in English and Dutch, and have all required certifications.', 'https://example.com/resumes/john_smith.pdf'),
(2, '550e8400-e29b-41d4-a716-446655440002', 'approved', 'I have 3 years of local delivery experience and am looking for a stable position in Rotterdam.', 'https://example.com/resumes/maria_garcia.pdf'),
(3, '550e8400-e29b-41d4-a716-446655440003', 'pending', 'Experienced international driver with 7 years of experience across Europe. Fluent in German, English, and Dutch.', 'https://example.com/resumes/hans_mueller.pdf');

-- Insert sample testimonials
INSERT INTO public.testimonials (name, role, company, content, rating) VALUES
('Michael Johnson', 'Truck Driver', 'Transport Solutions BV', 'Great platform for finding reliable truck driving jobs. The application process was smooth and I got hired within a week!', 5),
('Sarah Williams', 'Logistics Manager', 'Quick Logistics', 'We found excellent drivers through this platform. The quality of candidates is outstanding.', 5),
('David Chen', 'International Driver', 'European Transport', 'Been working international routes for 2 years now. The platform connected me with the best opportunities.', 4),
('Emma Rodriguez', 'Local Driver', 'Express Delivery', 'Perfect for part-time work. Flexible hours and good pay for local deliveries.', 4),
('John Smith', 'Fleet Manager', 'Cold Chain Logistics', 'Professional platform that connects us with qualified drivers. Highly recommended for logistics companies.', 5),
('Carlos Rodriguez', 'Fleet Manager', 'Spanish Transport Solutions', 'Excellent platform for finding qualified drivers. The quality of candidates is outstanding and the hiring process was smooth.', 5),
('Emma Thompson', 'HR Director', 'UK Logistics Ltd', 'We found our best drivers through this platform. The screening process is thorough and the candidates are well-vetted.', 5),
('Hans Mueller', 'Operations Manager', 'German Freight Services', 'Professional service with reliable drivers. The platform makes it easy to find drivers with specific qualifications.', 4),
('Sophie Dubois', 'Transport Coordinator', 'French Logistics', 'Great experience working with this platform. The drivers are professional and the service is reliable.', 4),
('Marco Rossi', 'Fleet Supervisor', 'Italian Transport', 'Highly recommended for logistics companies. The platform connects us with qualified drivers quickly and efficiently.', 5);

-- Insert sample contact messages
INSERT INTO public.contact_messages (name, email, subject, message, status) VALUES
('Michael Johnson', 'michael.johnson@company.com', 'Driver recruitment inquiry', 'We are looking to hire 5 experienced drivers for our logistics company. Please provide information about your recruitment process and requirements.', 'unread'),
('Lisa Chen', 'lisa.chen@transport.nl', 'Partnership opportunity', 'We would like to discuss potential partnership opportunities for driver recruitment and logistics services.', 'read'),
('Robert Wilson', 'robert.wilson@logistics.eu', 'Service inquiry', 'What services do you provide for logistics companies? We are interested in your driver recruitment platform.', 'replied'),
('Anna Kowalski', 'anna.kowalski@delivery.com', 'Driver requirements', 'What are the specific requirements for drivers to work with your platform? We need this information for our HR department.', 'unread'),
('David Martinez', 'david.martinez@freight.nl', 'Bulk hiring request', 'We need to hire 10 drivers for our expanding operations. Can you help us with bulk recruitment services?', 'read'),
('Maria Garcia', 'maria.garcia@transport.es', 'International drivers', 'Do you have drivers available for international routes? We need drivers for Spain-France-Germany routes.', 'unread'),
('Peter Anderson', 'peter.anderson@logistics.se', 'Scandinavian routes', 'Looking for drivers familiar with Scandinavian routes and winter driving conditions.', 'read'),
('Claire Dubois', 'claire.dubois@freight.fr', 'French market', 'Interested in expanding our operations in France. What are the requirements for French drivers?', 'unread');

-- =====================================================
-- CREATE ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can view all users" ON public.users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id::text = auth.uid()::text AND type = 'admin'
    )
  );

-- Vacancies table policies (public read, admin write)
CREATE POLICY "Anyone can view active vacancies" ON public.vacancies
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage vacancies" ON public.vacancies
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id::text = auth.uid()::text AND type = 'admin'
    )
  );

-- Job applications policies
CREATE POLICY "Users can view their own applications" ON public.job_applications
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create applications" ON public.job_applications
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Admins can manage all applications" ON public.job_applications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id::text = auth.uid()::text AND type = 'admin'
    )
  );

-- Contact messages policies
CREATE POLICY "Anyone can create contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all contact messages" ON public.contact_messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id::text = auth.uid()::text AND type = 'admin'
    )
  );

-- Testimonials policies (public read, admin write)
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id::text = auth.uid()::text AND type = 'admin'
    )
  );

-- =====================================================
-- CREATE FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vacancies_updated_at BEFORE UPDATE ON public.vacancies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if tables were created successfully
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check sample data
SELECT COUNT(*) as vacancy_count FROM public.vacancies;
SELECT COUNT(*) as testimonial_count FROM public.testimonials;
SELECT COUNT(*) as contact_message_count FROM public.contact_messages;
SELECT COUNT(*) as user_count FROM public.users;
SELECT COUNT(*) as application_count FROM public.job_applications;

-- Show sample data
SELECT 'Sample Users' as info, type, first_name || ' ' || last_name as name, email FROM public.users LIMIT 3;
SELECT 'Sample Vacancies' as info, title, company, location, salary FROM public.vacancies LIMIT 3;
SELECT 'Sample Applications' as info, ja.status, u.first_name || ' ' || u.last_name as applicant, v.title as vacancy FROM public.job_applications ja JOIN public.users u ON ja.user_id = u.id JOIN public.vacancies v ON ja.vacancy_id = v.id LIMIT 3; 