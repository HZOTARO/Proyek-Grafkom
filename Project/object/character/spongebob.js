import {TexturedObject} from "../object.js";
export {Spongebob}

class Spongebob extends TexturedObject{
    texture = null;
    l_arm = null;
    r_arm = null;
    l_thigh = null;
    r_thigh = null;
    jelly_net = null;
    constructor(shader_program, texture) {
        super([], [], shader_program);
        this.texture = texture;

        var curve = CURVE.createVase(
            [
                [0,1,0],
                [1,1,1],
                [1,0,1],
                [0.5,-1,0.5],
            ],40, 36,this.vertex.length/5,
            {vT: true, t_s:[1/12,11/12],t_e:[1/12,11/12]},
            [0,1,6.5],
            [1.25,1.25,5],
            [0,2,1]
        );
        this.faces.push(...curve.faces);
        this.vertex.push(...curve.vertex);

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

        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true, t_s:[2/3, 5/6]},
            [-3.3,4,4],
            [3.3,3.6,1],
            [],
            [-Math.PI/2,0]
            )
        );

        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true, t_s:[2/3, 5/6]},
            [3.5,3.9,4],
            [3.4,3.5,1],
            [],
            [-Math.PI/2,0]
            )
        );

        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
                {vT: true, t_s:[2/3, 5/6]},
                [-6,1.5,4],
                [2,1.5,1.5],
                [],
                [Math.PI/2,0]
            )
        );
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
                {vT: true, t_s:[1,5/6], t_e:[2/3, 1]},
                [6.35,1.3,4],
                [2.3,1.5,1.5],
                [],
                [-Math.PI/2,0]
            )
        );

        this.l_arm = new Spongebob_u_arm(shader_program);
        this.r_arm = new Spongebob_u_arm(shader_program);
        this.l_thigh = new Spongebob_thigh(shader_program);
        this.r_thigh = new Spongebob_thigh(shader_program);
        this.jelly_net = new Jellyfish_Net(shader_program)

        this.childs = [
            this.l_arm,
            this.r_arm,
            this.l_thigh,
            this.r_thigh,
        ];

        this.r_arm.l_arm.hand.childs.push(this.jelly_net);
        LIBS.translate(this.jelly_net.LOCAL_MATRIX,0.8,-1,0);
        LIBS.rotate(this.jelly_net.LOCAL_MATRIX,0,-0.1,-Math.PI/2);

        LIBS.translate(this.r_arm.LOCAL_MATRIX,-9.8,-5,0);
        LIBS.translate(this.l_arm.LOCAL_MATRIX,9.8,-5,0);
        LIBS.rotateZ(this.r_arm.LOCAL_MATRIX,-Math.PI/2);
        LIBS.rotateZ(this.l_arm.LOCAL_MATRIX,Math.PI/2);

        LIBS.translate(this.r_thigh.LOCAL_MATRIX,-4.75,-12,0);
        LIBS.translate(this.l_thigh.LOCAL_MATRIX,4.75,-12,0);

        LIBS.translate(this.LOCAL_MATRIX,0,2.5,0);
        LIBS.translate(this.WORLD_MATRIX,0,20,0);
    }

    setup() {
        super.setup();
        var blank = LIBS.get_I4();
        var f_rotate = LIBS.get_MRotate(0,0,0.9);
        this.animate([
            blank,
            LIBS.get_MRotate(0,0.3,-1.2),
            LIBS.get_MRotate(-1,-0.3,0), blank,
            blank, blank, blank,
            blank, blank, blank,
            blank, blank, blank,
            blank, blank, blank,
            LIBS.get_MRotate(0,-Math.PI/4,0),
            LIBS.get_MRotate(-1,-Math.PI/4,1), LIBS.get_MRotate(0.25,0.5,-0.5),
            f_rotate, f_rotate, f_rotate,
            f_rotate, f_rotate, f_rotate,
            f_rotate, f_rotate, f_rotate,
            f_rotate, f_rotate, f_rotate,
            blank,
            blank,blank,blank,
            blank,blank,blank,
        ]);
    }

    negate = false;
    rot_angle = 0;
    angle = Math.PI/2;
    speed = 1;
    anim_speed = 3;

    run(dt){
        var blank = LIBS.get_I4();
        var mov_a = Math.floor(Math. random()*2) - 2;
        if (this.rot_angle >= Math.PI/2) this.negate = true;
        if (this.rot_angle <= -Math.PI/2) this.negate = false;
        var rotate = Math.PI/2 * dt/1000 * (this.negate ? -1:1) * this.anim_speed;
        this.rot_angle += rotate;
        var mov = Math.abs(rotate/20) * mov_a;
        this.angle += mov;
        LIBS.translate(this.WORLD_MATRIX, -Math.cos(this.angle) * this.speed,0, Math.sin(this.angle) * this.speed);
        this.animate([
            LIBS.get_MRotate(0, mov + rotate/10,0),
            LIBS.get_MRotate(rotate,0,0),
            blank, blank,
            blank, blank, blank,
            blank, blank, blank,
            blank, blank, blank,
            blank, blank, blank,
            LIBS.get_MRotate(0,0,rotate/3),
            blank, blank, blank,
            blank, blank, blank,
            blank, blank, blank,
            blank, blank, blank,
            blank, blank, blank,

            LIBS.get_MRotate(-rotate/2,0,0),
            blank, blank,
            LIBS.get_MRotate(rotate/2,0,0),
            blank, blank,
        ]);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX, dt){
        GL.bindTexture(GL.TEXTURE_2D, Texture[this.texture]);
        this.run(dt);
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
            {vT: true, t_s:[3/12,11/12], t_e:[3/12,11/12]},
            [0,1.5,0],
            [1.7,2,2])
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
            {vT: true, t_s:[0.34,0.67], t_e:[0.49, 1]},
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

