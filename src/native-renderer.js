import { ResizeEvent } from "./events/resize.event";

export class NativeRenderer {

    #context;

    get context () {
        return this.#context;
    }

    constructor(parent) {
        const canvas = parent.appendChild(window.document.createElement('canvas'));
        this.#context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        this.resize(parent);
        this.#context.clearColor(0.0, 0.0, 0.0, 1.0);
        this.#context.clearDepth(1.0);
        this.#context.clearStencil(1);
        ResizeEvent.add(() => this.resize(parent));
    }

    resize (parent) {
        this.#context.canvas.height = parent.offsetHeight;
        this.#context.canvas.width = parent.offsetWidth;
        this.#context.enable(WebGLRenderingContext.SCISSOR_TEST);
        this.#context.enable(WebGLRenderingContext.STENCIL_TEST);
        ["viewport", "scissor"].forEach(property => this.#context[property](
            0,
            0,
            this.#context.drawingBufferWidth,
            this.#context.drawingBufferHeight
        ));
    }

    render(scene) {
        scene.draw(this.#context);
    }

}