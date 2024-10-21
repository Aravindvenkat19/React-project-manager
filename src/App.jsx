import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelecetd";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectID: undefined, //No Project selected or New one
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskID = Math.random();
      const newTask = {
        text: text,
        projectID: prevState.selectedProjectID,
        id: taskID,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: null, // New one Added
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: undefined, // Undefined to cancel and fallback
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectID = Math.random();
      const newproject = {
        ...projectData,
        id: projectID,
      };

      return {
        ...prevState,
        selectedProjectID: undefined,
        projects: [...prevState.projects, newproject],
      };
    });
  }

  function handleDeleteproject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: undefined, // Deleting
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectID
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectID
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteproject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks = {projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectID === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectID === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectProjectId={projectsState.selectedProjectID}
      />
      {content}
    </main>
  );
}

export default App;