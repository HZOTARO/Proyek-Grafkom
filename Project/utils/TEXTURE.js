var TEXTURE = {
    createTexture: function (){
        var src = [
            "grid",
            "test",
            "spongebob",
            // "spongebob - Copy",
            "cube",
            "sand",
            "cubemap",
            "sketch",
            "celana_patrick",
            "rumah_patrick",
            "skin_patrick",
            "mata_patrick",
            "antenna",
            "topi_patrick",
        ];
        var textures = [];
        for (const name of src) {
            textures.push(this.load_texture("./asset/" + name + ".png",false));
        }
        return textures;
    },

    isPowerOf2: function (value) {
        return (value & (value - 1)) === 0;
    },

    load_texture: function(image_URL, repeat){
        var texture = GL.createTexture();

        var image = new Image();
        image.src = image_URL;
        image.onload = function(e) {
            GL.bindTexture(GL.TEXTURE_2D, texture);
            GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true);
            GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);
            // GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
            // GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
            // GL.generateMipmap(GL.TEXTURE_2D);
            if (TEXTURE.isPowerOf2(image.width) && TEXTURE.isPowerOf2(image.height)) {
                // Yes, it's a power of 2. Generate mips.
                GL.generateMipmap(GL.TEXTURE_2D);
            } else {
                // No, it's not a power of 2. Turn off mips and set
                // wrapping to clamp to edge
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
            }
            if (repeat){
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.MIRRORED_REPEAT);
                GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.MIRRORED_REPEAT);
            }
            GL.bindTexture(GL.TEXTURE_2D, null);
        };

        return texture;
    },
};
