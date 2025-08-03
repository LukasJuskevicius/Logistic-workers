import { supabase } from '../config/supabase.js';

export async function createDemoData() {
  console.log('🎭 Creating demo data...');

  try {
    // Create demo users
    const demoUsers = [
      {
        email: 'lukasjusekvicius18@gmail.com',
        password: 'Karatistas123*',
        type: 'admin',
        firstName: 'Lukas',
        lastName: 'Juskevicius',
        phone: '+37065905551'
      },
      {
        email: '92plmqaz@gmail.com',
        password: 'Karatistas123*',
        type: 'driver',
        firstName: 'Driver',
        lastName: 'User',
        phone: '+31687654321',
        licenseNumber: 'DL123456',
        experienceYears: 5,
        nationality: 'Lithuanian',
        licenseCategories: ['CE', 'C'],
        languages: { english: 'fluent', lithuanian: 'native' },
        preferredRoutes: 'Netherlands, Germany, Belgium',
        availability: 'Full-time',
        certifications: 'ADR, CPC'
      },
      {
        email: 'paul.my25@gmail.com',
        password: 'Karatistas123*',
        type: 'client',
        firstName: 'Paul',
        lastName: 'Client',
        phone: '+31611111111',
        companyName: 'Paul Transport BV',
        address: 'Amsterdam, Netherlands'
      }
    ];

    console.log('👥 Creating demo users...');
    for (const userData of demoUsers) {
      try {
        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: userData.email,
          password: userData.password,
          user_metadata: {
            type: userData.type,
            first_name: userData.firstName,
            last_name: userData.lastName
          },
          email_confirm: true
        });

        if (authError) {
          console.error(`❌ Error creating auth user for ${userData.email}:`, authError);
          continue;
        }

        if (authData.user) {
          // Create user profile
          const profileData = {
            id: authData.user.id,
            email: userData.email,
            type: userData.type,
            first_name: userData.firstName,
            last_name: userData.lastName,
            phone: userData.phone,
            company_name: userData.companyName,
            license_number: userData.licenseNumber,
            experience_years: userData.experienceYears,
            address: userData.address,
            nationality: userData.nationality,
            license_categories: userData.licenseCategories,
            languages: userData.languages,
            preferred_routes: userData.preferredRoutes,
            availability: userData.availability,
            certifications: userData.certifications
          };

          const { error: profileError } = await supabase
            .from('users')
            .insert(profileData);

          if (profileError) {
            console.error(`❌ Error creating profile for ${userData.email}:`, profileError);
          } else {
            console.log(`✅ Created demo user: ${userData.email} (${userData.type})`);
          }
        }
      } catch (error) {
        console.error(`❌ Error creating demo user ${userData.email}:`, error);
      }
    }

    // Create demo job applications
    console.log('📝 Creating demo job applications...');
    const demoApplications = [
      {
        vacancy_id: 1,
        user_id: '92plmqaz@gmail.com', // Will be replaced with actual user ID
        status: 'pending',
        cover_letter: 'I am an experienced driver with 5 years of experience in long-distance trucking. I am very interested in this position.',
        resume_url: 'https://example.com/resume1.pdf'
      },
      {
        vacancy_id: 2,
        user_id: '92plmqaz@gmail.com',
        status: 'approved',
        cover_letter: 'I have experience in local delivery and would be perfect for this position.',
        resume_url: 'https://example.com/resume2.pdf'
      }
    ];

    // Get actual user IDs
    const { data: users } = await supabase.from('users').select('id, email');
    const userMap = users?.reduce((acc, user) => {
      acc[user.email] = user.id;
      return acc;
    }, {}) || {};

    for (const app of demoApplications) {
      const userId = userMap[app.user_id];
      if (userId) {
        const { error } = await supabase
          .from('job_applications')
          .insert({
            ...app,
            user_id: userId
          });

        if (error) {
          console.error('❌ Error creating job application:', error);
        } else {
          console.log(`✅ Created job application for vacancy ${app.vacancy_id}`);
        }
      }
    }

    // Create demo contact messages
    console.log('💬 Creating demo contact messages...');
    const demoMessages = [
      {
        name: 'John Smith',
        email: 'john.smith@company.com',
        subject: 'Inquiry about driver services',
        message: 'We are looking for reliable drivers for our logistics company. Please contact us for more information.',
        status: 'unread'
      },
      {
        name: 'Maria Garcia',
        email: 'maria.garcia@transport.nl',
        subject: 'Partnership opportunity',
        message: 'We would like to discuss potential partnership opportunities for driver recruitment.',
        status: 'read'
      },
      {
        name: 'David Wilson',
        email: 'david.wilson@logistics.eu',
        subject: 'Driver requirements',
        message: 'What are the requirements for drivers to work with your platform?',
        status: 'replied'
      }
    ];

    for (const message of demoMessages) {
      const { error } = await supabase
        .from('contact_messages')
        .insert(message);

      if (error) {
        console.error('❌ Error creating contact message:', error);
      } else {
        console.log(`✅ Created contact message from ${message.name}`);
      }
    }

    console.log('🎉 Demo data creation completed!');
    console.log('\n📋 Demo Accounts:');
    console.log('Admin: lukasjusekvicius18@gmail.com / Karatistas123*');
    console.log('Driver: 92plmqaz@gmail.com / Karatistas123*');
    console.log('Client: paul.my25@gmail.com / Karatistas123*');

  } catch (error) {
    console.error('❌ Error creating demo data:', error);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createDemoData().then(() => {
    console.log('✅ Demo data script completed');
    process.exit(0);
  }).catch(error => {
    console.error('❌ Demo data script failed:', error);
    process.exit(1);
  });
} 