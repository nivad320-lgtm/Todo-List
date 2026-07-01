class AssembleTodo {
    static todoArray = [];
    static addNewTodoObject(obj) {
        this.todoArray.push(obj);
        return this.todoArray;
    }
}

export default AssembleTodo;