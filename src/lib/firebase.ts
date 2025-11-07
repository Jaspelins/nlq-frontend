import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Adicionando Firestore para futuro uso (armazenamento de dados)

// Sua configuração REAL do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBIc5aZWNWs-3rjf1YmC92jbQaRXVayvto",
  authDomain: "ubuntuia.firebaseapp.com",
  projectId: "ubuntuia",
  storageBucket: "ubuntuia.firebasestorage.app",
  messagingSenderId: "461521353167",
  appId: "1:461521353167:web:a9757fb40b3f6bb187baba",
  measurementId: "G-SLCXF8E9ZL"
};

// Inicializa o Firebase, evitando reinicializações no Next.js (que pode rodar no servidor)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exporta os serviços que iremos usar
const auth = getAuth(app);
const db = getFirestore(app); // Instância do Firestore para o projeto NLQ

export { app, auth, db };