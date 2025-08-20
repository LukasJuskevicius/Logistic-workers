-- DEMO DATA SEED SCRIPT
-- =====================
-- Creates 1 admin, 5 drivers, 5 clients with realistic data

-- Insert Admin User
INSERT INTO users (user_id, email, password_hash, role, first_name, last_name, phone, address, city, country, postal_code, is_verified, is_active, profile_completion_percentage, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin@logistics.com', '$2b$10$sKaDiPFOUU2xM9AH0MDxxOPgwLqzYiFdJpxQsTHUed3/yESQm2TxO', 'admin', 'John', 'Administrator', '+370 600 12345', 'Gedimino pr. 1', 'Vilnius', 'Lithuania', 'LT-01103', true, true, 100, NOW());

INSERT INTO admins (user_id, department, role_level, permissions, can_approve_drivers, can_manage_clients, can_post_jobs, can_view_reports) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Operations', 'super_admin', '["view_users", "manage_jobs", "approve_drivers", "manage_clients", "view_reports"]'::jsonb, true, true, true, true);

-- Insert 5 Driver Users
INSERT INTO users (user_id, email, password_hash, role, first_name, last_name, phone, address, city, country, postal_code, date_of_birth, nationality, is_verified, is_active, profile_completion_percentage, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'petras.kazlauskas@gmail.com', '$2b$10$sKaDiPFOUU2xM9AH0MDxxOPgwLqzYiFdJpxQsTHUed3/yESQm2TxO', 'driver', 'Petras', 'Kazlauskas', '+370 600 11111', 'Laisvės al. 15-10', 'Kaunas', 'Lithuania', 'LT-44307', '1985-03-15', 'Lithuanian', true, true, 85, NOW() - INTERVAL '30 days'),
('550e8400-e29b-41d4-a716-446655440002', 'jonas.petraitis@gmail.com', '$2b$10$sKaDiPFOUU2xM9AH0MDxxOPgwLqzYiFdJpxQsTHUed3/yESQm2TxO', 'driver', 'Jonas', 'Petraitis', '+370 600 22222', 'Savanorių pr. 25', 'Vilnius', 'Lithuania', 'LT-03116', '1990-07-22', 'Lithuanian', true, true, 92, NOW() - INTERVAL '25 days'),
('550e8400-e29b-41d4-a716-446655440003', 'andrius.jankauskas@gmail.com', '$2b$10$sKaDiPFOUU2xM9AH0MDxxOPgwLqzYiFdJpxQsTHUed3/yESQm2TxO', 'driver', 'Andrius', 'Jankauskas', '+370 600 33333', 'Tilžės g. 8', 'Šiauliai', 'Lithuania', 'LT-76001', '1988-11-08', 'Lithuanian', true, true, 78, NOW() - INTERVAL '20 days'),
('550e8400-e29b-41d4-a716-446655440004', 'mindaugas.vasiliauskas@gmail.com', '$2b$10$sKaDiPFOUU2xM9AH0MDxxOPgwLqzYiFdJpxQsTHUed3/yESQm2TxO', 'driver', 'Mindaugas', 'Vasiliauskas', '+370 600 44444', 'Vytauto g. 12', 'Klaipėda', 'Lithuania', 'LT-91001', '1982-05-30', 'Lithuanian', true, true, 88, NOW() - INTERVAL '15 days'),
('550e8400-e29b-41d4-a716-446655440005', 'tomas.stonkus@gmail.com', '$2b$10$sKaDiPFOUU2xM9AH0MDxxOPgwLqzYiFdJpxQsTHUed3/yESQm2TxO', 'driver', 'Tomas', 'Stonkus', '+370 600 55555', 'Ąžuolyno g. 5', 'Panevėžys', 'Lithuania', 'LT-35001', '1993-12-12', 'Lithuanian', true, true, 95, NOW() - INTERVAL '10 days');

-- Insert Driver Details
INSERT INTO drivers (user_id, license_number, license_type, cdl_class, license_expiry_date, endorsements, experience_years, years_commercial_experience, driving_record_clean, has_own_vehicle, vehicle_type, is_available, hourly_rate, salary_expectation_min, salary_expectation_max, currency, willing_to_relocate, max_travel_distance, shift_preferences, preferred_job_types, availability_start_date, background_check_status, background_check_date, drug_test_date, drug_test_status, medical_exam_date, medical_exam_expiry, bio) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'LT123456789', 'CE', 'C', '2026-03-15', ARRAY['HazMat'], 12, 8, true, false, 'Truck', true, 15.50, 2500.00, 3200.00, 'EUR', true, 500, ARRAY['day', 'flexible'], ARRAY['long_haul', 'international'], '2024-01-01', 'passed', '2023-12-01', '2024-01-15', 'passed', '2024-01-10', '2025-01-10', 'Experienced truck driver with clean record and HazMat certification. Available for long-haul routes across Europe.'),
('550e8400-e29b-41d4-a716-446655440002', 'LT987654321', 'C', 'B', '2025-07-22', ARRAY['Passenger'], 8, 5, true, true, 'Van', true, 14.00, 2200.00, 2800.00, 'EUR', false, 300, ARRAY['day', 'weekend'], ARRAY['local', 'regional'], '2024-02-01', 'passed', '2023-11-15', '2024-01-20', 'passed', '2024-01-05', '2025-01-05', 'Reliable van driver specializing in local deliveries. Own vehicle available for immediate assignments.'),
('550e8400-e29b-41d4-a716-446655440003', 'LT456789123', 'CE', 'A', '2027-11-08', ARRAY['HazMat', 'Tanker'], 15, 12, true, false, 'Semi-trailer', true, 18.00, 3000.00, 4000.00, 'EUR', true, 1000, ARRAY['day', 'night'], ARRAY['long_haul', 'international'], '2024-01-15', 'passed', '2023-10-20', '2024-02-01', 'passed', '2023-12-15', '2024-12-15', 'Senior driver with extensive experience in hazardous materials transport. Certified for international routes.'),
('550e8400-e29b-41d4-a716-446655440004', 'LT789123456', 'C', 'C', '2025-05-30', ARRAY[]::text[], 10, 7, true, false, 'Truck', true, 16.00, 2600.00, 3400.00, 'EUR', false, 400, ARRAY['day'], ARRAY['regional'], '2024-03-01', 'passed', '2023-12-10', '2024-02-10', 'passed', '2024-01-20', '2025-01-20', 'Dedicated regional driver with focus on timely deliveries. Excellent safety record and customer service.'),
('550e8400-e29b-41d4-a716-446655440005', 'LT321654987', 'BE', 'B', '2028-12-12', ARRAY[]::text[], 3, 2, true, true, 'Light truck', true, 12.50, 1800.00, 2400.00, 'EUR', true, 250, ARRAY['flexible'], ARRAY['local'], '2024-04-01', 'in_progress', NULL, '2024-02-15', 'passed', '2024-02-01', '2025-02-01', 'Young and motivated driver eager to gain experience. Flexible schedule and willing to learn.');

