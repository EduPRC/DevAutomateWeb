// mockBackend.js

let users = [
  { 
    id: 1, 
    username: "joao123", 
    name: "João Silva", 
    email: "joao@example.com", 
    password: "Joao@123", 
    role: "user", 
    registrationDate: "10/10/2023" 
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
    username: "admin", 
    email: "admin",
    password: "Admin@123", 
    role: "admin" 
  }
];

// Função para obter todos os usuários (exceto admin)
const getUsers = () => {
  return users.filter(user => user.role !== "admin");
};

// Função para adicionar um novo usuário
const addUser = (username, email, password, role = "user") => {
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
  return newUser;
};

// Função para encontrar um usuário pelo email e password
const findUser = (email, password) => {
  return users.find(
    (user) => user.email === email && user.password === password
  );
};

// Função para editar um usuário
const editUser = (id, username, email) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      username,
      email,
      name: email.split('@')[0] // Atualiza o nome baseado no novo email
    };
    return users[userIndex];
  }
  return null;
};

// Função para excluir um usuário
const deleteUser = (id) => {
  users = users.filter(user => user.id !== id);
  return true;
};

export { getUsers, addUser, findUser, editUser, deleteUser };