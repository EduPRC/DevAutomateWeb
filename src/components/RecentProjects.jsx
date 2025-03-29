import React, { useState, useEffect } from "react";
import { getData, saveData, addItem, updateItem, deleteItem, getAllUserData } from "../services/crudService";
import { useAuth } from "../AuthContext";
import { getUsers } from "../services/mockBackend";

const RecentProjects = ({ adminView = false }) => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [allUserProjects, setAllUserProjects] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [usersList, setUsersList] = useState([]);
  
  // Get the current user from context
  const { currentUser, isAuthenticated } = useAuth();
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Load user's projects when component mounts or user changes
  useEffect(() => {
    if (adminView) {
      // Load all users for admin view
      setUsersList(getUsers());
      
      // Load all user projects for admin view
      const allProjects = getAllUserData("projects");
      const formattedProjects = [];
      
      // Convert the object to an array of projects with user info
      Object.keys(allProjects).forEach(userId => {
        const user = getUsers().find(u => u.id.toString() === userId);
        if (user) {
          allProjects[userId].forEach(project => {
            formattedProjects.push({
              ...project,
              userName: user.name,
              userId: user.id
            });
          });
        }
      });
      
      setAllUserProjects(formattedProjects);
    } else if (currentUser && isAuthenticated) {
      // For regular user view, load only their projects
      const userProjectsKey = "projects";
      const storedProjects = getData(userProjectsKey, [], currentUser.id);
      setProjects(storedProjects);
    } else {
      setProjects([]);
    }
  }, [currentUser, isAuthenticated, adminView]);

  // Função para verificar se um texto contém uma aproximação
  const matchesApproximately = (text, query) => {
    if (!query) return true;
    if (!text) return false;

    // Converte para minúsculas para fazer busca case-insensitive
    const normalizedText = text.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    // Verifica se o texto contém a consulta
    return normalizedText.includes(normalizedQuery);
  };

  // Filtra projetos baseado no texto de busca
  const getFilteredProjects = () => {
    if (adminView) {
      if (!searchText.trim()) {
        return allUserProjects;
      }
      
      return allUserProjects.filter(project => 
        matchesApproximately(project.userName, searchText) || 
        matchesApproximately(project.title, searchText) ||
        matchesApproximately(project.description, searchText)
      );
    } else {
      // Filtro para projetos do usuário
      if (!searchText.trim()) {
        return projects;
      }
      
      return projects.filter(project => 
        matchesApproximately(project.title, searchText) ||
        matchesApproximately(project.description, searchText)
      );
    }
  };

  // Calculate total pages based on filtered projects
  const filteredProjects = getFilteredProjects();
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  // Get projects for current page
  const getCurrentPageProjects = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProjects.slice(startIndex, endIndex);
  };

  // Navigate to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Navigate to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const handleAddProject = () => {
    if (!isAuthenticated || !currentUser) {
      alert("Você precisa estar logado para adicionar projetos.");
      return;
    }
    if (newProject.title.trim() === "") {
      alert("O título do projeto não pode estar vazio!");
      return;
    }

    if (newProject.description.trim() === "") {
      alert("A descrição do projeto não pode estar vazio!");
      return;
    }

    // Create a user-specific key for storing projects
    const userProjectsKey = "projects";

    if (editingId !== null) {
      // Update existing project
      updateItem(userProjectsKey, editingId, newProject, currentUser.id);
      setEditingId(null);
    } else {
      // Add new project
      addItem(userProjectsKey, newProject, currentUser.id);
    }

    // Reload the list after changes
    setProjects(getData(userProjectsKey, [], currentUser.id));
    setNewProject({ title: "", description: "" });
  };

  const handleEditProject = (id) => {
    const projectToEdit = projects.find(project => project.id === id);
    if (projectToEdit) {
      setNewProject({ title: projectToEdit.title, description: projectToEdit.description });
      setEditingId(id);
    }
  };

  const handleDeleteProject = (id) => {
    if (!isAuthenticated || !currentUser) return;
    
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      // Create a user-specific key for storing projects
      const userProjectsKey = "projects";
      
      deleteItem(userProjectsKey, id, currentUser.id);
      
      // Reload projects
      const updatedProjects = getData(userProjectsKey, [], currentUser.id);
      setProjects(updatedProjects);
      
      // Adjust current page if needed
      if (currentPage > 1 && getCurrentPageProjects().length === 0) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // Manipula mudanças no campo de busca
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Projects for current page
  const currentProjects = getCurrentPageProjects();

  if (adminView) {
    return (
      <div className="recent-projects admin-view">
        <h2>Projetos de Todos os Usuários</h2>
        
        {/* Filtro de texto para admin */}
        <div className="search-filter">
          <label htmlFor="searchFilter">Buscar usuários ou projetos: </label>
          <input 
            type="text" 
            id="searchFilter" 
            value={searchText} 
            onChange={handleSearchChange}
            placeholder="Digite para filtrar usuários ou projetos..."
          />
        </div>
        
        {/* Projects list for admin view */}
        <div className="projects-list">
          {currentProjects.length === 0 ? (
            <p>Nenhum projeto encontrado.</p>
          ) : (
            currentProjects.map(project => (
              <div key={project.id} className="project-item">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-meta">
                  <span className="user-tag">Usuário: {project.userName}</span>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Pagination controls */}
        {filteredProjects.length > 0 && (
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
  }

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="recent-projects">
        <h2>Projetos Recentes</h2>
        <p>Faça login para visualizar seus projetos.</p>
      </div>
    );
  }

  return (
    <div className="recent-projects">
      <h2>Projetos Recentes de {currentUser.name}</h2>
      
      {/* Form to add/edit project */}
      <div className="project-form">
        <input 
          type="text" 
          placeholder="Título do projeto" 
          value={newProject.title}
          onChange={(e) => setNewProject({...newProject, title: e.target.value})}
        />
        <textarea 
          placeholder="Descrição do projeto" 
          value={newProject.description}
          onChange={(e) => setNewProject({...newProject, description: e.target.value})}
        />
        <button onClick={handleAddProject}>
          {editingId !== null ? "Atualizar Projeto" : "Adicionar Projeto"}
        </button>
        {editingId !== null && (
          <button onClick={() => {
            setEditingId(null);
            setNewProject({ title: "", description: "" });
          }}>
            Cancelar
          </button>
        )}
      </div>
      
      {/* Filtro de texto para usuário regular */}
      <div className="search-filter">
        <label htmlFor="userSearchFilter">Buscar projetos: </label>
        <input 
          type="text" 
          id="userSearchFilter" 
          value={searchText} 
          onChange={handleSearchChange}
          placeholder="Digite para filtrar seus projetos..."
        />
      </div>
      
      {/* Projects list */}
      <div className="projects-list">
        {currentProjects.length === 0 ? (
          searchText ? (
            <p>Nenhum projeto encontrado para sua busca. Tente outros termos.</p>
          ) : (
            <p>Nenhum projeto encontrado. Adicione seu primeiro projeto!</p>
          )
        ) : (
          currentProjects.map(project => (
            <div key={project.id} className="project-item">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-actions">
                <button onClick={() => handleEditProject(project.id)}>Editar</button>
                <button onClick={() => handleDeleteProject(project.id)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Pagination controls */}
      {filteredProjects.length > 0 && (
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

export default RecentProjects;