import CreateTodo from "./createtodo.js";
import AssembleTodo from "./assembletodo.js";
import RemoveComplete from "./remove-complete.js";
import BuildNewProjectArray from "./build-new-project.js";

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

    buildButton(type, btnClass, btnId, btnValue, text, parentForm, project) {
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
    
        this.todoDiv.appendChild(para);
        // document.body.appendChild(para);

        // Delete(Complete) Button
        const btn = document.createElement('button');
        btn.textContent = 'Complete'
        para.appendChild(btn);

        // Give EventListener to Btn
        this.deleteButtonEventListener(btn, project, uid);
        
    },
    
    deleteButtonEventListener(btn, project, uid) {
        btn.addEventListener("click", (event) => {
            console.log('Completed. Before...')
            console.table(project);
            const child = document.getElementById(uid);
            this.todoDiv.removeChild(child);
            project.removeCompleteTodo(project['todoArray'].map(e => e.uid).indexOf(uid));
            console.log('Completed. After...')
            console.table(project);

            this.showCompleted(project);
        })
        
    },

    showCompleted(project) {
        // IT IS HARDCODED <--- Not good!
        const containerDiv = this.containerDiv;

        //Update
        if(document.querySelector('#complete')) {
            document.querySelector('#complete').remove();
        }

        const completedContainerDiv = document.createElement('div');
        completedContainerDiv.setAttribute('id', 'complete')

        const para = document.createElement('p');
        para.textContent = "Completed Todo"
        completedContainerDiv.appendChild(para);

        for (const arr of project['completedArray']) {
            const para = document.createElement('p');
            // TODO: I am using this part again. Copied and pasted -- refactor later 
            const { uid, ...todoWithoutUid} = arr[0];
            para.textContent = Object.values(todoWithoutUid).filter((value) => value && value !== '-').join(' --- ');

            completedContainerDiv.appendChild(para); 
        }        
        
        // Do I have to do it again? or is there wa way to use other function's variable? 

        containerDiv.appendChild(completedContainerDiv);
    },

    // updateCompleted(completedContainerDiv) {
    //     completedContainerDiv.replaceChildren();
    // },

    resetForm(idObj) {
        for (const key in idObj) {
            document.getElementById(key).value = idObj[key];
        }
    },

    buildNewForm(newForm, project) {
        newForm.append(
            this.buildFormRow('text', 'name', 'name', 'Title', true),
            this.buildFormRow('text', 'description', 'description', 'Description'),
            this.buildFormRow('date', 'dueDate', 'dueDate', 'Due Date'),
            this.buildFormRowSelect('priority', 'priority-select', 'priority-select', ['-','Low', 'Medium', 'High'], 'Priority'),
            this.buildButton('submit', 'submitButton', 'submitButton', 'submit', "", newForm, project),
        )
    },

    createNewProject(){
        this.myProjectArray.buildNewProject();
        this.numberOfProjects = this.myProjectArray.projectArray.length;
        console.log(`Number of Projects = ${this.numberOfProjects}`);
    },

    addClearLocalStorageButton(){
        const btn = document.createElement('button');
        document.body.appendChild(btn);
        btn.textContent = 'Clear Local Storage'
        btn.addEventListener("click", (e) => {
            localStorage.clear();
            console.log('Local Storage Cleared');
        })
    },

    loadHome(divID) {
        // New ProjectArray
        this.myProjectArray = new BuildNewProjectArray;
        this.numberOfProjects = this.myProjectArray.projectArray.length;
        this.addButtonProperty();
        let project = this.myProjectArray.projectArray[0];
        
        // if(!localStorage.getItem("myProjectArray")) {
        //     localStorage.setItem("myProjectArray", JSON.stringify(this.myProjectArray));
        // } else {
        //     const savedData = JSON.parse(localStorage.getItem("myProjectArray"));
        //     this.myProjectArray.projectArray = savedData.projectArray || [];
        // }
       
        this.containerDiv = document.querySelector(divID)
        this.todoDiv = document.createElement('div');

        this.switchHome(project);
        this.addClearLocalStorageButton();
    },

    switchHome(projectIndex){
        this.containerDiv.textContent = "";
        this.todoDiv.textContent = "";
        const newForm = document.createElement('form');
        this.buildNewForm(newForm, projectIndex);
        this.containerDiv.appendChild(newForm);
        this.containerDiv.appendChild(this.todoDiv);
        
        // If there is a value in TodoArray
        if(Object.values(projectIndex)[0][0]) {

            this.addTodo(projectIndex);
        }
        // If there is a value in CompletedArray
        if(Object.values(projectIndex)[1][0]) {

            this.showCompleted(projectIndex);
        }
        
    },

    addButtonProperty() {
        const addBtn = document.querySelector('#addBtn');
        if (!this.numberOfProjects) {
            this.createNewProject();
            const projectBtn = document.createElement('button');
            const currentNumber = this.numberOfProjects;
            projectBtn.textContent = currentNumber;
            projectBtn.addEventListener ('click', (e) => {
                const project = this.myProjectArray.projectArray[currentNumber-1];
                this.switchHome(project);
            })
            document.body.insertBefore(projectBtn, addBtn)
        }
        addBtn.addEventListener('click', (e) => {
            this.createNewProject();
            const projectBtn = document.createElement('button');
            const currentNumber = this.numberOfProjects;
            projectBtn.textContent = currentNumber;
            projectBtn.addEventListener ('click', (e) => {
                const project = this.myProjectArray.projectArray[currentNumber-1];
                this.switchHome(project);
            })
            document.body.insertBefore(projectBtn, addBtn)
        })
    }
}

export default DisplayController