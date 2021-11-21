
const callbackList = [];
const handler = () => ResizeEvent.emit();

export class ResizeEvent {

    static add(callback) {
        callbackList.push(callback);
    }

    static remove (callback) {
        const index = callbackList.indexOf(callback);
        if (-1 !== index) {
            callbackList.splice(index, 1);
        }
    }

    static enable () {
        window.addEventListener("resize", handler);
    }

    static disable () {
        window.removeEventListener("resize", handler);
    }

    static emit () {
        callbackList.forEach(callback => callback());
    }

}
