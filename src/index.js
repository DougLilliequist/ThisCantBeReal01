import {
    Renderer
} from "../vendors/ogl/src/core/Renderer";
import {
    Camera
} from "../Vendors/ogl/src/core/Camera.js";
import {
    Transform
} from "../Vendors/ogl/src/core/Transform.js";
import {
    Orbit
} from "../Vendors/ogl/src/extras/Orbit.js";
import Quad from "./Quad/index.js";
import Flow from "./Flow/index.js";
import Fluid from "./Fluid/index.js";


export default class OpticalFlow {
    constructor() {
        this.renderer = new Renderer({
            width: window.innerWidth,
            height: window.innerHeight,
            antiAlias: true
        });

        this.gl = this.renderer.gl;
        this.gl.canvas.style.position = "absolute";
        this.gl.clearColor(0.96, 0.96, 0.96, 1.0);
        this.gl.canvas.style.top = "0";
        this.gl.canvas.style.left = "0";
        this.gl.canvas.style.width = "100%";
        this.gl.canvas.style.height = "100%";
        this.gl.canvas.style.overflow = "hidden";
        this.gl.canvas.style.zIndex = "-1";
        document.body.appendChild(this.gl.canvas);

        this.scene = new Transform();

        this.camera = new Camera(this.gl, {
            fov: 35,
            far: 10,
            aspect: window.innerWidth / window.innerHeight
        });

        this.orbitCamera = new Orbit(this.camera, {
            element: this.gl.canvas
        });

        this.camera.position.z = 5;

        this.initVideo();

        this.initOpticalFlow();

        this.initFluidSim();

        this.initQuad();

        this.initEvents();

        this.start();
    }

    initVideo() {

        this.streamAvailable = false;

        this.video = document.createElement("video");

        const options = {
            audio: false,
            video: {
                width: 640,
                height: 480
            }
        };

        navigator.mediaDevices
            .getUserMedia(options)
            .then(stream => {
                this.video.srcObject = stream;
                this.video.play();
                this.streamAvailable = true;
            })
            .catch(error => {
                console.error("no camera found");
            });
    }

    initOpticalFlow() {

        this.flow = new Flow(this.gl, {
            width: 640,
            height: 480
        });

    }

    initFluidSim() {

        this.fluidSim = new Fluid(this.gl);

    }

    initQuad() {

        this.quad = new Quad(this.gl);
        this.quad.Output = this.flow.flowVectorTextureRead.texture;
        this.quad.setParent(this.scene);

    }

    initEvents() {
        window.addEventListener("resize", this.onResize);
    }

    start() {
        this.update();
    }

    render() {
        this.renderer.render({
            scene: this.scene,
            camera: this.camera
        });
    }

    update() {
        window.requestAnimationFrame(() => this.update());
        if (this.streamAvailable) {

            this.flow.update({
                inputVideo: this.video
            });

            this.fluidSim.update({
                flowVectorTexture: this.flow.flowVectorTextureRead.texture
            });

            this.quad.update({
                inputVideo: this.video
            });
            this.quad.Output = this.fluidSim.FluidOutput;

        }
        this.render();
    }

    onResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const aspect = w / h;
        this.renderer.setSize(w, h);
        this.camera.perspective({
            aspect
        });
    };
}