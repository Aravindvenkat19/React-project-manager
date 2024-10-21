import Button from "./Button";

export default function ProjectsSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectProjectId,
}) {
  return (
    <aside className="w-1/3 py-8 px-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h1 className="mb-8 font-bold uppercase text-stone-200 md:text-xl">
        Your projects
      </h1>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {

          let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1  hover:text-stone-200 hover:bg-stone-800"

          if(project.id === selectProjectId){
             cssClasses += ' bg-stone-800 text-stone-200'
          }else{
            cssClasses += ' text-stone-400'
          }

          return(
          <li key={project.id}>
            <button
              onClick={()=> onSelectProject(project.id)}
              className={cssClasses}
            >
              {project.title}
            </button>
          </li>
          );
        })}
      </ul>
    </aside>
  );
}
