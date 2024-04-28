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

function generateCurve(controlPoint, count){
    var curves = [];
    var n = controlPoint.length;

    var comb = [1];
    var temp = 1;
    for (let i = 1; i < n - 1; i++) {
        temp = temp / i * (n-i);
        comb.push(temp);
    }
    comb.push(1);

    for (let i = 0; i <= count; i++) {
        var t = i / count;
        var x = 0;
        var y = 0;
        var z = 0;
        for (let j = 0; j < n; j++) {
            var multiplier = comb[j] * (1 - t)**(n-j-1) * t**j;
            var tempX = controlPoint[j][0] * multiplier;
            var tempY = controlPoint[j][1] * multiplier;
            var tempZ = controlPoint[j][2] * multiplier;
            x+=tempX;
            y+=tempY;
            z+=tempZ;
        }
        curves.push([x, y, z]);
    }
    return curves;
}

var CURVE = {
    createPlane: function(
        controlPoint, count, offset,
        {vC = false, vT = false,
            t_s = [0, 0], t_e = [1, 1]} = {},
        [o_x = 0, o_y = 0, o_z = 0] = [],
        [s_x = 1, s_y = 1, s_z = 1] = [],
        [x = 0, y = 1, z = 2] = []
    ) {
        var vertex = [];
        var faces = [];
        var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];
        var curve = generateCurve(controlPoint, count);

        for (let i = 0; i < curve.length; i++) {
            var pos = curve[i];

            vertex.push(
                pos[x] * s_x + o_x,
                pos[y] * s_y + o_y,
                pos[z] * s_z + o_z
            );

            if (vC){
                vertex.push(...clamp(normalize(pos[x], pos[y], pos[z])));
            }

            if (vT){
                var t_p = clamp([pos[0], -pos[2]]);
                vertex.push(
                    t_p[0] * t_d[0] + t_s[0],
                    t_p[1] * t_d[1] + t_s[1]
                );
            }
        }

        for (let i = 0; i < curve.length - 1; i++) {
            faces.push(offset + 0, offset + i, offset + i + 1);
        }

        return {vertex, faces};
    },
    createCurvedCylinder: function(
        controlPoint, count, intensity, offset,
        {vC = false, vT = false,
            t_s = [0, 0], t_e = [1, 1]} = {},
        [o_x = 0, o_y = 0, o_z = 0] = [],
        [s_x = 1, s_y = 1, s_z = 1] = [],
        [x = 0, y = 1, z = 2] = []
    ) {
        var vertex = [];
        var faces = [];
        var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];
        var curve = generateCurve(controlPoint, count);
        var step = Math.PI / intensity * 2;

        for (let i = 0; i < curve.length; i++) {
            var core = curve[i];
            for (let j = 0; j < Math.PI * 2 + 0.1; j+=step) {
                var pos = [
                    core[0] + Math.cos(j),
                    core[1] + 0,
                    core[2] + Math.sin(j)
                ];

                vertex.push(
                    pos[x] * s_x + o_x,
                    pos[y] * s_y + o_y,
                    pos[z] * s_z + o_z
                );

                if (vC){
                    vertex.push(...clamp(normalize(pos[x], pos[y], pos[z])));
                }

                if (vT){
                    var t_p = [j/Math.PI/2, 1-i/(curve.length-1)];
                    vertex.push(
                        t_p[0] * t_d[0] + t_s[0],
                        t_p[1] * t_d[1] + t_s[1]
                    );
                }
            }
        }

        intensity++;
        for (let i = 0; i < curve.length - 1; i++) {
            for (let j = 0; j < intensity - 1; j++) {
                faces.push(
                    offset + i * intensity + j,
                    offset + i * intensity + j + 1,
                    offset + (i+1) * intensity + j
                )
                faces.push(
                    offset + (i+1) * intensity + j,
                    offset + i * intensity + j + 1,
                    offset + (i+1) * intensity + j + 1
                )
            }
        }
        return {vertex, faces};
    },

    createVase: function(
        controlPoint, count, intensity, offset,
        {vC = false, vT = false,
            t_s = [0, 0], t_e = [1, 1]} = {},
        [o_x = 0, o_y = 0, o_z = 0] = [],
        [s_x = 1, s_y = 1, s_z = 1] = [],
        [x = 0, y = 1, z = 2] = []
    ) {
        var vertex = [];
        var faces = [];
        var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];
        var curve = generateCurve(controlPoint, count);
        var step = Math.PI / intensity * 2;

        for (let i = 0; i < curve.length; i++) {
            var core = curve[i];
            var r = (curve[0]**2+curve[2]**2)**(1/2);
            for (let j = 0; j < Math.PI * 2 + 0.1; j+=step) {
                var pos = [
                    core[0] * Math.cos(j),
                    core[1] + 0,
                    core[2] * Math.sin(j)
                ];

                vertex.push(
                    pos[x] * s_x + o_x,
                    pos[y] * s_y + o_y,
                    pos[z] * s_z + o_z
                );

                if (vC){
                    vertex.push(...clamp(normalize(pos[x], pos[y], pos[z])));
                }

                if (vT){
                    var t_p = [j/Math.PI/2, 1-i/(curve.length-1)];
                    vertex.push(
                        t_p[0] * t_d[0] + t_s[0],
                        t_p[1] * t_d[1] + t_s[1]
                    );
                }
            }
        }

        intensity++;
        for (let i = 0; i < curve.length - 1; i++) {
            for (let j = 0; j < intensity - 1; j++) {
                faces.push(
                    offset + i * intensity + j,
                    offset + i * intensity + j + 1,
                    offset + (i+1) * intensity + j
                )
                faces.push(
                    offset + (i+1) * intensity + j,
                    offset + i * intensity + j + 1,
                    offset + (i+1) * intensity + j + 1
                )
            }
        }
        return {vertex, faces};
    },

    // createPipe: function(
    //     controlPoint, count, intensity, offset,
    //     {vC = false, vT = false,
    //         t_s = [0, 0], t_e = [1, 1]} = {},
    //     [o_x = 0, o_y = 0, o_z = 0] = [],
    //     [s_x = 1, s_y = 1, s_z = 1] = [],
    //     [x = 0, y = 1, z = 2] = []
    // ) {
    //     var vertex = [];
    //     var faces = [];
    //     var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];
    //     var curve = generateCurve(controlPoint, count);
    //     var step = Math.PI / intensity * 2;
    //
    //     for (let i = 0; i < curve.length; i++) {
    //         var core = curve[i];
    //         var v = [];
    //         for (let j = 0; j < 3; j++) {
    //             var core_b = i != 0 ? curve[i-1]:core;
    //             var core_a = i != curve.length-1 ? curve[i+1]:core;
    //             v.push(
    //                 core_a[0] - core_b[0],
    //                 core_a[1] - core_b[1],
    //                 core_a[2] - core_b[2]
    //             );
    //         }
    //         var a = Math.atan(v[1]/v[0]);
    //         var t = -Math.atan(v[2]/v[0]);
    //         for (let j = 0; j < Math.PI * 2 + 0.1; j+=step) {
    //             var pos = [
    //                 core[0] + Math.cos(j),
    //                 core[1] + 0,
    //                 core[2] + Math.sin(j)
    //             ];
    //
    //             vertex.push(
    //                 pos[x] * s_x + o_x,
    //                 pos[y] * s_y + o_y,
    //                 pos[z] * s_z + o_z
    //             );
    //
    //             if (vC){
    //                 vertex.push(...clamp(normalize(pos[x], pos[y], pos[z])));
    //             }
    //
    //             if (vT){
    //                 var t_p = [j/Math.PI/2, 1-i/(curve.length-1)];
    //                 vertex.push(
    //                     t_p[0] * t_d[0] + t_s[0],
    //                     t_p[1] * t_d[1] + t_s[1]
    //                 );
    //             }
    //         }
    //     }
    //
    //     intensity++;
    //     for (let i = 0; i < curve.length - 1; i++) {
    //         for (let j = 0; j < intensity - 1; j++) {
    //             faces.push(
    //                 i * intensity + j,
    //                 i * intensity + j + 1,
    //                 (i+1) * intensity + j
    //             )
    //             faces.push(
    //                 (i+1) * intensity + j,
    //                 i * intensity + j + 1,
    //                 (i+1) * intensity + j + 1
    //             )
    //         }
    //     }
    //     return {vertex, faces};
    // },
};