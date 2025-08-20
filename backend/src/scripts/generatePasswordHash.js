import bcrypt from 'bcrypt';

async function generatePasswordHash() {
    const password = 'demo123';
    const saltRounds = 10;
    
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        console.log('Password:', password);
        console.log('Hash:', hash);
        console.log('\nUse this hash in your seed script:');
        console.log(`'${hash}'`);
    } catch (error) {
        console.error('Error generating hash:', error);
    }
}

generatePasswordHash();
