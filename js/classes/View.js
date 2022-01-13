import { Api } from "./Api.js";

export class View {

    #container;
    
    constructor(container) {
        this.#container = container;
        this.render();
    }

    render(order='desc') {
        Promise.resolve(Api.read())
                    .then(tasks => {
                        if (order === 'desc') { tasks.reverse(); }
                        this.#container.innerHTML = '';
                        tasks.forEach(task => this.renderTask(task));                           
                    })
                    .catch(err => console.log(err));
    }

    renderTask = task => {
        const { id, name, completed, created } = task;
        // const date = this.formatDate(created);

        const listItem = document.createElement('li');
        listItem.classList.add('todo-list__item');
        if (completed === '1') { listItem.classList.add('_completed'); }
        listItem.dataset.id = id;
        listItem.append(this.renderCheckBox(id, completed));
        listItem.append(this.renderName(id, name));        
        this.#container.append(listItem);
    }

    renderName (id, name) {
        /* task title elem */
        const itemName = document.createElement('p');
        itemName.classList.add('todo-list__name');
        itemName.contentEditable = true;
        itemName.textContent = name; 
        return itemName;
    }

    renderCheckBox (id, completed) {
        /* create a container for checkbox and its label */
        const checkBoxContainer = document.createElement('div');
        checkBoxContainer.classList.add('standard-checkbox-container');

        /* create a hidden checkbox */
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.tabIndex = -1;
        checkBox.classList.add('standard-checkbox', 'todo-list__checkbox');
        checkBox.id = `todo-list__completed_${id}`;
        checkBox.checked = completed === '1';

        /* create a label to style the checkbox */
        const checkBoxLabel = document.createElement('label');
        checkBoxLabel.classList.add('standard-checkbox-label');
        checkBoxLabel.htmlFor = `todo-list__completed_${id}`;
        
        checkBoxContainer.append(checkBox);
        checkBoxContainer.append(checkBoxLabel);
        return checkBoxContainer;
    }

    createTask(name) {
        //const id = await this.#api.add(name);
        Promise.resolve(Api.add(name))
            .then(id => {
                this.render();
            })
            .catch(err => console.log(err));
    }

    toggleOrder() {
        this.order = this.order === 'desc' ? 'asc' : 'desc';
        this.render();
    }
}