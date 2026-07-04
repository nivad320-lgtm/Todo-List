import AssembleTodo from "./assembletodo.js";

class BuildNewProjectArray {
    projectArray = [];

    buildNewProject() {
        const project = new AssembleTodo;
        this.projectArray.push(project);
    }
}

export default BuildNewProjectArray