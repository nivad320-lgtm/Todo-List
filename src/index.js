import "./styles.css";
import CreateTodo from "./createtodo.js";
import AssembleTodo from "./assembletodo.js";
import CalculateDate from "./calculate-date.js";
import SetPriority from "./set-priority.js";
import ChangePriority from "./change-priority.js";
import DisplayController from "./display-controller.js";

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

