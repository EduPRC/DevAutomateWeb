import React, { useState, useEffect } from "react";
import { getUsers, editUser, deleteUser } from "../services/mockBackend";
import { getData, saveData } from "../services/crudService";

const RecentUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: ""
  });
  
  // Estados para paginação e filtro
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  // Efeito para filtrar usuários quando o termo de busca mudar
  useEffect(() => {
    filterUsers();
  }, [searchTerm, users]);
  
  const loadUsers = () => {
    const allUsers = getUsers();
    
    // Salvar usuários no localStorage também
    saveData("users", allUsers);
    
    setUsers(allUsers);
    setFilteredUsers(allUsers);
  };
  
  const filterUsers = () => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      setCurrentPage(1);
      return;
    }
    
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredUsers(filtered);
    setCurrentPage(1);
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
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
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
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };
  
  // Calculando total de páginas
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  
  // Obter usuários da página atual
  const getCurrentUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  };
  
  // Navegação de página
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="recentOrders">
      <div className="cardHeader">
        <h2>Usuários Recentes</h2>
      </div>
      
      <div className="filterControls" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
        <div className="searchFilter">
          <input
            type="text"
            placeholder="Pesquisar por nome..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ padding: "8px", width: "250px" }}
          />
        </div>
        
        <div className="paginationControl">
          <label htmlFor="itemsPerPage">Itens por página: </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            style={{ padding: "8px", marginLeft: "5px" }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nome de Usuário</th>
            <th>Email</th>
            <th>Data de Registro</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {getCurrentUsers().map((user) => (
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
      
      {/* Paginação */}
      {totalPages > 1 && (
        <div className="pagination" style={{ marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button 
            onClick={() => goToPage(1)} 
            disabled={currentPage === 1}
            style={{ padding: "5px 10px", margin: "0 5px", cursor: currentPage === 1 ? "default" : "pointer" }}
          >
            &laquo;
          </button>
          
          <button 
            onClick={() => goToPage(currentPage - 1)} 
            disabled={currentPage === 1}
            style={{ padding: "5px 10px", margin: "0 5px", cursor: currentPage === 1 ? "default" : "pointer" }}
          >
            &lt;
          </button>
          
          <span style={{ margin: "0 10px" }}>
            Página {currentPage} de {totalPages}
          </span>
          
          <button 
            onClick={() => goToPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
            style={{ padding: "5px 10px", margin: "0 5px", cursor: currentPage === totalPages ? "default" : "pointer" }}
          >
            &gt;
          </button>
          
          <button 
            onClick={() => goToPage(totalPages)} 
            disabled={currentPage === totalPages}
            style={{ padding: "5px 10px", margin: "0 5px", cursor: currentPage === totalPages ? "default" : "pointer" }}
          >
            &raquo;
          </button>
          
          <div style={{ marginLeft: "15px" }}>
            <span>Total: {filteredUsers.length} usuários</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentUsers;