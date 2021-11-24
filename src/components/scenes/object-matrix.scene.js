import { DoubleSide, Mesh, MeshBasicMaterial, Object3D, PerspectiveCamera, PlaneGeometry } from 'three';

import { AnimateEvent } from '../../shared/events/animate.event';
import { Scene } from './scene';

export class ObejctMatrixScene extends Scene {

    /**
     * @param {PerspectiveCamera} camera 
     * @param {AnimateEvent} animate 
     */
    constructor(camera, animate) {
        super(animate);
        const pivot = new Object3D();
        const plane = new Mesh(
            new PlaneGeometry(2, 2),
            new MeshBasicMaterial({ side: DoubleSide })
        );
        pivot.position.set(1, 1, 0);
        plane.position.set(-1, -1, 0);
        camera.position.set(0, 0, 10);
        pivot.add(plane);
        this.add(pivot);
        this.gui && (this.#gui(plane, 'Plane') || this.#gui(pivot, 'Pivot'));
    }

    /**
     * @param {Object3D} object3D 
     * @param {String} name 
     */
    #gui (object3D, name) {
        const subject = this.gui.addFolder(name);
        const rotation = subject.addFolder('rotation');
        rotation.add(object3D.rotation, 'x', 0, Math.PI * 2);
        rotation.add(object3D.rotation, 'y', 0, Math.PI * 2);
        rotation.add(object3D.rotation, 'z', 0, Math.PI * 2);
        const position = subject.addFolder('position');
        position.add(object3D.position, 'x', -4, 4);
        position.add(object3D.position, 'y', -4, 4);
        position.add(object3D.position, 'z', -4, 4);
    }

}