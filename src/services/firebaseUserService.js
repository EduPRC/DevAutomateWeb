// src/services/firebaseUserService.js
import { db } from "./conectionFirebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const usersCollection = collection(db, "users");

export const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      
      return querySnapshot.docs.map(doc => {
        const userData = doc.data();
        
        // Verificação segura de propriedades
        return {
          id: doc.id,
          name: userData.name || '', // valor padrão se não existir
          email: userData.email || '',
          // Adicione tratamento seguro para a propriedade que usa split()
          username: userData.username ? userData.username.split('@')[0] : '',
          // Outras propriedades com valores padrão
          ...userData
        };
      });
    } catch (error) {
      console.error("Error loading users:", error);
      throw error;
    }
  };

export const addUser = async (userData) => {
  try {
    const docRef = await addDoc(usersCollection, userData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    return { success: false, error: "Erro ao cadastrar usuário" };
  }
};

export const updateUser = async (id, updatedData) => {
  try {
    await updateDoc(doc(db, "users", id), updatedData);
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return { success: false, error: "Erro ao atualizar usuário" };
  }
};

export const deleteUser = async (id) => {
  try {
    await deleteDoc(doc(db, "users", id));
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return { success: false, error: "Erro ao deletar usuário" };
  }
};

export const checkEmailExists = async (email) => {
  try {
    const q = query(usersCollection, where("email", "==", email));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error("Erro ao verificar email:", error);
    return false;
  }
};
