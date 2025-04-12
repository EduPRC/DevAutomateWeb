/// src/services/firebaseAuthService.js
import { auth, googleProvider, db } from "./conectionFirebase";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { 
  doc, setDoc, serverTimestamp,
  collection, query, where, getDocs
} from "firebase/firestore";

// Funções de Autenticação (mantidas do seu código original)
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { 
      success: true, 
      user: await getUserData(userCredential.user.uid) // Busca dados adicionais
    };
  } catch (error) {
    return handleAuthError(error);
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Verifica se é o primeiro login e salva dados
    await handleFirstLogin(result.user);
    return {
      success: true,
      user: await getUserData(result.user.uid)
    };
  } catch (error) {
    return handleAuthError(error);
  }
};

export const logoutFirebase = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return handleAuthError(error);
  }
};

// --- Funções Adicionais para Admin/Users ---
export const createAdminUser = async () => {
  const ADMIN_DATA = {
    email: process.env.REACT_APP_ADMIN_EMAIL || "admin@example.com",
    password: process.env.REACT_APP_ADMIN_PASSWORD || "Admin@123",
    name: "Administrador"
  };

  try {
    if (await checkUserExists(ADMIN_DATA.email)) {
      console.warn("Admin já existe");
      return false;
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      ADMIN_DATA.email,
      ADMIN_DATA.password
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: ADMIN_DATA.email,
      name: ADMIN_DATA.name,
      role: "admin",
      createdAt: serverTimestamp(),
      isActive: true
    });

    return true;
  } catch (error) {
    console.error("Erro ao criar admin:", error);
    return false;
  }
};

// --- Funções Auxiliares ---
const handleFirstLogin = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      name: user.displayName || user.email.split('@')[0],
      role: "user",
      createdAt: serverTimestamp(),
      isActive: true
    });
  }
};

const getUserData = async (uid) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  return docSnap.exists() ? docSnap.data() : null;
};

const checkUserExists = async (email) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  return (await getDocs(q)).size > 0;
};

const handleAuthError = (error) => {
  console.error('Erro de autenticação:', error);
  const errorMap = {
    'auth/invalid-credential': 'Credenciais inválidas',
    'auth/too-many-requests': 'Muitas tentativas. Tente mais tarde',
    'auth/popup-closed-by-user': 'Login cancelado pelo usuário'
  };
  return {
    success: false,
    error: errorMap[error.code] || 'Erro durante a autenticação'
  };
};