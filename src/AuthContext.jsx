// src/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps the app and makes auth object available
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in when app loads
  useEffect(() => {
    const checkLoggedIn = () => {
      try {
        const storedUser = localStorage.getItem("currentUser");
        
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);
          setUserRole(user.role);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking authentication state:", error);
      }
      
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Login function - now stores the full user object
  const login = (role, user) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentUser(user);
  };

  // Logout function
  const logout = () => {
    // Clear the stored user
    localStorage.removeItem("currentUser");
    
    setIsAuthenticated(false);
    setUserRole("");
    setCurrentUser(null);
  };

  // Create the value object to share with components
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
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;