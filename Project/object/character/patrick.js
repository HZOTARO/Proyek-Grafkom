import {TexturedObject} from "../object.js";
export {Patrick}

class Patrick extends TexturedObject{
    mouth = null;
    pants = null;
    l_eye = null;
    r_eye = null;
    l_arm = null;
    r_arm = null;
    l_thigh = null;
    r_thigh = null;
    constructor(shader_program) {
        super([], [], shader_program);
        // this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        // this.vertex.push(...QUADRIC.ellipsoid.createVertex(
        //     {vT: true},
        //     [],
        //     [0.1,0.1,0.1])
        // );

        this.faces.push(...QUADRIC.elliptic_paraboloid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.elliptic_paraboloid.createVertex(
            {vT: true},
            [0,6.2,0],
            [1.84,1.5,1.2])
        );

        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true},
            [0,3.2,0],
            [2.3,2.5,1.5],
            [],
            [0,-5]
        )
        );

        this.mouth = new Patrick_mouth(shader_program);
        this.pants = new Patrick_pants(shader_program);
        this.l_eye = new Patrick_eye(shader_program);
        this.r_eye = new Patrick_eye(shader_program);
        this.l_arm = new Patrick_u_arm(shader_program);
        this.r_arm = new Patrick_u_arm(shader_program);
        this.l_thigh = new Patrick_thigh(shader_program);
        this.r_thigh = new Patrick_thigh(shader_program);

        this.childs = [
            this.mouth,
            this.pants,
            this.l_eye,
            this.r_eye,
            this.l_arm,
            this.r_arm,
            this.l_thigh,
            this.r_thigh,
        ];

        LIBS.translate(this.l_eye.LOCAL_MATRIX,-0.4,5.7,0.55);
        LIBS.translate(this.r_eye.LOCAL_MATRIX,0.4,5.7,0.55);

        LIBS.translate(this.l_arm.LOCAL_MATRIX,-2,4,0);
        LIBS.rotateZ(this.l_arm.LOCAL_MATRIX,Math.PI/2);

        LIBS.translate(this.r_arm.LOCAL_MATRIX,2,4,0);
        LIBS.rotateZ(this.r_arm.LOCAL_MATRIX,-Math.PI/2);

        LIBS.translate(this.l_thigh.LOCAL_MATRIX,-1,0,0);
        LIBS.translate(this.r_thigh.LOCAL_MATRIX,1,0,0);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[1]);
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Patrick_mouth extends TexturedObject{
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true},
            [0,4.5,1],
            [0.3,0.4,0.5])
        );
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[2]);
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Patrick_eye extends TexturedObject{
    pupil = null;
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true},
            [],
            [0.5,0.6,0.6])
        );

        this.pupil = new Patrick_pupil(shader_program);

        this.childs = [
            this.pupil
        ];
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[2]);
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Patrick_pupil extends TexturedObject{
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true},
            [0,0.05,0.55],
            [0.1,0.1,0.1])
        );
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[1]);
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Patrick_u_arm extends TexturedObject{
    l_arm = null;
    constructor(shader_program) {
        super([], [], shader_program);
        // this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        // this.vertex.push(...QUADRIC.ellipsoid.createVertex(
        //     {vT: true},
        //     [],
        //     [0.1,0.1,0.1])
        // );

        this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cylinder.createVertex(
            {vT: true},
            [],
            [0.4,0.8,0.6])
        );

        this.l_arm = new Patrick_l_arm(shader_program);

        this.childs = [
            this.l_arm
        ];

    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[1]);
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Patrick_l_arm extends TexturedObject{
    constructor(shader_program) {
        super([], [], shader_program);
        // this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        // this.vertex.push(...QUADRIC.ellipsoid.createVertex(
        //     {vT: true},
        //     [],
        //     [0.1,0.1,0.1])
        // );

        this.faces.push(...QUADRIC.elliptic_paraboloid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.elliptic_paraboloid.createVertex(
            {vT: true},
            [0,1.3,0],
            [0.4,0.5,0.6])
        );
    }
}

class Patrick_pants extends TexturedObject{
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true},
            [0,2.6,0],
            [2.3,1.3,1.5],
            [],
            [0,5]
        )
        );
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[2]);
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Patrick_thigh extends TexturedObject{
    leg = null;
    constructor(shader_program) {
        super([], [], shader_program);
        // this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        // this.vertex.push(...QUADRIC.ellipsoid.createVertex(
        //     {vT: true},
        //     [],
        //     [0.1,0.1,0.1])
        // );

        this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cylinder.createVertex(
            {vT: true},
            [0,0.2,0],
            [0.65,0.4,0.65])
        );

        this.leg = new Patrick_leg(shader_program);

        this.childs = [
            this.leg
        ];

        LIBS.rotateX(this.LOCAL_MATRIX,Math.PI);
        LIBS.translate(this.LOCAL_MATRIX,0,1.7,0);

    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[2]);
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Patrick_leg extends TexturedObject{
    constructor(shader_program) {
        super([], [], shader_program);
        // this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        // this.vertex.push(...QUADRIC.ellipsoid.createVertex(
        //     {vT: true},
        //     [],
        //     [0.1,0.1,0.1])
        // );

        this.faces.push(...QUADRIC.elliptic_paraboloid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.elliptic_paraboloid.createVertex(
            {vT: true},
            [0,1,0],
            [0.6,0.6,0.6])
        );
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[1]);
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}
