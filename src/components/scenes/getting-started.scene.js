import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera } from 'three';

import { AnimateEvent } from '../../shared/events/animate.event';
import { Scene } from './scene';

export class GettingStartedScene extends Scene {

    /**
     * @param {PerspectiveCamera} camera 
     * @param {AnimateEvent} animate 
     */
    constructor(camera, animate) {
        super(animate);
        const cube = this.add(new Mesh(
            new BoxGeometry(2, 2, 2),
            new MeshBasicMaterial()
        ));
        this.animate.attach(() => {
            cube.rotation.x += .01;
            cube.rotation.y += .01;
        })
        this.gui && this.#gui(animate);
        camera.position.set(0, 2, 5);
        camera.lookAt(cube.position);
    }

    /**
     * @param {AnimateEvent} animate 
     */
    #gui(animate) {
        this.gui
            .add({ animate: true }, 'animate')
            .onChange((value) => !value ? animate.disable() : animate.enable());
        this.gui
            .add({ fps: 30 }, 'fps', 0, 60)
            .onChange((value) => animate.fps = value)
    }

}