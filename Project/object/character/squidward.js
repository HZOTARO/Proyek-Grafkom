import {ColoredObject} from "../object.js";
export {Squidward}

class Squidward extends ColoredObject {
    l_arm = null;
    r_arm = null;
    fr_thigh = null;
    fl_thigh = null;
    br_thigh = null;
    bl_thigh = null;
    torso = null;
    head = null;

    time_per_frame = 0.03;

    random_x = 0.01;
    random_z = 0.01;
    
    startBl_thigh = false;
    startFl_thigh = false;
    startFr_thigh = false;

    br_thigh_matrix = null;

    constructor(shader_program) {
        super([], [], shader_program, 1.0, 1.0, 1.0, 1.0);
        this.negate_br = false;
        this.time_br = 0;

        this.negate_bl = false;
        this.time_bl = 0;

        this.negate_fl = false;
        this.time_fl = 0;

        this.negate_fr = false;
        this.time_fr = 0;

        this.negate_arm = false;
        this.time_arm = 0;

        this.negate_head = false;
        this.time_head = 0;

        this.negate_rotate = false;
        this.time_rotate = 0;

        this.fr_thigh = new Squidward_single_leg(shader_program);
        this.fl_thigh = new Squidward_single_leg(shader_program);
        this.br_thigh = new Squidward_single_leg(shader_program);
        this.bl_thigh = new Squidward_single_leg(shader_program);
        this.torso = new Squidward_torso(shader_program);
        this.l_arm = new Squidward_single_arm(shader_program);
        this.r_arm = new Squidward_single_arm(shader_program);
        this.head = new Squidward_head(shader_program);

        this.childs =[
            this.fr_thigh, this.fl_thigh, this.br_thigh, this.bl_thigh, this.torso, this.l_arm, this.r_arm, this.head
        ]

        LIBS.rotateY(this.br_thigh.LOCAL_MATRIX, Math.PI/4);
        LIBS.rotateY(this.bl_thigh.LOCAL_MATRIX, 3 * Math.PI/4);
        LIBS.rotateY(this.fl_thigh.LOCAL_MATRIX, 5 * Math.PI / 4);
        LIBS.rotateY(this.fr_thigh.LOCAL_MATRIX, 7 * Math.PI / 4);

        LIBS.translate(this.br_thigh.LOCAL_MATRIX, -1, 0, -1);
        LIBS.translate(this.bl_thigh.LOCAL_MATRIX, -3, 0, -1);
        LIBS.translate(this.fl_thigh.LOCAL_MATRIX, -3, 0, 1);
        LIBS.translate(this.fr_thigh.LOCAL_MATRIX, -1, 0, 1);


        this.br_thigh_matrix = LIBS.get_I4(); // Matrix identitas
        LIBS.translate(this.br_thigh_matrix, 1 * this.time_per_frame, 0, 1 * this.time_per_frame);
        LIBS.rotateY(this.br_thigh_matrix, -Math.PI/4 * this.time_per_frame);
        LIBS.rotateZ(this.br_thigh_matrix, Math.PI/8 * this.time_per_frame);
        LIBS.rotateY(this.br_thigh_matrix, Math.PI/4 * this.time_per_frame);
        LIBS.translate(this.br_thigh_matrix, -1 * this.time_per_frame, 0, -1 * this.time_per_frame);

        this.br_thigh_matrix_inverse = LIBS.get_I4();
        LIBS.translate(this.br_thigh_matrix_inverse, 1 * this.time_per_frame, 0, 1 * this.time_per_frame);
        LIBS.rotateY(this.br_thigh_matrix_inverse, -Math.PI/4 * this.time_per_frame);
        LIBS.rotateZ(this.br_thigh_matrix_inverse, -Math.PI/8 * this.time_per_frame);
        LIBS.rotateY(this.br_thigh_matrix_inverse, Math.PI/4 * this.time_per_frame);
        LIBS.translate(this.br_thigh_matrix_inverse, -1 * this.time_per_frame, 0, -1 * this.time_per_frame);

        this.bl_thigh_matrix = LIBS.get_I4();
        LIBS.translate(this.bl_thigh_matrix, 3 * this.time_per_frame, 0, 1 * this.time_per_frame);
        LIBS.rotateY(this.bl_thigh_matrix, -(Math.PI/4) * this.time_per_frame);
        LIBS.rotateZ(this.bl_thigh_matrix, Math.PI/8 * this.time_per_frame);
        LIBS.rotateY(this.bl_thigh_matrix, Math.PI/4 * this.time_per_frame);
        LIBS.translate(this.bl_thigh_matrix, -3 * this.time_per_frame, 0, -1 * this.time_per_frame);

        this.bl_thigh_matrix_inverse = LIBS.get_I4();
        LIBS.translate(this.bl_thigh_matrix_inverse, 3 * this.time_per_frame, 0, 1 * this.time_per_frame);
        LIBS.rotateY(this.bl_thigh_matrix_inverse, -(Math.PI/4) * this.time_per_frame);
        LIBS.rotateZ(this.bl_thigh_matrix_inverse, -Math.PI/8 * this.time_per_frame);
        LIBS.rotateY(this.bl_thigh_matrix_inverse, Math.PI/4 * this.time_per_frame);
        LIBS.translate(this.bl_thigh_matrix_inverse, -3 * this.time_per_frame, 0, -1 * this.time_per_frame);

        this.fl_thigh_matrix = LIBS.get_I4();
        LIBS.translate(this.fl_thigh_matrix, 3 * this.time_per_frame, 0, -1 * this.time_per_frame);
        LIBS.rotateY(this.fl_thigh_matrix, -(Math.PI/4) * this.time_per_frame);
        LIBS.rotateZ(this.fl_thigh_matrix, Math.PI/8 * this.time_per_frame);
        LIBS.rotateY(this.fl_thigh_matrix, Math.PI/4 * this.time_per_frame);
        LIBS.translate(this.fl_thigh_matrix, -3 * this.time_per_frame, 0, 1 * this.time_per_frame);

        this.fl_thigh_matrix_inverse = LIBS.get_I4();
        LIBS.translate(this.fl_thigh_matrix_inverse, 3 * this.time_per_frame, 0, -1 * this.time_per_frame);
        LIBS.rotateY(this.fl_thigh_matrix_inverse, -(Math.PI/4) * this.time_per_frame);
        LIBS.rotateZ(this.fl_thigh_matrix_inverse, -Math.PI/8 * this.time_per_frame);
        LIBS.rotateY(this.fl_thigh_matrix_inverse, Math.PI/4 * this.time_per_frame);
        LIBS.translate(this.fl_thigh_matrix_inverse, -3 * this.time_per_frame, 0, 1 * this.time_per_frame);

        this.fr_thigh_matrix = LIBS.get_I4();
        LIBS.translate(this.fr_thigh_matrix, 1 * this.time_per_frame, 0, -1 * this.time_per_frame);
        LIBS.rotateY(this.fr_thigh_matrix, -Math.PI/4 * this.time_per_frame);
        LIBS.rotateZ(this.fr_thigh_matrix, Math.PI/8 * this.time_per_frame);
        LIBS.rotateY(this.fr_thigh_matrix, Math.PI/4 * this.time_per_frame);
        LIBS.translate(this.fr_thigh_matrix, -1 * this.time_per_frame, 0, 1 * this.time_per_frame);

        this.fr_thigh_matrix_inverse = LIBS.get_I4();
        LIBS.translate(this.fr_thigh_matrix_inverse, 1 * this.time_per_frame, 0, -1 * this.time_per_frame);
        LIBS.rotateY(this.fr_thigh_matrix_inverse, -(Math.PI/4) * this.time_per_frame);
        LIBS.rotateZ(this.fr_thigh_matrix_inverse, -Math.PI/8 * this.time_per_frame);
        LIBS.rotateY(this.fr_thigh_matrix_inverse, Math.PI/4 * this.time_per_frame);
        LIBS.translate(this.fr_thigh_matrix_inverse, -1 * this.time_per_frame, 0, 1 * this.time_per_frame);

        this.lower_arm_matrix = LIBS.get_I4();
        // LIBS.translate(this.lower_arm_matrix, -5 * this.time_per_frame, 0, 0);

        // LIBS.translate(this.lower_arm_matrix, -13.0 * this.time_per_frame, 30.45 * this.time_per_frame, 0);



        // LIBS.translate(this.lower_arm_matrix, -12.75 * this.time_per_frame, 8.7 * this.time_per_frame, 0);
        // LIBS.rotateZ(this.lower_arm_matrix, (-3 * Math.PI/4) * (this.time_per_frame));
        // LIBS.translate(this.lower_arm_matrix, 12.75 * this.time_per_frame, -8.7 * this.time_per_frame, 0);


        this.lower_arm_matrix_inverse = LIBS.get_I4();
        // LIBS.translate(this.lower_arm_matrix_inverse, 13.0 * this.time_per_frame, -30.45 * this.time_per_frame, 0);
        // LIBS.rotateZ(this.lower_arm_matrix_inverse, (Math.PI) * this.time_per_frame);
        // LIBS.translate(this.lower_arm_matrix_inverse, -13.0 * this.time_per_frame, 30.45 * this.time_per_frame, 0);
        // LIBS.translate(this.lower_arm_matrix_inverse, 5 * this.time_per_frame, 0, 0);
        // LIBS.translate(this.lower_arm_matrix_inverse, 13.0 * this.time_per_frame, -30.45 * this.time_per_frame, 0);
        // LIBS.translate(this.lower_arm_matrix_inverse, -12.75 * this.time_per_frame, 8.7 * this.time_per_frame, 0);
        // LIBS.rotateZ(this.lower_arm_matrix_inverse, (3 * Math.PI/4) * (this.time_per_frame));
        // LIBS.translate(this.lower_arm_matrix_inverse, 12.75 * this.time_per_frame, -8.7 * this.time_per_frame, 0);
        // LIBS.translate(this.lower_arm_matrix_inverse, -13.0 * this.time_per_frame, 30.45 * this.time_per_frame, 0);


        LIBS.rotateY(this.r_arm.LOCAL_MATRIX, Math.PI);

        LIBS.translate(this.LOCAL_MATRIX, 0, 20, -80);
    }

