import { GUIController } from 'dat.gui';
import { AmbientLight, BoxGeometry, Color, DoubleSide, Light, Mesh, MeshBasicMaterial, MeshLambertMaterial, PerspectiveCamera, PlaneGeometry, PointLight, PointLightHelper, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { AnimateEvent } from '../../shared/events/animate.event';
import { Scene } from './scene';

export class ControlScene extends Scene {

    /**
     * @param {PerspectiveCamera} camera 
     * @param {AnimateEvent} animate 
     */
    constructor(camera, animate, domElement) {
        super(animate);
        new OrbitControls(camera, domElement)
        const cube = new Mesh(new BoxGeometry(1, 1, 1), new MeshLambertMaterial({ color: 0xFF0000 }));
        const plane = new Mesh(new PlaneGeometry(20, 20), new MeshLambertMaterial());
        plane.rotation.x = -Math.PI / 2;
        cube.position.y = 1.5;
        camera.position.set(0, 2, 5);
        camera.lookAt(cube.position);
        this.add(cube, plane);
    }

}