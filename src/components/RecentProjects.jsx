import React from "react";

const RecentProjects = () => {
  return (
    <div className="recentOrders">
      <div className="cardHeader">
        <h2>Meus Projetos</h2>
        <a href="#" className="btn">
          Adicionar Projeto
        </a>
      </div>

      <table>
        <thead>
          <tr>
            <td>Nome do Projeto</td>
            <td>Progresso</td>
            <td>Última Atualização</td>
            <td>Ações</td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Projeto 1</td>
            <td>50%</td>
            <td>10/10/2023</td>
            <td>
              <span className="status delivered">Editar</span>
              <span className="status return">Excluir</span>
            </td>
          </tr>
          <tr>
            <td>Projeto 2</td>
            <td>80%</td>
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

export default RecentProjects;