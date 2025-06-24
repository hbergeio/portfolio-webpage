document.addEventListener("DOMContentLoaded", () => {
  const projects = document.getElementById("projects");
  const projectsMenu = document.getElementById("projects-menu");

    const isAdmin = true;

  projects.addEventListener("contextmenu", (e) => {
    if (isAdmin == true) {
      e.preventDefault();

      projectsMenu.style.top = `${e.pageY}px`;
      projectsMenu.style.left = `${e.pageX}px`;
      projectsMenu.classList.remove("hidden");
    }
  });

  document.addEventListener("click", function () {
    projectsMenu.classList.add("hidden");
  });

  const addNewProject = document.getElementById("addNewProject");
  addNewProject.addEventListener("click", () => {
    if (isAdmin == true) {
    }
  });
});
