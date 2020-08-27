precision highp float;
precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform sampler2D color;
    // uniform vec2 point;
    // uniform float radius;
    
    void main () {
        // vec2 p = vUv - point.xy;
        // p.x *= aspectRatio;
        // vec3 splat = exp(-dot(p, p) / radius) * color; //replace this with optical flow
        vec3 splat = texture2D(color, vUv).xyz; //replace this with optical flow
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
}