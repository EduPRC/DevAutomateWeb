// mockBackend.js

let users = [
  { 
    id: 1, 
    username: " dani mattos", 
    name: " dani mattos ", 
    email: "dani@example.com", 
    password: "dani@123", 
    role: "user", 
    registrationDate: "09/10/2023" 
  },
  { 
    id: 2, 
    username: "maria456", 
    name: "Maria Souza", 
    email: "maria@example.com", 
    password: "Maria@123", 
    role: "user", 
    registrationDate: "09/10/2023" 
  },
  { 
    id: 3, 
    username: "maria", 
    name: "Maria ", 
    email: "mari@example.com", 
    password: "Maria@123", 
    role: "user", 
    registrationDate: "09/10/2023" 
  },
  { 
    id: 4, 
    username: "marcio", 
    name: "Macio ", 
    email: "marcio@example.com", 
    password: "Marcio@123", 
    role: "user", 
    registrationDate: "09/10/2023" 
  },
  { 
    id: 5, 
    username: "hugo mattos", 
    name: "Hugo mattos", 
    email: "hugo@example.com", 
    password: "Hugo@123", 
    role: "user", 
    registrationDate: "09/10/2023" 
  },
  { 
    id: 6, 
    username: "admin", 
    email: "admin",
    password: "Admin@123", 
    role: "admin" 
  }
];

// Função para verificar se um email já existe
const checkEmailExists = (email) => {
  return users.some(user => user.email === email);
};

// Função para obter todos os usuários (exceto admin)
const getUsers = () => {
  return users.filter(user => user.role !== "admin");
};

// Função para adicionar um novo usuário
const addUser = (username, email, password, role = "user") => {
  // Verifica se o email já existe
  if (checkEmailExists(email)) {
    return { success: false, error: "EMAIL_EXISTS" };
  }
  
  // Gera um nome baseado no email (parte antes do @)
  const name = email.split('@')[0];
  
  const newUser = {
    id: users.length + 1,
    username,
    name,
    email,
    password,
    role,
    registrationDate: new Date().toLocaleDateString('pt-BR')
  };
  
  users.push(newUser);
  return { success: true, user: newUser };
};

// Função para encontrar um usuário pelo email e password
const findUser = (email, password) => {
  return users.find(
    (user) => user.email === email && user.password === password
  );
};

// Função para editar um usuário
const editUser = (id, username, email) => {
  // Se o email foi alterado, verifica se o novo email já existe em outro usuário
  const userToEdit = users.find(user => user.id === id);
  if (userToEdit && userToEdit.email !== email && checkEmailExists(email)) {
    return { success: false, error: "EMAIL_EXISTS" };
  }

  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      username,
      email,
      name: email.split('@')[0] // Atualiza o nome baseado no novo email
    };
    return { success: true, user: users[userIndex] };
  }
  return { success: false, error: "USER_NOT_FOUND" };
};

// Função para excluir um usuário
const deleteUser = (id) => {
  users = users.filter(user => user.id !== id);
  return { success: true };
};

export { getUsers, addUser, findUser, editUser, deleteUser, checkEmailExists };