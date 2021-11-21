import { PerspectiveCamera } from "three";
import { ResizeEvent } from "./events/resize.event";

export class ThreeCamera extends PerspectiveCamera {

    constructor (parent) {
        super(45, parent.offsetWidth / parent.offsetHeight, 1, 1000);
        ResizeEvent.add(() => this.resize(parent));
    }

    resize (parent) {
        this.aspect = parent.offsetWidth / parent.offsetHeight;
        this.updateProjectionMatrix();
    }

}
