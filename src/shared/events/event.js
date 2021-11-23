export class Event {

    #listeners = [];

    notify = () => {
        this.#listeners.forEach((listener) => listener());
    };

    attach(listener) {
        this.#listeners.push(listener);
    }

    detach(listener) {
        const index = this.#listeners.indexOf(listener);
        if (-1 !== index) {
            callable.splice(index, 1);
        }
    }

}
