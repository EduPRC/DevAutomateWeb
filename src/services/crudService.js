// src/services/crudService.js

// Function to get user-specific key
export const getUserSpecificKey = (baseKey, userId) => {
  return `${baseKey}_${userId}`;
};

// Function to get data from localStorage
export const getData = (key, defaultValue = [], userId = null) => {
  try {
    // If userId is provided, use a user-specific key
    const storageKey = userId ? getUserSpecificKey(key, userId) : key;
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error getting data for ${key}:`, error);
    return defaultValue;
  }
};

// Function to save data to localStorage
export const saveData = (key, data, userId = null) => {
  try {
    // If userId is provided, use a user-specific key
    const storageKey = userId ? getUserSpecificKey(key, userId) : key;
    localStorage.setItem(storageKey, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving data for ${key}:`, error);
    return false;
  }
};

// Function to add an item
export const addItem = (key, item, userId = null) => {
  const currentData = getData(key, [], userId);
  const newData = [...currentData, { ...item, id: Date.now() }];
  return saveData(key, newData, userId);
};

// Function to update an item
export const updateItem = (key, id, updatedItem, userId = null) => {
  const currentData = getData(key, [], userId);
  const newData = currentData.map(item => 
    item.id === id ? { ...item, ...updatedItem } : item
  );
  return saveData(key, newData, userId);
};

// Function to delete an item
export const deleteItem = (key, id, userId = null) => {
  const currentData = getData(key, [], userId);
  const newData = currentData.filter(item => item.id !== id);
  return saveData(key, newData, userId);
};

// Function to get all user data (for admin purposes)
export const getAllUserData = (baseKey) => {
  try {
    const allData = {};
    // Get all localStorage keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      // Check if the key matches our pattern
      if (key.startsWith(`${baseKey}_`)) {
        // Extract userId from the key
        const userId = key.split('_')[1];
        // Get the data
        const data = JSON.parse(localStorage.getItem(key));
        allData[userId] = data;
      }
    }
    return allData;
  } catch (error) {
    console.error(`Error getting all user data for ${baseKey}:`, error);
    return {};
  }
};