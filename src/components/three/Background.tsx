import { Plane } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { VFC } from "react";
import * as THREE from "three";
import { Drawer } from "./drawer";

export const Background: VFC = () => {
  const { aspect } = useThree(({ viewport }) => viewport);
  const drawer = new Drawer("test", false);

  const shader: THREE.Shader = {
    uniforms: {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2() },
      u_aspect: { value: drawer.aspect },
    },
    vertexShader,
    fragmentShader,
  };

  const target = new THREE.Vector2();

  // useEffect(() => {
  //   shader.uniforms.aspect.value = size.width / 2.2;
  // }, [shader.uniforms.aspect, size.width, size.height]);
  useFrame(({ mouse }) => {
    shader.uniforms.u_time.value += 0.005;

    // Calculate the normalized mouse position with aspect ratio adjustment
    target.set((mouse.x + 1) * 0.5 * aspect, (mouse.y + 1) * 0.5);

    shader.uniforms.u_mouse.value.lerp(target, 0.2);
  });

  return (
    <Plane args={[2, 2]} scale={[1, 1, 1]}>
      <shaderMaterial args={[shader]} />
    </Plane>
  );
};

const vertexShader = `
varying vec2 v_uv;
uniform float u_aspect;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
uniform float u_time;
uniform vec2 u_mouse;
varying vec2 v_uv;

const vec3 black = vec3(.3);
const vec3 silver = vec3(0.15);


void main() {
  // vec3 color = mix(black, silver, v_uv.y);
  // float pct = abs(sin(u_time));
  // // Calculate the color based on a silver gradient using sin and u_time
  // float gradient = abs(sin(u_time * 2.0) + 1.0) * 0.5; // Map sin value to [0, 1]
  // color = mix(color, vec3(gradient), pct);

  // gl_FragColor = vec4(color, .9);

  vec2 uv = v_uv;

  for(float i = 1.0; i < 8.0; i++){
    uv.y += i * 0.01 / i * 
      sin(uv.x * i * i + u_time*2. ) * sin(uv.y * i * i + u_time*2. );
  }
    
   vec3 col;
   col.r  = uv.y - 0.1;
   col.g = uv.y + 0.3;
   col.b = uv.y + 0.7;
    
    gl_FragColor = vec4(col,1.0);
}
`;

//https://www.shadertoy.com/view/3ttSzr
