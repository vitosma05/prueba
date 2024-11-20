// Importa funciones específicas del SDK modular
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importa Firestore
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';


// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCae-4CT1uxwQpJh8hHi9gHOedeqCoI7Uc",
  authDomain: "lazona-96db2.firebaseapp.com",
  databaseURL: "https://lazona-96db2-default-rtdb.firebaseio.com", // Si solo usas Realtime Database, esta línea puede ser ignorada
  projectId: "lazona-96db2",
  storageBucket: "lazona-96db2.appspot.com",
  messagingSenderId: "645223159967",
  appId: "1:645223159967:android:f826352b556b90bdddaaaa",
  measurementId: "G-SX5ZBD3X9X",
};

// Asegúrate de no inicializar más de una vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Exporta las funcionalidades que necesitas

export const auth = getAuth(app);
export const db = getFirestore(app); // Exporta Firestore
export const database = getDatabase(app);
export default app;
