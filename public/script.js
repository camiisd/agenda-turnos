const API_URL = 'http://localhost:3000/api';
let token = null;

const message = document.getElementById('message');
const appointmentsSection = document.getElementById('appointments');

// REGISTER
document.getElementById('registerBtn').addEventListener('click', async () => {
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  message.textContent = data.message || data.error;
});

// LOGIN
document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    token = data.token;
    appointmentsSection.classList.remove('hidden');
    loadAppointments();
  }

  message.textContent = data.message || data.error;
});

// CREATE APPOINTMENT
document.getElementById('createAppointmentBtn').addEventListener('click', async () => {
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const client = document.getElementById('client').value;

  const res = await fetch(`${API_URL}/appointment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ date, time, client })
  });

  const data = await res.json();
  message.textContent = data.message || data.error;
  loadAppointments();
});

// LOAD APPOINTMENTS
async function loadAppointments() {
  const res = await fetch(`${API_URL}/appointment`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await res.json();
  const list = document.getElementById('appointmentsList');
  list.innerHTML = '';

  data.forEach(a => {
    const li = document.createElement('li');
    li.textContent = `${a.date} ${a.time} - ${a.client}`;
    list.appendChild(li);
  });
}