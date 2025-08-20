import { migrateDatabase } from './migrateDatabase.js';

console.log('🚀 Starting database migration...');

migrateDatabase()
    .then(() => {
        console.log('✅ Migration completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Migration failed:', error.message);
        console.error('Stack:', error.stack);
        process.exit(1);
    });
