import {TexturedObject} from "../object.js";
export {Skybox};

class Skybox extends TexturedObject{
    Dome= null;
    constructor(shader_program) {
        var vertex = [];
        var faces = [];

        faces.push(...PLANE.rectangle.createFaces(vertex.length/5));
        vertex.push(...PLANE.rectangle.createVertex(
            {vT: true, t_e: [25, 25]},
            [],
            [1000,1,1000],
            [],
        ));

        super(vertex, faces, shader_program);

        this.Dome = new Ball(shader_program);
    }

    setup() {
        super.setup();
        this.Dome.setup();
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX, pos){
        super.render_setup(VIEW_MATRIX, PROJECTION_MATRIX);
        GL.bindTexture(GL.TEXTURE_2D, Texture[3]);

        var scale = 1000;
        this.MODEL_MATRIX = LIBS.get_MTranslate(
            Math.floor((pos[0] - scale)/(2*scale)) * -2*scale - 3*scale,
            0,
            Math.floor((pos[2] - scale)/(2*scale)) * -2*scale - 3*scale
        );
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                GL.uniformMatrix4fv(this._MMatrix, false, this.MODEL_MATRIX);
                GL.drawElements(GL.TRIANGLES, this.faces.length, GL.UNSIGNED_SHORT, 0);
                LIBS.translateZ(this.MODEL_MATRIX,2*scale);
            }
            LIBS.translateX(this.MODEL_MATRIX,2*scale);
            LIBS.translateZ(this.MODEL_MATRIX,-4*scale);
        }

        this.Dome.WORLD_MATRIX = LIBS.get_MTranslate(-pos[0], -pos[1], -pos[2]);
        this.Dome.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class Ball extends TexturedObject{
    constructor(shader_program) {
        var vertex = [];
        var faces = [];

        faces.push(...QUADRIC.ellipsoid.createFaces(vertex.length/5));
        vertex.push(...QUADRIC.ellipsoid.createVertex(
            {vT: true},
            [],
            [900,900,900],
            [0,1,2],
            [0,0]
        ));

        super(vertex, faces, shader_program);
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[4]);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}