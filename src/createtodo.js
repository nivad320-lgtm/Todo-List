class CreateTodo {
    constructor(name, description, dueDate, priority) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.uid = crypto.randomUUID();
    }
}
export default CreateTodo;