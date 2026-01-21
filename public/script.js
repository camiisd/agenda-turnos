// Configuración dinámica de la URL de la API
const API_URL = window.location.origin.includes('localhost') 
    ? 'http://localhost:3000/api' 
    : `${window.location.origin}/api`;

let editingId = null; // Para saber si estamos creando o editando

let token = localStorage.getItem('token');
let isLogin = true;

// Elementos del DOM
const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');
const authForm = document.getElementById('auth-form');
const appointmentForm = document.getElementById('appointment-form');
const appointmentList = document.getElementById('appointment-list');
const toggleAuthBtn = document.getElementById('toggle-auth');
const authTitle = document.getElementById('auth-title');

// --- Lógica de Autenticación ---

toggleAuthBtn.addEventListener('click', () => {
    isLogin = !isLogin;
    authTitle.innerText = isLogin ? 'Iniciar Sesión' : 'Registrarse';
    toggleAuthBtn.innerText = isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión';
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const endpoint = isLogin ? '/users/login' : '/users/register';

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            if (isLogin) {
                localStorage.setItem('token', data.token);
                token = data.token;
                checkAuth();
            } else {
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                isLogin = true;
                authTitle.innerText = 'Iniciar Sesión';
            }
        } else {
            alert(data.error || data.message);
        }
    } catch (err) {
        console.error(err);
        alert('Error en el servidor');
    }
});

// --- Lógica de Turnos ---

async function loadAppointments() {
    try {
        const response = await fetch(`${API_URL}/appointment`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        appointmentList.innerHTML = '';
        data.forEach(appo => {
            const li = document.createElement('li');
            li.className = "flex justify-between items-center p-3 bg-gray-50 rounded border";
            li.innerHTML = `
                <div>
                    <p class="font-bold text-indigo-700">${appo.client}</p>
                    <p class="text-xs text-gray-500">${appo.date} | ${appo.time} hs</p>
                </div>
                <div class="space-x-2">
                    <button onclick="prepareEdit(${JSON.stringify(appo).replace(/"/g, '&quot;')})" class="text-blue-500 hover:underline text-sm">Editar</button>
                    <button onclick="deleteAppointment(${appo.id})" class="text-red-500 hover:underline text-sm">Eliminar</button>
                </div>
            `;
            appointmentList.appendChild(li);
        });
    } catch (err) { console.error(err); }
}

appointmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newAppo = {
        client: document.getElementById('client').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    const response = await fetch(`${API_URL}/appointment`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAppo)
    });

    if (response.ok) {
        appointmentForm.reset();
        loadAppointments();
    } else {
        const err = await response.json();
        alert(err.error || 'Error al crear turno');
    }
});

async function deleteAppointment(id) {
    if (!confirm('¿Seguro que deseas eliminar este turno?')) return;
    
    await fetch(`${API_URL}/appointment/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    loadAppointments();
}

// --- Control de Sesión ---

function checkAuth() {
    if (token) {
        authSection.classList.add('hidden');
        appSection.classList.remove('hidden');
        loadAppointments();
    } else {
        authSection.classList.remove('hidden');
        appSection.classList.add('hidden');
    }
}

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    token = null;
    checkAuth();
});

// Pasa los datos del turno al formulario
function prepareEdit(appo) {
    editingId = appo.id;
    document.getElementById('client').value = appo.client;
    document.getElementById('date').value = appo.date;
    document.getElementById('time').value = appo.time;
    
    const submitBtn = appointmentForm.querySelector('button[type="submit"]');
    submitBtn.innerText = "Actualizar Turno";
    submitBtn.classList.replace('bg-green-600', 'bg-blue-600');
}

// Modificamos el evento submit del formulario de turnos
appointmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const appoData = {
        client: document.getElementById('client').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    const url = editingId ? `${API_URL}/appointment/${editingId}` : `${API_URL}/appointment`;
    const method = editingId ? 'PUT' : 'POST';

    const response = await fetch(url, {
        method: method,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appoData)
    });

    if (response.ok) {
        editingId = null;
        appointmentForm.reset();
        const submitBtn = appointmentForm.querySelector('button[type="submit"]');
        submitBtn.innerText = "Guardar Turno";
        submitBtn.classList.replace('bg-blue-600', 'bg-green-600');
        loadAppointments();
    } else {
        const err = await response.json();
        alert(err.error || 'Error al procesar el turno');
    }
});

// Inicializar
checkAuth();