import { CircleGeometry, DoubleSide, LineSegments, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, RingGeometry, WireframeGeometry } from 'three';
import { AnimateEvent } from '../../shared/events/animate.event';
import { Scene } from './scene';

export class Obejct2DScene extends Scene {

    /**
     * @param {PerspectiveCamera} camera 
     * @param {AnimateEvent} animate 
     */
    constructor(camera, animate) {
        super(animate);
        const circle = new Mesh(
            new CircleGeometry(1, 32),
            new MeshBasicMaterial({ side: DoubleSide })
        );
        const plane = new Mesh(
            new PlaneGeometry(1, 1),
            new MeshBasicMaterial({ side: DoubleSide })
        );
        const ring = new Mesh(
            new RingGeometry(1, .5, 6),
            new MeshBasicMaterial({ side: DoubleSide })
        );
        const line = new LineSegments(
            new WireframeGeometry(new CircleGeometry(1, 32)),
        );
        this.animate.attach(() => {
            circle.rotation.x += .1;
            plane.rotation.x += .1;
            ring.rotation.x += .1;
            line.rotation.x += .1;
        });
        circle.position.y = -3;
        plane.position.y = -1;
        ring.position.y = 1;
        line.position.y = 3;
        camera.position.set(0, 0, 20);
        this.add(circle, plane, ring, line);
    }

}