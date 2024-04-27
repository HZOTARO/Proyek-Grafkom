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

    constructor(shader_program) {
        super([], [], shader_program, 1.0, 1.0, 1.0, 1.0);
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
        LIBS.translate(this.fr_thigh.LOCAL_MATRIX, -1, 0, 1);
        LIBS.translate(this.fl_thigh.LOCAL_MATRIX, -3, 0, 1);

        LIBS.rotateY(this.r_arm.LOCAL_MATRIX, Math.PI);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_head extends ColoredObject {
    skull = null
    l_eye = null;
    r_eye = null;
    nose = null;
    constructor(shader_program) {
        super([], [], shader_program, 0.0, 1.0, 1.0, 1.0);
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

        this.childs = [
            this.skull, this.l_eye, this.r_eye, this.nose
        ]

        LIBS.translateX(this.r_eye.LOCAL_MATRIX, 3.5);
        LIBS.scale(this.nose.LOCAL_MATRIX, 0.5, 0.5, 0.5);
        LIBS.translateZ(this.nose.LOCAL_MATRIX, 12.6);
        LIBS.translateY(this.nose.LOCAL_MATRIX, -10);
        LIBS.rotateX(this.nose.LOCAL_MATRIX, -Math.PI/16);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
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

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_eyeball extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 1.0, 0.0, 0.0, 1.0);
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

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_nose extends ColoredObject {
    upper_nose = null;
    constructor(shader_program) {
        super([], [], shader_program, 0.0, 1.0, 1.0, 1.0);
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

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_upper_nose extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.0, 1.0, 1.0, 1.0);

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

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_skull extends ColoredObject {
    mouth = null;
    cheeks = null;
    constructor(shader_program) {
        super([], [], shader_program, 0.0, 1.0, 1.0, 1.0);
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

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_cheeks extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.0 ,1.0, 1.0, 1.0);
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
        super([], [], shader_program, 0.0, 1.0, 1.0, 1.0);

        this.faces.push(...QUADRIC.elliptic_paraboloid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.elliptic_paraboloid.createVertex(
            {},
            [0, 37, 0.8],
            [5, 1.5, 2.4],
            [0, 2, 1],
            [0, 0.5]
        ));

    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_single_arm extends ColoredObject {
    squidward_sleeve = null;
    squidward_arm = null;
    constructor(shader_program) {
        super([], [], shader_program, 0.0, 1.0, 1.0, 1.0);
        this.squidward_sleeve = new Squidward_sleeve(shader_program);
        this.squidward_arm = new Squidward_arm(shader_program);

        this.childs = [
          this.squidward_sleeve, this.squidward_arm
        ];
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_sleeve extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.8, 0.4, 0.1, 1.0);
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

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_arm extends ColoredObject {
    hand = null;
    constructor(shader_program) {
        super([], [], shader_program, 0.0, 1.0, 1.0, 1.0);
        this.faces.push(...QUADRIC.height_circle.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.height_circle.createVertex(
            {},
            [-11.0, 30.45, 0],
            [-5, 0.9, 0.9],
            [1, 0, 2],
            [1]
        ));

        this.hand = new Squidward_hand(shader_program);

        this.childs = [
            this.hand
        ];
        LIBS.rotateZ(this.LOCAL_MATRIX, Math.PI/128)
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_hand extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.0, 1.0, 1.0, 1.0);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {},
            [-16.0, 30.45, 0],
            [-5, 1.7, 1.1],
            [],
            [0, Math.PI/2]
        ));
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {},
            [-16.0, 30.45, 0],
            [-5, 0.8, 1.1],
            [],
            [0, -Math.PI/2]
        ))

        LIBS.rotateZ(this.LOCAL_MATRIX, Math.PI/128)
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_torso extends ColoredObject {
    hip = null;
    upper_stomach = null;
    constructor(shader_program) {
        super([], [], shader_program, 1.0, 1.0, 1.0);
        this.hip = new Squidward_hip(shader_program);
        this.upper_stomach = new Squidward_upper_stomach(shader_program);

        this.childs = [
            this.hip, this.upper_stomach
        ]
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_upper_stomach extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.8, 0.4, 0.1, 1.0);
        this.faces.push(...QUADRIC.elliptic_paraboloid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.elliptic_paraboloid.createVertex(
            {},
            [0, 39.1, 0],
            [1.38, 1.9, 1.38],
            [],
            [0, 15]
        ));
        // this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/5));
        // this.vertex.push(...QUADRIC.cylinder.createVertex(
        //     {},
        //     [0, 30, 0],
        //     [20, 20, 20],
        //     [],
        //     [],
        // ));
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_hip extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0, 1.0, 1.0, 1.0);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {},
            [0, 16.1, 0],
            [3, 4, 3],
            [],
            [0, -Math.PI/2 + 0.45]
        ));
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}


class Squidward_single_leg extends ColoredObject {
    thigh = null;
    tentacle = null;
    constructor(shader_program) {
        super([], [], shader_program, 0, 1.0, 1.0, 1.0);
        this.thigh = new Squidward_thigh(shader_program);
        this.tentacle = new Squidward_tentacles(shader_program);
        this.childs = [
          this.thigh, this.tentacle
        ];

        LIBS.translateX(this.LOCAL_MATRIX, 2);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_thigh extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0, 1.0, 1.0, 1.0);
        this.faces.push(...QUADRIC.height_saddle.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.height_saddle.createVertex(
            {},
            [0.4, 12.2, 0],
            [0.25,7.5,0.6],
            [1, 0, 2],
            [-10,0],
            -6)
        );


        // LIBS.rotateY(this.LOCAL_MATRIX, Math.PI);
        // this.tentacles = new Squidward_tentacles(shader_program);
        // this.childs = [
        //     this.tentacles
        // ]
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_tentacles extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0, 1.0, 1.0, 1.0);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {},
            [4, 0, 0],
            [4, 1.2, 1],
            [],
            [0, Math.PI/2]
        ));
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX) {
        temp = LIBS.get_I4();

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}