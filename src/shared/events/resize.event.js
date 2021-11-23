import { Event } from './event';

export class ResizeEvent extends Event {

    constructor() {
        super();
        this.enable();
    }

    enable() {
        window.addEventListener('resize', this.notify);
    }

    disable() {
        window.removeEventListener('resize', this.notify);
    }

}
