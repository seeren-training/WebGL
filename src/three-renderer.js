import { WebGLRenderer, PCFShadowMap } from "three";
import { ResizeEvent } from "./events/resize.event";

export class ThreeRenderer extends WebGLRenderer{

    constructor(parent) {
        super({
            antialias: true,
            // alpha: true
        });
        this.shadowMap.enabled = true;
        this.shadowMap.type = PCFShadowMap;
        this.setClearColor(0x0000ff, 1.0);
        this.resize(parent);
        parent.appendChild(this.domElement);
        ResizeEvent.add(() => this.resize(parent));
    }

    resize (parent) {
        this.setSize(parent.offsetWidth, parent.offsetHeight);
    }

}
