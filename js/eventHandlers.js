import { TodoView } from "./todoView.js"; 

const input = document.querySelector('.todo__add-input');
const table = document.querySelector('.todo__list');
const sortButton = document.querySelector('.todo__sort-button');
const view = new TodoView(input, table, sortButton);

// add task
document.querySelector('.todo__add-button').addEventListener('click', () => view.addTask());
document.querySelector('.todo__add-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') { view.addTask(); }
});

// edit or remove task
document.querySelector('.todo__list').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') { 
        view.editTask(event.target);
        event.preventDefault();
    }
});
document.querySelector('.todo__list').addEventListener('focusout', (event) => {
    if (event.target.classList.contains('todo__list-p')) {
        view.editTask(event.target);
    }
});

// complete task
document.querySelector('.todo__list').addEventListener('click', (event) => {
    if (event.target.classList.contains('todo__list-checkbox')) {
        view.completeTask(event.target);
    }
});

// order of tasks
document.querySelector('.todo__sort-button').addEventListener('click', () => {
    view.toggleOrder();
});