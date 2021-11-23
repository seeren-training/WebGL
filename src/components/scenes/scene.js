import { Scene as ThreeScene } from 'three';

import { AnimateEvent } from '../../shared/events/animate.event';

export class Scene extends ThreeScene {

    /**
     * @type {AnimateEvent}
     */
    #animate;

    /**
     * @param {AnimateEvent} animate 
     */
    constructor(animate) {
        super();
        this.#animate = animate;
    }

    get animate() {
        return this.#animate;
    }

}
