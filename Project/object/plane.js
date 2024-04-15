function clamp(input){
    arr = []
    for (let i = 0; i < input.length; i++) {
        arr.push(input[i] / 2 + 0.5);
    }
    return arr;
}

function normalize(x, y, z){
    var t = Math.sqrt(x**2 + y**2 + z**2);
    return [x/t, y/t, z/t];
}

var PLANE = {
    rectangle:{
        createVertex: function (
            {vC = false, vT = false,
                t_s = [0, 0], t_e = [1, 1]} = {},
            [o_x = 0, o_y = 0, o_z = 0] = [],
            [s_x = 1, s_y = 1, s_z = 1] = [],
            [x = 0, y = 1, z = 2] = []
        ) {
            var vertex = [];
            var central = [o_x,o_y,o_z];

            var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];

            for(let u= -1; u <= 1; u += 2) {
                for(let v= -1; v <= 1; v += 2){

                    var pos = [
                        u, 0, v
                    ];

                    vertex.push(
                        pos[x] * s_x + o_x,
                        pos[y] * s_y + o_y,
                        pos[z] * s_z + o_z
                    );

                    if (vC){
                        vertex.push(...clamp(normalize(pos[x]-central[x], pos[y]-central[y], pos[z]-central[z])));
                    }
                    if (vT){
                        var t_p = clamp([u, -v]);
                        vertex.push(
                            t_p[0] * t_d[0] + t_s[0],
                            t_p[1] * t_d[1] + t_s[1]
                        );
                    }
                }
            }
            return vertex;
        },
        createFaces: function (offset) {
            var faces = [
                offset + 0, offset + 1, offset + 2,
                offset + 1, offset + 2, offset + 3
            ];
            return faces;
        }
    },
    circle:{
        createVertex: function (
            {vC = false, vT = false,
                t_s = [0, 0], t_e = [1, 1]} = {},
            [o_x = 0, o_y = 0, o_z = 0] = [],
            [s_x = 1, s_y = 1, s_z = 1] = [],
            [x = 0, y = 1, z = 2] = [],
        ) {
            var vertex = [o_x,o_y,o_z];
            var central = [o_x,o_y,o_z];
            var step = Math.PI/30;

            var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];

            if (vC){
                vertex.push(o_x,o_y,o_z);
            }
            if (vT){
                vertex.push(
                    0.5 * t_d[0] + t_s[0],
                    0.5 * t_d[1] + t_s[1]
                );
            }

            for(let u= 0; u < Math.PI * 2; u += step) {
                var pos = [
                    Math.cos(u),
                    0,
                    Math.sin(u)
                ];

                vertex.push(
                    pos[x] * s_x + o_x,
                    pos[y] * s_y + o_y,
                    pos[z] * s_z + o_z
                );

                if (vC){
                    vertex.push(...clamp(normalize(pos[x]-central[x], pos[y]-central[y], pos[z]-central[z])));
                }
                if (vT){
                    var t_p = clamp([pos[0], -pos[2]]);
                    vertex.push(
                        t_p[0] * t_d[0] + t_s[0],
                        t_p[1] * t_d[1] + t_s[1]
                    );
                }
            }
            return vertex;
        },
        createFaces: function (offset) {
            var faces = [0, 1, 60];
            for (let i = 1; i < 60; i++) {
                faces.push(0, i, i+1);
            }
            return faces;
        }
    }
};