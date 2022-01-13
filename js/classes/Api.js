import { Config } from "./Config.js";

export class Api {  

    static makeRequest(method, url, data=null) {
        return new Promise(function(resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function() {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({ 
                        status: this.status,
                        statusText: xhr.statusText
                    })
                }
            } 
            xhr.onerror = function() {
                console.log("Url is not available. Please check if you have a correct url in /js/config.js");
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
            xhr.send(data);
        });
    }

    static async read(id=null) {
        const url = Config.get('url') + 'read' + (id === null ? '' : `/${id}`);
        const res = await this.makeRequest('GET', url);
        return JSON.parse(res);
    }

    static async add(name) {
        const url = Config.get('url') + 'add';
        const data = new FormData();
        data.append('name', name);
        const res = await this.makeRequest('POST', url, data);
        return JSON.parse(res);
    }

    static async edit(id, name=null, completed=null) {
        if (!id) { return false; }
        const url = Config.get('url') + 'edit/' + id;
        const data = Object.entries({ 'name': name ?? '', 'completed': completed ? 1 : 0}).map(el => `${el[0]}=${el[1]}`).join("&");
        return await this.makeRequest('PUT', url, data);
    }
    
    static async delete(id) {
        if (!id) { return false; }
        const url = Config.get('url') + 'delete/' + id;
        const res = await this.makeRequest('DELETE', url);
        return res;
    } 
}