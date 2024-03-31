class BaseObject{
    vertex = [];
    faces = [];

    SHADER_PROGRAM = null;
    _position = null;

    _MMatrix = null;
    _PMatrix = null;
    _VMatrix = null;

    TRIANGLE_VERTEX = null;
    TRIANGLE_FACES = null;

    MODEL_MATRIX = LIBS.get_I4();

    constructor(vertex, faces, shader_vertex_source, shader_fragment_source) {
        this.vertex = vertex;
        this.faces = faces;

        var compile_shader = function(source, type, typeString) {
            var shader = GL.createShader(type);
            GL.shaderSource(shader, source);
            GL.compileShader(shader);
            if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
                alert("ERROR IN " + typeString + " SHADER: " + GL.getShaderInfoLog(shader));
                return false;
            }
            return shader;
        };

        var shader_vertex = compile_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
        var shader_fragment = compile_shader(shader_fragment_source, GL.FRAGMENT_SHADER, "FRAGMENT");

        this.SHADER_PROGRAM = GL.createProgram();
        GL.attachShader(this.SHADER_PROGRAM, shader_vertex);
        GL.attachShader(this.SHADER_PROGRAM, shader_fragment);
        GL.linkProgram(this.SHADER_PROGRAM);

        this._position = GL.getAttribLocation(this.SHADER_PROGRAM, "position");
        GL.enableVertexAttribArray(this._position);

        //Uniform
        this._PMatrix = GL.getUniformLocation(this.SHADER_PROGRAM, "PMatrix");
        this._VMatrix = GL.getUniformLocation(this.SHADER_PROGRAM, "VMatrix");
        this._MMatrix = GL.getUniformLocation(this.SHADER_PROGRAM, "MMatrix");

        this.TRIANGLE_VERTEX = GL.createBuffer();
        this.TRIANGLE_FACES = GL.createBuffer();
    }

    setup(){
        GL.bindBuffer(GL.ARRAY_BUFFER, this.TRIANGLE_VERTEX);
        GL.bufferData(GL.ARRAY_BUFFER,
            new Float32Array(this.vertex),
            GL.STATIC_DRAW);

        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.TRIANGLE_FACES);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(this.faces),
            GL.STATIC_DRAW);
    }

    render_setup(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.useProgram(this.SHADER_PROGRAM);
        GL.bindBuffer(GL.ARRAY_BUFFER, this.TRIANGLE_VERTEX);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.TRIANGLE_FACES);

        GL.uniformMatrix4fv(this._PMatrix, false, PROJECTION_MATRIX);
        GL.uniformMatrix4fv(this._VMatrix, false, VIEW_MATRIX);
        GL.uniformMatrix4fv(this._MMatrix, false, this.MODEL_MATRIX);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        this.render_setup(VIEW_MATRIX, PROJECTION_MATRIX);

        GL.drawElements(GL.TRIANGLES, this.faces.length, GL.UNSIGNED_SHORT, 0);

        GL.flush();
    }

    renderMesh(VIEW_MATRIX, PROJECTION_MATRIX) {
        this.render_setup(VIEW_MATRIX, PROJECTION_MATRIX);

        GL.drawElements(GL.LINE_LOOP, this.faces.length, GL.UNSIGNED_SHORT, 0);

        GL.flush();
    }

    renderPoint(VIEW_MATRIX, PROJECTION_MATRIX) {
        this.render_setup(VIEW_MATRIX, PROJECTION_MATRIX);

        GL.drawArrays(GL.POINTS, 0, this.vertex.length/6);

        GL.flush();
    }
}

class TexturedObject extends BaseObject{
    _uv = null;
    _sampler = null;

    constructor(vertex, faces, shader_vertex_source, shader_fragment_source) {
        super(vertex, faces, shader_vertex_source, shader_fragment_source);

        this._sampler = GL.getUniformLocation(this.SHADER_PROGRAM, "sampler");
        this._uv = GL.getAttribLocation(this.SHADER_PROGRAM, "uv");

        GL.enableVertexAttribArray(this._uv);
        GL.useProgram(this.SHADER_PROGRAM);
        GL.uniform1i(this._sampler, 0);
    }

    render_setup(VIEW_MATRIX, PROJECTION_MATRIX){
        super.render_setup(VIEW_MATRIX, PROJECTION_MATRIX);
        GL.vertexAttribPointer(this._position, 3, GL.FLOAT, false, 4*(3+2), 0);
        GL.vertexAttribPointer(this._uv, 2, GL.FLOAT, false, 4*(3+2), 3*4);
    }
}

class ColoredObject extends BaseObject{
    r = null;
    g = null;
    b = null;
    gs = null;
    _color = null;
    _greyScality = null;

    constructor(vertex, faces, shader_vertex_source, shader_fragment_source, red, green, blue, grayScale) {
        super(vertex, faces, shader_vertex_source, shader_fragment_source);
        this._color = GL.getUniformLocation(this.SHADER_PROGRAM, "vColor");
        this._greyScality = GL.getUniformLocation(this.SHADER_PROGRAM, "greyScality");

        this.r = red;
        this.g = green;
        this.b = blue;
        this.gs = grayScale;
    }

    render_setup(VIEW_MATRIX, PROJECTION_MATRIX){
        super.render_setup(VIEW_MATRIX, PROJECTION_MATRIX);
        GL.vertexAttribPointer(this._position, 3, GL.FLOAT, false, 4*3, 0);
        GL.uniform1f(this._greyScality, this.gs);
        GL.uniform3f(this._color, this.r, this.g, this.b);
    }
}

class VertexColoredObject extends BaseObject{
    _color = null;

    constructor(vertex, faces, shader_vertex_source, shader_fragment_source) {
        super(vertex, faces, shader_vertex_source, shader_fragment_source);

        this._color = GL.getAttribLocation(this.SHADER_PROGRAM, "color");
        GL.enableVertexAttribArray(this._color);
    }

    render_setup(VIEW_MATRIX, PROJECTION_MATRIX){
        super.render_setup(VIEW_MATRIX, PROJECTION_MATRIX);
        GL.vertexAttribPointer(this._position, 3, GL.FLOAT, false, 4*(3+3), 0);
        GL.vertexAttribPointer(this._color, 3, GL.FLOAT, false, 4*(3+3), 3 * 4);
    }
}