precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec2 vUV;

void main() {

    vec3 pos = position;

    // gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_Position = vec4(pos, 1.0);

    vUV = uv;

}