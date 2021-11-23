import { Scene } from 'three';

import { PerspectiveCamera } from '../shared/cameras/persepective.camera';
import { AnimateEvent } from '../shared/events/animate.event';
import { ResizeEvent } from '../shared/events/resize.event';
import { WebGLRenderer } from '../shared/renderers/webgl.renderer';
import { GettingStartedScene } from './scenes/getting-started.scene';

export class WebGLComponent {

    /**
     * @type {HTMLElement}
     */
    #element = document.querySelector('#webgl');

    /**
     * @type {WebGLRenderer}
     */
    #renderer;

    /**
     * @type {Scene}
     */
    #scene;

    /**
     * @type {PerspectiveCamera}
     */
    #camera;

    /**
     * @type {ResizeEvent}
     */
    #resize = new ResizeEvent();

    /**
     * @type {AnimateEvent}
     */
    #animate = new AnimateEvent();

    render = () => this.#renderer.render(this.#scene, this.#camera);

    resize = () => {
        this.#camera.resize(this.#element)
        this.#renderer.resize(this.#element);
    };

    constructor() {
        this.#renderer = new WebGLRenderer(this.#element);
        this.#camera = new PerspectiveCamera(this.#element);
        this.#scene = new GettingStartedScene(this.#camera, this.#animate);
        this.#animate.attach(this.render);
        this.#resize.attach(this.resize);
    }

}
