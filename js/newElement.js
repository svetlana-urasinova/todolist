export class NewElement {

    // create and store new DOM element with value, classes and attributes

    el = null;

    constructor (type, value, classes, attrs) {
        this.el = document.createElement(type);
        if (!this.el) { return; }
        if (classes) { this.addClasses(classes); }
        if (attrs) { this.addAttrs(attrs); }
        if (value !== null) { this.addValue(value); }
    };

    getEl() {
        return this.el;
    }

    addClasses (classes) {
        classes.forEach(classname => this.el.classList.add(classname));
    };

    addAttrs (attrs) {
        Object.keys(attrs).forEach(attr => this.el.setAttribute(attr, attrs[attr]));
    };

    addValue (value) {
        this.el.append(value);
    };
}