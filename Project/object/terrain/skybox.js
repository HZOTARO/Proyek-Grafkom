import {TexturedObject} from "../object.js";
export {Skybox};

class Skybox extends TexturedObject{
    constructor(shader_program) {
        var vertex = [];
        var faces = [];

        faces.push(...PLANE.rectangle.createFaces(vertex.length/5));
        vertex.push(...PLANE.rectangle.createVertex(
            {vT: true, t_e: [25, 25]},
            [],
            [25,0,25],
            [],
        ));

        super(vertex, faces, shader_program);

        this.childs = [
            // new Ball(shader_program)
        ];
    }

    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[1]);
        this.MODEL_MATRIX = LIBS.get_I4();
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

// class Ball extends TexturedObject{
//     constructor(shader_program) {
//         var vertex = [];
//         var faces = [];
//
//         faces.push(...QUADRIC.ellipsoid.createFaces(vertex.length/5));
//         vertex.push(...QUADRIC.ellipsoid.createVertex(
//             {vT: true},
//             [],
//             [],
//             [0,2,1]
//         ));
//
//         super(vertex, faces, shader_program);
//     }
//
//     render(VIEW_MATRIX, PROJECTION_MATRIX){
//         GL.bindTexture(GL.TEXTURE_2D, Texture[3]);
//         this.MODEL_MATRIX = LIBS.get_I4();
//         super.render(VIEW_MATRIX, PROJECTION_MATRIX);
//     }
// }