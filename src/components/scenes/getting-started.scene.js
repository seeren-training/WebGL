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
        camera.position.set(0, 2, 5);
        camera.lookAt(cube.position);
        this.animate.attach(() => {
            cube.rotation.x += .01;
            cube.rotation.y += .01;
        })
    }

}