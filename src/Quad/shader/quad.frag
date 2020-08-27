precision highp float;

uniform sampler2D _Video;
uniform sampler2D _Output;
uniform vec2 _Resolution;

varying vec2 vUV;

#define FLOWSTR 0.003

void main() {

    vec2 cameraUV = vec2(1.0 - vUV.x, vUV.y);
    cameraUV -= 0.5;
    float aspect = (_Resolution.x / _Resolution.y) / (640.0 / 480.0);
    cameraUV.y /= aspect;
    cameraUV += 0.5;

    vec3 flow = texture2D(_Output, vec2(1.0 - cameraUV.x, cameraUV.y)).xyz;
    // vec3 camera = texture2D(_Video, cameraUV + flow.xy).xyz;
    
    float flowMag = min(1.0, length(flow.xy));
    flow.xy *= FLOWSTR;

    float r = texture2D(_Video, cameraUV + (vec2(0.0025, 0.0) *flowMag) + flow.xy).x;
    float g = texture2D(_Video, cameraUV + (vec2(0.0, 0.0015) *flowMag) + flow.xy).y;
    float b = texture2D(_Video, cameraUV + (vec2(-0.0025, 0.0) *flowMag) + flow.xy).z;

    vec3 col = vec3(r,g,b);

    gl_FragColor = vec4(col, 1.0);

}