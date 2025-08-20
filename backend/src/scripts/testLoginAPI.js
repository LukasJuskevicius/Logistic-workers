import fetch from 'node-fetch';

async function testLoginAPI() {
    try {
        console.log('🧪 Testing login API with demo credentials...');
        
        const loginData = {
            email: 'admin@logistics.com',
            password: 'demo123'
        };
        
        console.log('📤 Sending login request...');
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });
        
        console.log('📥 Response status:', response.status);
        console.log('📥 Response headers:', Object.fromEntries(response.headers));
        
        const responseData = await response.text();
        console.log('📥 Response body:', responseData);
        
        if (response.ok) {
            console.log('✅ Login successful!');
            
            // Test auth endpoint with cookies
            const cookies = response.headers.get('set-cookie');
            if (cookies) {
                console.log('🍪 Testing auth endpoint with session cookie...');
                const authResponse = await fetch('http://localhost:3001/api/auth', {
                    headers: {
                        'Cookie': cookies
                    }
                });
                
                console.log('🔐 Auth response status:', authResponse.status);
                const authData = await authResponse.text();
                console.log('🔐 Auth response:', authData);
            }
        } else {
            console.log('❌ Login failed');
            try {
                const errorData = JSON.parse(responseData);
                console.log('Error details:', errorData);
            } catch (e) {
                console.log('Raw error response:', responseData);
            }
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testLoginAPI();