    rotate() {
        if (this.time_rotate > 6.9 || this.time_head < -6.9) {
            this.random_x = (Math.random() * 2 - 1);
            this.random_z = (Math.random() * 2 - 1);
        }

        console.log(this.time_head);


        var random_translate = LIBS.get_MTranslate(this.random_x * 0.5, 0, this.random_z * 0.5);

        var magnitude = Math.sqrt(this.random_x * this.random_x + this.random_z * this.random_z);
        var normalX = this.random_x / magnitude;
        var normalZ = this.random_z / magnitude;

        var rotationAngle = Math.atan2(normalX, normalZ);

        if (rotationAngle < 0) {
            rotationAngle += 2 * Math.PI;
        }



        if (this.time_rotate > 7) this.negate_rotate = false;
        else if (this.time_rotate < -7) this.negate_rotate = true;
        this.negate_rotate ? this.time_rotate += 0.1 : this.time_rotate -= 0.1;

        if (this.time_head > 4) this.negate_head = false;
        else if (this.time_head < -4) this.negate_head = true;
        this.negate_head ? this.time_head += 0.1 : this.time_head -= 0.1;

        if (this.time_br > 9) this.negate_br = false;
        else if (this.time_br < 0) this.negate_br = true;
        this.negate_br ? this.time_br += 0.1 : this.time_br -= 0.1;

        if (this.startBl_thigh) {
            if (this.time_bl > 9) this.negate_bl = false;
            else if (this.time_bl < 0) this.negate_bl = true;
            this.negate_bl ? this.time_bl += 0.1 : this.time_bl -= 0.1;
        }

        if (this.startFl_thigh) {
            if (this.time_fl > 9) this.negate_fl = false;
            else if (this.time_fl < 0) this.negate_fl = true;
            this.negate_fl ? this.time_fl += 0.1 : this.time_fl -= 0.1;
        }

        if (this.startFr_thigh) {
            if (this.time_fr > 9) this.negate_fr = false;
            else if (this.time_fr < 0 ) this.negate_fr = true;
            this.negate_fr ? this.time_fr += 0.1 : this.time_fr -= 0.1;
        }

        if (this.time_arm > 4) this.negate_arm = false;
        else if (this.time_arm < 0) this.negate_arm = true;
        this.negate_arm ? this.time_arm += 0.1 : this.time_arm -= 0.1;


        var matrix_br_thigh;
        var matrix_bl_thigh;
        var matrix_fr_thigh;
        var matrix_fl_thigh;
        var move_matrix_br_thigh;
        var move_matrix_bl_thigh;
        var move_matrix_fr_thigh;
        var move_matrix_fl_thigh;

        var matrix_lower_arm;

        var matrix_rotate_head;

        this.negate_head ? matrix_rotate_head = LIBS.get_MRotateY((Math.PI/8) * this.time_per_frame) : matrix_rotate_head = LIBS.get_MRotateY((-Math.PI/8) * this.time_per_frame);

        this.negate_br ?  matrix_br_thigh = this.br_thigh_matrix: matrix_br_thigh = this.br_thigh_matrix_inverse;
        this.negate_bl ? matrix_bl_thigh = this.bl_thigh_matrix : matrix_bl_thigh = this.bl_thigh_matrix_inverse;
        this.negate_fl ? matrix_fl_thigh = this.fl_thigh_matrix : matrix_fl_thigh = this.fl_thigh_matrix_inverse;
        this.negate_fr ? matrix_fr_thigh = this.fr_thigh_matrix : matrix_fr_thigh = this.fr_thigh_matrix_inverse;

        console.log(this.negate_fl);
        this.negate_arm ? matrix_lower_arm = this.lower_arm_matrix : matrix_lower_arm = this.lower_arm_matrix_inverse;

        this.negate_br ? move_matrix_br_thigh = LIBS.get_MTranslate(0.17, 0, 0) : move_matrix_br_thigh = LIBS.get_MTranslate(-0.17, -0.002, 0);
        this.negate_bl ? move_matrix_bl_thigh = LIBS.get_MTranslate(0.17, 0, 0) : move_matrix_bl_thigh = LIBS.get_MTranslate(-0.17, -0.002, 0);
        this.negate_fl ? move_matrix_fl_thigh = LIBS.get_MTranslate(0.17, 0, 0) : move_matrix_fl_thigh = LIBS.get_MTranslate(-0.17, -0.002, 0);
        this.negate_fr ? move_matrix_fr_thigh = LIBS.get_MTranslate(0.17, 0,  0) : move_matrix_fr_thigh = LIBS.get_MTranslate(-0.17, -0.002, 0);

        this.head.animate([matrix_rotate_head]);

        this.br_thigh.animate([matrix_br_thigh]);
        this.br_thigh.animate([move_matrix_br_thigh]);


        this.l_arm.animate([LIBS.get_I4(), LIBS.get_I4(), LIBS.get_I4(), matrix_lower_arm]);


        // this.r_arm.animate([LIBS.get_I4(), LIBS.get_I4(), LIBS.get_I4(), matrix_lower_arm]);


        if (this.time_br >= 1/3 * 9) {
            this.startBl_thigh = true;
        }
        if (this.time_br >= 2/3 * 9) {
            this.startFl_thigh = true;
        }
        if (this.time_br >= 9) {
            this.startFr_thigh = true;
        }

        if (this.startBl_thigh) {
            this.bl_thigh.animate([matrix_bl_thigh]);
            this.bl_thigh.animate([move_matrix_bl_thigh]);
        }
        if (this.startFl_thigh) {
            this.fl_thigh.animate([matrix_fl_thigh]);
            this.fl_thigh.animate([move_matrix_fl_thigh]);
        }
        if (this.startFr_thigh) {
            this.fr_thigh.animate([matrix_fr_thigh]);
            this.fr_thigh.animate([move_matrix_fr_thigh]);
        }

        if (this.time_rotate > 6.9 || this.time_rotate < -6.9) {
            LIBS.rotateY(this.LOCAL_MATRIX, rotationAngle);
        }
        console.log(rotationAngle);
        this.animate([random_translate]);
    }

