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
    saddle: {
        createVertex: function (o_x, o_y, o_z, s_x, s_y, s_z, vC, vT) {
            var vertex = [];
            var central = [o_x,o_y,o_z];
            var size = 30;
            var increment = 1;
            for(let u= -size/2; u <= size/2; u += increment) {
                for(let v= -size/2; v <= size/2; v += increment){
                    var x = o_x + (s_x * 0.065 * u); //X
                    var y = o_y + (s_y * 0.0045 * (Math.pow(u,2)-Math.pow(v,2))); //Z
                    var z = o_z + (s_z * 0.065 * v); //Y

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
    rectangle:{
        createVertex: function (o_x, o_y, o_z, s_x, s_z, vC, vT, repeat) {
            var vertex = [];
            var central = [o_x,o_y,o_z];
            for(let u= -1; u <= 1; u += 2) {
                for(let v= -1; v <= 1; v += 2){
                    var x = o_x + (s_x * u); //X
                    var y = o_y; //Z
                    var z = o_z + (s_z * v); //Y

                    vertex.push(x, y, z);

                    if (vC){
                        vertex.push(...clamp(normalize(x-central[0], y-central[1], z-central[2])));
                        // vertex.push(x, y, z);
                    }
                    if (vT){
                        vertex.push(...(clamp([u, v])).map(x => x * repeat))
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
};