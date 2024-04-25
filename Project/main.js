/** @type {WebGLRenderingContext} */

import {Spongebob} from "./object/character/spongebob.js";
import {Skybox} from "./object/terrain/skybox.js";
import {TexturedObject} from "./object/object.js";

function main() {
    var CANVAS = document.getElementById("myCanvas");

    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    // look up the elements we want to affect
    var data = [
        document.querySelector("#posxyz"),
        document.querySelector("#alpha"),
        document.querySelector("#theta")
    ]

    // Create text nodes to save some time for the browser.
    var node = [
        document.createTextNode(""),
        document.createTextNode(""),
        document.createTextNode("")
    ]

    // Add those text nodes where they need to go
    for (let i = 0; i < data.length; i++) {
        data[i].appendChild(node[i]);
    }

    var drag = false;
    var X_prev = 0;
    var Y_prev = 0;

    var dX = 0;
    var dY = 0;

    var pX = 0;
    var pY = -30;
    var pZ = -30;

    var mX = 0;
    var mY = 0;
    var mZ = 0;

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

        pX = Number.parseFloat(savedX);
        pY = Number.parseFloat(savedY);
        pZ = Number.parseFloat(savedZ)
    }

    function saveRotation() {
        localStorage.setItem("thetaValue", THETA.toString());
        localStorage.setItem("alphaValue", ALPHA.toString());

        localStorage.setItem("xValue", pX.toString());
        localStorage.setItem("yValue", pY.toString());
        localStorage.setItem("zValue", pZ.toString());
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
        // console.log(ALPHA, THETA)
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
            pX = 0;
            pY = -30;
            pZ = -30;
            THETA = 0;
            ALPHA = Math.PI/4;
            SPEED = 0;
        }
        else {
            return;
        }

        A %= Math.PI * 2;
        T %= Math.PI * 2;
        mX += SPEED * Math.cos(A) * Math.sin(T);
        mZ += SPEED * Math.cos(A) * Math.cos(T);
        mY += SPEED * Math.sin(A);

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

    var Shader = SHADER.createShader();
    Texture = TEXTURE.createTexture();

    //matrix
    var PROJECTION_MATRIX = LIBS.get_projection(40, CANVAS.width / CANVAS.height, 0.1, 1000);
    var VIEW_MATRIX = LIBS.get_I4();

    /*========================= OBJECTS ========================= */
    var spongebob = new Spongebob(Shader.TEXTURE);
    // var land = new Skybox(Shader.TEXTURE);

    var vertex_colored_object = [
    ];

    var textured_object = [
        // land,
        spongebob,
    ];

    var test_plane = [
        // new TexturedObject(
        //     PLANE.circle.createVertex(
        //         {vT: true},
        //         [0,0,0],
        //         [],
        //         [0,1,2]
        //     ),
        //     PLANE.circle.createFaces(0), Shader.TEXTURE),
        // new TexturedObject(
        //     PLANE.rectangle.createVertex(
        //         {vT: true},
        //         [0,20,0],
        //         [20,-20,20],
        //         [0,2,1]
        //     ),
        //     PLANE.rectangle.createFaces(0), Shader.TEXTURE),
    ];

    var test_quadric = [
        // new TexturedObject(
        //     QUADRIC.height_circle.createVertex(
        //         {vT: true},
        //     ),
        //     QUADRIC.height_circle.createFaces(0), Shader.TEXTURE),
        //
        // new TexturedObject(
        //     QUADRIC.cuboid.createVertex(
        //         {vT: true},
        //         // [],
        //         // [],
        //         // [],
        //         // []
        //     ),
        //     QUADRIC.cuboid.createFaces(0), Shader.TEXTURE),
        //
        // new TexturedObject(
        //     QUADRIC.ellipsoid.createVertex(
        //         {vT: true},
        //         [5,0,0],
        //         [],
        //         [0,1,2],
        //         [],
        //     ),
        //     QUADRIC.ellipsoid.createFaces(0), Shader.TEXTURE),
        //
        // new TexturedObject(
        //     QUADRIC.elliptic_cone.createVertex(
        //         {vT: true},
        //         [-5,0,0],
        //         [],
        //         [0,1,2],
        //         [],
        //     ),
        //     QUADRIC.elliptic_cone.createFaces(0), Shader.TEXTURE),
        //
        // new TexturedObject(
        //     QUADRIC.elliptic_paraboloid.createVertex(
        //         {vT: true},
        //         [0,5,0],
        //         [],
        //         [0,1,2],
        //         [],
        //     ),
        //     QUADRIC.elliptic_paraboloid.createFaces(0), Shader.TEXTURE),
        //
        // new TexturedObject(
        //     QUADRIC.donut.createVertex(
        //         {vT: true},
        //         [-5,5,0],
        //         [],
        //         [0,1,2],
        //         [],
        //     ),
        //     QUADRIC.donut.createFaces(0), Shader.TEXTURE),
        //
        // new TexturedObject(
        //     QUADRIC.height_saddle.createVertex(
        //         {vT: true},
        //         [5,-5,0],
        //         [],
        //         [0,1,2],
        //         []
        //     ),
        //     QUADRIC.height_saddle.createFaces(0), Shader.TEXTURE),
        //
        // new TexturedObject(
        //     QUADRIC.saddle.createVertex(
        //         {vT: true},
        //         [0,-5,0],
        //         [],
        //         [0,1,2],
        //         []
        //     ),
        //     QUADRIC.saddle.createFaces(0), Shader.TEXTURE),
        //
        // new TexturedObject(
        //     QUADRIC.cylinder.createVertex(
        //         {vT: true},
        //         [-5,-5,0],
        //         [],
        //         [0,1,2],
        //         []
        //     ),
        //     QUADRIC.cylinder.createFaces(0), Shader.TEXTURE),
    ];

    /*========================= SETUP ========================= */
    for (let i = 0; i < vertex_colored_object.length; i++) {
        vertex_colored_object[i].setup();
    }
    for (let i = 0; i < textured_object.length; i++) {
        textured_object[i].setup();
    }
    for (let i = 0; i < test_quadric.length; i++) {
        test_quadric[i].setup();
    }
    for (let i = 0; i < test_plane.length; i++) {
        test_plane[i].setup();
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
        mX *= FRICTION;
        mZ *= FRICTION;
        mY *= FRICTION;

        pX += mX;
        pY += mY;
        pZ += mZ;

        /*========================= CAMERA ========================= */
        VIEW_MATRIX = LIBS.get_I4();

        var temp = LIBS.get_I4();
        LIBS.translate(temp, pX, pY, pZ);
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

        /*========================= RENDER ========================= */

        GL.useProgram(Shader.VERTEX_COLOR);
        for (let i = 0; i < vertex_colored_object.length; i++) {
            vertex_colored_object[i].render(VIEW_MATRIX, PROJECTION_MATRIX);
        }

        GL.useProgram(Shader.TEXTURE);
        for (let i = 0; i < test_quadric.length; i++) {
            test_quadric[i].render(VIEW_MATRIX, PROJECTION_MATRIX);
        }

        for (let i = 0; i < textured_object.length; i++) {
            textured_object[i].render(VIEW_MATRIX, PROJECTION_MATRIX, dt);
        }

        // GL.bindTexture(GL.TEXTURE_2D, Texture[6]);
        for (let i = 0; i < test_plane.length; i++) {
            test_plane[i].render(VIEW_MATRIX, PROJECTION_MATRIX);
        }

        /*========================= DATA ========================= */
        node[0].nodeValue = pX.toFixed(0) + ", " + pY.toFixed(0) + ", " + pZ.toFixed(0);
        node[1].nodeValue = ALPHA.toFixed(2);
        node[2].nodeValue = THETA.toFixed(2);

        window.requestAnimationFrame(animate);
    };


    loadRotation();
    animate(0);

    window.addEventListener("beforeunload", loadRotation);
    setInterval(saveRotation, 1000);
}

window.addEventListener('load', main);