class Jellyfish_Net extends TexturedObject{
    constructor(shader_program) {
        super([], [], shader_program);

        var control = [
            [
                [-15,10,0],
                [-5,-10,0],
                [5,-10,0],
                [15,10,0]
            ],
            [
                [-10,10,-10],
                [-5,-10,-5],
                [5,-10,5],
                [10,10,10]
            ],
            [
                [-10,10,10],
                [-5,-10,5],
                [5,-10,-5],
                [10,10,-10]
            ],
            [
                [0,10,-15],
                [0,-10,-5],
                [0,-10,5],
                [0,10,15]
            ]
        ];

        var curve;

        for (let i = 0; i < 4; i++) {
            curve = CURVE.createCurvedCylinder(
                [
                    ...control[i]
                ],25, 10,this.vertex.length/5,
                {vT: true, t_s:[2/12,9/12], t_e:[2/12,9/12]},
                [0,-3,10],
                [0.2,0.3,0.2],
                []
            );
            this.faces.push(...curve.faces);
            this.vertex.push(...curve.vertex);

            this.faces.push(...QUADRIC.donut.createFaces(this.vertex.length/5));
            this.vertex.push(...QUADRIC.donut.createVertex(
                {vT: true, t_s:[2/12,9/12], t_e:[2/12,9/12]},
                [0,-4+0.6+i*0.85,10],
                [0.45*(i+3),0.45*(i+3),0.45*(i+3)],
                [],
                [],
                0.3 / (i+3)
                )
            );

            this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/5));
            this.vertex.push(...QUADRIC.cylinder.createVertex(
                    {vT: true, t_s:[0.51,0.67], t_e:[0.66,1]},
                    [0,0,5.8-i*3],
                    [0.3,0.3,1.5],
                    [0,2,1]
                )
            );
        }

        this.faces.push(...QUADRIC.donut.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.donut.createVertex(
                {vT: true, t_s:[7/12,10/12], t_e:[7/12,10/12]},
                [0,0,10],
                [2.9,2.9,2.9],
                [],
                [],
                0.125
            )
        );
    }
}