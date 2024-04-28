import {TexturedObject} from "../../object.js";
export {road, tiledRoad};

class road extends TexturedObject{
    texture;
    constructor(shader_program, texture) {
        super([], [], shader_program);
        this.texture = texture;

        this.faces.push(...PLANE.rectangle.createFaces(this.vertex.length/5));
        this.vertex.push(...PLANE.rectangle.createVertex(
            {vT: true, t_s:[0,0], t_e:[0.5,1]},
            [0,0.1,0]
            )
        );
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX, dt){
        GL.bindTexture(GL.TEXTURE_2D, Texture[this.texture]);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class tiledRoad extends TexturedObject{
    texture;
    constructor(shader_program, texture) {
        super([], [], shader_program);
        this.texture = texture;

        this.faces.push(...PLANE.rectangle.createFaces(this.vertex.length/5));
        this.vertex.push(...PLANE.rectangle.createVertex(
                {vT: true, t_s:[0.5,0], t_e:[1,1]},
                [0,0.1,0]
            )
        );
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX, dt){
        GL.bindTexture(GL.TEXTURE_2D, Texture[this.texture]);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}