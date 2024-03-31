class Spongebob{
    shoe = null;
    MODEL_MATRIX = LIBS.get_I4();

    constructor(shader_vertex_source, shader_fragment_source) {
        this.shoe = new Spongebob_Shoe(shader_vertex_source, shader_fragment_source);
    }

    setup(){
        this.shoe.setup();
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        this.shoe.MODEL_MATRIX = LIBS.get_I4();
        this.shoe.MODEL_MATRIX = LIBS.multiply(this.shoe.MODEL_MATRIX, this.MODEL_MATRIX);
        this.shoe.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_Shoe{
    vertex = [];
    faces = [];
    obj = null;
    MODEL_MATRIX = LIBS.get_I4();

    constructor(shader_vertex_source, shader_fragment_source) {
        this.faces = this.faces.concat(QUADRIC.height_saddle.createFaces(this.vertex.length/6));
        this.vertex = this.vertex.concat(QUADRIC.height_saddle.createVertex(1.4,-0.1,0,1.1,0.3,0.9, -4, true, false));

        this.faces = this.faces.concat(QUADRIC.ellipsoid.createFaces(this.vertex.length/6));
        this.vertex = this.vertex.concat(QUADRIC.ellipsoid.createVertex(0,-0.2,0,1.5,1.2,1.3,true, false));

        // this.faces = this.faces.concat(QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        // this.vertex = this.vertex.concat(QUADRIC.ellipsoid.createVertex(0,0,0,1,1,1,false, true));

        this.faces = this.faces.concat(QUADRIC.donut.createFaces(this.vertex.length/6));
        this.vertex = this.vertex.concat(QUADRIC.donut.createVertex(3,0.2,0,0.7,1,0.7, 0.7, true));

        this.faces = this.faces.concat(QUADRIC.cuboid.createFaces(this.vertex.length/6));
        this.vertex = this.vertex.concat(QUADRIC.cuboid.createVertex(3,-0.5,0,0.8,0.8,0.8, true));

        // this.obj = new ColoredObject(this.vertex, this.faces, shader_vertex_source, shader_fragment_source, 0, 0, 0, 1);
        // this.obj = new TexturedObject(this.vertex, this.faces, shader_vertex_source, shader_fragment_source);
        this.obj = new VertexColoredObject(this.vertex, this.faces, shader_vertex_source, shader_fragment_source);
    }

    setup(){
        this.obj.setup();
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        LIBS.translateZ(this.MODEL_MATRIX, -5);
        // LIBS.translate(this.MODEL_MATRIX, 5,5,5);
        this.obj.MODEL_MATRIX = LIBS.get_I4();
        // this.obj.MODEL_MATRIX = LIBS.multiply(this.obj.MODEL_MATRIX, LIBS.get_MTranslate(-2,0,0));
        this.obj.MODEL_MATRIX = LIBS.multiply(this.obj.MODEL_MATRIX, this.MODEL_MATRIX);
        this.obj.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}