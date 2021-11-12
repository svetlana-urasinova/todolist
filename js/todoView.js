/* eslint-disable import/extensions */
/* eslint-disable no-unused-expressions */
import { TodoList } from "./todoList.js";
import { NewElement } from "./newElement.js";

export class TodoView {

    // tasks render

    constructor(input, table, sortButton) {
        this.list = new TodoList;
        this.input = input;
        this.table = table;
        this.sortButton = sortButton;
        this.order = 'desc';
    }

    clearInput () {
        this.input.value = '';
    }

    toggleOrder () {
        if (this.order === 'desc') {
            this.order = 'asc';
            this.sortButton.innerHTML = '&uarr;';            
        } else {
            this.order = 'desc';
            this.sortButton.innerHTML = '&darr;';
        }
        this.render();
    }

    renderElement = (value, index, isCompleted) => {
        let classes = [];
        let attrs = {};

        // li
        classes = ['todo__list-item' ];
        if (isCompleted) { classes.push('todo__list-item_done'); }
        attrs = { 'data-id':  index };
        const listEl = new NewElement('li', null, classes, attrs).getEl();

        // checkbox
        classes = ['todo__list-checkbox'];
        attrs = {'type': 'checkbox'};
        if (isCompleted) { attrs.checked = 'true'; }
        const listElCheck = new NewElement('input', '', classes, attrs).getEl();

        // p
        const listElP = new NewElement('p', value, ['todo__list-p'], {'contenteditable': 'true' }).getEl();
        
        listEl.append(listElCheck);
        listEl.append(listElP);
        return listEl;
    }

    render() {
        const tasks = this.list.getTasks();
        if (this.order === 'desc') { tasks.reverse(); }
        this.table.innerHTML = '';
        tasks.forEach((el, i) => {
            if (el) {
                this.table.append(this.renderElement(el.value, i, el.isCompleted))
        }});
    }

    addTask() {
        const val = this.input.value;
        if (val.length === 0) { return; }
        const index = this.list.setTask(val);
        const listEl = this.renderElement(val, index);
        this.order === 'desc' ? this.table.prepend(listEl) : this.table.append(listEl);
        this.clearInput();
    }

    editTask(task) {
        const value = task.innerHTML;
        const index = task.parentNode.getAttribute('data-id');
        if (value.length === 0) {
            this.list.delete(index);
            task.parentNode.remove();
        } else {
            this.list.setTask(value, index);
        }
    }

    completeTask(taskCheckbox) {
        const value = taskCheckbox.checked;
        const taskParent = taskCheckbox.parentNode;
        const index = taskParent.getAttribute('data-id');
        this.list.complete(value, index);
        value ? taskParent.classList.add('todo__list-item_done') : taskParent.classList.remove('todo__list-item_done');
    }
}