    // TAMBAH NEGATE UNTUK MASING2 THIGH, DIMULAI DARI WAKTU START

    render(VIEW_MATRIX, PROJECTION_MATRIX, dt) {
        this.rotate(dt);

        // var temp = LIBS.get_I4();
        // this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_head extends ColoredObject {
    skull = null
    l_eye = null;
    r_eye = null;
    nose = null;
    hat = null;
    constructor(shader_program) {
        super([], [], shader_program, 0.6941176470588235, 0.8392156862745098, 0.7725490196078432, 1.0);
        // Neck
        this.faces.push(...QUADRIC.elliptic_paraboloid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.elliptic_paraboloid.createVertex(
            {},
            [0, 105, 0],
            [0.1, 0.7, 0.1],
            [],
            [0, -80],
        ));

        this.skull = new Squidward_skull(shader_program);
        this.l_eye = new Squidward_eye(shader_program);
        this.r_eye = new Squidward_eye(shader_program)
        this.nose = new Squidward_nose(shader_program);
        this.hat = new Squidward_hat(shader_program);

        this.childs = [
            this.skull, this.l_eye, this.r_eye, this.nose, this.hat
        ]

        LIBS.translateX(this.r_eye.LOCAL_MATRIX, 3.5);
        LIBS.scale(this.nose.LOCAL_MATRIX, 0.5, 0.5, 0.5);
        LIBS.translateZ(this.nose.LOCAL_MATRIX, 12.6);
        LIBS.translateY(this.nose.LOCAL_MATRIX, -10);
        LIBS.rotateX(this.nose.LOCAL_MATRIX, -Math.PI/16);
    }
}

class Squidward_eye extends ColoredObject {
    eyeball = null;
    constructor(shader_program) {
        super([], [], shader_program, 1.0, 1.0, 1.0, 1.0);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {},
            [-1.75, 42, 1.8],
            [1.7, 2.85, 1],
            [],
            [],
        ));

