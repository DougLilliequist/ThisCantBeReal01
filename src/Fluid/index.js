import {
    Program
} from '../../vendors/ogl/src/core/Program';
import {
    Texture
} from '../../Vendors/ogl/src/core/Texture';
import {
    Mesh
} from '../../Vendors/ogl/src/core/Mesh';
import {
    RenderTarget
} from '../../Vendors/ogl/src/core/RenderTarget';
import {
    Vec2
} from '../../Vendors/ogl/src/math/Vec2';
import {
    Geometry
} from '../../Vendors/ogl/src/core/Geometry';

const base = require('./shaders/baseVertex.vert');
const advectionShader = require('./shaders/advection.frag');
const advectionManualFilterShader = require('./shaders/advectionManualFiltering.frag');
const clearShader = require('./shaders/clear.frag');
const curlShader = require('./shaders/curl.frag');
const divergenceShader = require('./shaders/divergence.frag');
const gradientSubtractShader = require('./shaders/gradientSubtract.frag');
const pressureShader = require('./shaders/pressure.frag');
const splatShader = require('./shaders/splat.frag');
const vorticityShader = require('./shaders/vorticity.frag');

/**
 * Based on OGL post fluid example: https://github.com/oframe/ogl/blob/master/examples/post-fluid-distortion.html by Nathan Gordon
 */

export default class Fluid {

    constructor(gl) {

        this.gl = gl;

        this.initSimParams();
        this.initSimulationPrograms();

    }

    initSimParams() {

        this.simRes = 256.0;
        this.dyeRes = 512.0;

        this.texelSize = new Vec2(1.0 / this.simRes);

        // this.simParams = {

        //     iterations: 4,
        //     densityDissipation: 0.97,
        //     velocityDissipation: 0.98,
        //     pressureDissipation: 0.99,
        //     curlStrength: 0.1,
        //     radius: 0.2

        // }

        //very gooey!
        this.simParams = {

            iterations: 4,
            densityDissipation: 0.99,
            velocityDissipation: 0.98,
            pressureDissipation: 0.99,
            curlStrength: 0.1,
            radius: 0.2

        }

    }

