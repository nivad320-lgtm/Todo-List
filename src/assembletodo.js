import RemoveComplete from "./remove-complete.js";

class AssembleTodo {
    static todoArray = [];
    static addNewTodoObject(obj) {
        this.todoArray.push(obj);
        return this.todoArray;
    }

    static removeCompleteTodo(index) {
        RemoveComplete.removeCompleteTodo(index, this.todoArray);
        return this.todoArray;
    }
}

export default AssembleTodo;