// src/services/authService.js
import { findUser } from '../mockBackend';

// Login function
export const login = (email, password) => {
  try {
    const user = findUser(email, password);
    
    if (user) {
      // Store user in localStorage without the password
      const userToStore = { ...user };
      delete userToStore.password;
      
      localStorage.setItem('currentUser', JSON.stringify(userToStore));
      return { success: true, user: userToStore };
    }
    
    return { success: false, error: 'Credenciais inválidas' };
  } catch (error) {
    console.error('Erro no login:', error);
    return { success: false, error: 'Erro ao processar o login' };
  }
};

// Logout function
export const logout = () => {
  try {
    // Clear the current user from localStorage
    localStorage.removeItem('currentUser');
    return { success: true };
  } catch (error) {
    console.error('Erro no logout:', error);
    return { success: false, error: 'Erro ao processar o logout' };
  }
};

// Check if user is logged in
export const isAuthenticated = () => {
  try {
    const user = localStorage.getItem('currentUser');
    return !!user;
  } catch (error) {
    return false;
  }
};

// Get current user
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    return null;
  }
};