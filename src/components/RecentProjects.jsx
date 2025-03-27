import React, { useState } from "react";

const RecentProjects = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Projeto 1", progress: 50, lastUpdate: "10/10/2023" },
    { id: 2, name: "Projeto 2", progress: 80, lastUpdate: "09/10/2023" }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", progress: "" });
  const [newProject, setNewProject] = useState({ 
    name: "", 
    progress: "", 
    lastUpdate: new Date().toLocaleDateString('pt-BR') 
  });

  // Adicionar novo projeto (modal)
  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProject = () => {
    const project = {
      id: projects.length + 1,
      name: newProject.name,
      progress: parseInt(newProject.progress),
      lastUpdate: new Date().toLocaleDateString('pt-BR')
    };
    setProjects([...projects, project]);
    setShowAddModal(false);
    setNewProject({ name: "", progress: "", lastUpdate: new Date().toLocaleDateString('pt-BR') });
  };

  // Editar projeto (inline)
  const handleEditClick = (id) => {
    setEditingId(id);
    const project = projects.find(p => p.id === id);
    setEditData({
      name: project.name,
      progress: project.progress.toString()
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = (id) => {
    setProjects(projects.map(project => 
      project.id === id ? { 
        ...project, 
        name: editData.name, 
        progress: parseInt(editData.progress),
        lastUpdate: new Date().toLocaleDateString('pt-BR')
      } : project
    ));
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  // Excluir projeto
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  return (
    <div className="recentOrders">
      {/* Modal para adicionar projeto */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Adicionar Novo Projeto</h2>
            
            <div className="form-group">
              <label htmlFor="new-project-name">Nome do Projeto:</label>
              <input
                id="new-project-name"
                type="text"
                name="name"
                value={newProject.name}
                onChange={handleAddInputChange}
                required
                placeholder="Nome do Projeto"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="new-project-progress">Progresso (%):</label>
              <input
                id="new-project-progress"
                type="number"
                name="progress"
                min="0"
                max="100"
                value={newProject.progress}
                onChange={handleAddInputChange}
                required
                placeholder="Progresso (%)"
              />
            </div>
            
            <div className="modal-actions">
              <button className="btn cancel" onClick={() => setShowAddModal(false)}>
                Cancelar
              </button>
              <button className="btn save" onClick={handleAddProject}>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="cardHeader">
        <h2>Meus Projetos</h2>
        <button className="bnt" onClick={handleAddClick}>
          Adicionar Projeto
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome do Projeto</th>
            <th>Progresso</th>
            <th>Última Atualização</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                {editingId === project.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  project.name
                )}
              </td>
              <td>
                {editingId === project.id ? (
                  <input
                    type="number"
                    name="progress"
                    min="0"
                    max="100"
                    value={editData.progress}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${project.progress}%` }}
                      >
                        {project.progress}%
                      </div>
                    </div>
                  </div>
                )}
              </td>
              <td>{project.lastUpdate}</td>
              <td>
                {editingId === project.id ? (
                  <>
                    <span 
                      className="status delivered" 
                      onClick={() => handleSaveEdit(project.id)}
                    >
                      Salvar
                    </span>
                    <span 
                      className="status return" 
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </span>
                  </>
                ) : (
                  <>
                    <span 
                      className="status delivered" 
                      onClick={() => handleEditClick(project.id)}
                    >
                      Editar
                    </span>
                    <span 
                      className="status return" 
                      onClick={() => handleDelete(project.id)}
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

export default RecentProjects;