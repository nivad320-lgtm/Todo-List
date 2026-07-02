const DisplayController = {
    buildFormRow(labelFor, type, formID, labelName) {
        const formRow = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');
        label.setAttribute('for', labelFor);
        label.textContent = labelName;
        
        input.setAttribute('type', type);
        input.setAttribute('name', formID);
        input.setAttribute('id', formID)
    
    
        formRow.append(
            label,
            input,
        )
        return formRow;
    },

    loadHome(divID) {
        const containerDiv = document.querySelector(divID)
        const newForm = document.createElement('form');


        containerDiv.append(
            newForm,
            this.buildFormRow('name', 'text', 'name', 'Title')
        )


    }
}

export default DisplayController