/// src/services/firebaseAuthService.js
import { auth, googleProvider, db } from "./conectionFirebase";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider
} from "firebase/auth";
import { 
  doc, setDoc, serverTimestamp,
  collection, query, where, getDocs, getDoc
} from "firebase/firestore";

// Configure Google provider to always ask for account selection
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
});

// Authentication Functions
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { 
      success: true, 
      user: await getUserData(userCredential.user.uid)
    };
  } catch (error) {
    return handleAuthError(error);
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
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

// Admin/User Management Functions
export const createAdminUser = async () => {
  const ADMIN_DATA = {
    email: "admin@example.com",
    password: "Admin@123",
    name: "Administrador"
  };

  try {
    if (await checkUserExists(ADMIN_DATA.email)) {
      console.warn("Admin already exists");
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
    console.error("Error creating admin:", error);
    return false;
  }
};

// Helper Functions
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
  console.error('Authentication error:', error);
  const errorMap = {
    'auth/invalid-credential': 'Invalid credentials',
    'auth/too-many-requests': 'Too many attempts. Try again later',
    'auth/popup-closed-by-user': 'Login canceled by user',
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Incorrect password'
  };
  return {
    success: false,
    error: errorMap[error.code] || 'Authentication error'
  };
};