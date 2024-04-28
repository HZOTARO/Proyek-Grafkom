import {TexturedObject} from "../../object.js";
export {Spongebob_house};

class Spongebob_house extends TexturedObject{
    texture;
    constructor(shader_program, texture) {
        super([], [], shader_program);
        this.texture = texture;

        var curve;
        this.faces.push(...QUADRIC.ellipsoid.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true, t_e:[0.5,1]},
            [0,35,0],
            [45,70,45])
        );

        this.childs = [
            new leaf(shader_program),
            new leaf(shader_program)
        ]

        LIBS.rotateY(this.childs[1].LOCAL_MATRIX,Math.PI/4);
        this.childs[1].LOCAL_MATRIX=LIBS.multiply(this.childs[1].LOCAL_MATRIX, LIBS.get_MScale(0.85,1,0.85));
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX, dt){
        GL.bindTexture(GL.TEXTURE_2D, Texture[this.texture]);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class leaf extends TexturedObject{
    constructor(shader_program) {
        super([], [], shader_program);
        var curve;
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                curve = CURVE.createPlane(
                    [
                        [0,1,Math.cos(i * Math.PI)],
                        [1,-1,0],
                        [-1,-1,0],
                        [0,1,Math.cos(i * Math.PI)],
                    ],25, this.vertex.length/5,
                    {vT: true, t_s:[2/3,1/2], t_e:[1,0.9]},
                    [0,105,0],
                    [40,40,40],
                    [(1-j)*2,1,j*2]
                );
                this.faces.push(...curve.faces);
                this.vertex.push(...curve.vertex);
            }
        }
    }
}