-- Insert 5 Client Users
INSERT INTO users (user_id, email, password_hash, role, first_name, last_name, phone, address, city, country, postal_code, is_verified, is_active, profile_completion_percentage, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'contact@balticlogistics.lt', '$2b$10$sKaDiPFOUU2xM9AH0MDxxOPgwLqzYiFdJpxQsTHUed3/yESQm2TxO', 'client', 'Rūta', 'Petraitienė', '+370 5 123 4567', 'Konstitucijos pr. 20A', 'Vilnius', 'Lithuania', 'LT-09308', true, true, 90, NOW() - INTERVAL '45 days'),
('550e8400-e29b-41d4-a716-446655440011', 'info@europetrans.eu', '$2b$10$sKaDiPFOUU2xM9AH0MDxxOPgwLqzYiFdJpxQsTHUed3/yESQm2TxO', 'client', 'Marija', 'Kazlauskienė', '+370 37 456 789', 'Pramonės g. 15', 'Kaunas', 'Lithuania', 'LT-51327', true, true, 85, NOW() - INTERVAL '40 days'),
('550e8400-e29b-41d4-a716-446655440012', 'orders@fastdelivery.lt', '$2b$10$sKaDiPFOUU2xM9AH0MDxxOPgwLqzYiFdJpxQsTHUed3/yESQm2TxO', 'client', 'Vytautas', 'Jonaitis', '+370 46 789 012', 'Klaipėdos g. 88', 'Šiauliai', 'Lithuania', 'LT-78001', true, true, 95, NOW() - INTERVAL '35 days'),
('550e8400-e29b-41d4-a716-446655440013', 'logistics@seaport.lt', '$2b$10$sKaDiPFOUU2xM9AH0MDxxOPgwLqzYiFdJpxQsTHUed3/yESQm2TxO', 'client', 'Gintarė', 'Urbonienė', '+370 46 345 678', 'Uosto g. 4', 'Klaipėda', 'Lithuania', 'LT-91246', true, true, 88, NOW() - INTERVAL '30 days'),
('550e8400-e29b-41d4-a716-446655440014', 'dispatch@retailchain.lt', '$2b$10$sKaDiPFOUU2xM9AH0MDxxOPgwLqzYiFdJpxQsTHUed3/yESQm2TxO', 'client', 'Darius', 'Mockus', '+370 5 987 6543', 'Ozo g. 25', 'Vilnius', 'Lithuania', 'LT-08200', true, true, 92, NOW() - INTERVAL '25 days');

