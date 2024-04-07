/** @type {WebGLRenderingContext} */

// import {Spongebob} from "./object/character/spongebob.js";
// import {Skybox} from "./object/terrain/skybox.js";
import {TexturedObject} from "./object/obj.js";

function main() {
    var CANVAS = document.getElementById("myCanvas");

    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    var drag = false;
    var X_prev = 0;
    var Y_prev = 0;

    var dX = 0;
    var dY = 0;

    var mX = 0;
    var mY = -30;
    var mZ = -30;

    var nX = 0;
    var nY = 0;
    var nZ = 0;

    var THETA = 0;
    var ALPHA = Math.PI/4;
    var SPEED = 0.5;

    function loadRotation() {
        // Update THETA and ALPHA from localStorage
        const savedTheta = localStorage.getItem("thetaValue") ?? "0";
        const savedAlpha = localStorage.getItem("alphaValue") ?? "0.785";

        THETA = Number.parseFloat(savedTheta);
        ALPHA = Number.parseFloat(savedAlpha);


        const savedX = localStorage.getItem("xValue") ?? "0";
        const savedY = localStorage.getItem("yValue") ?? "-30";
        const savedZ = localStorage.getItem("zValue") ?? "-30";

        mX = Number.parseFloat(savedX);
        mY = Number.parseFloat(savedY);
        mZ = Number.parseFloat(savedZ)
    }

    function saveRotation() {
        localStorage.setItem("thetaValue", THETA.toString());
        localStorage.setItem("alphaValue", ALPHA.toString());

        localStorage.setItem("xValue", mX.toString());
        localStorage.setItem("yValue", mY.toString());
        localStorage.setItem("zValue", mZ.toString());
    }

    var FRICTION = 0.8;

    var mouseDown = function (e) {
        drag = true;
        X_prev = e.pageX;
        Y_prev = e.pageY;
    }
    var mouseUp = function (e) {
        drag = false;
    }
    var mouseMove = function (e) {
        if (!drag) {
            return false;
        }
        dX = e.pageX - X_prev;
        dY = e.pageY - Y_prev;

        X_prev = e.pageX;
        Y_prev = e.pageY;

        THETA += dX * 2 * Math.PI / CANVAS.width;
        ALPHA += dY * 2 * Math.PI / CANVAS.height;

        // ALPHA = Math.max(Math.min(0,ALPHA), -Math.PI/2);
        
        if (THETA >= Math.PI){
            THETA -= 2 * Math.PI;
        }else if (THETA <= -Math.PI){
            THETA += 2 * Math.PI;
        }
        console.log(ALPHA, THETA)
    }

    var keyDown = function (e) {
        var A = ALPHA + Math.PI * 2;
        var T = -THETA + Math.PI * 2;
        if (e.key === 'w') {
        }
        else if (e.key === 'a'){
            T += Math.PI/2;
            A = 0;
        }
        else if (e.key === 's') {
            T += Math.PI * 2;
            A += Math.PI;
        }
        else if (e.key === 'd') {
            T -= Math.PI/2;
            A = 0;
        }
        else if (e.key === 'q') {
            A += Math.PI/2;
            SPEED /= 2;
        }
        else if (e.key === 'e') {
            A -= Math.PI/2;
            SPEED /= 2;
        }
        else if (e.key === 'f'){
            mX = 0;
            mY = -30;
            mZ = -30;
            THETA = 0;
            ALPHA = Math.PI/4;
            SPEED = 0;
        }
        else {
            return;
        }

        A %= Math.PI * 2;
        T %= Math.PI * 2;
        nX += SPEED * Math.cos(A) * Math.sin(T);
        nZ += SPEED * Math.cos(A) * Math.cos(T);
        nY += SPEED * Math.sin(A);

        // mX += nX;
        // mY += nY;
        // mZ += nZ;

        SPEED = 0.5;
    }

    CANVAS.addEventListener("mousedown", mouseDown, false);
    CANVAS.addEventListener("mouseup", mouseUp, false);
    CANVAS.addEventListener("mouseout", mouseUp, false);
    CANVAS.addEventListener("mousemove", mouseMove, false);
    window.addEventListener("keydown", keyDown);

    try {
        GL = CANVAS.getContext("webgl", {antialias: true});
    } catch (e) {
        alert(e);
        return false;
    }

    Texture = TEXTURE.createTexture();
    var Shader = SHADER.createShader();

    //matrix
    var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 0.1, 1000);
    var VIEW_MATRIX = LIBS.get_I4();
    var MODEL_MATRIX = LIBS.get_I4();

    GL.useProgram(Shader.TEXTURE);

    // var object = new Spongebob(shader_vertex_source, shader_fragment_source_vertex);
    // var land = new Skybox(shader_vertex_source, shader_fragment_source_texture);
    var vertex = QUADRIC.cuboid.createVertex({vT: true});
    var faces = QUADRIC.cuboid.createFaces(0);
    var obj = new TexturedObject(vertex, faces, Shader.TEXTURE);

    var objects = [
        // object,
        // land
        obj
    ];


    for (let i = 0; i < objects.length; i++) {
        objects[i].setup();
    }
    /*========================= DRAWING ========================= */
    GL.clearColor(0.5, 0.5, 0.5, 0.0);

    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);

    var time_prev = 0;

    var animate = function (time) {
        GL.viewport(0, 0, CANVAS.width, CANVAS.height);
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
        var dt = time - time_prev;
        time_prev = time;

        if (!drag) {
            dX *= FRICTION;
            dY *= FRICTION;

            THETA += dX * 2 * Math.PI / CANVAS.width;
            ALPHA += dY * 2 * Math.PI / CANVAS.height;

            // ALPHA = Math.max(Math.min(0,ALPHA), -Math.PI/2);
        }
        nX *= FRICTION;
        nZ *= FRICTION;
        nY *= FRICTION;

        mX += nX;
        mY += nY;
        mZ += nZ;

        VIEW_MATRIX = LIBS.get_I4();

        var temp = LIBS.get_I4();
        LIBS.translate(temp, mX, mY, mZ);
        VIEW_MATRIX = LIBS.multiply(VIEW_MATRIX, temp);

        LIBS.rotate(temp, ALPHA, THETA, 0);
        temp = LIBS.get_I4();
        LIBS.rotateY(temp, THETA);
        VIEW_MATRIX = LIBS.multiply(VIEW_MATRIX, temp);
        temp = LIBS.get_I4();
        LIBS.rotateX(temp, ALPHA);
        VIEW_MATRIX = LIBS.multiply(VIEW_MATRIX, temp);

        // LIBS.rotateY(object.MODEL_MATRIX, THETA);
        // LIBS.rotateX(object.MODEL_MATRIX, ALPHA);
        // LIBS.setPosition(MODEL_MATRIX,pos_x,pos_y,pos_z);

        GL.useProgram(Shader.TEXTURE);
        GL.bindTexture(GL.TEXTURE_2D, Texture[1]);

        for (let i = 0; i < objects.length; i++) {
            objects[i].render(VIEW_MATRIX, PROJECTION_MATRIX);
        }

        window.requestAnimationFrame(animate);
    };


    loadRotation();
    animate(0);

    window.addEventListener("beforeunload", loadRotation);
    setInterval(saveRotation, 1000);
}

window.addEventListener('load', main);