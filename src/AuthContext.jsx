// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { auth } from "./services/conectionFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./services/conectionFirebase"; // Importe o db também

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Buscar informações adicionais do Firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          const userData = userDoc.exists() ? userDoc.data() : {};
          
          const user = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            role: userData.role || 'user' // Default para 'user' se não houver role definida
          };
          
          localStorage.setItem("currentUser", JSON.stringify(user));
          setCurrentUser(user);
          setUserRole(user.role);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          // Fallback básico se houver erro ao acessar Firestore
          const user = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            role: 'user'
          };
          setCurrentUser(user);
          setUserRole('user');
          setIsAuthenticated(true);
        }
      } else {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        setUserRole("");
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (role, user) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setUserRole("");
    setCurrentUser(null);
  };

  const value = {
    isAuthenticated,
    userRole,
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;