-- Insert Client Details
INSERT INTO clients (user_id, company_name, company_registration, vat_number, industry_type, company_website, contact_first_name, contact_last_name, contact_phone, company_address, billing_address, fleet_size, annual_volume_estimate, client_tier, credit_rating, payment_terms, preferred_payment_method, is_active_client, preferred_driver_requirements) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'Baltic Logistics UAB', '123456789', 'LT123456789012', 'Logistics & Transportation', 'www.balticlogistics.lt', 'Rūta', 'Petraitienė', '+370 5 123 4567', 'Konstitucijos pr. 20A, Vilnius', 'Konstitucijos pr. 20A, Vilnius', 25, 5000, 'gold', 'excellent', 15, 'bank_transfer', true, '{"min_experience": 5, "required_cdl": "C", "clean_record": true}'::jsonb),
('550e8400-e29b-41d4-a716-446655440011', 'Europe Trans SIA', '987654321', 'LV987654321098', 'International Freight', 'www.europetrans.eu', 'Marija', 'Kazlauskienė', '+370 37 456 789', 'Pramonės g. 15, Kaunas', 'Pramonės g. 15, Kaunas', 50, 12000, 'platinum', 'excellent', 30, 'bank_transfer', true, '{"min_experience": 8, "required_endorsements": ["HazMat"], "international_experience": true}'::jsonb),
('550e8400-e29b-41d4-a716-446655440012', 'Fast Delivery MB', '456789123', 'LT456789123456', 'E-commerce Logistics', 'www.fastdelivery.lt', 'Vytautas', 'Jonaitis', '+370 46 789 012', 'Klaipėdos g. 88, Šiauliai', 'Klaipėdos g. 88, Šiauliai', 15, 3000, 'silver', 'good', 21, 'invoice', true, '{"min_experience": 2, "flexible_schedule": true, "local_knowledge": true}'::jsonb),
('550e8400-e29b-41d4-a716-446655440013', 'Seaport Logistics UAB', '789123456', 'LT789123456789', 'Port Operations', 'www.seaport.lt', 'Gintarė', 'Urbonienė', '+370 46 345 678', 'Uosto g. 4, Klaipėda', 'Uosto g. 4, Klaipėda', 35, 8000, 'gold', 'excellent', 14, 'bank_transfer', true, '{"min_experience": 6, "port_experience": true, "hazmat_certified": true}'::jsonb),
('550e8400-e29b-41d4-a716-446655440014', 'Retail Chain Distribution', '321654987', 'LT321654987321', 'Retail Distribution', 'www.retailchain.lt', 'Darius', 'Mockus', '+370 5 987 6543', 'Ozo g. 25, Vilnius', 'Ozo g. 25, Vilnius', 20, 4500, 'silver', 'good', 30, 'invoice', true, '{"min_experience": 3, "retail_experience": true, "weekend_availability": true}'::jsonb);