        this.eyeball = new Squidward_eyeball(shader_program);

        this.childs = [
            this.eyeball
        ]
    }
}

class Squidward_eyeball extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.611764705882353, 0.11372549019607843, 0.0784313725490196, 1.0);
        this.faces.push(...QUADRIC.cuboid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cuboid.createVertex(
            {},
            [0, 0, 0],
            [0.37, 1.1, 0.03]
        ));

        LIBS.translateY(this.LOCAL_MATRIX, 41.8);
        LIBS.translateX(this.LOCAL_MATRIX, -1.78);
        LIBS.translateZ(this.LOCAL_MATRIX, 2.77);
    }
}

class Squidward_nose extends ColoredObject {
    upper_nose = null;
    constructor(shader_program) {
        super([], [], shader_program, 0.6941176470588235, 0.8392156862745098, 0.7725490196078432, 1.0);
        this.faces.push(...QUADRIC.elliptic_paraboloid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.elliptic_paraboloid.createVertex(
            {},
            [0, 105, 0],
            [],
            [],
            [0, -25]
        ));
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {},
            [0, 93, 0],
            [2.55, 2.55, 2.55],
            [],
            [0, -Math.PI/2 + 0.3]
        ));

        this.upper_nose = new Squidward_upper_nose(shader_program);

        this.childs = [
            this.upper_nose
        ];
    }
}

class Squidward_upper_nose extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.6941176470588235, 0.8392156862745098, 0.7725490196078432, 1.0);

        this.faces.push(...QUADRIC.elliptic_paraboloid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.elliptic_paraboloid.createVertex(
            {},
            [0, 103, 0],
            [1.553, 1.8, 1.553],
            [],
            []
        ));
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {},
            [0, 103.9, -0.7],
            [1, 1, 1.3],
            [1, 0, 2],
            []
        ));

    }
}

class Squidward_skull extends ColoredObject {
    mouth = null;
    cheeks = null;
    constructor(shader_program) {
        super([], [], shader_program, 0.6941176470588235, 0.8392156862745098, 0.7725490196078432, 1.0);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {},
            [0, 45, -1.5],
            [7.2, 5.6, 4],
            [],
            [],
        ));


        this.mouth = new Squidward_mouth(shader_program);
        this.cheeks = new Squidward_cheeks(shader_program);
        this.childs = [
            this.mouth, this.cheeks
        ];
    }
}

class Squidward_cheeks extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.6941176470588235, 0.8392156862745098, 0.7725490196078432, 1.0);
        this.faces.push(...QUADRIC.height_circle.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.height_circle.createVertex(
            {},
            [0, 40, 0],
            [3.3, 3, 1.7],
            [],
            [1]
        ));
    }
}
class Squidward_mouth extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.6941176470588235, 0.8392156862745098, 0.7725490196078432, 1.0);

        this.faces.push(...QUADRIC.elliptic_paraboloid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.elliptic_paraboloid.createVertex(
            {},
            [0, 37, 0.8],
            [5, 1.5, 2.4],
            [0, 2, 1],
            [0, 0.5]
        ));

    }
}

