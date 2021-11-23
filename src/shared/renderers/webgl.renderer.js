import { WebGLRenderer as ThreeWebGLRenderer } from 'three';

export class WebGLRenderer extends ThreeWebGLRenderer {

    /**
     * @param {HTMLElement} element 
     */
    constructor(element) {
        super({
            alpha: true,
            antialias: true
        })
        this.setClearColor(0x0000FF, 0.2);
        this.resize(element);
        element.appendChild(this.domElement);
    }

    /**
     * @param {HTMLElement} element 
     */
     resize(element) {
        this.setSize(element.offsetWidth, element.offsetHeight);
    }

}
