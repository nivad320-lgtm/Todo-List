import "./styles.css";
import CreateTodo from "./createtodo.js";
import AssembleTodo from "./assembletodo.js";

// Thought: Is there a way to skip this part and put in the instance directly into the method?
const myTodo = new CreateTodo('Workout', 'Arm day', 'Tomorrow', 'Middle')
const myTodo2 = new CreateTodo('Workout', 'Leg day', 'Next Week', 'High')

console.log(AssembleTodo.addNewTodoObject(myTodo));
console.log(AssembleTodo.addNewTodoObject(myTodo2));

console.log(AssembleTodo.removeCompleteTodo(0));
