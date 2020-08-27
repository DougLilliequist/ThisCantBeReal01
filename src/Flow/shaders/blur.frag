precision highp float;

uniform vec2 _Resolution;
uniform sampler2D _Texture;
uniform bool _Flip;
uniform vec2 _BlurDirection;

varying vec2 vUV;

//source: https://github.com/Jam3/glsl-fast-gaussian-blur/blob/master/5.glsl

vec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3333333333333333) * direction;
  color += texture2D(image, uv).x * 0.29411764705882354;
  color += texture2D(image, uv + (off1 / resolution)).x * 0.35294117647058826;
  color += texture2D(image, uv - (off1 / resolution)).x * 0.35294117647058826;
  return color; 
}

vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3846153846) * direction;
  vec2 off2 = vec2(3.2307692308) * direction;
  color += texture2D(image, uv).x * 0.2270270270;
  color += texture2D(image, uv + (off1 / resolution)).x * 0.3162162162;
  color += texture2D(image, uv - (off1 / resolution)).x * 0.3162162162;
  color += texture2D(image, uv + (off2 / resolution)).x * 0.0702702703;
  color += texture2D(image, uv - (off2 / resolution)).x * 0.0702702703;
  return color;
}

void main() {

    gl_FragColor = blur9(_Texture, vUV, _Resolution, _BlurDirection);

}