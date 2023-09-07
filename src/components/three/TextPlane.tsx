import { Plane } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { VFC } from "react";
import * as THREE from "three";
import { Drawer } from "./drawer";

type TextPlaneProps = {
  text: string;
  blur: boolean;
  vertexShader: string;
  fragmentShader: string;
};

export const TextPlane: VFC<TextPlaneProps> = (props) => {
  const { text, vertexShader, fragmentShader, blur } = props;

  const drawer = new Drawer(text, blur);
  drawer.draw();

  const shader: THREE.Shader = {
    uniforms: {
      u_texture: { value: drawer.texture },
      u_mouse: { value: new THREE.Vector2() },
      u_aspect: { value: drawer.aspect },
      u_enable: { value: false },
    },
    vertexShader,
    fragmentShader,
  };

  const target = new THREE.Vector2();
  useFrame(() => {
    shader.uniforms.u_mouse.value.lerp(target, 0.1);
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    target.copy(e.uv!);
  };

  const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
    shader.uniforms.u_mouse.value.copy(e.uv!);
    shader.uniforms.u_enable.value = true;
  };

  const handlePointerLeave = () => {
    shader.uniforms.u_enable.value = false;
  };

  return (
    <Plane
      // args={[2.6, 2.6 / drawer.aspect]}
      // scale={[1 / aspect, 1, 1]}
      args={[2, 2]}
      scale={[1, 1, 1]}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <shaderMaterial args={[shader]} transparent />
    </Plane>
  );
};
