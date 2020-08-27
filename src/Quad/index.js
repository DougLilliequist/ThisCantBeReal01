import {
    Plane
} from '../../vendors/ogl/src/extras/Plane';
import {
    Program
} from '../../Vendors/ogl/src/core/Program';
import {
    Texture
} from '../../Vendors/ogl/src/core/Texture';
import {
    Mesh
} from '../../Vendors/ogl/src/core/Mesh';
import {
    Vec2
} from '../../Vendors/ogl/src/math/Vec2';

const vert = require("./shader/quad.vert");
const frag = require("./shader/quad.frag");

export default class Quad extends Mesh {

    constructor(gl) {

        super(gl);

        this.gl = gl;

        this.geometry = new Plane(this.gl, {
            width: 2,
            height: 2
        });

        this.texture = new Texture(this.gl, {
            generateMipmaps: false,
            minFilter: this.gl.LINEAR,
            magFilter: this.gl.LINEAR
        });

        const uniforms = {

            _Video: {
                value: this.texture
            },

            _Output: {
                value: new Texture(this.gl)
            },
            _Resolution: {
                value: new Vec2(this.gl.renderer.width, this.gl.renderer.height)
            }

        }

        this.program = new Program(this.gl, {
            vertex: vert,
            fragment: frag,
            uniforms,
            transparent: false
        });

    }

    update({
        inputVideo
    }) {

        if (inputVideo.readyState >= inputVideo.HAVE_CURRENT_DATA) {

            this.texture.image = inputVideo;
            this.texture.needsUpdate = true;

        }

        this.program.uniforms._Resolution.value.set(this.gl.renderer.width, this.gl.renderer.height);

    }

    set Output(t) {
        this.program.uniforms._Output.value = t;
    }

}