    initSimulationPrograms() {

        // Get supported formats and types for FBOs
        let supportLinearFiltering = this.gl.renderer.extensions[`OES_texture_${this.gl.renderer.isWebgl2 ? `` : `half_`}float_linear`];
        const halfFloat = this.gl.renderer.isWebgl2 ? this.gl.HALF_FLOAT : this.gl.renderer.extensions['OES_texture_half_float'].HALF_FLOAT_OES;
        const filtering = supportLinearFiltering ? this.gl.LINEAR : this.gl.NEAREST;

        let rgba, rg, r;

        if (this.gl.renderer.isWebgl2) {
            rgba = this.getSupportedFormat(this.gl, this.gl.RGBA16F, this.gl.RGBA, halfFloat);
            rg = this.getSupportedFormat(this.gl, this.gl.RG16F, this.gl.RG, halfFloat);
            r = this.getSupportedFormat(this.gl, this.gl.R16F, this.gl.RED, halfFloat);

        } else {
            rgba = this.getSupportedFormat(this.gl, this.gl.RGBA, this.gl.RGBA, halfFloat);
            rg = rgba;
            r = rgba;
        }

        this.densityFBO = this.createPingPongBuffer({
            width: this.dyeRes,
            height: this.dyeRes,
            type: halfFloat,
            format: rgba.format,
            internalFormat: rgba.internalFormat,
            minFilter: filtering,
            depth: false
        });

        this.velocityFBO = this.createPingPongBuffer({
            width: this.simRes,
            height: this.simRes,
            type: halfFloat,
            format: rg.format,
            internalFormat: rg.internalFormat,
            minFilter: filtering,
            depth: false
        });

        this.pressureFBO = this.createPingPongBuffer({
            width: this.simRes,
            height: this.simRes,
            type: halfFloat,
            format: r.format,
            internalFormat: r.internalFormat,
            minFilter: this.gl.NEAREST,
            depth: false
        });

        this.divergence = new RenderTarget(this.gl, {
            width: this.simRes,
            height: this.simRes,
            type: halfFloat,
            format: r.format,
            internalFormat: r.internalFormat,
            minFilter: this.gl.NEAREST,
            depth: false
        });

        this.curl = new RenderTarget(this.gl, {
            width: this.simRes,
            height: this.simRes,
            type: halfFloat,
            format: r.format,
            internalFormat: r.internalFormat,
            minFilter: this.gl.NEAREST,
            depth: false
        });

        const triangle = new Geometry(this.gl, {

            position: {
                size: 2,
                data: new Float32Array([-1, -1, 3, -1, -1, 3])
            },
            uv: {
                size: 2,
                data: new Float32Array([0, 0, 2, 0, 0, 2])
            }

        });

        const clearUniforms = {
            texelSize: {
                value: this.texelSize
            },
            uTexture: {
                value: null
            },
            value: {
                value: this.simParams.pressureDissipation
            },
        }

        this.clearProgram = new Mesh(this.gl, {
            geometry: triangle,
            program: new Program(this.gl, {
                vertex: base,
                fragment: clearShader,
                uniforms: clearUniforms,
                depthTest: false,
                depthWrite: false
            })
        });

        //for texture input
        const splatUniforms = {
            texelSize: {
                value: this.texelSize
            },
            uTarget: {
                value: null
            },
            aspectRatio: {
                value: 1.0
            },
            color: {
                value: new Texture(this.gl)
            }
        }

        //for mouse/touch input
        // const splatUniforms = {
        //     texelSize: {
        //         value: this.texelSize
        //     },
        //     uTarget: {
        //         value: null
        //     },
        //     aspectRatio: {
        //         value: 1.0
        //     },
        //     color: {
        //         value: new Color()
        //     },
        //     point: {
        //         value: new Vec2()
        //     },
        //     radius: {
        //         value: 1.0
        //     }
        // }

        this.splatProgram = new Mesh(this.gl, {
            geometry: triangle,
            program: new Program(this.gl, {
                vertex: base,
                fragment: splatShader,
                uniforms: splatUniforms,
                depthTest: false,
                depthWrite: false
            })
        });

        const advectionUniforms = {
            texelSize: {
                value: this.texelSize
            },
            dyeTexelSize: {
                value: new Vec2(1.0 / this.dyeRes)
            },
            uVelocity: {
                value: null
            },
            uSource: {
                value: null
            },
            dt: {
                value: 0.016
            },
            dissipation: {
                value: 1.0
            }
        };

        this.advectionProgram = new Mesh(this.gl, {
            geometry: triangle,
            program: new Program(this.gl, {
                vertex: base,
                fragment: supportLinearFiltering ? advectionShader : advectionManualFilterShader,
                uniforms: advectionUniforms,
                depthTest: false,
                depthWrite: false
            })
        });

        const divergenceUniforms = {
            texelSize: {
                value: this.texelSize
            },
            uVelocity: {
                value: null
            }
        };

        this.divergenceProgram = new Mesh(this.gl, {
            geometry: triangle,
            program: new Program(this.gl, {
                vertex: base,
                fragment: divergenceShader,
                uniforms: divergenceUniforms,
                depthTest: false,
                depthWrite: false
            })
        });

        const curlUniforms = {
            texelSize: {
                value: this.texelSize
            },
            uVelocity: {
                value: null
            }
        }

        this.curlProgram = new Mesh(this.gl, {
            geometry: triangle,
            program: new Program(this.gl, {
                vertex: base,
                fragment: curlShader,
                uniforms: curlUniforms,
                depthTest: false,
                depthWrite: false
            })
        });

        const vorticityUniforms = {

            texelSize: {
                value: this.texelSize
            },
            uVelocity: {
                value: null
            },
            uCurl: {
                value: null
            },
            curl: {
                value: this.simParams.curlStrength
            },
            dt: {
                value: 0.016
            }

        }

        this.vorticityProgram = new Mesh(this.gl, {
            geometry: triangle,
            program: new Program(this.gl, {
                vertex: base,
                fragment: vorticityShader,
                uniforms: vorticityUniforms,
                depthTest: false,
                depthWrite: false
            })
        });

        const pressureUniforms = {

            texelSize: {
                value: this.texelSize
            },
            uPressure: {
                value: null
            },
            uDivergence: {
                value: null
            }

        }

        this.pressureProgram = new Mesh(this.gl, {
            geometry: triangle,
            program: new Program(this.gl, {
                vertex: base,
                fragment: pressureShader,
                uniforms: pressureUniforms,
                depthTest: false,
                depthWrite: false
            })
        });

        const gradientSubtractUniforms = {

            texelSize: {
                value: this.texelSize
            },
            uPressure: {
                value: null
            },
            uVelocity: {
                value: null
            }

        }

        this.gradientSubtractProgram = new Mesh(this.gl, {

            geometry: triangle,
            program: new Program(this.gl, {
                vertex: base,
                fragment: gradientSubtractShader,
                uniforms: gradientSubtractUniforms,
                depthTest: false,
                depthWrite: false
            })

        });

    }

    splat({
        flowVectorTexture
    }) {

        this.splatProgram.program.uniforms.uTarget.value = this.velocityFBO.read.texture;
        this.splatProgram.program.uniforms.aspectRatio.value = this.gl.renderer.width / this.gl.renderer.height;
        this.splatProgram.program.uniforms.color.value = flowVectorTexture;

        this.gl.renderer.render({
            scene: this.splatProgram,
            target: this.velocityFBO.write,
            sort: false,
            update: false
        });
        this.velocityFBO.swap();

        this.splatProgram.program.uniforms.uTarget.value = this.densityFBO.read.texture;
        this.gl.renderer.render({
            scene: this.splatProgram,
            target: this.densityFBO.write,
            sort: false,
            update: false
        });

        this.densityFBO.swap();

    }

