import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001';

async function testAuth() {
  console.log('🧪 Testando rotas de autenticação...\n');

  // Teste 1: Health check
  try {
    const healthResponse = await fetch(`${BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
  } catch (error) {
    console.log('❌ Health check falhou:', error.message);
  }

  // Teste 2: Registrar usuário
  try {
    const registerData = {
      name: 'Teste Usuário',
      email: 'teste@exemplo.com',
      password: '123456',
      userType: 'client' // Agora usando minúsculo
    };

    const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    });

    const registerResult = await registerResponse.json();
    console.log('✅ Registro:', registerResult);

    if (registerResult.token) {
      // Teste 3: Login
      const loginData = {
        email: 'teste@exemplo.com',
        password: '123456'
      };

      const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const loginResult = await loginResponse.json();
      console.log('✅ Login:', loginResult);

      if (loginResult.token) {
        // Teste 4: Perfil (protegido)
        const profileResponse = await fetch(`${BASE_URL}/api/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${loginResult.token}`
          }
        });

        const profileResult = await profileResponse.json();
        console.log('✅ Perfil:', profileResult);
      }
    }

  } catch (error) {
    console.log('❌ Teste falhou:', error.message);
  }
}

testAuth(); 