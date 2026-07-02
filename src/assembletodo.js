import RemoveComplete from "./remove-complete.js";

class AssembleTodo {
    todoArray = [];
    addNewTodoObject(obj) {
        this.todoArray.push(obj);
        return this.todoArray;
    }

    removeCompleteTodo(index) {
        RemoveComplete.removeCompleteTodo(index, this.todoArray);
        return this.todoArray;
    }
}

export default AssembleTodo;