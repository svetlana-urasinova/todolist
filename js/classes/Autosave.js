export class Autosave {
    static get() {
        return localStorage.getItem('newTask');
    }

    static set(value) {
        localStorage.setItem('newTask', value);
    }
    
    static clear() {
        localStorage.removeItem('newTask');
    }
}