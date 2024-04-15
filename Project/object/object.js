export {VertexColoredObject, TexturedObject, ColoredObject};

class BaseObject{
    vertex = [];
    faces = [];

    _MMatrix = null;
    _PMatrix = null;
    _VMatrix = null;
    _position = null;

    TRIANGLE_VERTEX = null;
    TRIANGLE_FACES = null;

    MODEL_MATRIX = LIBS.get_I4();

    childs = [];

    constructor(vertex, faces, shader_program) {
        this.vertex = vertex;
        this.faces = faces;

        //Uniform
        this._PMatrix = GL.getUniformLocation(shader_program, "PMatrix");
        this._VMatrix = GL.getUniformLocation(shader_program, "VMatrix");
        this._MMatrix = GL.getUniformLocation(shader_program, "MMatrix");
        this._position = GL.getAttribLocation(shader_program, "position");

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

        this.childs.forEach(child => {
            child.setup();
        });
    }

    render_setup(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindBuffer(GL.ARRAY_BUFFER, this.TRIANGLE_VERTEX);
        GL.bindBuffer(GL.ARRAY_BUFFER, this.TRIANGLE_VERTEX);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.TRIANGLE_FACES);

        GL.uniformMatrix4fv(this._PMatrix, false, PROJECTION_MATRIX);
        GL.uniformMatrix4fv(this._VMatrix, false, VIEW_MATRIX);
        GL.uniformMatrix4fv(this._MMatrix, false, this.MODEL_MATRIX);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        this.render_setup(VIEW_MATRIX, PROJECTION_MATRIX);

        GL.drawElements(GL.TRIANGLES, this.faces.length, GL.UNSIGNED_SHORT, 0);

        this.childs.forEach(child => {
            child.MODEL_MATRIX = this.MODEL_MATRIX;
            child.render(VIEW_MATRIX, PROJECTION_MATRIX);
        });
    }

    renderMesh(VIEW_MATRIX, PROJECTION_MATRIX) {
        this.render_setup(VIEW_MATRIX, PROJECTION_MATRIX);

        GL.drawElements(GL.LINE_LOOP, this.faces.length, GL.UNSIGNED_SHORT, 0);

        this.childs.forEach(child => {
            child.MODEL_MATRIX = this.MODEL_MATRIX;
            child.renderMesh(VIEW_MATRIX, PROJECTION_MATRIX);
        });
    }

    renderPoint(VIEW_MATRIX, PROJECTION_MATRIX) {
        this.render_setup(VIEW_MATRIX, PROJECTION_MATRIX);

        GL.drawArrays(GL.POINTS, 0, this.vertex.length/5);

        this.childs.forEach(child => {
            child.MODEL_MATRIX = this.MODEL_MATRIX;
            child.renderPoint(VIEW_MATRIX, PROJECTION_MATRIX);
        });
    }
}

class TexturedObject extends BaseObject{
    _uv = null;
    _sampler = null;

    constructor(vertex, faces, shader_program) {
        super(vertex, faces, shader_program);

        this._sampler = GL.getUniformLocation(shader_program, "sampler");
        this._uv = GL.getAttribLocation(shader_program, "uv");

        GL.enableVertexAttribArray(this._uv);
        // GL.useProgram(shader_program);
        // GL.uniform1i(this._sampler, 0);
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

    constructor(vertex, faces, shader_program, red, green, blue, grayScale) {
        super(vertex, faces, shader_vertex_source, shader_fragment_source);
        this._color = GL.getUniformLocation(shader_program, "vColor");
        this._greyScality = GL.getUniformLocation(shader_program, "greyScality");

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

    constructor(vertex, faces, shader_program) {
        super(vertex, faces, shader_program);

        this._color = GL.getAttribLocation(shader_program, "color");
        GL.enableVertexAttribArray(this._color);
    }

    render_setup(VIEW_MATRIX, PROJECTION_MATRIX){
        super.render_setup(VIEW_MATRIX, PROJECTION_MATRIX);
        GL.vertexAttribPointer(this._position, 3, GL.FLOAT, false, 4*(3+3), 0);
        GL.vertexAttribPointer(this._color, 3, GL.FLOAT, false, 4*(3+3), 3 * 4);
    }
}