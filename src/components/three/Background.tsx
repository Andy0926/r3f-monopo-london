import { Plane, useAspect, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { VFC } from "react";
import * as THREE from "three";
import { Drawer } from "./drawer";

export const Background: VFC = () => {
  const { aspect } = useThree(({ viewport }) => viewport);
  const drawer = new Drawer("test", false);
  const texture = useTexture(
    process.env.PUBLIC_URL + "/assets/textures/bg-grey.png"
  );
  // console.log("Background ASpect from drawer: ", drawer.aspect);
  const shader: THREE.Shader = {
    uniforms: {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2() },
      u_aspect: { value: drawer.aspect },
      u_texture: { value: texture },
    },
    vertexShader,
    fragmentShader,
  };

  const target = new THREE.Vector2();

  useFrame(({ mouse }) => {
    shader.uniforms.u_time.value += 0.005;
    shader.uniforms.u_aspect.value =
      window.innerWidth / (window.innerHeight * 0.5);
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
uniform sampler2D u_texture;

const vec3 black = vec3(.3);
const vec3 silver = vec3(0.15);


void main() {
  vec4 tex = texture2D(u_texture, v_uv);

  vec2 uv = v_uv;

  //Modify any value to make adjustment to the background texture
  for(float i = 1.0; i < 8.0; i++){
    uv.y += i * 0.05/ i * 
      sin(uv.x * i * i + u_time*3. ) * sin(uv.y * i * i + u_time*3. );
  }
    
  vec3 col;
  // tex *=uv.y;
    
    gl_FragColor = tex;
}
`;

//Reference https://www.shadertoy.com/view/3ttSzr
