export class Config {
    
    static #props = {
        url: '', // use your API here
    }

    static get(key) {
        return this.#props[key];
    } 
}