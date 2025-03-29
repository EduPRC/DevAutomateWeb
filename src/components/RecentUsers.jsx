import React, { useState, useEffect } from "react";
import { getUsers, editUser, deleteUser } from "../services/mockBackend";
import { getData, saveData } from "../services/crudService";

const RecentUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: ""
  });
  
  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const allUsers = getUsers();
    
    // Salvar usuários no localStorage também
    saveData("users", allUsers);
    
    setUsers(allUsers);
  };

  // Calcular o total de páginas
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Obter os usuários da página atual
  const getCurrentPageUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  };

  // Navegar para a página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Navegar para a próxima página
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = () => {
    if (editingUser) {
      const updatedUser = editUser(editingUser.id, formData.username, formData.email);
      if (updatedUser) {
        // Se o usuário editado for o atual usuário logado, atualizar no localStorage
        const currentUser = getData("currentUser", null);
        if (currentUser && currentUser.id === editingUser.id) {
          saveData("currentUser", {
            ...currentUser,
            username: formData.username,
            email: formData.email,
            name: formData.email.split('@')[0]
          });
        }
        
        loadUsers();
        setEditingUser(null);
      }
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      // Verificar se o usuário sendo excluído é o usuário logado atualmente
      const currentUser = getData("currentUser", null);
      if (currentUser && currentUser.id === id) {
        alert("Não é possível excluir o usuário atualmente logado.");
        return;
      }
      
      deleteUser(id);
      loadUsers();
      
      // Ajustar a página atual se necessário
      const updatedUsers = getUsers();
      if (currentPage > 1 && (currentPage - 1) * itemsPerPage >= updatedUsers.length) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  // Usuários da página atual
  const currentUsers = getCurrentPageUsers();

  return (
    <div className="recentOrders">
      <div className="cardHeader">
        <h2>Usuários Recentes</h2>
      </div>

      <table>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Nome de Usuário</td>
            <td>Email</td>
            <td>Data de Registro</td>
            <td>Ações</td>
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>{user.registrationDate}</td>
              <td>
                {editingUser?.id === user.id ? (
                  <>
                    <span className="status delivered" onClick={handleSaveEdit}>
                      Salvar
                    </span>
                    <span className="status return" onClick={handleCancelEdit}>
                      Cancelar
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className="status delivered"
                      onClick={() => handleEditClick(user)}
                    >
                      Editar
                    </span>
                    <span
                      className="status return"
                      onClick={() => handleDelete(user.id)}
                    >
                      Excluir
                    </span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Controles de paginação */}
      {users.length > 0 && (
        <div className="pagination-controls">
          <button 
            onClick={goToPreviousPage} 
            disabled={currentPage === 1}
            className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          >
            Anterior
          </button>
          
          <span className="pagination-info">
            Página {currentPage} de {totalPages}
          </span>
          
          <button 
            onClick={goToNextPage} 
            disabled={currentPage === totalPages}
            className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentUsers;