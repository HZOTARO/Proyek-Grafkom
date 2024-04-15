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

var SHADER = {
    createShader: function (){
        var compile_shader = function(source, type, typeString) {
            var shader = GL.createShader(type);
            GL.shaderSource(shader, source);
            GL.compileShader(shader);
            if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
                alert("ERROR IN " + typeString + " SHADER: " + GL.getShaderInfoLog(shader));
                return false;
            }
            return shader;
        };

        var shader_vertex = compile_shader(shader_vertex_source, GL.VERTEX_SHADER, "VERTEX");
        var shader_fragment = [];

        var shader_fragment_src = [
            shader_fragment_source,
            shader_fragment_source_vertex,
            shader_fragment_source_texture
        ];

        var SHADER_PROGRAM = [];

        for (let i = 0; i < shader_fragment_src.length; i++) {
            shader_fragment[i] = compile_shader(shader_fragment_src[i], GL.FRAGMENT_SHADER, "FRAGMENT");
            SHADER_PROGRAM[i] = GL.createProgram();
            GL.attachShader(SHADER_PROGRAM[i], shader_vertex);
            GL.attachShader(SHADER_PROGRAM[i], shader_fragment[i]);
            GL.linkProgram(SHADER_PROGRAM[i]);

            var _position = GL.getAttribLocation(SHADER_PROGRAM[i], "position");
            GL.enableVertexAttribArray(_position);
        }

        return Object.freeze({
            COLOR: SHADER_PROGRAM[0],
            VERTEX_COLOR: SHADER_PROGRAM[1],
            TEXTURE: SHADER_PROGRAM[2]
        });
    },
}
