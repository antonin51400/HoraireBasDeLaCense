import { firebaseConfig } from '../firebase-config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const authView = document.getElementById('auth-view');
const empView = document.getElementById('employee-view');
const logoutBtn = document.getElementById('logout-btn');

onAuthStateChanged(auth, user => {
  if (user) {
    authView.classList.add('hidden');
    empView.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
  } else {
    authView.classList.remove('hidden');
    empView.classList.add('hidden');
    logoutBtn.classList.add('hidden');
  }
});

document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('Connexion OK');
  } catch (e) {
    alert(e.message);
  }
});

logoutBtn.addEventListener('click', () => signOut(auth));