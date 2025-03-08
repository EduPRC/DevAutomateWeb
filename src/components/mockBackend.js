// mockBackend.js

// Simulação de um banco de dados de usuários
let users = [
  { username: "admin", password: "Admin@123", role: "admin" }, // Usuário admin padrão
];

// Função para adicionar um novo usuário
const addUser = (username, password, role) => {
  const newUser = {
    username,
    password,
    role, // Adiciona o papel do usuário (admin ou user)
  };
  users.push(newUser); // Adiciona o novo usuário à lista
  console.log("Usuário cadastrado:", newUser); // Exibe no console para depuração
};

// Função para encontrar um usuário pelo username e password
const findUser = (username, password) => {
  return users.find(
    (user) => user.username === username && user.password === password
  );
};

// Exporta as funções para uso em outros arquivos
export { addUser, findUser };