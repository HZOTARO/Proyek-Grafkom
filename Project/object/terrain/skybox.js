class Skybox{
    land = null;
    dome = null;
    MODEL_MATRIX = LIBS.get_I4();

    constructor(shader_vertex_source, shader_fragment_source) {
        this.land = new land(shader_vertex_source, shader_fragment_source);
        this.dome = new dome(shader_vertex_source, shader_fragment_source);
    }

    setup(){
        this.land.setup();
        this.dome.setup();
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        this.land.MODEL_MATRIX = LIBS.get_I4();
        // this.land.MODEL_MATRIX = LIBS.multiply(this.land.MODEL_MATRIX, this.MODEL_MATRIX);
        this.land.render(VIEW_MATRIX, PROJECTION_MATRIX);
        // this.dome.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class dome{
    vertex = [];
    faces = [];
    obj = null;
    MODEL_MATRIX = LIBS.get_I4();

    constructor(shader_vertex_source, shader_fragment_source) {
        this.faces = this.faces.concat(QUADRIC.ellipsoid.createFaces(this.vertex.length/6));
        this.vertex = this.vertex.concat(QUADRIC.ellipsoid.createVertex(0,0,0,10000,10000, 10000, false, true));
        this.obj = new TexturedObject(this.vertex, this.faces, shader_vertex_source, shader_fragment_source);
    }

    setup(){
        this.obj.setup();
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        // LIBS.translateY(this.MODEL_MATRIX, -4);
        this.obj.MODEL_MATRIX = LIBS.get_I4();
        // this.obj.MODEL_MATRIX = LIBS.multiply(this.obj.MODEL_MATRIX, LIBS.get_MTranslate(-2,0,0));
        this.obj.MODEL_MATRIX = LIBS.multiply(this.obj.MODEL_MATRIX, this.MODEL_MATRIX);
        this.obj.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class land{
    vertex = [];
    faces = [];
    obj = null;
    MODEL_MATRIX = LIBS.get_I4();

    constructor(shader_vertex_source, shader_fragment_source) {
        this.faces = this.faces.concat(PLANE.rectangle.createFaces(this.vertex.length/6));
        this.vertex = this.vertex.concat(PLANE.rectangle.createVertex(0,0,0,1000,1000, false, true, 10));
        this.obj = new TexturedObject(this.vertex, this.faces, shader_vertex_source, shader_fragment_source);
    }

    setup(){
        this.obj.setup();
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        LIBS.translateY(this.MODEL_MATRIX, -4);
        this.obj.MODEL_MATRIX = LIBS.get_I4();
        // this.obj.MODEL_MATRIX = LIBS.multiply(this.obj.MODEL_MATRIX, LIBS.get_MTranslate(-2,0,0));
        this.obj.MODEL_MATRIX = LIBS.multiply(this.obj.MODEL_MATRIX, this.MODEL_MATRIX);
        this.obj.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}