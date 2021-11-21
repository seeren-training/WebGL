import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';
import { SharderService } from './shaders/shader.service';
import { GUI } from 'dat.gui';
import { mat4 } from 'gl-matrix';

export class NativeScene {

    #vertices = [];

    #a_position;

    #u_matrix;

    #position = { x: 0, y: 0 };

    constructor (context) {
        const program = SharderService.useShader(context, vertex, fragment);
        this.#a_position = context.getAttribLocation(program, 'a_position');
        this.#u_matrix = context.getUniformLocation(program, "u_matrix");
        const a_pointSize = context.getAttribLocation(program,'a_pointSize');
        context.vertexAttrib1f(a_pointSize, 30.0);
        context.canvas.onclick = (e) => this.addPoint(e, context);
        const gui = new GUI();
        const position = gui.addFolder("Position");
        position.add(this.#position, "x", -1, 1).onChange(() => this.draw(context));
        position.add(this.#position, "y", -1, 1).onChange(() => this.draw(context));
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    addPoint(e, context) {
        const {target} = e;
        const {left, top, height, width} = target.getBoundingClientRect();
        this.#vertices.push(
            ((e.clientX -left) / (target.clientWidth / 2)) - 1,
            ((((e.clientY -top) / (target.clientHeight / 2)) - 1) * -1)
        );
        this.draw(context);
    }

    /**
     * 
     * @param {WebGLRenderingContext} context 
     */
    draw (context) {
        context.clear(
            context.COLOR_BUFFER_BIT
          | context.DEPTH_BUFFER_BIT
          | context.STENCIL_BUFFER_BIT
        );
        console.log(this.#vertices);
        const buffer = context.createBuffer();
        const matrix = mat4.create();
        mat4.translate(
            matrix,
            matrix,
            [this.#position.x, this.#position.y, 0]
        );
        context.uniformMatrix4fv(this.#u_matrix, false, matrix);
        context.bindBuffer(context.ARRAY_BUFFER, buffer);
        context.bufferData(context.ARRAY_BUFFER, new Float32Array(this.#vertices), context.STATIC_DRAW);
        context.enableVertexAttribArray(this.#a_position);
        context.vertexAttribPointer(this.#a_position, 2, context.FLOAT, false, 0, 0);
        context.drawArrays(context.LINE_LOOP, 0, this.#vertices.length / 2);
    }

}