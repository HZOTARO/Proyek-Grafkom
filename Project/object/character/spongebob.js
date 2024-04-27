import {TexturedObject} from "../object.js";
export {Spongebob}

class Spongebob extends TexturedObject{
    time = 0;
    negate = false;
    l_arm = null;
    r_arm = null;
    l_thigh = null;
    r_thigh = null;
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true},
            [],
            [0.1,0.1,0.1])
        );

        this.faces.push(...QUADRIC.sponge.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.sponge.createVertex(
            {vT: true, t_s:[0, 1/3], t_e:[1, 2/3]},
            [0,2,0],
            [10,9.25,4])
        );

        this.faces.push(...QUADRIC.cuboid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cuboid.createVertex(
            {vT: true, t_e:[1, 1/3]},
            [0,-9,0],
            [9,3,3.5])
        );

        // this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        // this.vertex.push(...QUADRIC.ellipsoid.createVertex(
        //     {vT: true},
        //     [-3.2,3.9,4],
        //     [3.1,3.1,3])
        // );
        //
        // this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        // this.vertex.push(...QUADRIC.ellipsoid.createVertex(
        //     {vT: true},
        //     [3.3,3.9,4],
        //     [3.1,3.1,3])
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

        LIBS.translate(this.l_arm.LOCAL_MATRIX,-9.8,-5,0);
        LIBS.translate(this.r_arm.LOCAL_MATRIX,9.8,-5,0);
        LIBS.rotateZ(this.l_arm.LOCAL_MATRIX,-Math.PI/2);
        LIBS.rotateZ(this.r_arm.LOCAL_MATRIX,Math.PI/2);

        LIBS.translate(this.l_thigh.LOCAL_MATRIX,-4.75,-12,0);
        LIBS.translate(this.r_thigh.LOCAL_MATRIX,4.75,-12,0);

        LIBS.translate(this.LOCAL_MATRIX,0,5,0);
        LIBS.translate(this.WORLD_MATRIX,0,20,0);
    }

    rotate(dt){
        if (this.time > 200) this.negate = true;
        else if (this.time < -200) this.negate = false;
        this.negate ? this.time -= dt : this.time += dt;
        var translate, scale;
        this.negate ? translate = -1 : translate = 1;
        this.negate ? scale = 100/99 : scale = 99/100;
        var arr = [LIBS.get_MScale(scale,scale,scale), LIBS.get_MTranslate(0,translate,0)];
        this.animate(arr);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX, dt){
        GL.bindTexture(GL.TEXTURE_2D, Texture[2]);
        this.rotate(dt);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Spongebob_u_arm extends TexturedObject{
    l_arm = null;
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true},
            [],
            [0.1,0.1,0.1])
        );
        this.faces.push(...QUADRIC.elliptic_paraboloid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.elliptic_paraboloid.createVertex(
            {vT: true, t_s:[2/12,9/12], t_e:[2/12,9/12]},
            [0,-0.4,0],
            [1.5,1.5,1.5])
        );
        this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cylinder.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [0,-1.75,0],
            [0.6,1.75,0.6])
        );

        this.l_arm = new Spongebob_l_arm(shader_program);

        this.childs = [
            this.l_arm
        ];

        LIBS.translate(this.l_arm.LOCAL_MATRIX,0,-3.5,0);
    }
}

class Spongebob_l_arm extends TexturedObject{
    hand = null;
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [],
            [0.6,0.6,0.6])
        );
        this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cylinder.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [0,-1.75,0],
            [0.6,1.75,0.6])
        );

        this.hand = new Spongebob_hand(shader_program);

        this.childs = [
            this.hand
        ];

        LIBS.translate(this.hand.LOCAL_MATRIX,0,-3.5,0);
    }
}

