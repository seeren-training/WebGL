import { BufferAttribute, CircleBufferGeometry, CircleGeometry, Color, DoubleSide, LineSegments, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, WireframeGeometry } from 'three';

import { AnimateEvent } from '../../shared/events/animate.event';
import { Scene } from './scene';

export class Obejct2DColorScene extends Scene {

    #gradient = {
        start: [1, 1, 1],
        end: [0, 0, 0],
    };

    /**
     * @param {PerspectiveCamera} camera 
     * @param {AnimateEvent} animate 
     */
    constructor(camera, animate) {
        super(animate);
        const circle = new Mesh(
            new CircleGeometry(1, 32),
            new MeshBasicMaterial({ side: DoubleSide, color: 0xFF00FF })
        );
        const plane = new Mesh(
            new PlaneGeometry(1, 1),
            new MeshBasicMaterial({ side: DoubleSide, vertexColors: true })
        );
        const line = new LineSegments(
            new WireframeGeometry(new CircleBufferGeometry(1, 32)),
            new MeshBasicMaterial({ side: DoubleSide, vertexColors: true })
        );
        this.animate.attach(() => {
            circle.rotation.x += .1;
            plane.rotation.x += .1;
            line.rotation.x += .1;
        });
        this.add(circle, plane, line);
        circle.position.y = -3;
        plane.position.y = 0;
        line.position.y = 3;
        camera.position.set(0, 0, 10);
        this.gui && this.#gui(circle, plane, line)
        this.#gradientColor(plane);
        this.#randomColor(line);
    }

    /**
     * @param {Mesh} fatColor 
     * @param {Mesh} gradientColor 
     * @param {Mesh} randomColor 
     */
    #gui(fatColor, gradientColor, randomColor) {
        this.gui.addFolder('Fat Color')
            .addColor({ color: `#${fatColor.material.color.getHexString()}` }, 'color')
            .onChange(value => fatColor.material.color = new Color(value));
        this.gui.addFolder('Random Color')
            .add({ random: () => { } }, 'random')
            .onChange(() => this.#randomColor(randomColor));
        const gradient = this.gui.addFolder('Gradient Color');
        gradient
            .addColor({ start: this.#gradient.start }, 'start')
            .onChange(value => {
                this.#gradient.start = [value[0] / 255, value[1] / 255, value[2] / 255];
                this.#gradientColor(gradientColor);
            });
        gradient
            .addColor({ end: this.#gradient.end }, 'end')
            .onChange(value => {
                this.#gradient.end = [value[0] / 255, value[1] / 255, value[2] / 255];
                this.#gradientColor(gradientColor);
            });
    }

    /**
     * @param {Mesh} mesh 
     */
    #randomColor(mesh) {
        const colors = [];
        for (let index = 0; index < mesh.geometry.attributes.position.length; index += 2) {
            const randomColor = new Color(Math.random(), Math.random(), Math.random());
            colors.push(randomColor.r, randomColor.g, randomColor.b);
        }
        mesh.geometry.attributes.color = new BufferAttribute(new Float32Array(colors), 3, true);
    }

    /**
     * @param {Mesh} mesh 
     */
    #gradientColor(mesh) {
        const colors = [];
        const length = mesh.geometry.attributes.position.length;
        for (var index = 0; index < length; index += 2) {
            index < length / 4
                ? colors.push(...this.#gradient.start)
                : colors.push(...this.#gradient.end)
        }
        mesh.geometry.attributes.color = new BufferAttribute(new Float32Array(colors), 3, true);
    }

}