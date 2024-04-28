/** @type {WebGLRenderingContext} */

import {Skybox} from "./object/environment/skybox.js";
import {Spongebob} from "./object/character/spongebob.js";
import {Patrick} from "./object/character/patrick.js";
import {Squidward} from "./object/character/squidward.js";
import {Spongebob_house} from "./object/environment/terrain/spongebob_house.js";
import {Squidward_house} from "./object/environment/terrain/squidward_house.js";
import {rumahPatrick} from "./object/environment/terrain/Rumah_Patrick.js";
import {Flower} from "./object/environment/terrain/flower.js";
import {road, tiledRoad} from "./object/environment/terrain/road.js";

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
    var pY = -50;
    var pZ = -50;

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
        const savedY = localStorage.getItem("yValue") ?? "-50";
        const savedZ = localStorage.getItem("zValue") ?? "-50";

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
        }
        else if (e.key === 'e') {
            A -= Math.PI/2;
        }
        else if (e.key === 'f'){
            pX = 0;
            pY = -50;
            pZ = -50;
            THETA = 0;
            ALPHA = Math.PI/4;
        }
        else {
            return;
        }

        A %= Math.PI * 2;
        T %= Math.PI * 2;
        mX += SPEED * Math.cos(A) * Math.sin(T);
        mZ += SPEED * Math.cos(A) * Math.cos(T);
        mY += SPEED * Math.sin(A);
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
    var world = new Skybox(Shader.TEXTURE);

    var spongebob = new Spongebob(Shader.TEXTURE, 5);
    LIBS.scale(spongebob.WORLD_MATRIX,0.1,0.1,0.1);
    LIBS.translate(spongebob.WORLD_MATRIX,20,-18,25);
    spongebob.speed = 0.05;

    var patrick = new Patrick(Shader.TEXTURE);
    LIBS.scale(patrick.WORLD_MATRIX,0.6,0.6,0.6);
    LIBS.translate(patrick.WORLD_MATRIX,-30,0,20);

    var squidward = new Squidward(Shader.COLOR);
    LIBS.scale(squidward.WORLD_MATRIX,0.1,0.1,0.1);
    LIBS.translate(squidward.WORLD_MATRIX,0,-2,30);

    var spongebob_house = new Spongebob_house(Shader.TEXTURE, 7);
    LIBS.scale(spongebob_house.WORLD_MATRIX,0.14,0.14,0.14);
    LIBS.translate(spongebob_house.WORLD_MATRIX,22,0,0);

    var RumahPatrick = new rumahPatrick(Shader.TEXTURE);
    LIBS.scale(RumahPatrick.WORLD_MATRIX,1.1,1.3,1.1);
    LIBS.translate(RumahPatrick.WORLD_MATRIX,-33,-1.4,0);

    var squidward_house = new Squidward_house(Shader.TEXTURE);

    // var flower = new Flower(Shader.COLOR);
    var roads =[];
    var plain_road = new road(Shader.TEXTURE,11);
    LIBS.scale(plain_road.WORLD_MATRIX,2.5,1,10);
    LIBS.translate(plain_road.WORLD_MATRIX,-22,0,15);
    roads = [plain_road]

    var tiled_road = new tiledRoad(Shader.TEXTURE,11);
    LIBS.scale(tiled_road.WORLD_MATRIX,2.5,1,10);
    LIBS.translate(tiled_road.WORLD_MATRIX,21.72,0,15);
    roads.push(tiled_road)


    for (let i = -100; i < 100; i++) {
        var temp_road = new road(Shader.TEXTURE,11);
        LIBS.scale(temp_road.WORLD_MATRIX,2.5,1,10);
        LIBS.rotateY(temp_road.WORLD_MATRIX,Math.PI/2);
        LIBS.translate(temp_road.WORLD_MATRIX,20*i,0,27.5);
        roads.push(temp_road);
    }

    var colored_object = [
        squidward,
        // flower,
    ];

    var textured_object = [
        spongebob_house,
        squidward_house,
        RumahPatrick,
        ...roads,
    ];

    var character_object = [
        spongebob,
        patrick
    ];

    /*========================= SETUP ========================= */
    for (let i = 0; i < colored_object.length; i++) {
        colored_object[i].setup();
    }
    for (let i = 0; i < textured_object.length; i++) {
        textured_object[i].setup();
    }
    for (let i = 0; i < character_object.length; i++) {
        character_object[i].setup();
    }

    world.setup();

    /*========================= DRAWING ========================= */
    var clear = [0.5, 0.5, 0.5, 0.0];
    // clear = [0,0.68,0.88,0.0];
    GL.clearColor(...clear);

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
        pX += mX;
        pY += mY;
        pZ += mZ;

        mX *= FRICTION;
        mZ *= FRICTION;
        mY *= FRICTION;

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

        /*========================= RENDER ========================= */

        GL.useProgram(Shader.COLOR);
        for (let i = 0; i < colored_object.length; i++) {
            colored_object[i].render(VIEW_MATRIX, PROJECTION_MATRIX);
        }

        GL.useProgram(Shader.TEXTURE);
        world.render(VIEW_MATRIX, PROJECTION_MATRIX, [pX,pY,pZ]);
        for (let i = 0; i < textured_object.length; i++) {
            textured_object[i].render(VIEW_MATRIX, PROJECTION_MATRIX);
        }
        for (let i = 0; i < character_object.length; i++) {
            character_object[i].render(VIEW_MATRIX, PROJECTION_MATRIX, dt);
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