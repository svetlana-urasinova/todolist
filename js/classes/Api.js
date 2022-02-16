import { Config } from "./Config.js";

export class Api {  
    static makeRequest (method, data={}, cb = data => data) {
       const url = Config.get('url'); 
       const params = { method };
       if (Object.keys(data).length > 0) {
            params.headers = {
                'Content-Type': 'application/json'
            };
            params.body = JSON.stringify(data);
       }

       return fetch(url, params)
                .then(response => response.json())
               .then(data => cb(data));
    }

    static read(id=null) {
        const data = id ? { id } : {};
        return this.makeRequest('GET', data);
    }

    static add(name) {
        const data = { name };
        return this.makeRequest('POST', data, res => {
            if (/[^\d]/i.test(res)) {
                console.error(res);
            }
        });
    }

    static edit(id, name=null, completed=null) {
        if (!id) { return false; }
        const data = { 
            id, 
            'name': name ?? '',
            'completed': completed ? 1 : 0
        }
        return this.makeRequest('PUT', data, res => {
            if (typeof data === 'string') {
                console.error(data);
            }
        });
    }
    
    static delete(id) {
        if (!id) { return false; }
        const data = { id };
        return this.makeRequest('DELETE', data, res => {
            if (res) {
                console.error(res);
            }
        });
    } 
}