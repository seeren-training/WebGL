import { BoxGeometry, CircleGeometry, DodecahedronGeometry, DoubleSide, LineSegments, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, RingGeometry, TorusGeometry, TorusKnotGeometry, TubeGeometry, WireframeGeometry } from 'three';
import { AnimateEvent } from '../../shared/events/animate.event';
import { Scene } from './scene';

export class Object3DScene extends Scene {

    /**
     * @param {PerspectiveCamera} camera 
     * @param {AnimateEvent} animate 
     */
    constructor(camera, animate) {
        super(animate);
        const box = new Mesh(
            new BoxGeometry(1, 1, 1),
            [
                new MeshBasicMaterial({color: 0xFF0000}),
                new MeshBasicMaterial({color: 0x0FF000}),
                new MeshBasicMaterial({color: 0x00FF00}),
                new MeshBasicMaterial({color: 0x000FF0}),
                new MeshBasicMaterial({color: 0xFFFFFF}),
                new MeshBasicMaterial({color: 0x000000}),
            ]
        );
        const dode = new Mesh(
            new DodecahedronGeometry(.5, 0),
            new MeshBasicMaterial({ side: DoubleSide })
        );
        const torus = new Mesh(
            new TorusGeometry(.5, .25, 16),
            new MeshBasicMaterial({ side: DoubleSide })
        );
        const knot = new Mesh(
            new TorusKnotGeometry(.5, .1, 100),
            new MeshBasicMaterial({ side: DoubleSide })
        );
        this.animate.attach(() => {
            box.rotation.x += .1;
            dode.rotation.x += .1;
            torus.rotation.x += .1;
            knot.rotation.x += .1;
        });
        box.position.y = -3;
        dode.position.y = -1;
        torus.position.y = 1;
        knot.position.y = 3;
        camera.position.set(0, 0, 10);
        this.add(box, dode, torus, knot);
    }

}