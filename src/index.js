import "./styles.css";
import CreateTodo from "./createtodo.js";
import AssembleTodo from "./assembletodo.js";
import CalculateDate from "./calculate-date.js";

// Thought: Is there a way to skip this part and put in the instance directly into the method?
const myTodo = new CreateTodo('Workout', 'Arm day', CalculateDate.setDueDate(1), 'Middle')
const myTodo2 = new CreateTodo('Workout', 'Leg day', 'Next Week', 'High')

const project1 = new AssembleTodo;

console.log(project1);

project1.addNewTodoObject(myTodo);

console.log(project1);

//It console logs the latest version of Project Array.

// [v] How can you create different projects?
// [v] How can you set date and time? --> date-fns