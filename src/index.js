import "./styles.css";
import CreateTodo from "./createtodo.js";
import AssembleTodo from "./assembletodo.js";
import CalculateDate from "./calculate-date.js";
import SetPriority from "./set-priority.js";
import ChangePriority from "./change-priority.js";
import DisplayController from "./display-controller.js";
// Thought: Is there a way to skip this part and put in the instance directly into the method?
const myTodo = new CreateTodo('Workout', 'Arm day', CalculateDate.setDueDate(1), SetPriority.returnPriority(0))
const myTodo2 = new CreateTodo('Workout', 'Leg day', 'Next Week', 'High')

const project1 = new AssembleTodo;


project1.addNewTodoObject(myTodo);
project1.addNewTodoObject(myTodo2);

console.log(project1);
ChangePriority.newPriority(project1, 1, 0)
console.log(project1);

project1.removeCompleteTodo(0);
ChangePriority.newPriority(project1, 0, 1)

console.log(project1);

DisplayController.loadHome('#content')


//It console logs the latest version of Project Array.
/* 
Todo
- [] Select Date and calculate the distance from today to that date

---
- [v] How can you create different projects?
- [v] How can you set date and time? --> date-fns

--- Thoughts
- Is this a good idea to turn todoArray from private properties to public?
*/

