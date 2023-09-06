import { VFC, useEffect } from "react";
import * as THREE from "three";
import { Plane } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { cnoise21 } from "../../modules/glsl/noise";

export const Background: VFC = () => {
  const { aspect } = useThree(({ viewport }) => viewport);

  const shader: THREE.Shader = {
    uniforms: {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2() },
      aspect: { value: 1 },
    },
    vertexShader,
    fragmentShader,
  };

  const target = new THREE.Vector2();
  const { size } = useThree();

  useEffect(() => {
    shader.uniforms.aspect.value = size.width / 2.2;
  }, [shader.uniforms.aspect, size.width, size.height]);
  useFrame(({ mouse }) => {
    shader.uniforms.u_time.value += 0.005;
  
    // Calculate the normalized mouse position with aspect ratio adjustment
    target.set((mouse.x + 1) * 0.5 * aspect , (mouse.y + 1) * 0.5);
  
    shader.uniforms.u_mouse.value.copy(target);
  });

  return (
    <Plane args={[2, 2]} scale={[1 / aspect, 1, 1]}>
      <shaderMaterial args={[shader]} />
    </Plane>
  );
};

const vertexShader = `
varying vec2 v_uv;
uniform float aspect;

void main() {
  v_uv = uv + vec2(0.27, 0.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
uniform float u_time;
uniform vec2 u_mouse;
varying vec2 v_uv;


const vec3 black = vec3(1.);

void main() {
  vec3 color = black;
  
  // Calculate the distance from the center of the texture
  float distance = length(v_uv - u_mouse);

  // Set the radius of the circular texture
  float radius = 0.18;

  // Check if the current pixel is within the circular texture
  if (distance <= radius) {
    // Set the color to black
    color = vec3(0.);
  }

  gl_FragColor = vec4(color, 1.0);
}
`;
