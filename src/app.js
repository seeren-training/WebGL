import { LoopEvent } from "./events/loop.event";
import { ResizeEvent } from "./events/resize.event";
import { NativeRenderer } from "./native-renderer";
import { NativeScene } from "./native-scene";
import { ThreeCamera } from "./three-camera";
import { ThreeRenderer } from "./three-renderer";
import { ThreeScene } from "./three.scene";

window.onload = () => {
    // const nativeRenderer = new NativeRenderer(document.querySelector("#foo"));
    // const nativeScene = new NativeScene(nativeRenderer.context);
    // nativeRenderer.render(nativeScene);
    // ResizeEvent.add(() => nativeRenderer.render(nativeScene));

    const threeRenderer = new ThreeRenderer(document.querySelector("#bar"));
    const threeCamera = new ThreeCamera(threeRenderer.domElement.parentNode);
    const threeScene = new ThreeScene(threeCamera, threeRenderer.domElement) ;
    ResizeEvent.add(() => threeRenderer.render(threeScene, threeCamera));
    LoopEvent.add(() => threeRenderer.render(threeScene, threeCamera));
    LoopEvent.emit();
}

