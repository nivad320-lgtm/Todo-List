import RemoveComplete from "./remove-complete.js";

class AssembleTodo {
    todoArray = [];
    completedArray = [];
    addNewTodoObject(obj) {
        this.todoArray.push(obj);
        return this.todoArray;
    }

    removeCompleteTodo(index) {
        this.completedArray.push(RemoveComplete.removeCompleteTodo(index, this.todoArray));
        return this.todoArray;
    }
}

export default AssembleTodo;