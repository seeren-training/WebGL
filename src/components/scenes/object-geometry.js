import { BufferAttribute, BufferGeometry, Color, DoubleSide, LineSegments, Mesh, MeshBasicMaterial, PerspectiveCamera } from 'three';

import { AnimateEvent } from '../../shared/events/animate.event';
import { Scene } from './scene';

export class ObejctGeometryScene extends Scene {

    /**
     * @param {PerspectiveCamera} camera 
     * @param {AnimateEvent} animate 
     */
    constructor(camera, animate) {
        super(animate);
        camera.position.set(0, 0, 50);
        this.gui && this.#gui();
    }

    #gui() {
        this.gui.addFolder('Triangles')
            .add({ 'generate': () => { } }, 'generate')
            .onChange(() => {
                this.clear();
                this.#random('mesh');
            });
        this.gui.addFolder('Lines')
            .add({ 'generate': () => { } }, 'generate')
            .onChange(() => {
                this.clear();
                this.#random('line');
            });
    }

    /**
     * @param {String} type 
     */
    #random(type) {
        const positions = [];
        const colors = [];
        for (let i = -50; i < 50; i++) {
            const randomColor = new Color(Math.random(), Math.random(), Math.random());
            const x = Math.random() * 10 + i / 2;
            const y = Math.random() * 10 + i / 2;
            const z = Math.random() * 10 + i / 2;
            positions.push(x, y, z);
            colors.push(randomColor.r, randomColor.g, randomColor.b);
        }
        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
        geometry.setAttribute('color', new BufferAttribute(new Float32Array(colors), 3));
        const args = [
            geometry,
            new MeshBasicMaterial({ side: DoubleSide, vertexColors: true })
        ];
        const plane = 'mesh' === type
            ? new Mesh(...args)
            : new LineSegments(...args);
        this.add(plane);
    }

}