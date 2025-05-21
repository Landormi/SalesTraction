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

function extractTokenFromSetCookie(headers) {
  // headers: Headers object
  const setCookie = headers.get('set-cookie') || headers.get('Set-Cookie');
  if (!setCookie) return null;
  const match = setCookie.match(/token=([^;]+)/);
  return match ? match[1] : null;
}

async function fetchWithCookies(url, options = {}, cookies = '') {
  options.headers = options.headers || {};
  if (cookies) options.headers['Cookie'] = cookies;
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = new Error('HTTP error');
    error.response = res;
    throw error;
  }
  return res;
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
  let studentTokenCookie = '';
  await test('Login étudiant (succès)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login/studiant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'teststudent@example.com',
        password: 'testpass'
      })
    });
    if (!res.ok) throw new Error('Login failed');
    const setCookie = res.headers.get('set-cookie') || res.headers.get('Set-Cookie');
    if (!setCookie || !setCookie.includes('token=')) throw new Error('No token cookie');
    studentTokenCookie = setCookie.split(';')[0]; // "token=..."
    const json = await res.json();
    if (!json.user) throw new Error('No user in response');
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
  let startupTokenCookie = '';
  await test('Login startup (succès)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login/startup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'teststartup@example.com',
        password: 'testpass'
      })
    });
    if (!res.ok) throw new Error('Login failed');
    const setCookie = res.headers.get('set-cookie') || res.headers.get('Set-Cookie');
    if (!setCookie || !setCookie.includes('token=')) throw new Error('No token cookie');
    startupTokenCookie = setCookie.split(';')[0]; // "token=..."
    const json = await res.json();
    if (!json.user) throw new Error('No user in response');
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

  // Modification étudiant (succès)
  await test('Modification étudiant (succès)', async () => {
    const res = await fetchWithCookies(`${baseUrl}/api/studiant`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        linkedin_url: 'https://linkedin.com/in/student1-modified',
        university: 'Université Modifiée',
        description: 'Description modifiée'
      })
    }, studentTokenCookie);
    const json = await res.json();
    if (!json.message || !json.message.includes('mis à jour')) throw new Error('Update failed');
  });

  // Modification étudiant (aucune donnée)
  await test('Modification étudiant (aucune donnée)', async () => {
    const res = await fetch(`${baseUrl}/api/studiant`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Cookie': studentTokenCookie },
      body: JSON.stringify({})
    });
    if (res.status !== 400) throw new Error('Should return 400');
  });

  // Modification étudiant (inexistant) -- non applicable car id via token

  // Modification startup (succès)
  await test('Modification startup (succès)', async () => {
    const res = await fetchWithCookies(`${baseUrl}/api/startup`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        linkedin_url: 'https://linkedin.com/company/startup1-modified',
        name: 'Startup 1 Modifiée',
        siret: '99999999999999',
        status: 'active'
      })
    }, startupTokenCookie);
    const json = await res.json();
    if (!json.message || !json.message.includes('mise à jour')) throw new Error('Update failed');
  });

  // Modification startup (aucune donnée)
  await test('Modification startup (aucune donnée)', async () => {
    const res = await fetch(`${baseUrl}/api/startup`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Cookie': startupTokenCookie },
      body: JSON.stringify({})
    });
    if (res.status !== 400) throw new Error('Should return 400');
  });

  // Modification startup (inexistant) -- non applicable car id via token

  // Test récupération profil étudiant
  await test('Récupération profil étudiant', async () => {
    const res = await fetchWithCookies(`${baseUrl}/api/profile/studiant`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }, studentTokenCookie);
    const json = await res.json();
    if (!json.email || !json.user_type) throw new Error('Profil étudiant invalide');
  });

  // Test récupération profil startup
  await test('Récupération profil startup', async () => {
    const res = await fetchWithCookies(`${baseUrl}/api/profile/startup`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }, startupTokenCookie);
    const json = await res.json();
    if (!json.email || !json.user_type) throw new Error('Profil startup invalide');
  });

  // Création d'offre (startup)
  let createdOffreId = null;
  await test('Création offre (startup)', async () => {
    const res = await fetchWithCookies(`${baseUrl}/api/offre`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Offre Test',
        description: 'Description de l\'offre test',
        price_range: '1000-2000',
        comission: 20
      })
    }, startupTokenCookie);
    const json = await res.json();
    if (!json.id_offre) throw new Error('Offre non créée');
    createdOffreId = json.id_offre;
  });

  // Création d'offre (refus étudiant)
  await test('Création offre (refus étudiant)', async () => {
    const res = await fetch(`${baseUrl}/api/offre`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': studentTokenCookie },
      body: JSON.stringify({
        title: 'Offre Interdite',
        description: 'Ne doit pas marcher',
        price_range: '1000-2000',
        comission: 10
      })
    });
    if (res.status !== 403) throw new Error('Should return 403');
  });

  // Visualisation offre (étudiant)
  await test('Visualisation offre (étudiant)', async () => {
    const res = await fetchWithCookies(`${baseUrl}/api/offre/${createdOffreId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }, studentTokenCookie);
    const json = await res.json();
    if (!json.title || json.id_offre !== createdOffreId) throw new Error('Offre non visible pour étudiant');
  });

  // Visualisation offre (startup propriétaire)
  await test('Visualisation offre (startup propriétaire)', async () => {
    const res = await fetchWithCookies(`${baseUrl}/api/offre/${createdOffreId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }, startupTokenCookie);
    const json = await res.json();
    if (!json.title || json.id_offre !== createdOffreId) throw new Error('Offre non visible pour startup propriétaire');
  });

  // Visualisation offre (startup non propriétaire)
  await test('Visualisation offre (startup non propriétaire)', async () => {
    // Création d'une autre startup
    await fetchJson(`${baseUrl}/api/auth/signup/startup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'otherstartup@example.com',
        password: 'testpass',
        linkedin_url: 'https://linkedin.com/company/otherstartup',
        name: 'Other Startup',
        siret: '88888888888888',
        status: 'active'
      })
    });
    const resLogin = await fetch(`${baseUrl}/api/auth/login/startup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'otherstartup@example.com',
        password: 'testpass'
      })
    });
    const otherStartupTokenCookie = (resLogin.headers.get('set-cookie') || '').split(';')[0];
    const res = await fetch(`${baseUrl}/api/offre/${createdOffreId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Cookie': otherStartupTokenCookie }
    });
    if (res.status !== 403) throw new Error('Should return 403');
  });

  // Modification offre (startup propriétaire)
  await test('Modification offre (startup propriétaire)', async () => {
    const res = await fetchWithCookies(`${baseUrl}/api/offre/${createdOffreId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Offre Test Modifiée',
        price_range: '2000-3000'
      })
    }, startupTokenCookie);
    const json = await res.json();
    if (!json.message || !json.message.includes('mise à jour')) throw new Error('Modification échouée');
  });

  // Modification offre (étudiant, refusé)
  await test('Modification offre (étudiant, refusé)', async () => {
    const res = await fetch(`${baseUrl}/api/offre/${createdOffreId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Cookie': studentTokenCookie },
      body: JSON.stringify({ title: 'Tentative Étudiant' })
    });
    if (res.status !== 403) throw new Error('Should return 403');
  });

  // Modification offre (startup non propriétaire, refusé)
  await test('Modification offre (startup non propriétaire, refusé)', async () => {
    // Utilise le token de l'autre startup déjà créé
    const resLogin = await fetch(`${baseUrl}/api/auth/login/startup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'otherstartup@example.com',
        password: 'testpass'
      })
    });
    const otherStartupTokenCookie = (resLogin.headers.get('set-cookie') || '').split(';')[0];
    const res = await fetch(`${baseUrl}/api/offre/${createdOffreId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Cookie': otherStartupTokenCookie },
      body: JSON.stringify({ title: 'Tentative Non Propriétaire' })
    });
    if (res.status !== 403) throw new Error('Should return 403');
  });

  // Modification offre (aucune donnée)
  await test('Modification offre (aucune donnée)', async () => {
    const res = await fetch(`${baseUrl}/api/offre/${createdOffreId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Cookie': startupTokenCookie },
      body: JSON.stringify({})
    });
    if (res.status !== 400) throw new Error('Should return 400');
  });

  // Visualisation offre (inexistante)
  await test('Visualisation offre (inexistante)', async () => {
    const res = await fetch(`${baseUrl}/api/offre/999999`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Cookie': studentTokenCookie }
    });
    if (res.status !== 404) throw new Error('Should return 404');
  });

  // Modification offre (inexistante)
  await test('Modification offre (inexistante)', async () => {
    const res = await fetch(`${baseUrl}/api/offre/999999`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Cookie': startupTokenCookie },
      body: JSON.stringify({ title: 'Inexistante' })
    });
    if (res.status !== 404) throw new Error('Should return 404');
  });

  // Création offre (champs manquants)
  await test('Création offre (champs manquants)', async () => {
    const res = await fetch(`${baseUrl}/api/offre`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cookie': startupTokenCookie },
      body: JSON.stringify({ title: '', description: '', price_range: '', comission: '' })
    });
    if (res.status !== 400) throw new Error('Should return 400');
  });

  console.log('Tous les tests sont terminés.');
})();