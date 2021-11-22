import { Api } from "./api.js";

export class TodoList {

    // tasks repository
    
    // tasks = [{ id: int, name: string, completed: boolean, created: string, modified: string }]
    #tasks = [];
    #api;

    constructor() {
        this.#api = new Api;
        this.loadTasks();
    }

    async loadTasks() {
        this.#tasks = await this.getTasks();
        console.log(this.#tasks);
    }

    getTask(id) {
        return this.#tasks.find(el => el.id === id);
    }

    async getTasks() {
        return await this.#api.read();
    }

    async setTask (name, id=null, completed=null) {
        if (id) {
            const task = this.getTask(id);
            if (task) { 
                task.name = name;
                task.completed = completed ? 1 : 0;
                return await this.#api.edit(task.id, task.name, task.completed);
            }
        } else {
            return await this.#api.add(name);
        } 
    }

    async delete(id) {
        return await this.#api.delete(id);
    }

    async complete(completed = true, id) {
        const task = this.getTask(id);
        return await this.setTask(task.name, id, completed);
    }
}