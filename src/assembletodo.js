import RemoveComplete from "./remove-complete.js";

class AssembleTodo {
    todoArray = [];
    completedArray = [];
    addNewTodoObject(obj) {
        this.todoArray.push(obj);
        return this.todoArray;
    }

    removeCompleteTodo(index) {
        this.completedArray.push(RemoveComplete.removeCompleteTodo(index, this.todoArray)[0]);
        return this.todoArray;
    }

    removeComplete(index) {
        RemoveComplete.removeCompleteTodo(index, this.completedArray);
        return this.completedArray;
    }
}

export default AssembleTodo;