class Squidward_single_arm extends ColoredObject {
    squidward_sleeve = null;
    squidward_upper_arm = null;
    constructor(shader_program) {
        super([], [], shader_program, 0.0, 1.0, 1.0, 1.0);
        this.squidward_sleeve = new Squidward_sleeve(shader_program);
        this.squidward_upper_arm = new Squidward_upper_arm(shader_program);

        this.childs = [
          this.squidward_sleeve, this.squidward_upper_arm
        ];
    }
}

class Squidward_sleeve extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.6588235294117647, 0.5333333333333333, 0.10980392156862745, 1.0);
        this.faces.push(...QUADRIC.height_circle.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.height_circle.createVertex(
            {},
            [-2.48, 30.52, 0],
            [3.5, 2, 2],
            [1, 0, 2],
            [1]
        ));

        // LIBS.translateX(this.LOCAL_MATRIX, 10)
        LIBS.rotateZ(this.LOCAL_MATRIX, Math.PI/64);
    }
}

class Squidward_upper_arm extends ColoredObject {
    lower_arm = null;
    constructor(shader_program) {
        super([], [], shader_program, 0.6941176470588235, 0.8392156862745098, 0.7725490196078432, 1.0);
        this.faces.push(...QUADRIC.height_circle.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.height_circle.createVertex(
            {},
            [-7.0, 30.45, 0],
            [-3, 0.9, 0.9],
            [1, 0, 2],
            [1]
        ));
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {},
            [-10.0, 30.45, 0],
            [0.9, 0.9, 0.9],
            [1, 0, 2],
            []
        ));


        this.lower_arm = new Squidward_lower_arm(shader_program);
        this.childs = [
            this.lower_arm
        ]

        // LIBS.translateX(this.lower_arm.LOCAL_MATRIX, -1);
        // LIBS.translate(this.lower_arm.LOCAL_MATRIX, 13.0, -30.45, 0);
        // LIBS.rotateZ(this.LOCAL_MATRIX, Math.PI/128);
        LIBS.rotateZ(this.lower_arm.LOCAL_MATRIX, (-Math.PI/4 - Math.PI/8));
        LIBS.translate(this.lower_arm.LOCAL_MATRIX, -14.2, 9.3, 0);
        //
        // LIBS.translate(this.lower_arm.LOCAL_MATRIX, 12.75, -8.7, 0);
        // LIBS.rotateZ(this.lower_arm.LOCAL_MATRIX, Math.PI/4 + Math.PI/8);
    }
}

class Squidward_lower_arm extends ColoredObject {
    hand = null;
    constructor(shader_program) {
        super([], [], shader_program, 0.6941176470588235, 0.8392156862745098, 0.7725490196078432, 1.0);
        this.faces.push(...QUADRIC.height_circle.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.height_circle.createVertex(
            {},
            [-13.0, 30.45, 0],
            [-3, 0.9, 0.9],
            [1, 0, 2],
            [1]
        ));

        this.hand = new Squidward_hand(shader_program);

        this.childs = [
            this.hand
        ];


    }
}

class Squidward_hand extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.6941176470588235, 0.8392156862745098, 0.7725490196078432, 1.0);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {},
            [-18.0, 30.45, 0],
            [-5, 1.7, 1.1],
            [],
            [0, Math.PI/2]
        ));
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {},
            [-18.0, 30.45, 0],
            [-5, 0.8, 1.1],
            [],
            [0, -Math.PI/2]
        ))

        LIBS.rotateZ(this.LOCAL_MATRIX, Math.PI/128);
    }
}

class Squidward_torso extends ColoredObject {
    hip = null;
    upper_stomach = null;
    collar = null;
    constructor(shader_program) {
        super([], [], shader_program, 1.0, 1.0, 1.0);
        this.hip = new Squidward_hip(shader_program);
        this.upper_stomach = new Squidward_upper_stomach(shader_program);
        this.collar = new Squidward_collar(shader_program);

        this.childs = [
            this.hip, this.upper_stomach, this.collar
        ]
    }
}

class Squidward_collar extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.6588235294117647, 0.5333333333333333, 0.10980392156862745, 1.0);
        this.faces.push(...QUADRIC.donut.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.donut.createVertex(
            {},
            [0, 32.7, 0],
            [1.6, 2, 1.6],
            [],
            [],
        ));
        LIBS.translate(0, -32.7, 0);
        LIBS.rotateX(this.LOCAL_MATRIX, Math.PI/32);
        LIBS.translate(0, 32.7, 0);
        LIBS.translateZ(this.LOCAL_MATRIX, -3.2);
    }
}

