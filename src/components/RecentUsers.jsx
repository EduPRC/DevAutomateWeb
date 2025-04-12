import React, { useState, useEffect } from "react";
import { getUsers, updateUser, deleteUser } from "../services/firebaseUserService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/conectionFirebase";

const RecentUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para paginação e filtro
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await getUsers();
      setUsers(allUsers);
      setFilteredUsers(allUsers);
      setError(null);
    } catch (err) {
      console.error("Error loading users:", err);
      setError("Falha ao carregar usuários");
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadUsers();
  }, []);

  const filterUsers = () => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      setCurrentPage(1);
      return;
    }
    
    const filtered = users.filter(user => 
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    filterUsers();
  }, [searchTerm, users]);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username || "",
      email: user.email || ""
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

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    
    try {
      const result = await updateUser(editingUser.id, {
        username: formData.username,
        email: formData.email,
        name: formData.email.split('@')[0]
      });
      
      if (result.success) {
        await loadUsers();
        setEditingUser(null);
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Falha ao atualizar usuário");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        const result = await deleteUser(id);
        if (result.success) {
          await loadUsers();
        }
      } catch (err) {
        console.error("Error deleting user:", err);
        setError("Falha ao excluir usuário");
      }
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

  if (loading) return <div>Carregando usuários...</div>;
  if (error) return <div>Erro: {error}</div>;

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
              <td>{user.name || user.email.split('@')[0]}</td>
              <td>
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.username || "-"
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
              <td>{user.registrationDate || "Data não disponível"}</td>
              <td>
                {editingUser?.id === user.id ? (
                  <>
                    <button className="status delivered" onClick={handleSaveEdit}>
                      Salvar
                    </button>
                    <button className="status return" onClick={handleCancelEdit}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="status delivered"
                      onClick={() => handleEditClick(user)}
                    >
                      Editar
                    </button>
                    <button
                      className="status return"
                      onClick={() => handleDelete(user.id)}
                    >
                      Excluir
                    </button>
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