import {VertexColoredObject} from "../object.js";
export {Spongebob}

class Spongebob extends VertexColoredObject{
    constructor(shader_program) {
        super([], [], shader_program);
        // this.faces.push(...QUADRIC.cuboid.createFaces(this.vertex.length/6));
        // this.vertex.push(...QUADRIC.cuboid.createVertex(
        //     {vC: true},
        //     [0,0,0],
        //     [1,1,1]
        // ));


        this.childs = [
            new Spongebob_shoe(shader_program)
        ];

        LIBS.translate(this.WORLD_MATRIX,0,5,0);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        // LIBS.rotateY(this.LOCAL_MATRIX, 0.1);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_u_arm extends VertexColoredObject{
    constructor(shader_program) {
        super([], [], shader_program);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_l_arm extends VertexColoredObject{
    constructor(shader_program) {
        super([], [], shader_program);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_hand extends VertexColoredObject{
    constructor(shader_program) {
        super([], [], shader_program);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_finger extends VertexColoredObject{
    constructor(shader_program) {
        super([], [], shader_program);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_thigh extends VertexColoredObject{
    constructor(shader_program) {
        super([], [], shader_program);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_leg extends VertexColoredObject{
    constructor(shader_program) {
        super([], [], shader_program);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_shoe extends VertexColoredObject{
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.height_saddle.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.height_saddle.createVertex(
            {vC: true},
            [1.4,-0.1,0],
            [1.1,0.3,0.9],
            [],
            [],
            -4)
        );

        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vC: true},
            [0,-0.2,0],
            [1.5,1.2,1.3])
        );

        this.faces.push(...QUADRIC.donut.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.donut.createVertex(
            {vC: true},
            [3,0.2,0],
            [0.7,1,0.7],
            [],
            [],
            0.7)
        );

        this.faces.push(...QUADRIC.cuboid.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.cuboid.createVertex(
            {vC: true},
            [3,-0.5,0],
            [0.8,0.8,0.8]
        ));
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
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