class Squidward_upper_stomach extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.6588235294117647, 0.5333333333333333, 0.10980392156862745, 1.0);
        this.faces.push(...QUADRIC.elliptic_paraboloid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.elliptic_paraboloid.createVertex(
            {},
            [0, 39.1, 0],
            [1.38, 1.9, 1.38],
            [],
            [0, 15]
        ));
    }
}

class Squidward_hip extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.6941176470588235, 0.8392156862745098, 0.7725490196078432, 1.0);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {},
            [0, 16.1, 0],
            [3, 4, 3],
            [],
            [0, -Math.PI/2 + 0.45]
        ));
    }
}


class Squidward_single_leg extends ColoredObject {
    thigh = null;
    constructor(shader_program) {
        super([], [], shader_program, 0, 1.0, 1.0, 1.0);
        this.thigh = new Squidward_thigh(shader_program);
        this.tentacle = new Squidward_tentacles(shader_program);
        this.childs = [
          this.thigh
        ];

        LIBS.translateX(this.LOCAL_MATRIX, 2);
    }
}

class Squidward_thigh extends ColoredObject {
    tentacle = null;
    constructor(shader_program) {
        super([], [], shader_program, 0.6941176470588235, 0.8392156862745098, 0.7725490196078432, 1.0);
        this.faces.push(...QUADRIC.height_saddle.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.height_saddle.createVertex(
            {},
            [0.4, 12.2, 0],
            [0.25,7.5,0.6],
            [1, 0, 2],
            [-10,0],
            -6)
        );

        this.tentacle = new Squidward_tentacles(shader_program);
        this.childs = [
          this.tentacle
        ];
    }
}

class Squidward_tentacles extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.6941176470588235, 0.8392156862745098, 0.7725490196078432, 1.0);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {},
            [4, 0, 0],
            [4, 1.2, 1],
            [],
            [0, Math.PI/2]
        ));
    }
}

class Squidward_hat extends ColoredObject {
    tambahan_hat = null;
    constructor(shader_program) {
        super([], [], shader_program, 1.0, 1.0, 1.0, 1.0);
        var control_points = [
            [-1, 0, 0],
            [-1, 3, 1],
            [-0.5, 3, 0],
            [-0.1, 3, 0],
            [0, 3, 0],
            [0.1, 3, 0],
            [0.5, 3, 0],
            [1, 3, 1],
            [1, 0, 1],
        ]

        this.faces.push(...CURVE.createVase(
            control_points, 30, 60, 0, {},
            [0, 50, -1.4],
            [2, 3, 2],
            [],
        ).faces);
        this.vertex.push(...CURVE.createVase(
            control_points, 30, 60, 0, {},
            [0, 50, -1.4],
            [2, 3, 2],
            [],
        ).vertex);

        this.tambahan_hat = new Squidward_tambahan_hat(shader_program);
        this.childs = [
            this.tambahan_hat
        ]
    }
}

class Squidward_tambahan_hat extends ColoredObject {
    penutup = null;
    constructor(shader_program) {
        super([], [], shader_program, 0.0, 0.0, 0.0, 0.0);
        var control_points = [
            [0, 1.5, 0],
            [0, 0, -4],
            [0, -1.5, -0.9]
        ]
        this.faces.push(...CURVE.createCurvedCylinder(
            control_points, 30, 60, 0, {},
            [0, 51, -1.4],
            [2, 0.7, 2],
            [0, 2, 1],
        ).faces);
        this.vertex.push(...CURVE.createCurvedCylinder(
            control_points, 30, 60, 0, {},
            [0, 51, -1.4],
            [2, 0.7, 2],
            [0, 2, 1],
        ).vertex);

        this.penutup = new Squidward_penutup_hat(shader_program);

        this.childs = [
            this.penutup
        ]

        LIBS.translateZ(this.LOCAL_MATRIX, 3);
    }
}

class Squidward_penutup_hat extends ColoredObject {
    constructor(shader_program) {
        super([],[], shader_program, 0.0, 0.0, 0.0);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {},
            [0, 50.5, 1],
            [2, 0.7, 0.05],
            [],
            []
        ));
        // LIBS.translateZ(this.LOCAL_MATRIX, 2);
    }
}
