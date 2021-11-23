import { Event } from './event';

export class AnimateEvent extends Event {

    /**
     * @type {Number}
     */
    #id;

    /**
     * @type {Number}
     */
    #ms;

    /**
     * @type {Number}
     */
    #now;

    /**
     * @type {Number}
     */
    #from;

    animate = () => {
        this.#id = window.requestAnimationFrame(this.animate);
        this.#now = Date.now();
        const interval = this.#now - this.#from;
        if (interval > this.#ms) {
            this.notify();
            this.#from = this.#now - (interval % this.#ms);
        }
    };

    /**
     * @param {Number} fps 
     */
    constructor(fps = 30) {
        super();
        this.fps = fps;
        this.#from = Date.now();
        this.enable();
    }

    /**
     * @param {Number} fps 
     */
    set fps(fps) {
        this.#ms = 1000 / fps;
    }

    enable() {
        this.animate();
    }

    disable() {
        window.cancelAnimationFrame(this.#id);
    }

}
