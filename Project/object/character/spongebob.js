import {VertexColoredObject} from "../object.js";
export {Spongebob}

class Spongebob extends VertexColoredObject{
    l_arm = null;
    r_arm = null;
    l_thigh = null;
    r_thigh = null;
    constructor(shader_program) {
        super([], [], shader_program);
        // this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/6));
        // this.vertex.push(...QUADRIC.ellipsoid.createVertex(
        //     {vC: true},
        //     [],
        //     [0.1,0.1,0.1])
        // );
        // this.faces.push(...QUADRIC.cuboid.createFaces(this.vertex.length/6));
        // this.vertex.push(...QUADRIC.cuboid.createVertex(
        //     {vC: true},
        //     [0,0,0],
        //     [6,8,2]
        // ));
        // this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/6));
        // this.vertex.push(...QUADRIC.ellipsoid.createVertex(
        //     {vC: true},
        //     [-2.5,3,2],
        //     [1.25,1.5,0.5])
        // );
        // this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/6));
        // this.vertex.push(...QUADRIC.ellipsoid.createVertex(
        //     {vC: true},
        //     [2.5,3,2],
        //     [1.25,1.5,0.5])
        // );

        this.l_arm = new Spongebob_u_arm(shader_program);
        this.r_arm = new Spongebob_u_arm(shader_program);
        this.l_thigh = new Spongebob_thigh(shader_program);
        this.r_thigh = new Spongebob_thigh(shader_program);

        this.childs = [
            this.l_arm,
            this.r_arm,
            this.l_thigh,
            this.r_thigh,
        ];

        LIBS.translate(this.l_thigh.LOCAL_MATRIX,-3,-8,0);
        LIBS.translate(this.r_thigh.LOCAL_MATRIX,3,-8,0);

        LIBS.translate(this.LOCAL_MATRIX,0,20,0);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_u_arm extends VertexColoredObject{
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.sponge.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.sponge.createVertex(
            {vC: true},
            [],
            [6,8,2])
        );

        // this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/6));
        // this.vertex.push(...QUADRIC.ellipsoid.createVertex(
        //     {vC: true},
        //     [],
        //     [0.1,0.1,0.1])
        // );
        // this.faces.push(...QUADRIC.elliptic_paraboloid.createFaces(this.vertex.length/6));
        // this.vertex.push(...QUADRIC.elliptic_paraboloid.createVertex(
        //     {vC: true},
        //     [0,0,0],
        //     [1,1,1])
        // );
        // this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/6));
        // this.vertex.push(...QUADRIC.cylinder.createVertex(
        //     {vC: true},
        //     [0,-2,0],
        //     [0.4,2,0.4])
        // );
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX,PROJECTION_MATRIX);
    }
}

class Spongebob_l_arm extends VertexColoredObject{
    constructor(shader_program) {
        super([], [], shader_program);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_hand extends VertexColoredObject{
    constructor(shader_program) {
        super([], [], shader_program);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_finger extends VertexColoredObject{
    constructor(shader_program) {
        super([], [], shader_program);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_thigh extends VertexColoredObject{
    leg = null;
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vC: true},
            [],
            [0.1,0.1,0.1])
        );
        this.faces.push(...QUADRIC.elliptic_paraboloid.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.elliptic_paraboloid.createVertex(
            {vC: true},
            [0,0,0],
            [1,1,1])
        );
        this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.cylinder.createVertex(
            {vC: true},
            [0,-2,0],
            [0.4,2,0.4])
        );

        this.leg = new Spongebob_leg(shader_program);

        this.childs = [
            this.leg
        ];

        LIBS.translate(this.leg.LOCAL_MATRIX,0,-4,0);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_leg extends VertexColoredObject{
    shoe = null;
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vC: true},
            [],
            [0.4,0.4,0.4])
        );
        this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.cylinder.createVertex(
            {vC: true},
            [0,-2,0],
            [0.4,2,0.4])
        );

        this.shoe = new Spongebob_shoe(shader_program);

        this.childs = [
            this.shoe
        ];

        LIBS.translate(this.shoe.LOCAL_MATRIX,0,-4,0);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        temp = LIBS.get_I4();
        // LIBS.rotateZ(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_shoe extends VertexColoredObject{
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vC: true},
            [],
            [0.1,0.1,0.1])
        );

        this.faces.push(...QUADRIC.height_saddle.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.height_saddle.createVertex(
            {vC: true},
            [0,-0.1,1.6],
            [0.9,0.3,1.1],
            [2,1,0],
            [],
            -4)
        );

        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vC: true},
            [0,-0.2,3],
            [1.3,1.2,1.5])
        );

        this.faces.push(...QUADRIC.donut.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.donut.createVertex(
            {vC: true},
            [0,0.2,0],
            [0.7,1,0.7],
            [],
            [],
            0.7)
        );

        this.faces.push(...QUADRIC.cuboid.createFaces(this.vertex.length/6));
        this.vertex.push(...QUADRIC.cuboid.createVertex(
            {vC: true},
            [0,-0.5,0],
            [0.8,0.8,0.8]
        ));
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}