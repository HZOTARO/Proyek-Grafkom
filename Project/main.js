/** @type {WebGLRenderingContext} */
var GL;

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
    var mY = -3;
    var mZ = 0;

    var nX = 0;
    var nY = 0;
    var nZ = 0;

    var THETA = 0;
    var ALPHA = 0;
    var SPEED = 1;

    function loadRotation() {
        // Update THETA and ALPHA from localStorage
        const savedTheta = localStorage.getItem("thetaValue") ?? "0";
        const savedAlpha = localStorage.getItem("alphaValue") ?? "0";

        THETA = Number.parseFloat(savedTheta);
        ALPHA = Number.parseFloat(savedAlpha);

    }

    function saveRotation() {
        localStorage.setItem("thetaValue", THETA.toString());
        localStorage.setItem("alphaValue", ALPHA.toString());
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
        }
        else if (e.key === 'e') {
            A -= Math.PI/2;
        }
        else if (e.key = 'f'){
            mX = 0;
            mY = -3;
            mZ = 0;
        }
        else {
            return;
        }

        A %= Math.PI * 2;
        T %= Math.PI * 2;
        nX += SPEED * Math.cos(A) * Math.sin(T);
        nZ += SPEED * Math.cos(A) * Math.cos(T);
        nY += SPEED * Math.sin(A);

        mX += nX;
        mY += nY;
        mZ += nZ;
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


    //shader
    var shader_vertex_source = `
      attribute vec3 position;
      attribute vec2 uv;
      attribute vec3 color;
      
      varying vec2 vUV;

      uniform mat4 PMatrix, VMatrix, MMatrix;
     
      varying vec3 vColor;
      void main(void) {
          gl_Position = PMatrix * VMatrix * MMatrix * vec4(position, 1.);
          vUV = uv;
          vColor = color;
          gl_PointSize=5.0;
      }`;

    var shader_fragment_source = `
      precision mediump float;
      
      uniform vec3 vColor;
      uniform float greyScality;

      void main(void) {
          float greyScaleValue = (vColor.r + vColor.g + vColor.b)/3.;
          vec3 greyScaleColor = vec3(greyScaleValue, greyScaleValue, greyScaleValue);
          vec3 color = mix(greyScaleColor, vColor, greyScality);
          gl_FragColor = vec4(color, 1.);
      }`;

    var shader_fragment_source_texture = `
      precision mediump float;
      
      uniform sampler2D sampler;
      varying vec2 vUV;

      void main(void) {
          gl_FragColor = texture2D(sampler, vUV);
      }`;

    var shader_fragment_source_vertex = `
      precision mediump float;
      varying vec3 vColor;

      void main(void) {
      gl_FragColor = vec4(vColor, 1.);
      }`;

    //matrix
    var PROJECTION_MATRIX = LIBS.get_projection(45, CANVAS.width / CANVAS.height, 1, 10000);
    var VIEW_MATRIX = LIBS.get_I4();
    var MODEL_MATRIX = LIBS.get_I4();

    var object = new Spongebob(shader_vertex_source, shader_fragment_source_vertex);
    var land = new Skybox(shader_vertex_source, shader_fragment_source_texture);

    var objects = [
        object,
        land
    ];

    var texture = TEXTURE.createTexture();

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
        GL.clear(GL.COLOR_BUFFER_BIT | GL.D_BUFFER_BIT);
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


        // var radius = 0;
        // var pos_x = radius * Math.cos(ALPHA) * Math.sin(THETA);
        // var pos_y = radius * Math.sin(ALPHA);
        // var pos_z = radius * Math.cos(ALPHA) * Math.cos(THETA);

        xDir = -THETA;
        yDir = -ALPHA;

        // object.MODEL_MATRIX = LIBS.get_I4();
        // LIBS.rotateY(object.MODEL_MATRIX, THETA);
        // LIBS.rotateX(object.MODEL_MATRIX, ALPHA);
        // LIBS.setPosition(MODEL_MATRIX,pos_x,pos_y,pos_z);

        VIEW_MATRIX = LIBS.get_I4();
        // LIBS.translateZ(VIEW_MATRIX, -20);

        // console.log(2*Math.PI)
        // console.log(THETA, ALPHA)
        // VIEW_MATRIX = CAMERA.inverse(CAMERA.lookAt([mX, mY, mZ],[mX + xDir, mY + yDir, mZ + 1],[mX, mY+1, mZ]));
        // VIEW_MATRIX = CAMERA.lookAt([mX, mY, mZ],[mX + xDir, mY + yDir, mZ + 1],[mX, mY+1, mZ]);
        // console.log(ALPHA, THETA)

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


        GL.activeTexture(GL.TEXTURE0);
        GL.bindTexture(GL.TEXTURE_2D, texture[0]);
        // GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.REPEAT);
        // GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.REPEAT);

        for (let i = 0; i < objects.length; i++) {
            objects[i].render(VIEW_MATRIX, PROJECTION_MATRIX);
        }

        window.requestAnimationFrame(animate);
    };


    // loadRotation();
    animate(0);

    // window.addEventListener("beforeunload", loadRotation);
    setInterval(saveRotation, 1000);
}

window.addEventListener('load', main);
//petra.id/codegrafkom