
const callbackList = [];
const handler = () => LoopEvent.emit();
let id;

export class LoopEvent {

    static fps = 30;
    static interval;
    static now;
    static from = window.Date.now();

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
        id = window.requestAnimationFrame(handler);
    }

    static disable () {
        window.cancelAnimationFrame(id);
    }

    static emit () {
        LoopEvent.enable();
        LoopEvent.now = window.Date.now();
        LoopEvent.interval = LoopEvent.now - LoopEvent.from;
        const ms = 1000 / LoopEvent.fps;
        if (LoopEvent.interval > 1000 / LoopEvent.fps) {
            callbackList.forEach(callback => callback());
            LoopEvent.from = LoopEvent.now - (LoopEvent.interval % ms);
        }
        
    }

}
