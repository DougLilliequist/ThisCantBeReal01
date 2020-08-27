precision highp float;

uniform sampler2D _CameraFrame;

varying vec2 vUV;

void main() {

    vec3 col = texture2D(_CameraFrame, vUV).xyz;
    gl_FragColor = vec4(col, 1.0);

}