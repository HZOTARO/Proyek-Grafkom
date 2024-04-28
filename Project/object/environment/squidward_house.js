import {ColoredObject} from "../object.js";

export {Squidward_house}

class Squidward_house extends ColoredObject {
    body = null;
    l_ear = null;
    r_ear = null;
    l_eye = null;
    r_eye = null;
    eyebrow = null;
    nose = null;
    top = null;
    path = [];

    constructor(shader_program) {
        super([], [], shader_program, 0.20392156862745098, 0.29411764705882354, 0.42745098039215684, 1.0);
        this.body = new Squidward_house_body(shader_program);
        this.l_ear = new Squidward_house_ears(shader_program);
        this.r_ear = new Squidward_house_ears(shader_program);
        this.l_eye = new Squidward_house_eye(shader_program);
        this.r_eye = new Squidward_house_eye(shader_program);
        this.eyebrow = new Squidward_house_eyebrow(shader_program);
        this.nose = new Squidward_house_nose(shader_program);
        this.top = new Squidward_house_top(shader_program);
        for (var i = 0; i < 3; i++) {
            this.path.push(new Squidward_house_path(shader_program));
        }

        this.childs = [
            this.body, this.l_ear, this.r_ear, this.l_eye, this.r_eye, this.eyebrow, this.nose, this.top, this.path[0], this.path[1], this.path[2]
        ]

        LIBS.rotateZ(this.l_ear.LOCAL_MATRIX, -Math.PI/64);
        LIBS.translateX(this.r_ear.LOCAL_MATRIX, 12.4);
        LIBS.rotateZ(this.r_ear.LOCAL_MATRIX, Math.PI/64);
        LIBS.translateY(this.r_ear.LOCAL_MATRIX, 0.6);

        LIBS.translateX(this.r_eye.LOCAL_MATRIX, 4);

        for (var i = 0; i < 3; i++) {
            LIBS.translateZ(this.path[i].LOCAL_MATRIX, (i * 6) + 9);
        }
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX, dt) {
        var temp = LIBS.get_I4();
        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Squidward_house_top extends ColoredObject {
    constructor (shader_program) {
        super([], [], shader_program, 0.20392156862745098, 0.29411764705882354, 0.42745098039215684, 1.0);
        this.faces.push(...QUADRIC.height_circle.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.height_circle.createVertex(
            {},
            [0,19, 0],
            [4, 1, 4],
            [],
            [1]
        ));
    }
}
class Squidward_house_body extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.20392156862745098, 0.29411764705882354, 0.42745098039215684, 1.0);
        this.faces.push(...QUADRIC.elliptic_paraboloid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.elliptic_paraboloid.createVertex(
            {},
            [0, 340, 0],
            [20, 20, 20],
            [],
            [0, -30]
        ));
        LIBS.scale(this.LOCAL_MATRIX, 0.1, 0.1, 0.1);
    }
}

class Squidward_house_ears extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.20392156862745098, 0.29411764705882354, 0.42745098039215684, 1.0);
        this.faces.push(...QUADRIC.cuboid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cuboid.createVertex(
            {},
            [-6.2, 10, 0],
            [0.8, 2.5, 1],
        ));


    }
}

class Squidward_house_eye extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.20392156862745098, 0.29411764705882354, 0.42745098039215684, 1.0);
        this.faces.push(...QUADRIC.donut.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.donut.createVertex(
            {},
            [-2, 12.5, 4.5],
            [1.1, 1.1, 2.1],
            [0, 2, 1],
            [],
            [0.3]
        ));
    }
}

class Squidward_house_eyebrow extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.20392156862745098, 0.29411764705882354, 0.42745098039215684, 1.0);
        this.faces.push(...QUADRIC.cuboid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cuboid.createVertex(
            {},
            [0, 14.7, 5],
            [3, 0.4, 0.5],
        ));
    }
}

class Squidward_house_nose extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.20392156862745098, 0.29411764705882354, 0.42745098039215684, 1.0);
        this.faces.push(...QUADRIC.cuboid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cuboid.createVertex(
            {},
            [0, 10.5, 6.5],
            [0.7, 3.5, 1],
        ));

        LIBS.rotateX(this.LOCAL_MATRIX, -Math.PI/20);
    }
}

class Squidward_house_path extends ColoredObject {
    constructor(shader_program) {
        super([], [], shader_program, 0.20392156862745098, 0.29411764705882354, 0.42745098039215684, 1.0);
        this.faces.push(...QUADRIC.cuboid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cuboid.createVertex(
            {},
            [],
            [2.3, 0.1, 0.8]
        ));
    }
}