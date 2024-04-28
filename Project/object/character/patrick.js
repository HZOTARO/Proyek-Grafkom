import {TexturedObject} from "../object.js";
export {Patrick}

var temp = null;
class Patrick extends TexturedObject{
    time = 0;
    negate = false;
    hat = null;
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
            [1.84,2,1.4])
        );

        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true},
            [0,3.2,0],
            [2.3,2.5,1.8],
            [],
            [0,-5]
        )
        );

        this.l_eyebrow = new Patrick_eyebrow(shader_program);
        this.r_eyebrow = new Patrick_eyebrow(shader_program);
        this.hat = new Patrick_hat(shader_program);
        this.mouth = new Patrick_mouth(shader_program);
        this.pants = new Patrick_pants(shader_program);
        this.l_eye = new Patrick_eye(shader_program);
        this.r_eye = new Patrick_eye(shader_program);
        this.l_arm = new Patrick_u_arm(shader_program);
        this.r_arm = new Patrick_u_arm(shader_program);
        this.l_thigh = new Patrick_thigh(shader_program);
        this.r_thigh = new Patrick_thigh(shader_program);

        this.childs = [
            this.l_eyebrow,
            this.r_eyebrow,
            this.hat,
            this.mouth,
            this.pants,
            this.l_eye,
            this.r_eye,
            this.l_arm,
            this.r_arm,
            this.l_thigh,
            this.r_thigh,
        ];

        LIBS.translate(this.l_eye.LOCAL_MATRIX,-0.4,5.7,0.6);
        LIBS.translate(this.r_eye.LOCAL_MATRIX,0.4,5.7,0.6);

        LIBS.translate(this.l_arm.LOCAL_MATRIX,-2.5,4,0);
        LIBS.rotateZ(this.l_arm.LOCAL_MATRIX,Math.PI/2);

        LIBS.translate(this.r_arm.LOCAL_MATRIX,2.5,4,0);
        LIBS.rotateZ(this.r_arm.LOCAL_MATRIX,-Math.PI/2);

        LIBS.translate(this.l_thigh.LOCAL_MATRIX,-1,0,0);
        LIBS.translate(this.r_thigh.LOCAL_MATRIX,1,0,0);

        LIBS.translate(this.l_eyebrow.LOCAL_MATRIX,-0.4,0,0);
        LIBS.translate(this.r_eyebrow.LOCAL_MATRIX,0.4,0,0);

        // LIBS.scale(this.LOCAL_MATRIX,10,10,10);
        // LIBS.scale(this.WORLD_MATRIX,0,10,0);

        // this.hand_matrix = LIBS.get_I4();
        // LIBS.translate(this.hand_matrix,0.01,0,0.01);
        // LIBS.rotateY(this.hand_matrix,-Math.PI/4 * 0.01);
        // LIBS.rotateZ(this.hand_matrix,Math.PI/8 * 0.01);

        // LIBS.rotateY(this.hand_matrix,Math.PI/4 * 0.01);
        // LIBS.translate(this.hand_matrix,-0.01,0,-0.01);
        // LIBS.translate(this.hand_matrix,5.5 * 0.01, 0, -0 * 0.01);

        // this.hand_matrix_inverse = LIBS.get_I4();
        // LIBS.translate(this.hand_matrix_inverse,0.01,0,0.01);
        // LIBS.rotateY(this.hand_matrix_inverse,-Math.PI/4 * 0.01);
        // LIBS.rotateZ(this.hand_matrix_inverse,-Math.PI/8 * 0.01);

        // LIBS.rotateY(this.hand_matrix_inverse,Math.PI/4 * 0.01);
        // LIBS.translate(this.hand_matrix_inverse,-0.01,0,-0.01);
        // LIBS.translate(this.hand_matrix_inverse,-5.5 * 0.01, 0, -0 * 0.01);
        
        // this.idle_matrix = LIBS.get_I4();
        // // LIBS.rotate(this.idle_matrix,Math.PI/8*0.1,Math.PI/8*0.1,0);
        // // LIBS.translateY(this.idle_matrix,0.01);
        // // LIBS.rotateY(this.idle_matrix,Math.PI/4*0.01);

        // this.idle_matrix_inverse = LIBS.get_I4();
        // // LIBS.translateY(this.idle_matrix,0.01);
        // // LIBS.rotateY(this.idle_matrix,-Math.PI/4*0.01);


        this.idle_matrix = LIBS.get_I4();
        LIBS.translateY(this.idle_matrix,0.01);

        LIBS.translateZ(this.idle_matrix,Math.PI*0.01);
        LIBS.rotateY(this.idle_matrix,Math.PI/4*0.01);
        LIBS.translateZ(this.idle_matrix,5*0.01);
        
        this.idle_matrix_inverse = LIBS.get_I4();
        LIBS.translateY(this.idle_matrix_inverse,-0.01);

        LIBS.translateZ(this.idle_matrix,Math.PI*0.01);
        LIBS.rotateY(this.idle_matrix,Math.PI/4*0.01);
        LIBS.translateZ(this.idle_matrix,5*0.01);

        this.negate_r_hand = false;
        this.time_r_hand = 0;
        this.r_hand_matrix = LIBS.get_I4();
        LIBS.translateZ(this.r_hand_matrix,-0.01);

        this.r_hand_matrix_inverse = LIBS.get_I4();
        LIBS.translateZ(this.r_hand_matrix_inverse,0.01);

        //r move
        this.negate_r_move = false;
        this.time_r_move = 0;

        this.r_move_matrix = LIBS.get_I4();
        LIBS.rotateX(this.r_move_matrix,1);
        console.log(this.r_move_matrix);

        this.r_move_matrix_inverse = LIBS.get_I4();
        LIBS.rotateX(this.r_move_matrix_inverse,-0.01);
        console.log(this.r_move_matrix_inverse);


    }

    rotate(){
        if (this.time > 10) this.negate = true;
        else if (this.time < -10) this.negate = false;
        this.negate ? this.time -= 0.1 : this.time += 0.1;
        var matrix1, matrix2, matrix3, matrix4, matrix5, matrix6;
        this.negate ? matrix1 = this.idle_matrix : matrix1 = this.idle_matrix_inverse;
        var idle = [matrix1];

        //tangan kanan
        if (this.time_r_hand > 5) this.negate_r_hand = true;
        else if (this.time_r_hand < -0.5) this.negate_r_hand = false;
        this.negate_r_hand ? this.time_r_hand -= 0.1 : this.time_r_hand += 0.1;

        this.negate_r_hand ? matrix3 = this.r_hand_matrix : matrix3 = this.r_hand_matrix_inverse;
        this.negate_r_hand ? matrix4 = this.r_hand_matrix_inverse : matrix4 = this.r_hand_matrix;
        
        var r_hand = [matrix3,matrix4];

        //rotate tangan kanan
        if (this.time_r_move > 1) this.negate_r_move = true;
        else if (this.time_r_move < -1) this.negate_r_move = false;
        this.negate_r_move ? this.time_r_move -= 0.01 : this.time_r_move += 0.01;

        matrix5 = this.negate.r_move ? this.r_move_matrix : this.r_move_matrix_inverse;
        matrix6 = this.negate.r_move ? this.r_move_matrix : this.r_move_matrix_inverse;
        // console.log(this.negate_r_move);
        // var r_move = [matrix5,matrix6];

        // this.animate(idle);
        // this.r_arm.animate(r_move);
        // this.r_arm.l_arm.animate(r_hand);
        // this.l_arm.animate(arr);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        this.rotate();
        GL.bindTexture(GL.TEXTURE_2D, Texture[9]);
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Patrick_eyebrow extends TexturedObject{
    constructor(shader_program) {
        super([], [], shader_program);
        var controlPoint = [
            [-2,-2,0],
            [-1,2,0],
            [2,0,0],
            [1,0,0],
            [2,-2,0],

        ];
        this.faces.push(...CURVE.createCurvedCylinder(controlPoint,20,10,this.vertex.length/5,{vT:true},[0,6.5,0.9],[0.1,0.05,0],[]).faces);
        this.vertex.push(...CURVE.createCurvedCylinder(controlPoint,20,10,this.vertex.length/5,{vT:true},[0,6.5,0.9],[0.1,0.05,0],[]).vertex);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[13]);
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Patrick_hat extends TexturedObject{
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.elliptic_cone.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.elliptic_cone.createVertex(
            {vT: true},
            [0,9.5,0],
            [0.6,1.2,0.5],
            [],
            [0,2])
        );
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[12]);
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
            [0,4.5,1.1],
            [0.3,0.4,0.5])
        );
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[13]);
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
        GL.bindTexture(GL.TEXTURE_2D, Texture[10]);
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
        GL.bindTexture(GL.TEXTURE_2D, Texture[13]);
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
            [0.5,0.8,0.7])
        );

        this.l_arm = new Patrick_l_arm(shader_program);

        this.childs = [
            this.l_arm
        ];

    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[9]);
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
            [0.5,0.5,0.7])
        );
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[9]);
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Patrick_pants extends TexturedObject{
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid_half.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid_half.createVertex(
            {vT: true},
            [0,2.6,0],
            [2.3,1.2,1.8],
            [],
            [0,5]
        )
        );
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[7]);
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
            [0.7,0.4,0.7])
        );

        this.leg = new Patrick_leg(shader_program);

        this.childs = [
            this.leg
        ];

        LIBS.rotateX(this.LOCAL_MATRIX,Math.PI);
        LIBS.translate(this.LOCAL_MATRIX,0,1.7,0);

    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[7]);
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
            [0.7,0.7,0.7])
        );
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[9]);
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}
