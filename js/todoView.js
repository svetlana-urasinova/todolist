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
        this.render();
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

    formatDate = date => {
        const d = new Date(date); 
        return '' + d.getDay() + ' ' + d.toLocaleString('default', {month: 'short'}) +   ' ' + d.getFullYear();
    }

    renderElement = (value, index, isCompleted, date) => {
        let classes = [];
        let attrs = {};

        // li
        classes = ['todo__list-item' ];
        if (isCompleted) { classes.push('todo__list-item_done'); }
        attrs = { 'data-id':  index };
        const listEl = new NewElement('li', null, classes, attrs).getEl();

        // date
        classes = ['todo__list-date'];
        const listDate = new NewElement('p', this.formatDate(date), classes).getEl();

        // checkbox
        classes = ['todo__list-checkbox'];
        attrs = {'type': 'checkbox', tabindex: '-1'};
        if (isCompleted) { attrs.checked = 'true'; }
        const listElCheck = new NewElement('input', '', classes, attrs).getEl();

        // p
        const listElP = new NewElement('p', value, ['todo__list-p'], {'contenteditable': 'true' }).getEl();

        listEl.append(listElCheck);
        listEl.append(listElP);
        //listEl.append(listDate);
        return listEl;
    }

    async render() {
        const tasks = await this.list.getTasks();
        if (this.order === 'desc') { tasks.reverse(); }
        this.table.innerHTML = '';
        tasks.forEach((el, i) => {
            if (el) { this.table.append(this.renderElement(el.name, el.id, +el.completed, el.created)) }});
    }

    async addTask() {
        const val = this.input.value;
        const render = this.render.bind(this);
        if (val.length === 0) { return; }
        Promise.resolve(this.list.setTask(val)).then(function() { render(); });
        this.clearInput();
    }

    editTask(task) {
        const render = this.render.bind(this);
        const name = task.innerHTML;
        if (task.parentNode) {
            const id = task.parentNode.getAttribute('data-id');
            if (name.length === 0) {
                try { task.parentNode.remove(); }
                catch(err) { return err; }
                Promise.resolve(this.list.delete(id)).then(function() { render(); });
            } else {
                //Promise.resolve(this.list.setTask(name, id)).then(function() { render(); });
                Promise.resolve(this.list.setTask(name, id));
            }
        }
    }

    completeTask(taskCheckbox) {
        const value = taskCheckbox.checked;
        const taskParent = taskCheckbox.parentNode;
        const id = taskParent.getAttribute('data-id');
        Promise.resolve(this.list.complete(value, id)).then(function() {
            value ? taskParent.classList.add('todo__list-item_done') : taskParent.classList.remove('todo__list-item_done');
        });
    }
}