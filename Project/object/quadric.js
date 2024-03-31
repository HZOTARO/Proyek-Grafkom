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
        createVertex: function (o_x, o_y, o_z, s_x, s_y, s_z, vC, vT) {
            var vertex = [];
            var central = [o_x, o_y, o_z];
            var intensity = 30;
            var increment = Math.PI / intensity;
            for (let u = -Math.PI; u <= Math.PI + 0.1; u += increment) {
                for (let v = -Math.PI / 2; v <= Math.PI / 2 + 0.1; v += increment) {
                    var x = o_x + (s_x * Math.cos(v) * Math.cos(u)); //X
                    var y = o_y + (s_y * Math.sin(v)); //Z
                    var z = o_z + (s_z * Math.cos(v) * Math.sin(u)); //Y

                    vertex.push(x, y, z);

                    if (vC){
                        vertex.push(...clamp(normalize(x-central[0], y-central[1], z-central[2])));
                        // vertex.push(x, y, z);
                    }
                    if (vT){
                        vertex.push(...clamp([-u/Math.PI, v/Math.PI]));
                        // vertex.push(x, y, z);
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
    hyperboloid: {
        createVertex: function (o_x, o_y, o_z, s_x, s_y, s_z, vC) {
            var vertex = [];
            var central = [o_x, o_y, o_z];
            var intensity = 30;
            var increment = Math.PI / intensity;
            for (let u = -Math.PI; u <= Math.PI + 0.1; u += increment) {
                for (let v = -Math.PI / 2; v <= Math.PI / 2 + 0.1; v += increment) {
                    if (Math.abs(Math.tan(v)) > 10)
                        continue;

                    var x = o_x + (s_x * 0.105 / Math.cos(v) * Math.cos(u)); //X
                    var y = o_y + (s_y * 0.105 * Math.tan(v)); //Z
                    var z = o_z + (s_z * 0.105 / Math.cos(v) * Math.sin(u)); //Y

                    vertex.push(x, y, z);

                    if (vC){
                        vertex.push(...clamp(normalize(x-central[0], y-central[1], z-central[2])));
                        // vertex.push(x, y, z);
                    }
                }
            }
            return vertex;
        },
        createFaces: function (offset) {
            var faces = [];
            var intensity = 30;
            intensity--;
            for (let i = 0; i < intensity * 2 + 2; i++) {
                for (let j = 0; j < intensity - 1; j++) {
                    faces.push(
                        offset + i * intensity + j,
                        offset + (i + 1) * intensity + j,
                        offset + (i+1) * intensity + j + 1);
                    faces.push(
                        offset + i * intensity + j,
                        offset + i * intensity + j + 1,
                        offset + (i+1) * intensity + j + 1);
                }
            }
            return faces;
        }
    },
    hyperboloid_2: {
        createVertex: function (o_x, o_y, o_z, s_x, s_y, s_z, vC) {
            var vertex = [];
            var central = [o_x,o_y,o_z];
            var intensity = 30;
            var increment = Math.PI / intensity;
            for (let sheet = 0; sheet < 2; sheet++) {
                for (let u = -Math.PI / 2; u <= Math.PI / 2 + 0.1; u += increment) {
                    for (let v = -Math.PI / 2 + sheet * Math.PI; v <= Math.PI / 2 + 0.1 + sheet * Math.PI; v += increment) {
                        if (Math.abs(Math.tan(v)) > 10)
                            continue;

                        var x = o_x + (s_x * 0.105 * Math.tan(v) * Math.cos(u)); //X
                        var y = o_y + (s_y * 0.105 / Math.cos(v)); //Z
                        var z = o_z + (s_z * 0.105 * Math.tan(v) * Math.sin(u)); //Y

                        vertex.push(x, y, z);

                        if (vC){
                            vertex.push(...clamp(normalize(x-central[0], y-central[1], z-central[2])));
                            // vertex.push(x, y, z);
                        }
                    }
                }
            }
            return vertex;
        },
        createFaces: function (offset) {
            var faces = [];
            var intensity = 30;
            intensity--;
            for (let sheet = 0; sheet < 2; sheet++){
                for (let i = sheet * (intensity + 2); i <= intensity +sheet * (intensity + 2); i++) {
                    for (let j = 0; j < intensity - 1; j++) {
                        faces.push(
                            offset + i * intensity + j,
                            offset + (i + 1) * intensity + j,
                            offset + (i + 1) * intensity + j + 1
                        );
                        faces.push(
                            offset + i * intensity + j,
                            offset + i * intensity + j + 1,
                            offset + (i + 1) * intensity + j + 1
                        );
                    }
                }
            }
            return faces;
        }
    },
    elliptic_cone: {
        createVertex: function (o_x, o_y, o_z, s_x, s_y, s_z, vC) {
            var vertex = [];
            var central = [o_x, o_y, o_z];
            var intensity = 30;
            var increment = Math.PI / intensity;
            var v_size = intensity/15;
            for(let u= -Math.PI; u <= Math.PI + 0.1; u += increment) {
                for(let v= -v_size; v <= v_size; v += 1){
                    var x = o_x + (s_x * 0.5 * v * Math.cos(u)); //X
                    var y = o_y + (s_y * 0.5 * v); //Z
                    var z = o_z + (s_z * 0.5 * v * Math.sin(u)); //Y

                    vertex.push(x, y, z);

                    if (vC){
                        vertex.push(...clamp(normalize(x-central[0], y-central[1], z-central[2])));
                        // vertex.push(x, y, z);
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
        createVertex: function (o_x, o_y, o_z, s_x, s_y, s_z, vC) {
            var vertex = [];
            var central = [o_x,o_y,o_z];
            var intensity = 30;
            var increment = Math.PI / intensity;
            var v_size = intensity/3;
            for(let u= -Math.PI; u <= Math.PI + 0.1; u += increment) {
                for(let v= 0; v <= v_size; v += 1){
                    var x = o_x + (s_x * 0.1 * v * Math.cos(u)); //X
                    var y = o_y + s_y + (s_y * -0.02 * Math.pow(v, 2)); //Z
                    var z = o_z + (s_z * 0.1 * v * Math.sin(u)); //Y

                    vertex.push(x, y, z);

                    if (vC){
                        vertex.push(...clamp(normalize(x-central[0], y-central[1], z-central[2])));
                        // vertex.push(x, y, z);
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
    hyperboloid_paraboloid: {
        createVertex: function (o_x, o_y, o_z, s_x, s_y, s_z, vC) {
            var vertex = [];
            var central = [o_x, o_y, o_z];
            var intensity = 30;
            var increment = Math.PI / intensity;
            var v_size = intensity/3;
            for(let u= -Math.PI; u < Math.PI + 0.1; u += increment) {
                if (Math.abs(Math.tan(u)) > 10)
                    continue;
                for(let v= 0; v <= v_size; v += 1){
                    var x = o_x + (s_x * 0.01 * v * Math.tan(u)); //X
                    var y = o_y + s_y + (s_y * -0.02 * Math.pow(v, 2)); //Z
                    var z = o_z + (s_z * 0.01 * v / Math.cos(u)); //Y

                    vertex.push(x, y, z);

                    if (vC){
                        vertex.push(...clamp(normalize(x-central[0], y-central[1], z-central[2])));
                        // vertex.push(x, y, z);
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
            for (let i = 0; i < intensity/2-1; i++) {
                for (let j = 0; j < v_size - 1; j++) {
                    faces.push(
                        offset + i * v_size + j,
                        offset + (i + 1) * v_size + j,
                        offset + (i+1) * v_size + j + 1
                    );
                    faces.push(
                        offset + i * v_size + j,
                        offset + i * v_size + j + 1,
                        offset + (i+1) * v_size + j + 1
                    );
                }
            }
            for (let i = intensity/2; i < intensity*3/2-2; i++) {
                for (let j = 0; j < v_size - 1; j++) {
                    faces.push(
                        offset + i * v_size + j,
                        offset + (i + 1) * v_size + j,
                        offset + (i+1) * v_size + j + 1
                    );
                    faces.push(
                        offset + i * v_size + j,
                        offset + i * v_size + j + 1,
                        offset + (i+1) * v_size + j + 1
                    );
                }
            }
            for (let i = intensity*3/2-1; i < intensity*2; i++) {
                for (let j = 0; j < v_size - 1; j++) {
                    faces.push(
                        offset + i * v_size + j,
                        offset + (i + 1) * v_size + j,
                        offset + (i+1) * v_size + j + 1
                    );
                    faces.push(
                        offset + i * v_size + j,
                        offset + i * v_size + j + 1,
                        offset + (i+1) * v_size + j + 1
                    );
                }
            }
            return faces;
        }
    },
    donut: {
        createVertex: function (o_x, o_y, o_z, s_x, s_y, s_z, volume, vC) {
            var vertex = [];
            var central = [o_x,o_y,o_z];
            var intensity = 30;
            var increment = Math.PI / intensity;
            var R = 1;
            var r = R * volume;
            for(let u= -Math.PI; u <= Math.PI + 0.1; u += increment) {
                for(let v= -Math.PI; v <= Math.PI + 0.1; v += increment){
                    var x = o_x + (s_x * Math.cos(u) * (R + r * Math.cos(v))); //X
                    var y = o_y + (s_y * r * Math.sin(v)); //Z
                    var z = o_z + (s_z * Math.sin(u) * (R + r * Math.cos(v))); //Y

                    vertex.push(x, y, z);

                    if (vC){
                        vertex.push(...clamp(normalize(x-central[0], y-central[1], z-central[2])));
                        // vertex.push(x, y, z);
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
    stair: {
        createVertex: function (o_x, o_y, o_z, s_x, s_y, s_z, vC) {
            var vertex = [];
            var central = [o_x, o_y, o_z];
            var intensity = 30;
            var increment = Math.PI / intensity;
            for(let u= 0; u <= 1; u += 1) {
                for(let v= 0; v <= 2 * Math.PI + 0.1; v += increment){
                    var x = o_x + (s_x * u * Math.cos(v)); //X
                    var y = o_y + (s_y * 0.4 * v - s_y); //Z
                    var z = o_z + (s_z * u * Math.sin(v)); //Y

                    vertex.push(x, y, z);

                    if (vC){
                        vertex.push(...clamp(normalize(x-central[0], y-central[1], z-central[2])));
                        // vertex.push(x, y, z);
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
                faces.push(
                    offset + i,
                    offset + i + intensity,
                    offset + i + intensity + 1
                );
                faces.push(
                    offset + i,
                    offset + i + 1,
                    offset + i + intensity + 1
                );
            }
            return faces;
        }
    },
    cuboid: {
        createVertex: function (o_x, o_y, o_z, s_x, s_y, s_z, vC, vT) {
            var vertex = [];
            var central = [o_x,o_y,o_z];
            for (let i = -1; i <= 1; i+=2) {
                for (let j = -1; j <= 1; j+=2) {
                    for (let k = -1; k <= 1; k+=2) {
                        var x = o_x + (s_x * k);
                        var y = o_y + (s_y * i);
                        var z = o_z + (s_z * j);

                        vertex.push(x,y,z);

                        if (vC){
                            vertex.push(...clamp(normalize(x-central[0], y-central[1], z-central[2])));
                            // vertex.push(x, y, z);
                        }
                        if (vT){
                            vertex.push(...clamp([k,i]));
                        }
                    }
                }
            }
            return vertex;
        },
        createFaces: function (offset) {
            var faces = [];
            for (let i = 0; i < 2; i++) {
                faces.push(offset + i * 4, offset + i * 4 + 1, offset + i * 4 + 2);
                faces.push(offset + i * 4 + 3, offset + i * 4 + 1, offset + i * 4 + 2);

                faces.push(offset + i * 2, offset + 4 + i * 2, offset + i * 2 + 1);
                faces.push(offset + 4 + i * 2 + 1, offset + 4 + i * 2, offset + i * 2 + 1);

                faces.push(offset + i, offset + i + 2, offset + i + 4);
                faces.push(offset + 6 + i, offset + i + 2, offset + i + 4);
            }
            return faces;
        }
    },
    height_saddle:{
        createVertex: function (o_x, o_y, o_z, s_x, s_y, s_z, height, vC) {
            var vertex = [];
            var central = [o_x, o_y, o_z];
            var size = 30;
            var increment = 1;
            for (let i = 0; i <= 1; i++) {
                for(let u= -size/2; u <= size/2; u += increment) {
                    for(let v= -size/2; v <= size/2; v += increment){

                        var x = o_x + (s_x * 0.065 * u);
                        var y = o_y + s_y * (i * height - height/2 + 0.0045 * (u**2 - v**2));
                        var z = o_z + (s_z * 0.065 * v);

                        vertex.push(x, y, z);

                        if (vC){
                            vertex.push(...clamp(normalize(x-central[0], y-central[1], z-central[2])));
                            // vertex.push(x, y, z);
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
                faces.push(i, size2 + i, size2 + i + 1);
                faces.push(i, i + 1, size2 + i + 1);

                faces.push(size2 - size + i, size2 - size + size2 + i, size2 - size + size2 + i + 1);
                faces.push(size2 - size + i, size2 - size + i + 1, size2 - size + size2 + i + 1);

                faces.push(i * size, (i+1) * size + size2, (i+1) * size);
                faces.push(i * size, i * size + size2, (i+1) * size + size2);

                faces.push((i+1) * size - 1, (i+2) * size + size2 - 1, (i+2) * size - 1);
                faces.push((i+1) * size - 1, (i+1) * size + size2 - 1, (i+2) * size + size2 - 1);
            }
            return faces;
        }
    }
};