-- Insert Sample Job Postings
INSERT INTO jobs (job_id, client_id, title, description, job_type, location, salary_min, salary_max, currency, required_experience_years, required_cdl_class, required_endorsements, shift_type, travel_required, equipment_provided, application_deadline, start_date, status, created_by) VALUES
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 'Long-Haul Truck Driver - International Routes', 'Seeking experienced truck driver for international routes across EU. Must have clean driving record and HazMat certification.', 'full_time', 'Vilnius, Lithuania', 2800.00, 3500.00, 'EUR', 5, 'C', ARRAY['HazMat'], ARRAY['day'], true, true, '2024-12-31', '2024-09-01', 'active', '550e8400-e29b-41d4-a716-446655440010'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440011', 'Regional Delivery Driver', 'Regional delivery driver needed for Baltic states. Flexible schedule and competitive pay.', 'full_time', 'Kaunas, Lithuania', 2200.00, 2800.00, 'EUR', 3, 'C', ARRAY[]::text[], ARRAY['day', 'flexible'], false, true, '2024-11-30', '2024-08-15', 'active', '550e8400-e29b-41d4-a716-446655440011'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440012', 'Local Delivery Van Driver', 'Fast-paced local delivery position. Own vehicle preferred but not required. Great for gaining experience.', 'part_time', 'Šiauliai, Lithuania', 1800.00, 2200.00, 'EUR', 1, 'B', ARRAY[]::text[], ARRAY['flexible'], false, false, '2024-10-15', '2024-08-01', 'active', '550e8400-e29b-41d4-a716-446655440012'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440013', 'Port Operations Driver', 'Container transport driver for port operations. HazMat certification required. Excellent benefits package.', 'full_time', 'Klaipėda, Lithuania', 3000.00, 3800.00, 'EUR', 6, 'C', ARRAY['HazMat'], ARRAY['day', 'night'], false, true, '2024-12-15', '2024-09-15', 'active', '550e8400-e29b-41d4-a716-446655440013'),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440014', 'Retail Distribution Driver', 'Distribution driver for retail chain. Weekend work required. Steady schedule and good work-life balance.', 'full_time', 'Vilnius, Lithuania', 2400.00, 3000.00, 'EUR', 2, 'C', ARRAY[]::text[], ARRAY['weekend'], false, true, '2024-11-01', '2024-08-20', 'active', '550e8400-e29b-41d4-a716-446655440014');

-- Insert Sample Job Applications
INSERT INTO job_applications (job_id, driver_id, status, cover_letter, applied_at) VALUES
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'applied', 'I am very interested in this international driving position. With my HazMat certification and 8 years of commercial experience, I believe I would be a great fit for your team.', NOW() - INTERVAL '5 days'),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'screening', 'My extensive experience with hazardous materials and international routes makes me an ideal candidate for this position.', NOW() - INTERVAL '7 days'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'interviewed', 'I am interested in the regional delivery position. I have my own van and am very familiar with Baltic routes.', NOW() - INTERVAL '10 days'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', 'applied', 'This would be a perfect opportunity for me to gain more experience in local deliveries. I am very motivated and have a flexible schedule.', NOW() - INTERVAL '3 days'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'offered', 'I have extensive port experience and the required HazMat certification. I would love to work in Klaipėda port operations.', NOW() - INTERVAL '12 days'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003', 'applied', 'Port operations align perfectly with my skills in hazardous materials transport.', NOW() - INTERVAL '8 days');

-- Insert Sample Documents (as BYTEA - in real implementation these would be actual file contents)
-- For demo purposes, we'll insert placeholder binary data
INSERT INTO documents (user_id, document_type, file_name, file_data, file_size, mime_type, document_status, expiry_date, is_required, reviewed_by, reviewed_at) VALUES
-- Driver 1 documents
('550e8400-e29b-41d4-a716-446655440001', 'drivers_license', 'petras_license.pdf', decode('255044462d312e340a25c4e5f2e5eba7f3a0d0c4c60a', 'hex'), 25600, 'application/pdf', 'approved', '2026-03-15', true, '550e8400-e29b-41d4-a716-446655440000', NOW() - INTERVAL '20 days'),
('550e8400-e29b-41d4-a716-446655440001', 'medical_certificate', 'petras_medical.pdf', decode('255044462d312e340a25c4e5f2e5eba7f3a0d0c4c60a', 'hex'), 18400, 'application/pdf', 'approved', '2025-01-10', true, '550e8400-e29b-41d4-a716-446655440000', NOW() - INTERVAL '18 days'),
-- Driver 2 documents
('550e8400-e29b-41d4-a716-446655440002', 'drivers_license', 'jonas_license.pdf', decode('255044462d312e340a25c4e5f2e5eba7f3a0d0c4c60a', 'hex'), 24800, 'application/pdf', 'approved', '2025-07-22', true, '550e8400-e29b-41d4-a716-446655440000', NOW() - INTERVAL '15 days'),
('550e8400-e29b-41d4-a716-446655440002', 'medical_certificate', 'jonas_medical.pdf', decode('255044462d312e340a25c4e5f2e5eba7f3a0d0c4c60a', 'hex'), 19200, 'application/pdf', 'approved', '2025-01-05', true, '550e8400-e29b-41d4-a716-446655440000', NOW() - INTERVAL '12 days'),
-- Driver 3 documents
('550e8400-e29b-41d4-a716-446655440003', 'drivers_license', 'andrius_license.pdf', decode('255044462d312e340a25c4e5f2e5eba7f3a0d0c4c60a', 'hex'), 26400, 'application/pdf', 'approved', '2027-11-08', true, '550e8400-e29b-41d4-a716-446655440000', NOW() - INTERVAL '10 days'),
('550e8400-e29b-41d4-a716-446655440003', 'medical_certificate', 'andrius_medical.pdf', decode('255044462d312e340a25c4e5f2e5eba7f3a0d0c4c60a', 'hex'), 20100, 'application/pdf', 'approved', '2024-12-15', true, '550e8400-e29b-41d4-a716-446655440000', NOW() - INTERVAL '8 days'),
-- Driver 4 documents
('550e8400-e29b-41d4-a716-446655440004', 'drivers_license', 'mindaugas_license.pdf', decode('255044462d312e340a25c4e5f2e5eba7f3a0d0c4c60a', 'hex'), 23900, 'application/pdf', 'approved', '2025-05-30', true, '550e8400-e29b-41d4-a716-446655440000', NOW() - INTERVAL '6 days'),
-- Driver 5 documents (pending review)
('550e8400-e29b-41d4-a716-446655440005', 'drivers_license', 'tomas_license.pdf', decode('255044462d312e340a25c4e5f2e5eba7f3a0d0c4c60a', 'hex'), 22800, 'application/pdf', 'pending_review', '2028-12-12', true, NULL, NULL);

