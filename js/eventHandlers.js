import { View } from "./classes/View.js";
import { Api } from "./classes/Api.js";

const addInput = document.querySelector('.todo-add__input');
const addButton = document.querySelector('.todo-add__button');
const orderButton = document.querySelector('.todo-add__order-button');
const todoListElem = document.querySelector('.todo-list');
const view = new View(todoListElem);

const getOrder = () => orderButton.dataset.order;

const render = () => view.render(getOrder());

// add

const addTask = () => {
    const name = addInput.value;
    if (name.length === 0) return;
    addInput.value = '';
    Promise.resolve(Api.add(name))
        .then(() => render());
}

const addTaskByEnter = event => {
    if (event.key === 'Enter') { addTask(); }
}

addButton.addEventListener('click', addTask);
addInput.addEventListener('keyup', addTaskByEnter);

// edit / remove

const editTask = event => {
    const listItem = event.target.closest('.todo-list__item');
    const id = listItem.dataset.id;
    const name = listItem.querySelector('.todo-list__name').textContent;
    if (name.length > 0) {
        const isCompleted = listItem.querySelector('.todo-list__checkbox').checked;
        Promise.resolve(Api.edit(id, name, isCompleted))
            .then(() => render());
    } else {
        listItem.classList.add('_hidden');
        Promise.resolve(Api.delete(id))
            .then(() => render());
    }
}

const editNameHandler = event => {
    if (event.target.classList.contains('todo-list__name')) {
        editTask(event);  
    }
}

const editNameByEnter = event => {
    if (event.target.classList.contains('todo-list__name')) {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.target.blur();
        }
    }
}

const completeTask = event => {
    if (event.target.classList.contains('todo-list__checkbox')) {
        event.target.closest('.todo-list__item').classList.toggle('_completed');
        editTask(event);
    }
}

todoListElem.addEventListener('focusout', editNameHandler);
todoListElem.addEventListener('keydown', editNameByEnter);
todoListElem.addEventListener('click', completeTask);

// order

const orderHandler = () => {
    if (getOrder() === 'desc') {
        orderButton.dataset.order = 'asc';
        orderButton.innerHTML = '&uarr;'
    } else {
        orderButton.dataset.order = 'desc';
        orderButton.innerHTML = '&darr;'
    }
    render();
}

orderButton.addEventListener('click', orderHandler);