class Spongebob_hand extends TexturedObject{
    f1 = null;
    f2 = null;
    f3 = null;
    f4 = null;
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [],
            [0.6,0.6,0.6])
        );

        this.faces.push(...QUADRIC.donut.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.donut.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [0,-0.8,0],
            [0.5,0.5,0.5],
            [1,0,2],
            [],
            1.5
            )
        );

        this.f1 = new Spongebob_p_phalanx(shader_program);
        this.f2 = new Spongebob_p_phalanx(shader_program);
        this.f3 = new Spongebob_p_phalanx(shader_program);
        this.f4 = new Spongebob_p_phalanx(shader_program);

        this.childs = [
            this.f1,
            this.f2,
            this.f3,
            this.f4,
        ];

        for (let i = 0; i < this.childs.length; i++) {
            LIBS.translateY(this.childs[i].LOCAL_MATRIX, -0.8);
            LIBS.rotateX(this.childs[i].LOCAL_MATRIX, 0.75 * i - 1.25);

            var temp = LIBS.get_I4();
            LIBS.translateY(temp,-1.25);
            this.childs[i].LOCAL_MATRIX = LIBS.multiply(temp, this.childs[i].LOCAL_MATRIX);
        }
    }
}

class Spongebob_p_phalanx extends TexturedObject{
    extend = null;
    
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [],
            [0.3,0.3,0.3])
        );
        this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cylinder.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [0,-0.3,0],
            [0.3,0.3,0.3])
        );
        this.extend= new Spongebob_m_phalanx(shader_program);

        this.childs = [
            this.extend
        ];

        LIBS.translate(this.extend.LOCAL_MATRIX,0,-0.6,0);
    }
}

class Spongebob_m_phalanx extends TexturedObject{
    extend = null;
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [],
            [0.3,0.3,0.3])
        );
        this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cylinder.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [0,-0.3,0],
            [0.3,0.3,0.3])
        );
        this.extend= new Spongebob_d_phalanx(shader_program);

        this.childs = [
            this.extend
        ];

        LIBS.translate(this.extend.LOCAL_MATRIX,0,-0.6,0);
    }
}

class Spongebob_d_phalanx extends TexturedObject{
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [],
            [0.3,0.3,0.3])
        );
        this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cylinder.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [0,-0.3,0],
            [0.3,0.3,0.3])
        );
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [0,-0.6,0],
            [0.3,0.3,0.3])
        );
    }
}

class Spongebob_thigh extends TexturedObject{
    leg = null;
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true},
            [],
            [0.1,0.1,0.1])
        );
        this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cylinder.createVertex(
            {vT: true, t_s:[3/12,11/12], t_e:[3/12,11/12]},
            [],
            [1.7,1.5,2])
        );
        this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cylinder.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [0,-2.25,0],
            [0.6,2.25,0.6])
        );

        this.leg = new Spongebob_leg(shader_program);

        this.childs = [
            this.leg
        ];

        LIBS.translate(this.leg.LOCAL_MATRIX,0,-4.5,0);
    }
}

class Spongebob_leg extends TexturedObject{
    shoe = null;
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [],
            [0.6,0.6,0.6])
        );
        this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cylinder.createVertex(
            {vT: true, t_s:[1/12,11/12], t_e:[1/12,11/12]},
            [0,-2.4,0],
            [0.6,2.4,0.6])
        );

        this.shoe = new Spongebob_shoe(shader_program);

        this.childs = [
            this.shoe
        ];

        LIBS.translate(this.shoe.LOCAL_MATRIX,0,-4.8,0);
    }
}

class Spongebob_shoe extends TexturedObject{
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true},
            [],
            [0.1,0.1,0.1])
        );

        this.faces.push(...QUADRIC.height_saddle.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.height_saddle.createVertex(
            {vT: true, t_s:[1/12,9/12], t_e:[1/12,9/12]},
            [0,-0.2,2.5],
            [0.9,0.2,1.1],
            [2,1,0],
            [-10,0],
            -6)
        );

        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true, t_s:[1/12,9/12], t_e:[1/12,9/12]},
            [0,-0.3,3],
            [1.3,1.1,1.4])
        );

        this.faces.push(...QUADRIC.donut.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.donut.createVertex(
            {vT: true, t_s:[1/12,9/12], t_e:[1/12,9/12]},
            [0,0.2,0],
            [0.8,1.2,0.8],
            [],
            [],
            0.7)
        );

        this.faces.push(...QUADRIC.cuboid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cuboid.createVertex(
            {vT: true, t_s:[1/12,9/12], t_e:[1/12,9/12]},
            [0,-0.5,0],
            [0.8,0.8,0.8]
        ));
    }
}