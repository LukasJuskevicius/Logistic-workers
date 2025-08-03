import fs from 'fs';
import path from 'path';

console.log('🔧 Setting up environment variables...');

const envExamplePath = path.join(process.cwd(), 'env.example');
const envPath = path.join(process.cwd(), '.env');

// Check if .env already exists
if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
  console.log('📝 Please make sure your Supabase credentials are set:');
  console.log('   - SUPABASE_URL=your_supabase_project_url');
  console.log('   - SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key');
} else {
  // Copy from env.example
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from env.example');
    console.log('📝 Please update .env with your Supabase credentials:');
    console.log('   - SUPABASE_URL=your_supabase_project_url');
    console.log('   - SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key');
  } else {
    console.log('❌ env.example not found');
    console.log('📝 Please create .env file manually with:');
    console.log('   SUPABASE_URL=your_supabase_project_url');
    console.log('   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key');
    console.log('   PORT=3001');
    console.log('   NODE_ENV=development');
    console.log('   FRONTEND_URL=http://localhost:5173');
    console.log('   JWT_SECRET=your_jwt_secret_key_here');
  }
}

console.log('\n🚀 Next steps:');
console.log('1. Update .env with your Supabase credentials');
console.log('2. Run: npm run db:create-tables');
console.log('3. Run: npm run db:populate');
console.log('4. Run: npm run dev'); 