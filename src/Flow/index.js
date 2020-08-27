import {
    Transform
} from '../../Vendors/ogl/src/core/Transform'
import {
    Triangle
} from '../../Vendors/ogl/src/extras/Triangle';
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
    RenderTarget
} from '../../Vendors/ogl/src/core/RenderTarget';
import {
    Vec2
} from '../../Vendors/ogl/src/math/Vec2';

const vert = require('./shaders/triangle.vert');
const opticalFlowFrag = require('./shaders/opticalflow.frag');
const captureFrag = require('./shaders/capture.frag');
const blur = require('./shaders/blur.frag');

/**
 * Takes a input image and does following:
 * calculates brightness derivatives for optical flow
 * takes the flow image and pass it to a blur pass
 * applies the optical flow texture to a flud sim
 * 
 * getters:
 * optical flow
 * fluid sim
 */

export default class Flow {

    constructor(gl, {
        width = 2,
        height = 2
    }) {


        this.gl = gl;
        this.width = width;
        this.height = height;
        this.firstTick = true;

        this.initCameraCapture();

        this.initBlurPass();

        this.initOpticalFlowPass();

        this.initVelocityPass();

    }

    initCameraCapture() {

        this.cameraFrame = new Texture(this.gl, {
            generateMipmaps: false,
            width: this.width,
            height: this.height
        });

        const params = {
            width: this.width,
            height: this.height,
            minFilter: this.gl.LINEAR,
            magFilter: this.gl.LINEAR,
            depth: false
        }

        this.currentFrame = new RenderTarget(this.gl, params);

        this.prevFrame = new RenderTarget(this.gl, params);

        this.cameraCaptureScene = new Transform();

        const uniforms = {
            _CameraFrame: {
                value: this.cameraFrame
            }
        }

        this.cameraCaptureQuad = new Mesh(this.gl, {
            geometry: new Triangle(this.gl),
            program: new Program(this.gl, {
                vertex: vert,
                fragment: captureFrag,
                uniforms,
                transparent: false
            })
        });

        this.cameraCaptureQuad.setParent(this.cameraCaptureScene);

    }

    initBlurPass() {

        const params = {
            width: this.width,
            height: this.height,
            minFilter: this.gl.LINEAR,
            magFilter: this.gl.LINEAR,
            depth: false
        }

        this.blurTextureWrite = new RenderTarget(this.gl, params);

        this.blurTextureRead = new RenderTarget(this.gl, params);

        this.blurDirectionX = new Vec2(1.0, 0.0);
        this.blurDirectionY = new Vec2(0.0, 1.0);

        this.blurScene = new Transform();

        const uniforms = {

            _Texture: {
                value: this.blurTextureRead.texture
            },
            _Resolution: {
                value: new Vec2(this.gl.renderer.width, this.gl.renderer.height)
            },
            _Flip: {
                value: false
            },
            _BlurDirection: {
                value: new Vec2(0.0, 0.0)
            }

        }

        this.blurQuad = new Mesh(this.gl, {
            geometry: new Triangle(this.gl),
            program: new Program(this.gl, {
                vertex: vert,
                fragment: blur,
                uniforms,
                transparent: false
            })
        });

        this.blurQuad.setParent(this.blurScene);

    }