-- Insert Sample Activity Logs
INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details, ip_address, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'login', 'user', '550e8400-e29b-41d4-a716-446655440001', '{"login_method": "email"}', '192.168.1.100', NOW() - INTERVAL '1 hour'),
('550e8400-e29b-41d4-a716-446655440001', 'job_application', 'job', '650e8400-e29b-41d4-a716-446655440001', '{"application_status": "applied"}', '192.168.1.100', NOW() - INTERVAL '5 days'),
('550e8400-e29b-41d4-a716-446655440002', 'profile_update', 'user', '550e8400-e29b-41d4-a716-446655440002', '{"fields_updated": ["hourly_rate", "availability"]}', '192.168.1.101', NOW() - INTERVAL '2 days'),
('550e8400-e29b-41d4-a716-446655440010', 'job_posting', 'job', '650e8400-e29b-41d4-a716-446655440001', '{"job_title": "Long-Haul Truck Driver"}', '192.168.1.200', NOW() - INTERVAL '15 days'),
('550e8400-e29b-41d4-a716-446655440000', 'document_approval', 'document', NULL, '{"documents_approved": 8}', '192.168.1.50', NOW() - INTERVAL '1 day');

-- Insert Sample Notifications
INSERT INTO notifications (user_id, type, title, message, action_url, is_read, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'job_match', 'New Job Match!', 'A new job posting matches your profile: Long-Haul Truck Driver', '/jobs/650e8400-e29b-41d4-a716-446655440001', false, NOW() - INTERVAL '2 hours'),
('550e8400-e29b-41d4-a716-446655440001', 'application_update', 'Application Status Update', 'Your application for Port Operations Driver has been updated to: Offered', '/applications', true, NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440003', 'document_expiry', 'Document Expiring Soon', 'Your medical certificate expires in 15 days. Please renew it.', '/profile/documents', false, NOW() - INTERVAL '6 hours'),
('550e8400-e29b-41d4-a716-446655440010', 'new_application', 'New Job Application', 'Petras Kazlauskas applied for your Long-Haul Truck Driver position', '/manage/applications', false, NOW() - INTERVAL '5 days'),
('550e8400-e29b-41d4-a716-446655440000', 'document_review', 'Documents Pending Review', 'You have 1 document pending review', '/admin/documents', false, NOW() - INTERVAL '3 hours');

-- Create sample session for admin (for testing)
INSERT INTO user_sessions (user_id, session_token, ip_address, user_agent, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin_session_token_12345', '192.168.1.50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', true);

-- Update profile completion percentages based on data
UPDATE users SET profile_completion_percentage = 100 WHERE user_id = '550e8400-e29b-41d4-a716-446655440000';
UPDATE users SET profile_completion_percentage = 85 WHERE user_id IN ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002');
UPDATE users SET profile_completion_percentage = 90 WHERE user_id IN ('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004');
UPDATE users SET profile_completion_percentage = 75 WHERE user_id = '550e8400-e29b-41d4-a716-446655440005';

COMMENT ON TABLE users IS 'Demo data: 1 admin, 5 drivers, 5 clients with realistic Lithuanian logistics industry data';
