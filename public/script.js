const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

const registerMessage = document.getElementById('registerMessage');
const loginMessage = document.getElementById('loginMessage');
const tokenDisplay = document.getElementById('token');

// URL base de tu API
const API_URL = 'http://localhost:3000/api/users';

// Registrar usuario
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if(res.ok){
            registerMessage.textContent = data.message;
        } else {
            registerMessage.textContent = data.error;
        }
    } catch (err) {
        registerMessage.textContent = 'Error en la conexión con el servidor.';
    }
});

// Login usuario
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if(res.ok){
            loginMessage.textContent = data.message;
            tokenDisplay.textContent = `Token: ${data.token}`;
        } else {
            loginMessage.textContent = data.error;
            tokenDisplay.textContent = '';
        }
    } catch (err) {
        loginMessage.textContent = 'Error en la conexión con el servidor.';
        tokenDisplay.textContent = '';
    }
});
