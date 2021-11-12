export class TodoList {

    // tasks repository
    
    // tasks = [{ value: string, isCompleted: boolean }]
    #tasks = [];
    
    getTask(index) {
        return this.#tasks[index];
    }

    getTasks() {
        return [...this.#tasks];
    }

    setTask (value, index=null) {
        if (index) {
            if (this.#tasks[index]) { 
                const { isCompleted } = this.#tasks[index];
                this.#tasks[index] = {value, isCompleted };
                return true;
            }
        }    
        this.#tasks.push({ value: '' + value, isCompleted: false });
        return this.#tasks.length - 1;
    }

    delete(index) {
        if (this.#tasks[index]) {
            delete this.#tasks[index];
        }
    }

    complete(isCompleted = true, index) {
        const { value } = this.#tasks[index];
        this.#tasks[index] = { value, isCompleted };
    }
}