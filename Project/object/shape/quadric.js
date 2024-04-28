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

var QUADRIC = {
    ellipsoid: {
        createVertex: function (
            {vC = false, vT = false,
                t_s = [0, 0], t_e = [1, 1]} = {},
            [o_x = 0, o_y = 0, o_z = 0] = [],
            [s_x = 1, s_y = 1, s_z = 1] = [],
            [x = 0, y = 1, z = 2] = [],
            [o_u = 0, o_v = 0] = [],
        ) {
            var vertex = [];

            var intensity = 30;
            var increment = Math.PI / intensity;

            var u_rotate = Math.PI/2 + o_u;
            var v_rotate = 0 + o_v;

            var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];

            for (let u = -Math.PI; u <= Math.PI + 0.1; u += increment) {
                for (let v = -Math.PI / 2; v <= Math.PI / 2 + 0.1; v += increment) {
                    var u2 = u + u_rotate;
                    var v2 = v + v_rotate;

                    var pos = [
                        Math.cos(v2) * Math.cos(u2),
                        Math.sin(v2),
                        Math.cos(v2) * Math.sin(u2)
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
                        var t_p = clamp([-u/Math.PI, v/Math.PI*2]);
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
            var faces = [];
            var intensity = 30;
            intensity++;
            for (let i = 0; i < intensity * 2 - 2; i++) {
                for (let j = 0; j < intensity -1; j++) {
                    faces.push(
                        offset + i * intensity + j,
                        offset + (i + 1) * intensity + j,
                        offset + (i + 1) * intensity + j + 1
                    );
                    faces.push(
                        offset + i * intensity + j,
                        offset + (i + 1) * intensity + j + 1,
                        offset + i * intensity + j + 1
                    );
                }
            }
            return faces;
        }
    },
    ellipsoid_half: {
        createVertex: function (
            {vC = false, vT = false,
                t_s = [0, 0], t_e = [1, 1]} = {},
            [o_x = 0, o_y = 0, o_z = 0] = [],
            [s_x = 1, s_y = 1, s_z = 1] = [],
            [x = 0, y = 1, z = 2] = [],
            [o_u = 0, o_v = 0] = [],
        ) {
            var vertex = [];

            var intensity = 30;
            var increment = Math.PI / intensity;

            var u_rotate = Math.PI/2 + o_u;
            var v_rotate = 0 + o_v;

            var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];

            for (let u = -Math.PI; u <= Math.PI + 0.1; u += increment) {
                for (let v = 0; v <= Math.PI / 2 + 0.1; v += increment) {
                    var u2 = u + u_rotate;
                    var v2 = v + v_rotate;

                    var pos = [
                        Math.cos(v2) * Math.cos(u2),
                        Math.sin(v2),
                        Math.cos(v2) * Math.sin(u2)
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
                        var t_p = clamp([-u/Math.PI, v/Math.PI*2]);
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
            var faces = [];
            var intensity = 15;
            intensity++;
            for (let i = 0; i < (intensity-1)*4; i++) {
                for (let j = 0; j < intensity-1; j++) {
                    faces.push(
                        i * intensity + j,
                        i * intensity + j + 1,
                        (i+1) * intensity + j,
                    );
                    faces.push(
                        i * intensity + j + 1,
                        (i+1) * intensity + j,
                        (i+1) * intensity + j+1,
                    );
                }
            }
            return faces;
        }
    },
    elliptic_cone: {
        createVertex: function (
            {vC = false, vT = false,
                t_s = [0, 0], t_e = [1, 1]} = {},
            [o_x = 0, o_y = 0, o_z = 0] = [],
            [s_x = 1, s_y = 1, s_z = 1] = [],
            [x = 0, y = 1, z = 2] = [],
            [o_u = 0, o_v = 0] = []
        ) {
            var vertex = [];

            var intensity = 30;
            var increment = Math.PI / intensity;
            var v_size = intensity/15;

            var u_rotate = -Math.PI/2 + o_u;
            var v_rotate = 0 + o_v;

            var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];

            for(let u= -Math.PI; u <= Math.PI + 0.1; u += increment) {
                for(let v= -v_size; v <= v_size; v += 1){
                    var u2 = u + u_rotate;
                    var v2 = v + v_rotate;


                    var pos = [
                        0.5 * v2 * Math.cos(u2),
                        -0.5 * v2,
                        0.5 * v2 * Math.sin(u2)
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
                        var t_p = clamp([-u/Math.PI, -v/2]);
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
            var faces = [];
            var intensity = 30;
            var v_size = intensity/15;
            v_size = v_size * 2 + 1;
            for (let i = 0; i < intensity * 2; i++) {
                for (let j = 0; j < v_size - 1; j++) {
                    faces.push(
                        offset + i * v_size + j,
                        offset + (i + 1) * v_size + j,
                        offset + (i + 1) * v_size + j + 1
                    );
                    faces.push(
                        offset + i * v_size + j,
                        offset + i * v_size + j + 1,
                        offset + (i + 1) * v_size + j + 1);
                }
            }
            return faces;
        }
    },
    elliptic_paraboloid: {
        createVertex: function (
            {vC = false, vT = false,
                t_s = [0, 0], t_e = [1, 1]} = {},
            [o_x = 0, o_y = 0, o_z = 0] = [],
            [s_x = 1, s_y = 1, s_z = 1] = [],
            [x = 0, y = 1, z = 2] = [],
            [o_u = 0, o_v = 0] = []
        ) {
            var vertex = [];

            var intensity = 30;
            var increment = Math.PI / intensity;
            var v_size = intensity/3;

            var u_rotate = Math.PI/2 + o_u;
            var v_rotate = 0 + o_v;

            var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];

            for(let u= -Math.PI; u <= Math.PI + 0.1; u += increment) {
                for(let v= 0; v <= v_size; v += 1){
                    var u2 = u + u_rotate;
                    var v2 = v + v_rotate;

                    var pos = [
                        0.1 * v2 * Math.cos(u2),
                        -0.02 * Math.pow(v2, 2) + 1,
                        0.1 * v2 * Math.sin(u2)
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
                        var t_p = [...clamp([-u/Math.PI]), 1 - v/10];
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
            var faces = [];
            var intensity = 30;
            var v_size = intensity/3;
            v_size++;
            for (let i = 0; i < intensity * 2; i++) {
                for (let j = 0; j < v_size - 1; j++) {
                    faces.push(
                        offset + i * v_size + j,
                        offset + (i + 1) * v_size + j,
                        offset + (i + 1) * v_size + j + 1
                    );
                    faces.push(
                        offset + i * v_size + j,
                        offset + i * v_size + j + 1,
                        offset + (i + 1) * v_size + j + 1
                    );
                }
            }
            return faces;
        }
    },
    donut: {
        createVertex: function (
            {vC = false, vT = false,
                t_s = [0, 0], t_e = [1, 1]} = {},
            [o_x = 0, o_y = 0, o_z = 0] = [],
            [s_x = 1, s_y = 1, s_z = 1] = [],
            [x = 0, y = 1, z = 2] = [],
            [o_u = 0, o_v = 0] = [],
            volume = 0.5
        ) {
            var vertex = [];

            var intensity = 30;
            var increment = Math.PI / intensity;
            var R = 1;
            var r = R * volume;

            var u_rotate = Math.PI/2 + o_u;
            var v_rotate = 0 + o_v;

            var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];

            for(let u= -Math.PI; u <= Math.PI + 0.1; u += increment) {
                for(let v= -Math.PI; v <= Math.PI + 0.1; v += increment){
                    var u2 = u + u_rotate;
                    var v2 = v + v_rotate;

                    var pos = [
                        Math.cos(u2) * (R + r * Math.cos(v2)),
                        r * Math.sin(v2),
                        Math.sin(u2) * (R + r * Math.cos(v2))
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
                        var t_p = clamp([-u/Math.PI, v/Math.PI]);
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
            var faces = [];
            var intensity = 30;
            intensity = intensity * 2 + 1;
            for (let i = 0; i < intensity - 1; i++) {
                for (let j = 0; j < intensity - 1; j++) {
                    faces.push(
                        offset + i * intensity + j,
                        offset + i * intensity + j + 1,
                        offset + (i+1) * intensity + j + 1
                    );
                    faces.push(
                        offset + i * intensity + j,
                        offset + (i + 1) * intensity + j,
                        offset + (i+1) * intensity + j + 1
                    );
                }
            }
            return faces;
        }
    },
    saddle: {
        createVertex: function (
            {vC = false, vT = false,
                t_s = [0, 0], t_e = [1, 1]} = {},
            [o_x = 0, o_y = 0, o_z = 0] = [],
            [s_x = 1, s_y = 1, s_z = 1] = [],
            [x = 0, y = 1, z = 2] = [],
            [o_u = 0, o_v = 0] = []
        ) {
            var vertex = [];

            var size = 30;
            var increment = 1;

            var u_rotate = 0 + o_u;
            var v_rotate = 0 + o_v;

            var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];

            for(let u= -size/2; u <= size/2; u += increment) {
                for(let v= -size/2; v <= size/2; v += increment){
                    var u2 = u + u_rotate;
                    var v2 = v + v_rotate;

                    var pos = [
                        0.065 * u2,
                        0.0045 * (Math.pow(u2,2)-Math.pow(v2,2)),
                        0.065 * v2
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
                        var t_p = clamp([u/15, -v/15]);
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
            var faces = [];
            var size = 30;
            size++;
            for (let i = 0; i < size - 1; i++) {
                for (let j = 0; j < size - 1; j++) {
                    faces.push(
                        offset + i * size + j,
                        offset + (i + 1) * size + j,
                        offset + (i+1) * size + j + 1
                    );
                    faces.push(
                        offset + i * size + j,
                        offset + i * size + j + 1,
                        offset + (i+1) * size + j + 1
                    );
                }
            }
            return faces;
        }
    },
    height_saddle:{
        createVertex: function (
            {vC = false, vT = false,
                t_s = [0, 0], t_e = [1, 1]} = {},
            [o_x = 0, o_y = 0, o_z = 0] = [],
            [s_x = 1, s_y = 1, s_z = 1] = [],
            [x = 0, y = 1, z = 2] = [],
            [o_u = 0, o_v = 0] = [],
            height = 1
        ) {
            var vertex = [];

            var size = 30;
            var increment = 1;

            var u_rotate = 0 + o_u;
            var v_rotate = 0 + o_v;

            var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];

            for (let i = 0; i <= 1; i++) {
                for(let u= -size/2; u <= size/2; u += increment) {
                    for(let v= -size/2; v <= size/2; v += increment){
                        var u2 = u + u_rotate;
                        var v2 = v + v_rotate;

                        var pos = [
                            0.065 * u2,
                            i * height - height/2 + 0.0045 * (u2**2 - v2**2),
                            0.065 * v2
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
                            var t_p = clamp([u/15, -v/15]);
                            vertex.push(
                                t_p[0] * t_d[0] + t_s[0],
                                t_p[1] * t_d[1] + t_s[1]
                            );
                        }
                    }
                }
            }
            return vertex;
        },
        createFaces: function (offset) {
            var faces = [];
            var size = 30;
            size++;
            var size2 = Math.pow(size,2);
            for (let k = 0; k <= 1; k++) {
                for (let i = 0; i < size - 1; i++) {
                    for (let j = 0; j < size - 1; j++) {
                        faces.push(
                            k * size2 + offset + i * size + j,
                            k * size2 + offset + (i + 1) * size + j,
                            k * size2 + offset + (i+1) * size + j + 1
                        );
                        faces.push(
                            k * size2 + offset + i * size + j,
                            k * size2 + offset + i * size + j + 1,
                            k * size2 + offset + (i+1) * size + j + 1
                        );
                    }
                }
            }
            for (let i = 0; i < size - 1; i++) {
                faces.push(
                    offset + i,
                    offset + size2 + i,
                    offset + size2 + i + 1
                );
                faces.push(
                    offset + i,
                    offset + i + 1,
                    offset + size2 + i + 1
                );

                faces.push(
                    offset + size2 - size + i,
                    offset + size2 - size + size2 + i,
                    offset + size2 - size + size2 + i + 1
                );
                faces.push(
                    offset + size2 - size + i,
                    offset + size2 - size + i + 1,
                    offset + size2 - size + size2 + i + 1
                );

                faces.push(
                    offset + i * size,
                    offset + (i+1) * size + size2,
                    offset + (i+1) * size
                );
                faces.push(
                    offset + i * size,
                    offset + i * size + size2,
                    offset + (i+1) * size + size2
                );

                faces.push(
                    offset + (i+1) * size - 1,
                    offset + (i+2) * size + size2 - 1,
                    offset + (i+2) * size - 1
                );
                faces.push(
                    offset + (i+1) * size - 1,
                    offset + (i+1) * size + size2 - 1,
                    offset + (i+2) * size + size2 - 1
                );
            }
            return faces;
        }
    },
    height_circle:{
        createVertex: function (
            {vC = false, vT = false,
                t_s = [0, 0], t_e = [1, 1]} = {},
            [o_x = 0, o_y = 0, o_z = 0] = [],
            [s_x = 1, s_y = 1, s_z = 1] = [],
            [x = 0, y = 1, z = 2] = [],
            volume = 0.5
        ) {
            var vertex = [];
            var central = [o_x,o_y,o_z];
            var step = Math.PI/30;

            var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];

            for(let u= 0; u < Math.PI * 2; u += step) {
                for (let v = -1; v <= 1; v+=2) {
                    var pos = [
                        Math.cos(u),
                        v,
                        Math.sin(u)
                    ];

                    for (let w = 0; w <= 1; w++) {
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

                        pos[0] *= (1 - volume);
                        pos[2] *= (1 - volume);
                    }
                }
            }
            return vertex;
        },
        createFaces: function (offset) {
            var faces = [];
            var intensity = 30;
            intensity *= 2;
            for (let i = 0; i < intensity; i++) {
                for (let j = 0; j <= 1; j++) {
                    faces.push(
                        offset + j * 2 + i * 4,
                        offset + j * 2 + i * 4 + 1,
                        offset + j * 2 + (i + 1) * 4
                    );
                    faces.push(
                        offset + j * 2 + i * 4 + 1,
                        offset + j * 2 + (i + 1) * 4 + 1,
                        offset + j * 2 + (i + 1) * 4
                    );

                    faces.push(
                        offset + j + i * 4,
                        offset + j + (i + 1) * 4,
                        offset + j + i * 4 + 2
                    );
                    faces.push(
                        offset + j + i * 4 + 2,
                        offset + j + (i + 1) * 4,
                        offset + j + (i + 1) * 4 + 2
                    );
                }
            }
            return faces;
        }
    },
    cylinder: {
        createVertex: function (
            {vC = false, vT = false,
                t_s = [0, 0], t_e = [1, 1]} = {},
            [o_x = 0, o_y = 0, o_z = 0] = [],
            [s_x = 1, s_y = 1, s_z = 1] = [],
            [x = 0, y = 1, z = 2] = [],
            [o_u = 0, o_v = 0] = []
        ) {
            var vertex = [];

            var intensity = 30;
            var increment = Math.PI / intensity;

            var u_rotate = Math.PI/2 + o_u;
            var v_rotate = 0 + o_v;

            var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];

            for (let u = -Math.PI; u <= Math.PI + 0.1; u += increment) {
                for (let v = -1; v <= 1; v += 2) {
                    var u2 = u + u_rotate;
                    var v2 = v + v_rotate;

                    var pos = [
                        Math.cos(u2),
                        v2,
                        Math.sin(u2)
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
                        var t_p = clamp([-u/Math.PI, v]);
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
            var faces = [];
            var intensity = 30;
            intensity = intensity * 2;
            for (let i = 0; i < intensity; i++) {
                faces.push(
                    offset + i * 2 + 0,
                    offset + i * 2 + 1,
                    offset + (i+1) * 2 + 1,

                    offset + i * 2 + 0,
                    offset + (i+1) * 2,
                    offset + (i+1) * 2 + 1
                );
            }
            return faces;
        }
    },
    sponge: {
        createVertex: function (
            {vC = false, vT = false,
                t_s = [0, 0], t_e = [1, 1]} = {},
            [o_x = 0, o_y = 0, o_z = 0] = [],
            [s_x = 1, s_y = 1, s_z = 1] = [],
            squiggly = 1
        ) {
            var x = 0, y = 1, z = 2;
            var vertex = [];
            var repeat = 2;
            var range = Math.PI / 2 * 4;
            var intensity = 30;

            var t_d = [(t_e[0] - t_s[0])/3, t_e[1] - t_s[1]];

            var texture = [
                [
                    // Back
                    [t_s[0] + 1.05 * t_d[0], t_s[1] + 0.05 * t_d[1]], [t_d[0] * 0.9, t_d[1] * 0.9]
                ],
                [
                    // Outer
                    [t_s[0] + 2.05 * t_d[0], t_s[1] + 0.05 * t_d[1]], [t_d[0] * 0.9, t_d[1] * 0.9]
                ],
                [
                    // Front
                    [t_s[0] + 0.05 * t_d[0], t_s[1] + 0.05 * t_d[1]], [t_d[0] * 0.9, t_d[1] * 0.9]
                ],
                [
                    // Inner
                    [t_s[0] + 2.25 * t_d[0], t_s[1] + 0.25 * t_d[1]], [t_d[0] * 0.5, t_d[1] * 0.5]
                ],
            ];

            for (let sheet = 0; sheet <= 1; sheet++) {
                for (let i = -1; i <= 1; i+=2) {
                    vertex.push(o_x, o_y, o_z+i*s_z);
                    if (vC){
                        vertex.push(...clamp(normalize(o_x, o_y, o_z+i*s_z)));
                    }
                    if (vT){
                        vertex.push(
                            0.5 * texture[sheet + 1 + i][1][0] + texture[sheet + 1 + i][0][0],
                            0.5 * texture[sheet + 1 + i][1][1] + texture[sheet + 1 + i][0][1]
                        );
                    }
                    for (let j = 0; j <= 1; j++) {
                        for (let k = -1; k <= 1; k+=2) {
                            for(let u= -range; u <= range + 0.1; u += range/intensity) {
                                var pos = [
                                    u/range,
                                    k + k * Math.sin(u * repeat + Math.PI/2) / intensity * squiggly,
                                    i
                                ];

                                vertex.push(
                                    pos[x + j] * s_x + o_x,
                                    pos[y - j] * s_y + o_y,
                                    pos[z] * s_z + o_z
                                );

                                if (vC){
                                    vertex.push(...clamp(normalize(pos[x + j], pos[y - j], pos[z])));
                                }
                                if (vT){
                                    var t_p = clamp([pos[x + j], pos[y - j]]);
                                    vertex.push(
                                        t_p[0] * texture[sheet + 1 + i][1][0] + texture[sheet + 1 + i][0][0],
                                        t_p[1] * texture[sheet + 1 + i][1][1] + texture[sheet + 1 + i][0][1]
                                    );
                                }
                            }
                        }
                    }
                }
            }
            return vertex;
        },
        createFaces: function (offset) {
            var faces = [];
            var intensity = 30;

            intensity = intensity * 2 + 1;
            for (let i = 0; i < 2; i++) {
                var step = intensity * 4 + 1;
                for (let j = 0; j < 4; j++) {
                    for (let k = 1; k < intensity; k++) {
                        faces.push(
                            offset + i * step + 0,
                            offset + i * step + j * intensity + k,
                            offset + i * step + j * intensity + k + 1
                        );
                    }
                }
                faces.push(
                    offset + i * step + 0,
                    offset + i * step + intensity * 0 + 1,
                    offset + i * step + intensity * 2 + 1,
                    offset + i * step + 0,
                    offset + i * step + intensity * 1,
                    offset + i * step + intensity * 3 + 1,
                    offset + i * step + 0,
                    offset + i * step + intensity * 3,
                    offset + i * step + intensity * 1 + 1,
                    offset + i * step + 0,
                    offset + i * step + intensity * 2,
                    offset + i * step + intensity * 4,
                );

                for (let j = 0; j < 4; j++) {
                    for (let k = 1; k < intensity; k++) {
                        faces.push(
                            offset + 2 * step + j * intensity + k,
                            offset + 2 * step + j * intensity + k + 1,
                            offset + 2 * step + j * intensity + k + step
                        );
                        faces.push(
                            offset + 2 * step + j * intensity + k + 1,
                            offset + 2 * step + j * intensity + k + step,
                            offset + 2 * step + j * intensity + k + step + 1
                        );
                    }
                }
                faces.push(
                    offset + 2 * step + intensity * 0 + 1,
                    offset + 2 * step + intensity * 0 + 1 + step,
                    offset + 2 * step + intensity * 2 + 1,

                    offset + 2 * step + intensity * 0 + 1 + step,
                    offset + 2 * step + intensity * 2 + 1,
                    offset + 2 * step + intensity * 2 + 1 + step,


                    offset + 2 * step + intensity * 1,
                    offset + 2 * step + intensity * 1 + step,
                    offset + 2 * step + intensity * 3 + 1,

                    offset + 2 * step + intensity * 1 + step,
                    offset + 2 * step + intensity * 3 + 1,
                    offset + 2 * step + intensity * 3 + 1 + step,


                    offset + 2 * step + intensity * 1 + 1,
                    offset + 2 * step + intensity * 1 + 1 + step,
                    offset + 2 * step + intensity * 3,

                    offset + 2 * step + intensity * 1 + 1 + step,
                    offset + 2 * step + intensity * 3,
                    offset + 2 * step + intensity * 3 + step,


                    offset + 2 * step + intensity * 2,
                    offset + 2 * step + intensity * 2 + step,
                    offset + 2 * step + intensity * 4,

                    offset + 2 * step + intensity * 2 + step,
                    offset + 2 * step + intensity * 4,
                    offset + 2 * step + intensity * 4 + step,
                );
            }
            return faces;
        }
    },
    cuboid: {
        createVertex: function (
            {vC = false, vT = false,
                t_s = [0, 0], t_e = [1, 1]} = {},
            [o_x = 0, o_y = 0, o_z = 0] = [],
            [s_x = 1, s_y = 1, s_z = 1] = []
        ) {

            var pos = [
                o_x + s_x, o_y + s_y, o_z + s_z,
                o_x - s_x, o_y - s_y, o_z - s_z,
            ];

            var t_d = [t_e[0] - t_s[0], t_e[1] - t_s[1]];
            var texture = {
                x: [0, 0.25, 0.5, 0.75, 1].map(x => x * t_d[0] + t_s[0]),
                y: [0, 1/3, 2/3, 1].map(x => x * t_d[1] + t_s[1])
            }

            if (vT){
                return[
                    //Top
                    pos[3], pos[1], pos[5], texture.x[1], texture.y[3],
                    pos[0], pos[1], pos[5], texture.x[2], texture.y[3],
                    pos[3], pos[1], pos[2], texture.x[1], texture.y[2],
                    pos[0], pos[1], pos[2], texture.x[2], texture.y[2],

                    //Bottom
                    pos[3], pos[4], pos[2], texture.x[1], texture.y[1],
                    pos[0], pos[4], pos[2], texture.x[2], texture.y[1],
                    pos[3], pos[4], pos[5], texture.x[1], texture.y[0],
                    pos[0], pos[4], pos[5], texture.x[2], texture.y[0],

                    //Left
                    pos[3], pos[1], pos[5], texture.x[0], texture.y[2],
                    pos[3], pos[1], pos[2], texture.x[1], texture.y[2],
                    pos[3], pos[4], pos[5], texture.x[0], texture.y[1],
                    pos[3], pos[4], pos[2], texture.x[1], texture.y[1],

                    //Front
                    pos[3], pos[1], pos[2], texture.x[1], texture.y[2],
                    pos[0], pos[1], pos[2], texture.x[2], texture.y[2],
                    pos[3], pos[4], pos[2], texture.x[1], texture.y[1],
                    pos[0], pos[4], pos[2], texture.x[2], texture.y[1],

                    //Right
                    pos[0], pos[1], pos[2], texture.x[2], texture.y[2],
                    pos[0], pos[1], pos[5], texture.x[3], texture.y[2],
                    pos[0], pos[4], pos[2], texture.x[2], texture.y[1],
                    pos[0], pos[4], pos[5], texture.x[3], texture.y[1],

                    //Back
                    pos[3], pos[1], pos[5], texture.x[3], texture.y[2],
                    pos[0], pos[1], pos[5], texture.x[4], texture.y[2],
                    pos[3], pos[4], pos[5], texture.x[3], texture.y[1],
                    pos[0], pos[4], pos[5], texture.x[4], texture.y[1],
                ]
            }
            else if (vC){
                return [
                    //Top
                    pos[3], pos[1], pos[5],     ...clamp(normalize(pos[3] - o_x, pos[1] - o_y, pos[5] - o_z)),
                    pos[0], pos[1], pos[5],     ...clamp(normalize(pos[0] - o_x, pos[1] - o_y, pos[5] - o_z)),
                    pos[3], pos[1], pos[2],     ...clamp(normalize(pos[3] - o_x, pos[1] - o_y, pos[2] - o_z)),
                    pos[0], pos[1], pos[2],     ...clamp(normalize(pos[0] - o_x, pos[1] - o_y, pos[2] - o_z)),

                    //Bottom
                    pos[3], pos[4], pos[2],     ...clamp(normalize(pos[3] - o_x, pos[4] - o_y, pos[2] - o_z)),
                    pos[0], pos[4], pos[2],     ...clamp(normalize(pos[0] - o_x, pos[4] - o_y, pos[2] - o_z)),
                    pos[3], pos[4], pos[5],     ...clamp(normalize(pos[3] - o_x, pos[4] - o_y, pos[5] - o_z)),
                    pos[0], pos[4], pos[5],     ...clamp(normalize(pos[0] - o_x, pos[4] - o_y, pos[5] - o_z)),

                    //Left
                    pos[3], pos[1], pos[5],     ...clamp(normalize(pos[3] - o_x, pos[1] - o_y, pos[5] - o_z)),
                    pos[3], pos[1], pos[2],     ...clamp(normalize(pos[3] - o_x, pos[1] - o_y, pos[2] - o_z)),
                    pos[3], pos[4], pos[5],     ...clamp(normalize(pos[3] - o_x, pos[4] - o_y, pos[5] - o_z)),
                    pos[3], pos[4], pos[2],     ...clamp(normalize(pos[3] - o_x, pos[4] - o_y, pos[2] - o_z)),

                    //Front
                    pos[3], pos[1], pos[2],     ...clamp(normalize(pos[3] - o_x, pos[1] - o_y, pos[2] - o_z)),
                    pos[0], pos[1], pos[2],     ...clamp(normalize(pos[0] - o_x, pos[1] - o_y, pos[2] - o_z)),
                    pos[3], pos[4], pos[2],     ...clamp(normalize(pos[3] - o_x, pos[4] - o_y, pos[2] - o_z)),
                    pos[0], pos[4], pos[2],     ...clamp(normalize(pos[0] - o_x, pos[4] - o_y, pos[2] - o_z)),

                    //Right
                    pos[0], pos[1], pos[2],     ...clamp(normalize(pos[0] - o_x, pos[1] - o_y, pos[2] - o_z)),
                    pos[0], pos[1], pos[5],     ...clamp(normalize(pos[0] - o_x, pos[1] - o_y, pos[5] - o_z)),
                    pos[0], pos[4], pos[2],     ...clamp(normalize(pos[0] - o_x, pos[4] - o_y, pos[2] - o_z)),
                    pos[0], pos[4], pos[5],     ...clamp(normalize(pos[0] - o_x, pos[4] - o_y, pos[5] - o_z)),

                    //Back
                    pos[3], pos[1], pos[5],     ...clamp(normalize(pos[3] - o_x, pos[1] - o_y, pos[5] - o_z)),
                    pos[0], pos[1], pos[5],     ...clamp(normalize(pos[0] - o_x, pos[1] - o_y, pos[5] - o_z)),
                    pos[3], pos[4], pos[5],     ...clamp(normalize(pos[3] - o_x, pos[4] - o_y, pos[5] - o_z)),
                    pos[0], pos[4], pos[5],     ...clamp(normalize(pos[0] - o_x, pos[4] - o_y, pos[5] - o_z)),
                ]
            }
            else return [
                    //Top
                    pos[3], pos[1], pos[5],
                    pos[0], pos[1], pos[5],
                    pos[3], pos[1], pos[2],
                    pos[0], pos[1], pos[2],

                    //Bottom
                    pos[3], pos[4], pos[2],
                    pos[0], pos[4], pos[2],
                    pos[3], pos[4], pos[5],
                    pos[0], pos[4], pos[5],

                    //Left
                    pos[3], pos[1], pos[5],
                    pos[3], pos[1], pos[2],
                    pos[3], pos[4], pos[5],
                    pos[3], pos[4], pos[2],

                    //Front
                    pos[3], pos[1], pos[2],
                    pos[0], pos[1], pos[2],
                    pos[3], pos[4], pos[2],
                    pos[0], pos[4], pos[2],

                    //Right
                    pos[0], pos[1], pos[2],
                    pos[0], pos[1], pos[5],
                    pos[0], pos[4], pos[2],
                    pos[0], pos[4], pos[5],

                    //Back
                    pos[3], pos[1], pos[5],
                    pos[0], pos[1], pos[5],
                    pos[3], pos[4], pos[5],
                    pos[0], pos[4], pos[5],
                ];
        },
        createFaces: function (offset) {
            var faces = [];
            for (let i = 0; i < 6; i++) {
                faces.push(offset + i * 4, offset + i * 4 + 1, offset + i * 4 + 2);
                faces.push(offset + i * 4 + 1, offset + i * 4 + 2, offset + i * 4 + 3);
            }
            return faces;
        }
    },
};