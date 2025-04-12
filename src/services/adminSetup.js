// src/services/adminSetup.js
import { auth, db } from "../conectionFirebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const createAdminUser = async () => {
  try {
    // Criar usuário no Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      "admin@example.com",
      "Admin@123"
    );
    
    // Adicionar dados adicionais no Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: "admin@example.com",
      name: "Admin",
      role: "admin",
      registrationDate: new Date().toISOString()
    });
    
    console.log("Admin user created successfully!");
    return true;
  } catch (error) {
    console.error("Error creating admin user:", error);
    return false;
  }
};