import CreateTodo from "./createtodo.js";
import AssembleTodo from "./assembletodo.js";
import RemoveComplete from "./remove-complete.js";
import BuildNewProjectArray from "./build-new-project.js";
import SetPriority from "./set-priority.js";

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
            this.saveToLocalStorage();
        });
        
        return btn
    },
    
    addTodo(project) {

        if (document.querySelector('.todoText')) {
            this.todoDiv.textContent = '';
        }

        for (const arr of project['todoArray']) {
            const para = document.createElement('p');
            const { uid, ...todoWithoutUid} = arr;
            para.textContent = Object.values(todoWithoutUid).filter((value) => value && value !== '-').join(' --- ');
            para.setAttribute('id', uid);
            para.setAttribute('class', 'todoText')
            this.todoDiv.appendChild(para);

            // Delete(Complete) Button
            const btn = document.createElement('button');
            btn.textContent = 'Complete'
            para.appendChild(btn);

            // Give EventListener to Btn
            this.deleteButtonEventListener(btn, project, 'todoArray', uid, this.todoDiv);

            const changeBtn = document.createElement('button');
            changeBtn.textContent = 'Switch';
            para.appendChild(changeBtn);
            this.changePriority(changeBtn, project, uid);
            this.updatePriorityColor(project);
        }
        
    },
    
    deleteButtonEventListener(btn, project, array, uid, parentDiv) {
        btn.addEventListener("click", (event) => {
            const child = document.getElementById(uid);
            parentDiv.removeChild(child);

            
            if (array === 'todoArray') {
                
                project.removeCompleteTodo(project[array].map(e => e.uid).indexOf(uid), project[array]);
                this.showCompleted(project);
            }

            if (array === 'completedArray') {
                project.removeComplete(project[array].map(e => e.uid).indexOf(uid), project[array]);
                this.showCompleted(project);

            }
            this.saveToLocalStorage();
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
            const { uid, ...todoWithoutUid} = arr;
            para.textContent = Object.values(todoWithoutUid).filter((value) => value && value !== '-').join(' --- ');
            para.setAttribute('id', uid);
            completedContainerDiv.appendChild(para); 

            const btn = document.createElement('button');
            btn.textContent = 'Delete'
            para.appendChild(btn);
            this.deleteButtonEventListener(btn, project, 'completedArray', uid, completedContainerDiv);
        }        
        
        // Do I have to do it again? or is there wa way to use other function's variable? 

        containerDiv.appendChild(completedContainerDiv);
    },

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
    
    updatePriorityColor(projectArray){
        for (const arr of projectArray['todoArray']) {
            const uid = arr.uid;
            const para = document.getElementById(uid)
            if (arr.priority === '-') {
                para.classList.add('noPriority');
                
            } else if (arr.priority === 'Low') {
                para.classList.add('lowPriority');
            } else if (arr.priority === 'Medium') {
                para.classList.add('mediumPriority');
            } else if (arr.priority === 'High') {
                para.classList.add('highPriority');
            }
        }
    },

    changePriority(btn, project, thisUid) {
        btn.addEventListener("click", (e) => {
            const result = project['todoArray'].find(({ uid }) => uid === thisUid);
            const para = document.getElementById(thisUid);

            if (para.classList.contains('noPriority')) {
                para.classList.remove('noPriority')
            } else if (para.classList.contains('lowPriority')) {
                para.classList.remove('lowPriority')
            } else if (para.classList.contains('mediumPriority')) {
                para.classList.remove('mediumPriority')
            } else if (para.classList.contains('highPriority')) {
                para.classList.remove('highPriority')
            }

            if (result.priority === '-') {
                result.priority = 'Low';
            } else if(result.priority === 'Low') {
                result.priority = 'Medium';
            }else if(result.priority === 'Medium') {
                result.priority = 'High';
            }else if(result.priority === 'High') {
                result.priority = '-'; 
            }

            this.addTodo(project);
            
            this.saveToLocalStorage();    
        })
    },

    loadHome(divID) {
        // New ProjectArray
        this.myProjectArray = new BuildNewProjectArray;
        
        if(!localStorage.getItem("myProjectArray")) {
            this.addButtonProperty();
            this.saveToLocalStorage();
            // localStorage.setItem("saved", 'yes');
            
        } else {
            // console.log(localStorage.getItem('saved'));
            const savedData = JSON.parse(localStorage.getItem("myProjectArray"));
            
            this.numberOfProjects = savedData.projectArray.length;

            for(let i = 0; i < this.numberOfProjects; i++) {
                this.myProjectArray.buildNewProject();
                this.myProjectArray.projectArray[i].todoArray = savedData.projectArray[i].todoArray || []; 
                this.myProjectArray.projectArray[i].completedArray = savedData.projectArray[i].completedArray || []; 
            }

            // this.myProjectArray.projectArray = savedData.projectArray || [];
            
            this.addButtonProperty();
            console.log(this.numberOfProjects);
            for (let i = 0; i < this.numberOfProjects; i++) {
                const addBtn = document.querySelector('#addBtn');
                
                const projectBtn = document.createElement('button');
                const currentNumber = i+1;
                projectBtn.textContent = currentNumber;
                projectBtn.addEventListener ('click', (e) => {
                    const project = this.myProjectArray.projectArray[currentNumber-1];
                    this.switchHome(project);
                })
                document.body.insertBefore(projectBtn, addBtn)
                
            }
        }
        this.numberOfProjects = this.myProjectArray.projectArray.length;
        
        let project = this.myProjectArray.projectArray[0];
       
        this.containerDiv = document.querySelector(divID)
        this.todoDiv = document.createElement('div');

        this.switchHome(project);
        this.addClearLocalStorageButton();
    },

    displayProjectNumber(project){
        const para = document.createElement('p');
        const currentIndex = this.myProjectArray.projectArray.indexOf(project)+1;
        para.setAttribute('class', 'projectNumber');       
        para.textContent = `Project: ${currentIndex}`
        return para;
    },

    switchHome(projectIndex){
        this.containerDiv.textContent = "";
        this.todoDiv.textContent = "";
        const newForm = document.createElement('form');
        this.buildNewForm(newForm, projectIndex);
        this.containerDiv.appendChild(this.displayProjectNumber(projectIndex));
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

    saveToLocalStorage() {
        localStorage.setItem("myProjectArray", JSON.stringify(this.myProjectArray));
        console.log(`Saved to LocalStorage`);
        console.log(`Current Save: ${localStorage.getItem("myProjectArray")}`)
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
            
            this.saveToLocalStorage();
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

            this.saveToLocalStorage();
            // console.log((JSON.stringify(this.myProjectArray)));
            // console.table(`Parsed = ${JSON.stringify(JSON.parse(JSON.stringify(this.myProjectArray)))}`);

        })
    }
}

export default DisplayController