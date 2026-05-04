import { firebaseConfig } from './firebase-config.js';

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const configured = firebaseConfig.apiKey !== "A_REMPLACER";

if (!configured) {
  document.getElementById("configBox").classList.remove("hidden");
} else {
  document.getElementById("configBox").classList.add("hidden");
  document.getElementById("authBox").classList.remove("hidden");

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Connexion réussie");
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  });
}
