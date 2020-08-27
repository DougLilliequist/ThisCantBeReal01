precision highp float;

uniform sampler2D _CurrentFrame;
uniform sampler2D _PrevFrame;
uniform sampler2D _PrevFlow;

uniform vec2 _Resolution;
uniform vec2 _TexelSize;
uniform float _Scale;

varying vec2 vUV;

#define TINY 0.000001
// #define TINY 0.0000001
// #define TINY 0.00001
// #define THRESHOLD 0.001 
#define THRESHOLD 0.007 
// #define THRESHOLD 0.01 


//HEAVILY INSPIRED FROM FOLLOWING SHADER: https://github.com/moostrik/ofxFlowTools/blob/master/src/core/opticalflow/ftOpticalFlowShader.h
//By: Matthias Oostrik https://github.com/moostrik

void main() {

    vec2 uv = vec2(1.0 - vUV.x, vUV.y);

    //derivative X
    float dX = texture2D(_PrevFrame, uv + vec2(_TexelSize.x, 0.0)).x - texture2D(_PrevFrame, uv - vec2(_TexelSize.x, 0.0)).x;
    dX += texture2D(_CurrentFrame, uv + vec2(_TexelSize.x, 0.0)).x - texture2D(_CurrentFrame, uv - vec2(_TexelSize.x, 0.0)).x;

    //derivative y
    float dY = texture2D(_PrevFrame, uv + vec2(0.0, _TexelSize.y)).x - texture2D(_PrevFrame, uv - vec2(0.0, _TexelSize.y)).x;
    dY += texture2D(_CurrentFrame, uv + vec2(0.0, _TexelSize.y)).x - texture2D(_CurrentFrame, uv - vec2(0.0, _TexelSize.y)).x;

    //gradient magnitude
    float mag = sqrt((dX * dX) + (dY * dY) + TINY);

    //brightness difference
    float dT = texture2D(_CurrentFrame, uv).x - texture2D(_PrevFrame, uv).x;

    float vX = (dX / mag) * dT;
    float vY = (dY / mag) * dT;

    vec2 flow = vec2(vX, vY * -1.0);

    float flowMag = length(flow);
    flowMag = max(flowMag, THRESHOLD);
    flowMag -= THRESHOLD;
    flowMag /= (1.0 - THRESHOLD);
    // flowMag = flowMag * flowMag;
    flow += TINY; //prevents divisions by 0 when normalizing
    flow = normalize(flow) * min(flowMag, 1.0);
    flow *= _Scale; 

    vec3 prevFlow = texture2D(_PrevFlow, vUV).xyz;

    vec3 outPut = mix(vec3(flow, length(flow)), prevFlow, 0.97);
    
    // gl_FragColor = vec4(vec3(flow, length(flow)), 1.0);
    gl_FragColor = vec4(outPut, 1.0);

}