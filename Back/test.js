const baseUrl = 'http://localhost:3000';

async function test(name, fn) {
  try {
    await fn();
    console.log(`✅ ${name}`);
  } catch (err) {
    console.error(`❌ ${name}`);
    if (err.response) {
      const text = await err.response.text();
      console.error(`Status: ${err.response.status}\n${text}`);
    } else {
      console.error(err);
    }
  }
}

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = new Error('HTTP error');
    error.response = res;
    throw error;
  }
  return res.json();
}

(async () => {
  // Test connexion à la BDD
  await test('Connexion à la BDD', async () => {
    const res = await fetchJson(`${baseUrl}/api/db/test`);
    if (!res.success) throw new Error('DB test failed');
  });

  // Signup étudiant (succès)
  await test('Signup étudiant (succès)', async () => {
    await fetchJson(`${baseUrl}/api/auth/signup/studiant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'teststudent@example.com',
        password: 'testpass',
        linkedin_url: 'https://linkedin.com/in/teststudent',
        birthday: '2000-01-01',
        university: 'Université Test',
        description: 'Test étudiant'
      })
    });
  });

  // Signup étudiant (email déjà utilisé)
  await test('Signup étudiant (email déjà utilisé)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/signup/studiant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'teststudent@example.com',
        password: 'testpass',
        linkedin_url: 'https://linkedin.com/in/teststudent2',
        birthday: '2000-01-01',
        university: 'Université Test',
        description: 'Test étudiant 2'
      })
    });
    if (res.status !== 409) throw new Error('Should return 409');
  });

  // Signup startup (succès)
  await test('Signup startup (succès)', async () => {
    await fetchJson(`${baseUrl}/api/auth/signup/startup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'teststartup@example.com',
        password: 'testpass',
        linkedin_url: 'https://linkedin.com/company/teststartup',
        name: 'Test Startup',
        siret: '12345678901234',
        status: 'active'
      })
    });
  });

  // Signup startup (email déjà utilisé)
  await test('Signup startup (email déjà utilisé)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/signup/startup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'teststartup@example.com',
        password: 'testpass',
        linkedin_url: 'https://linkedin.com/company/teststartup2',
        name: 'Test Startup 2',
        siret: '22345678901234',
        status: 'active'
      })
    });
    if (res.status !== 409) throw new Error('Should return 409');
  });

  // Login étudiant (succès)
  await test('Login étudiant (succès)', async () => {
    const res = await fetchJson(`${baseUrl}/api/auth/login/studiant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'teststudent@example.com',
        password: 'testpass'
      })
    });
    if (!res.token) throw new Error('No token');
  });

  // Login étudiant (mauvais mot de passe)
  await test('Login étudiant (mauvais mot de passe)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login/studiant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'teststudent@example.com',
        password: 'wrongpass'
      })
    });
    if (res.status !== 401) throw new Error('Should return 401');
  });

  // Login startup (succès)
  await test('Login startup (succès)', async () => {
    const res = await fetchJson(`${baseUrl}/api/auth/login/startup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'teststartup@example.com',
        password: 'testpass'
      })
    });
    if (!res.token) throw new Error('No token');
  });

  // Login startup (mauvais mot de passe)
  await test('Login startup (mauvais mot de passe)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login/startup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'teststartup@example.com',
        password: 'wrongpass'
      })
    });
    if (res.status !== 401) throw new Error('Should return 401');
  });

  console.log('Tous les tests sont terminés.');
})();
