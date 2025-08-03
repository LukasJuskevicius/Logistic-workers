import { supabase } from '../config/supabase.js';

export async function populateDatabase() {
  console.log('🗄️  Populating database with test data...');

  try {
    // 1. Create test users in Supabase Auth
    console.log('👥 Creating test users...');
    const testUsers = [
      {
        email: 'admin@logisticworkers.com',
        password: 'AdminPass123!',
        type: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        phone: '+31612345678'
      },
      {
        email: 'driver1@logisticworkers.com',
        password: 'DriverPass123!',
        type: 'driver',
        firstName: 'John',
        lastName: 'Driver',
        phone: '+31623456789',
        licenseNumber: 'DL123456',
        experienceYears: 5,
        nationality: 'Dutch',
        licenseCategories: ['CE', 'C'],
        languages: { english: 'fluent', dutch: 'native' },
        preferredRoutes: 'Netherlands, Germany, Belgium',
        availability: 'Full-time',
        certifications: 'ADR, CPC'
      },
      {
        email: 'driver2@logisticworkers.com',
        password: 'DriverPass123!',
        type: 'driver',
        firstName: 'Maria',
        lastName: 'Garcia',
        phone: '+31634567890',
        licenseNumber: 'DL789012',
        experienceYears: 3,
        nationality: 'Spanish',
        licenseCategories: ['CE'],
        languages: { english: 'fluent', spanish: 'native' },
        preferredRoutes: 'Spain, France, Italy',
        availability: 'Part-time',
        certifications: 'ADR'
      },
      {
        email: 'client1@logisticworkers.com',
        password: 'ClientPass123!',
        type: 'client',
        firstName: 'Paul',
        lastName: 'Transport',
        phone: '+31645678901',
        companyName: 'Paul Transport BV',
        address: 'Amsterdam, Netherlands'
      },
      {
        email: 'client2@logisticworkers.com',
        password: 'ClientPass123!',
        type: 'client',
        firstName: 'Sarah',
        lastName: 'Logistics',
        phone: '+31656789012',
        companyName: 'Sarah Logistics Ltd',
        address: 'Rotterdam, Netherlands'
      }
    ];

    const createdUsers = [];
    for (const userData of testUsers) {
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
            console.log(`✅ Created user: ${userData.email} (${userData.type})`);
            createdUsers.push({ ...profileData, authId: authData.user.id });
          }
        }
      } catch (error) {
        console.error(`❌ Error creating user ${userData.email}:`, error);
      }
    }

    // 2. Create additional vacancies
    console.log('📋 Creating additional vacancies...');
    const additionalVacancies = [
      {
        title: 'International Truck Driver',
        company: 'European Transport Solutions',
        location: 'Amsterdam, Netherlands',
        salary: '€3,800 - €4,500/month',
        type: 'Full-time',
        requirements: ['CE License', '5+ years experience', 'Multiple languages', 'ADR certification'],
        description: 'International routes across Europe with premium compensation. Experience with customs procedures and international regulations required.',
        status: 'active',
        deadline: '2024-04-15'
      },
      {
        title: 'Refrigerated Truck Driver',
        company: 'Cold Chain Logistics',
        location: 'Rotterdam, Netherlands',
        salary: '€3,200 - €3,800/month',
        type: 'Full-time',
        requirements: ['CE License', 'Temperature control experience', 'Food safety certification'],
        description: 'Specialized refrigerated transport for food and pharmaceutical products. Experience with temperature monitoring systems required.',
        status: 'active',
        deadline: '2024-04-10'
      },
      {
        title: 'Part-time Delivery Driver',
        company: 'Express Delivery Services',
        location: 'The Hague, Netherlands',
        salary: '€2,500 - €3,000/month',
        type: 'Part-time',
        requirements: ['C License', 'Flexible schedule', 'Customer service skills'],
        description: 'Part-time delivery driver for local routes. Perfect for students or those seeking flexible work arrangements.',
        status: 'active',
        deadline: '2024-04-05'
      },
      {
        title: 'Heavy Goods Vehicle Driver',
        company: 'Heavy Transport BV',
        location: 'Eindhoven, Netherlands',
        salary: '€3,500 - €4,200/month',
        type: 'Full-time',
        requirements: ['CE License', 'Heavy vehicle experience', 'Safety training'],
        description: 'Transport of heavy machinery and equipment. Experience with specialized loading and securing procedures required.',
        status: 'active',
        deadline: '2024-04-20'
      }
    ];

    for (const vacancy of additionalVacancies) {
      const { error } = await supabase
        .from('vacancies')
        .insert(vacancy);

      if (error) {
        console.error('❌ Error creating vacancy:', error);
      } else {
        console.log(`✅ Created vacancy: ${vacancy.title}`);
      }
    }

    // 3. Create job applications
    console.log('📝 Creating job applications...');
    const { data: vacancies } = await supabase.from('vacancies').select('id');
    const { data: users } = await supabase.from('users').select('id, type');

    const drivers = users?.filter(u => u.type === 'driver') || [];
    const vacancyIds = vacancies?.map(v => v.id) || [];

    for (let i = 0; i < Math.min(drivers.length * 2, vacancyIds.length); i++) {
      const driver = drivers[i % drivers.length];
      const vacancyId = vacancyIds[i % vacancyIds.length];
      const statuses = ['pending', 'approved', 'rejected'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      const application = {
        vacancy_id: vacancyId,
        user_id: driver.id,
        status: status,
        cover_letter: `I am an experienced driver with ${Math.floor(Math.random() * 10) + 1} years of experience. I am very interested in this position and believe I would be a great fit for your company.`,
        resume_url: `https://example.com/resume-${driver.id}.pdf`
      };

      const { error } = await supabase
        .from('job_applications')
        .insert(application);

      if (error) {
        console.error('❌ Error creating job application:', error);
      } else {
        console.log(`✅ Created job application for vacancy ${vacancyId}`);
      }
    }

    // 4. Create additional contact messages
    console.log('💬 Creating additional contact messages...');
    const additionalMessages = [
      {
        name: 'Michael Johnson',
        email: 'michael.johnson@company.com',
        subject: 'Driver recruitment inquiry',
        message: 'We are looking to hire 5 experienced drivers for our logistics company. Please provide information about your recruitment process and requirements.',
        status: 'unread'
      },
      {
        name: 'Lisa Chen',
        email: 'lisa.chen@transport.nl',
        subject: 'Partnership opportunity',
        message: 'We would like to discuss potential partnership opportunities for driver recruitment and logistics services.',
        status: 'read'
      },
      {
        name: 'Robert Wilson',
        email: 'robert.wilson@logistics.eu',
        subject: 'Service inquiry',
        message: 'What services do you provide for logistics companies? We are interested in your driver recruitment platform.',
        status: 'replied'
      },
      {
        name: 'Anna Kowalski',
        email: 'anna.kowalski@delivery.com',
        subject: 'Driver requirements',
        message: 'What are the specific requirements for drivers to work with your platform? We need this information for our HR department.',
        status: 'unread'
      },
      {
        name: 'David Martinez',
        email: 'david.martinez@freight.nl',
        subject: 'Bulk hiring request',
        message: 'We need to hire 10 drivers for our expanding operations. Can you help us with bulk recruitment services?',
        status: 'read'
      }
    ];

    for (const message of additionalMessages) {
      const { error } = await supabase
        .from('contact_messages')
        .insert(message);

      if (error) {
        console.error('❌ Error creating contact message:', error);
      } else {
        console.log(`✅ Created contact message from ${message.name}`);
      }
    }

    // 5. Create additional testimonials
    console.log('⭐ Creating additional testimonials...');
    const additionalTestimonials = [
      {
        name: 'Carlos Rodriguez',
        role: 'Fleet Manager',
        company: 'Spanish Transport Solutions',
        content: 'Excellent platform for finding qualified drivers. The quality of candidates is outstanding and the hiring process was smooth.',
        rating: 5
      },
      {
        name: 'Emma Thompson',
        role: 'HR Director',
        company: 'UK Logistics Ltd',
        content: 'We found our best drivers through this platform. The screening process is thorough and the candidates are well-vetted.',
        rating: 5
      },
      {
        name: 'Hans Mueller',
        role: 'Operations Manager',
        company: 'German Freight Services',
        content: 'Professional service with reliable drivers. The platform makes it easy to find drivers with specific qualifications.',
        rating: 4
      },
      {
        name: 'Sophie Dubois',
        role: 'Transport Coordinator',
        company: 'French Logistics',
        content: 'Great experience working with this platform. The drivers are professional and the service is reliable.',
        rating: 4
      },
      {
        name: 'Marco Rossi',
        role: 'Fleet Supervisor',
        company: 'Italian Transport',
        content: 'Highly recommended for logistics companies. The platform connects us with qualified drivers quickly and efficiently.',
        rating: 5
      }
    ];

    for (const testimonial of additionalTestimonials) {
      const { error } = await supabase
        .from('testimonials')
        .insert(testimonial);

      if (error) {
        console.error('❌ Error creating testimonial:', error);
      } else {
        console.log(`✅ Created testimonial from ${testimonial.name}`);
      }
    }

    console.log('🎉 Database population completed!');
    console.log('\n📋 Test Accounts:');
    console.log('Admin: admin@logisticworkers.com / AdminPass123!');
    console.log('Driver 1: driver1@logisticworkers.com / DriverPass123!');
    console.log('Driver 2: driver2@logisticworkers.com / DriverPass123!');
    console.log('Client 1: client1@logisticworkers.com / ClientPass123!');
    console.log('Client 2: client2@logisticworkers.com / ClientPass123!');

  } catch (error) {
    console.error('❌ Error populating database:', error);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  populateDatabase().then(() => {
    console.log('✅ Database population script completed');
    process.exit(0);
  }).catch(error => {
    console.error('❌ Database population script failed:', error);
    process.exit(1);
  });
} 