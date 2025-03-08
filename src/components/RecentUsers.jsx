import React from "react";

const RecentUsers = () => {
  return (
    <div className="recentOrders">
      <div className="cardHeader">
        <h2>Usuários Recentes</h2>
        <a href="#" className="btn">
          Ver Todos
        </a>
      </div>

      <table>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Email</td>
            <td>Data de Registro</td>
            <td>Ações</td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>João Silva</td>
            <td>joao@example.com</td>
            <td>10/10/2023</td>
            <td>
              <span className="status delivered">Editar</span>
              <span className="status return">Excluir</span>
            </td>
          </tr>
          <tr>
            <td>Maria Souza</td>
            <td>maria@example.com</td>
            <td>09/10/2023</td>
            <td>
              <span className="status delivered">Editar</span>
              <span className="status return">Excluir</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecentUsers;