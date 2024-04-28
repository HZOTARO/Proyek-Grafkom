import {TexturedObject} from "../object.js";
export {rumahPatrick};

var temp = null;
class rumahPatrick extends TexturedObject{
    antenna1 = null;
    antenna2 = null;
    antenna3 = null;
    antenna4 = null;
    antenna5 = null;
    antenna6 = null;


    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.ellipsoid_half.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.ellipsoid_half.createVertex(
            {vT: true},
            [],
            [5,5,5],
            [],
            [])
        );

        this.antenna1 = new antenna(shader_program);
        this.antenna2 = new antenna(shader_program);
        this.antenna3 = new antenna(shader_program);
        this.antenna4 = new antenna(shader_program);
        this.antenna5 = new antenna(shader_program);
        this.antenna6 = new antenna(shader_program);


        this.childs = [
            this.antenna1,
            this.antenna2,
            this.antenna3,
            this.antenna4,
            this.antenna5,
            this.antenna6,
        ];

        LIBS.translate(this.LOCAL_MATRIX,10,1,0);

        LIBS.translateY(this.antenna1.LOCAL_MATRIX,5.8);

        LIBS.translateY(this.antenna2.LOCAL_MATRIX,6.5);
        LIBS.scaleY(this.antenna2.LOCAL_MATRIX,2);
        LIBS.rotateZ(this.antenna2.LOCAL_MATRIX,Math.PI/2);


        LIBS.translate(this.antenna3.LOCAL_MATRIX,0.8,6.5,0);
        LIBS.scaleY(this.antenna3.LOCAL_MATRIX,0.8);

        LIBS.translate(this.antenna4.LOCAL_MATRIX,1.3,6.5,0);
        LIBS.scaleY(this.antenna4.LOCAL_MATRIX,0.8);

        LIBS.translate(this.antenna5.LOCAL_MATRIX,-1,6.8,0);
        LIBS.scaleY(this.antenna5.LOCAL_MATRIX,0.7);
        LIBS.rotate(this.antenna5.LOCAL_MATRIX,Math.PI/3,Math.PI/2,Math.PI);
        
        LIBS.translate(this.antenna6.LOCAL_MATRIX,-1,6.2,0);
        LIBS.scaleY(this.antenna6.LOCAL_MATRIX,0.7);
        LIBS.rotate(this.antenna6.LOCAL_MATRIX,Math.PI,Math.PI/2,Math.PI/3);

    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[8]);
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}

class antenna extends TexturedObject{
    constructor(shader_program) {
        super([], [], shader_program);
        this.faces.push(...QUADRIC.cylinder.createFaces(this.vertex.length/5));
        this.vertex.push(...QUADRIC.cylinder.createVertex(
            {vT: true},
            [],
            [0.1,0.8,0.1])
        );
    }
    render(VIEW_MATRIX, PROJECTION_MATRIX){
        GL.bindTexture(GL.TEXTURE_2D, Texture[11]);
        temp = LIBS.get_I4();
        // LIBS.rotateY(temp, 0.05);

        this.LOCAL_MATRIX = LIBS.multiply(temp, this.LOCAL_MATRIX);
        super.render(VIEW_MATRIX, PROJECTION_MATRIX);
    }
}