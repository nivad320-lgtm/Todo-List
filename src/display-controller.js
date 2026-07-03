import CreateTodo from "./createtodo.js";
import AssembleTodo from "./assembletodo.js";
import RemoveComplete from "./remove-complete.js";

const DisplayController = {
    
    buildFormRow(type, labelFor, formID, labelName, mandatory) {
        const formRow = document.createElement('div');
        formRow.setAttribute('class', 'formRow');
        const label = document.createElement('label');
        const input = document.createElement('input');
        label.setAttribute('for', labelFor);
        label.textContent = `${labelName}: `;
        
        input.setAttribute('type', type);
        input.setAttribute('name', formID);
        input.setAttribute('id', formID);

        if (mandatory) {
            input.setAttribute('required', "")
        }
    
    
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

    buildButton(type, btnClass, btnId, btnValue, text, nameForm, parentForm, project) {
        const btn = document.createElement('input');
        btn.setAttribute('type', type)
        btn.setAttribute('class', btnClass)
        btn.setAttribute('id', btnId)
        btn.setAttribute('value', btnValue)
        btn.textContent = text;

        // Note for future self: Refactor this Later
        parentForm.addEventListener("submit", (event) => {
            event.preventDefault(); // We don't want to submit this fake form

            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const dueDate = document.getElementById('dueDate').value;
            const priority = document.getElementById('priority-select').value;

            project.addNewTodoObject(
                new CreateTodo(name, description, dueDate, priority)
            );

            this.addTodo(project);
            
            this.resetForm({ name: '', description: '', dueDate: '', 'priority-select': '-' })
        });
        
        return btn
    },
    
    addTodo(project) {
        const todoObj = Object.values(project)[0];
        const lastTodoObj = project['todoArray'][project['todoArray'].length-1];
        const { uid, ...todoWithoutUid} = lastTodoObj;

        // last element of array it is an object
        const todoDescription = Object.values(lastTodoObj);

        // NOTE: Refactor, also there must be better way to join the array together
        const todoValuesPara = Object.values(todoWithoutUid).filter((value) => value && value !== '-').join(' --- ');
    
        const para = document.createElement('p');


        para.setAttribute('id', uid);
        para.textContent = todoValuesPara;
    
        document.body.appendChild(para);

        // Delete(Complete) Button
        const btn = document.createElement('button');
        btn.textContent = 'Complete'
        para.appendChild(btn);

        btn.addEventListener("click", (event) => {
            console.log('Completed. Before...')
            console.table(project);
            const child = document.getElementById(uid);
            document.body.removeChild(child);
            project.removeCompleteTodo(project['todoArray'].map(e => e.uid).indexOf(uid));
            console.log('Completed. After...')
            console.table(project);
        })
        
    },

    resetForm(idObj) {
        for (const key in idObj) {
            document.getElementById(key).value = idObj[key];
        }
    },

    loadHome(divID) {
        // New Project
        const project = new AssembleTodo;

        const containerDiv = document.querySelector(divID)
        const newForm = document.createElement('form');
        
        const nameForm = this.buildFormRow('text', 'name', 'name', 'Title',true);

        newForm.append(
            nameForm,
            this.buildFormRow('text', 'description', 'description', 'Description'),
            this.buildFormRow('date', 'dueDate', 'dueDate', 'Due Date'),
            this.buildFormRowSelect('priority', 'priority-select', 'priority-select', ['-','Low', 'Medium', 'High'], 'Priority'),
            this.buildButton('submit', 'submitButton', 'submitButton', 'submit', "", nameForm, newForm, project),
        )

        containerDiv.appendChild(newForm);

    }
}

export default DisplayController