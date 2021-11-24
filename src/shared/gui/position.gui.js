import { GUIController } from "dat.gui";
import { Object3D } from "three";

export class PositionGui {

    /**
     * @param {GUIController} controller 
     * @param {Object3D} subject 
     */
    constructor(controller, subject, min = -5, max = 5) {
        controller.add(subject.position, 'x', min, max);
        controller.add(subject.position, 'y', min, max);
        controller.add(subject.position, 'z', min, max);
    }

}