    initOpticalFlowPass() {

        //texture where we render the flow vectors
        const params = {
            width: this.width,
            height: this.height,
            type: this.gl.HALF_FLOAT || this.gl.renderer.extensions['OES_texture_half_float'].HALF_FLOAT_OES,
            format: this.gl.RGBA,
            internalFormat: this.gl.RGBA16F,
            depth: false
        }

        this.flowVectorTextureWrite = new RenderTarget(this.gl, params);
        this.flowVectorTextureRead = new RenderTarget(this.gl, params);

        this.opticalFlowScene = new Transform();
        const uniforms = {

            _CurrentFrame: {
                value: this.currentFrame.texture
            },

            _PrevFrame: {
                value: this.prevFrame.texture
            },

            _PrevFlow: {
                value: this.flowVectorTextureRead.texture
            },
            _Resolution: {
                value: new Vec2(this.gl.renderer.width, this.gl.renderer.height)
            },
            _TexelSize: {
                value: new Vec2(1.0 / this.gl.renderer.width, 1.0 / this.gl.renderer.height)
            },
            _Scale: {

                value: 800

            }

        }

        this.opticalFlowQuad = new Mesh(this.gl, {
            geometry: new Triangle(this.gl),
            program: new Program(this.gl, {
                uniforms,
                vertex: vert,
                fragment: opticalFlowFrag,
                transparent: false
            })
        });

        this.opticalFlowQuad.setParent(this.opticalFlowScene);

    }

    initVelocityPass() {

        // const params = {
        //     width: this.width,
        //     height: this.height,
        //     type: this.gl.HALF_FLOAT || this.gl.renderer.extensions['OES_texture_half_float'].HALF_FLOAT_OES,
        //     format: this.gl.RGBA,
        //     internalFormat: this.gl.RGBA16F,
        //     depth: false
        // }

        // this.velocityTextureRead =

    }

    blurInputVideo() {

        const blurIterationCount = 12;

        this.gl.renderer.autoClear = false;

        for (let i = 0; i < blurIterationCount; i++) {

            let blurRadius = (blurIterationCount - i - 1);

            this.blurQuad.program.uniforms._Texture.value = i === 0 ? this.cameraFrame : this.blurTextureRead.texture;
            this.blurQuad.program.uniforms._BlurDirection.value.set(i % 2 === 0 ? blurRadius : 0, i % 2 === 0 ? 0 : blurRadius);
            this.blurQuad.program.uniforms._Resolution.value.set(this.gl.renderer.width, this.gl.renderer.height);

            this.gl.renderer.render({
                scene: this.blurScene,
                target: this.blurTextureWrite
            });

            let tmp = this.blurTextureRead;
            this.blurTextureRead = this.blurTextureWrite;
            this.blurTextureWrite = tmp;

        }

        this.gl.renderer.autoClear = true;

    }

    saveCameraFrame() {

        let tmp = this.prevFrame;
        this.prevFrame = this.currentFrame;
        this.currentFrame = tmp;

        this.cameraCaptureQuad.program.uniforms._CameraFrame.value = this.blurTextureRead.texture;
        this.gl.renderer.render({
            scene: this.cameraCaptureScene,
            target: this.currentFrame
        });

    }

    update({
        inputVideo
    }) {

        if (inputVideo.readyState >= inputVideo.HAVE_CURRENT_DATA) {

            this.cameraFrame.image = inputVideo;
            this.cameraFrame.needsUpdate = true;

            //...run as usual
            this.blurInputVideo();
            this.saveCameraFrame();

            //prewarm to prevent spike in optical flow
            if (this.firstTick) {
                this.blurInputVideo();
                this.saveCameraFrame();
                this.firstTick = false;
            }

        }

        this.opticalFlowQuad.program.uniforms._CurrentFrame.value = this.currentFrame.texture;
        this.opticalFlowQuad.program.uniforms._PrevFrame.value = this.prevFrame.texture;
        this.opticalFlowQuad.program.uniforms._PrevFlow.value = this.flowVectorTextureRead.texture;
        this.opticalFlowQuad.program.uniforms._Resolution.value.set(this.gl.renderer.width, this.gl.renderer.height);
        this.opticalFlowQuad.program.uniforms._TexelSize.value.set(1.0 / this.gl.renderer.width, 1.0 / this.gl.renderer.height);

        this.gl.renderer.render({
            scene: this.opticalFlowScene,
            target: this.flowVectorTextureWrite
        });

        let tmp = this.flowVectorTextureRead;
        this.flowVectorTextureRead = this.flowVectorTextureWrite;
        this.flowVectorTextureWrite = tmp;

    }

}