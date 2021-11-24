import { GUI } from 'dat.gui';

import { Scene as ThreeScene } from 'three';

import { AnimateEvent } from '../../shared/events/animate.event';

export class Scene extends ThreeScene {

    /**
     * @type {AnimateEvent}
     */
    #animate;

    /**
     * @type {GUI}
     */
    #gui;

    /**
     * @param {AnimateEvent} animate 
     */
    constructor(animate) {
        super();
        this.#animate = animate;
        if ('dev' === process.env) {
            this.#gui = new GUI();
        }
    }

    get animate() {
        return this.#animate;
    }

    get gui() {
        return this.#gui;
    }

}