    update({
        flowVectorTexture
    }) {

        this.gl.renderer.autoClear = false;

        this.splat({
            flowVectorTexture
        });

        this.curlProgram.program.uniforms.uVelocity.value = this.velocityFBO.read.texture;

        this.gl.renderer.render({
            scene: this.curlProgram,
            target: this.curl,
            sort: false,
            update: false
        });

        this.vorticityProgram.program.uniforms.uVelocity.value = this.velocityFBO.read.texture;
        this.vorticityProgram.program.uniforms.uCurl.value = this.curl.texture;

        this.gl.renderer.render({
            scene: this.vorticityProgram,
            target: this.velocityFBO.write,
            sort: false,
            update: false
        });

        this.velocityFBO.swap();

        this.divergenceProgram.program.uniforms.uVelocity.value = this.velocityFBO.read.texture;

        this.gl.renderer.render({
            scene: this.divergenceProgram,
            target: this.divergence,
            sort: false,
            update: false
        });

        this.clearProgram.program.uniforms.uTexture.value = this.pressureFBO.read.texture;
        this.clearProgram.program.uniforms.value.value = this.simParams.pressureDissipation;

        this.gl.renderer.render({
            scene: this.clearProgram,
            target: this.pressureFBO.write,
            sort: false,
            update: false
        });

        this.pressureFBO.swap();

        this.pressureProgram.program.uniforms.uDivergence.value = this.divergence.texture;

        for (let i = 0; i < this.simParams.iterations; i++) {

            this.pressureProgram.program.uniforms.uPressure.value = this.pressureFBO.read.texture;

            this.gl.renderer.render({
                scene: this.pressureProgram,
                target: this.pressureFBO.write,
                sort: false,
                update: false
            });

            this.pressureFBO.swap();

        }

        this.gradientSubtractProgram.program.uniforms.uPressure.value = this.pressureFBO.read.texture;
        this.gradientSubtractProgram.program.uniforms.uVelocity.value = this.velocityFBO.read.texture;

        this.gl.renderer.render({
            scene: this.gradientSubtractProgram,
            target: this.velocityFBO.write,
            sort: false,
            update: false
        });

        this.velocityFBO.swap();

        this.advectionProgram.program.uniforms.dyeTexelSize.value.set(1 / this.simRes);
        this.advectionProgram.program.uniforms.uVelocity.value = this.velocityFBO.read.texture;
        this.advectionProgram.program.uniforms.uSource.value = this.velocityFBO.read.texture;
        this.advectionProgram.program.uniforms.dissipation.value = this.simParams.velocityDissipation;

        this.gl.renderer.render({
            scene: this.advectionProgram,
            target: this.velocityFBO.write,
            sort: false,
            update: false
        });

        this.velocityFBO.swap();

        this.advectionProgram.program.uniforms.dyeTexelSize.value.set(1 / this.dyeRes);
        this.advectionProgram.program.uniforms.uVelocity.value = this.velocityFBO.read.texture;
        this.advectionProgram.program.uniforms.uSource.value = this.densityFBO.read.texture;
        this.advectionProgram.program.uniforms.dissipation.value = this.simParams.densityDissipation;

        this.gl.renderer.render({
            scene: this.advectionProgram,
            target: this.densityFBO.write,
            sort: false,
            update: false
        });

        this.densityFBO.swap();

        this.gl.renderer.autoClear = true;

    }

    get FluidOutput() {
        return this.densityFBO.read.texture
    }

    createPingPongBuffer({
        width,
        height,
        wrapS,
        wrapT,
        minFilter = this.gl.LINEAR,
        magFilter = minFilter,
        type,
        format,
        internalFormat,
        depth

    }) {

        const params = {
            width,
            height,
            wrapS,
            wrapT,
            minFilter,
            magFilter,
            type,
            format,
            internalFormat,
            depth
        };

        const fbo = {

            read: new RenderTarget(this.gl, params),
            write: new RenderTarget(this.gl, params),
            swap: () => {
                let tmp = fbo.read;
                fbo.read = fbo.write;
                fbo.write = tmp;
            }

        }

        return fbo;

    }

    supportRenderTextureFormat(gl, internalFormat, format, type) {

        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

        let fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (status != gl.FRAMEBUFFER_COMPLETE) return false;
        return true;
    }

    // Helper functions for larger device support
    getSupportedFormat(gl, internalFormat, format, type) {
        if (!this.supportRenderTextureFormat(gl, internalFormat, format, type)) {
            switch (internalFormat) {
                case gl.R16F:
                    return this.getSupportedFormat(gl, gl.RG16F, gl.RG, type);
                case gl.RG16F:
                    return this.getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
                default:
                    return null;
            }
        }

        return {
            internalFormat,
            format
        };
    }

}