import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';

export class PerspectiveCamera extends ThreePerspectiveCamera {

    /**
     * @param {HTMLElement} element 
     */
    constructor(element) {
        super(
            45,
            element.offsetWidth / element.offsetHeight,
            1,
            1000
        );
    }

    /**
     * @param {HTMLElement} element 
     */
     resize(element) {
        this.aspect = element.offsetWidth / element.offsetHeight;
        this.updateProjectionMatrix();
    }

}
