export const blurVertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export const blurFragmentShader = `
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform float u_aspect;
uniform bool u_enable;
varying vec2 v_uv;

void main() {
  vec4 tex = texture2D(u_texture, v_uv);
  vec2 aspect = vec2(u_aspect, 1.0);
  float radius = 0.35;
  float dist = distance(u_mouse * aspect, v_uv * aspect);
  float d = 1.0 - smoothstep(radius, radius + 0.005, dist);
  
  vec4 background = vec4(0.0, 0.0, 0.0, 0.0);

  if (!u_enable) {
    background = vec4(0.0, 0.0, 0.0, 0.0);
  }

  if (dist < radius) {
    background = vec4(0.0, 0.0, 0.0, 1.0);
    tex.rgb = vec3(0.0, 0.0, 0.0);
  }
  else{
    tex.rgb = vec3(0.0, 0.54, 0.78);
  }

  gl_FragColor = background + tex;
}
`;
// ========================================================
export const clearVertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export const clearFragmentShader = `
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform float u_aspect;
uniform bool u_enable;
varying vec2 v_uv;

void main() {
  vec2 aspect = vec2(u_aspect, 1.0);
  float radius = 0.35;
  float dist = distance(u_mouse * aspect, v_uv * aspect);
  float d = smoothstep(radius, radius + 0.005, dist);
  vec2 sub = u_mouse - v_uv;
  sub *= aspect *0.5;

  vec2 uv = v_uv - sub *dist*0.25;
  vec4 tex_r = texture2D(u_texture, uv);
  vec4 tex_g = texture2D(u_texture, uv );
  vec4 tex_b = texture2D(u_texture, uv );
  float a = max(max(tex_r.a, tex_g.a), tex_b.a);
  vec4 tex = vec4(tex_r.r, tex_g.g, tex_b.b, a);

  tex.a = mix(tex.a, 0.0, d);
  tex.rgb = vec3(0.0, 0.54, 0.78);


  gl_FragColor =tex ;
}
`;
