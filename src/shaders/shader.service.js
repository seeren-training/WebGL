export class SharderService {


    static useShader(context, vertex, fragment) {
        const vertexShader = context.createShader(context.VERTEX_SHADER);
        const fragmentShader = context.createShader(context.FRAGMENT_SHADER);
        context.shaderSource(vertexShader, vertex);
        context.shaderSource(fragmentShader, fragment);
        context.compileShader(vertexShader);
        context.compileShader(fragmentShader);
        if (!context.getShaderParameter(vertexShader, context.COMPILE_STATUS)) {
            context.deleteShader(vertexShader);
            throw new Error(`Erreur de compilation du vertex shader`);
        }
        if (!context.getShaderParameter(fragmentShader, context.COMPILE_STATUS)) {
            context.deleteShader(fragmentShader);
            throw new Error(`Erreur de compilation du fragment shader`);
        }
        const program = context.createProgram();
        context.attachShader(program, vertexShader);
        context.attachShader(program, fragmentShader);
        context.linkProgram(program);
        context.useProgram(program);
        return program;
    }

}