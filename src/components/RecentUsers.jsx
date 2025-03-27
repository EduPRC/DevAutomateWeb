import React, { useState, useEffect } from "react";
import { getUsers, editUser, deleteUser } from "./mockBackend";

const RecentUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: ""
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const allUsers = getUsers();
    setUsers(allUsers);
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
        loadUsers();
        setEditingUser(null);
      }
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      deleteUser(id);
      loadUsers();
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="recentOrders">
      <div className="cardHeader">
        <h2>Usuários Recentes</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome de Usuário</th>
            <th>Email</th>
            <th>Data de Registro</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
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
    </div>
  );
};

export default RecentUsers;