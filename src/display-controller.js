import CreateTodo from "./createtodo.js";
import AssembleTodo from "./assembletodo.js";

const DisplayController = {
    buildFormRow(type, labelFor, formID, labelName) {
        const formRow = document.createElement('div');
        formRow.setAttribute('class', 'formRow');
        const label = document.createElement('label');
        const input = document.createElement('input');
        label.setAttribute('for', labelFor);
        label.textContent = `${labelName}: `;
        
        input.setAttribute('type', type);
        input.setAttribute('name', formID);
        input.setAttribute('id', formID)
    
    
        formRow.append(
            label,
            input,
        )
        return formRow;
    },

    buildFormRowSelect(selectName, labelFor, formID, values, labelName) {
        const formRow = document.createElement('div');
        formRow.setAttribute('class', 'formRow');

        const label = document.createElement('label');
        label.setAttribute('for', labelFor);
        label.textContent = `${labelName}: `;

        const select = document.createElement('select');
        select.setAttribute('name', selectName);
        select.setAttribute('id', formID);

        for (let value of values) {
            const option = document.createElement('option');
            option.setAttribute('value', value);
            option.textContent = value;
            select.appendChild(option);
        }

        formRow.append(
            label,
            select,
        )
        return formRow
        
    },

    buildButton(type, btnClass, btnId, btnValue, text, nameForm) {
        const btn = document.createElement('input');
        btn.setAttribute('type', type)
        btn.setAttribute('class', btnClass)
        btn.setAttribute('id', btnId)
        btn.setAttribute('value', btnValue)
        btn.textContent = text;

        // Note for future self: Refactor this Later
        btn.addEventListener("click", (event) => {
            event.preventDefault(); // We don't want to submit this fake form

            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const dueDate = document.getElementById('dueDate').value;
            const priority = document.getElementById('priority-select').value;

            const project = new AssembleTodo;
            project.addNewTodoObject(
                new CreateTodo(name, description, dueDate, priority)
            );

            const todoObj = Object.values(project)[0];
            const todoValues = Object.values(Object.values(todoObj)[0]);

            const para = document.createElement('p');
            para.textContent = todoValues;

            document.body.appendChild(para)


            document.getElementById('name').value = "";
            document.getElementById('description').value = "";
            document.getElementById('dueDate').value = "";
            document.getElementById('priority-select').value = "Low";
        });

        return btn
    },

    loadHome(divID) {
        const containerDiv = document.querySelector(divID)
        const newForm = document.createElement('form');
        
        const nameForm = this.buildFormRow('text', 'name', 'name', 'Title');

        containerDiv.append(
            newForm,
            nameForm,
            this.buildFormRow('text', 'description', 'description', 'Description'),
            this.buildFormRow('date', 'dueDate', 'dueDate', 'Due Date'),
            this.buildFormRowSelect('priority', 'priority-select', 'priority-select', ['Low', 'Medium', 'High'], 'Priority'),
            this.buildButton('submit', 'submitButton', 'submitButton', 'submit', nameForm),
        )


    }
}

export default DisplayController