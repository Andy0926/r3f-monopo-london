import { Plane, useAspect } from "@react-three/drei";
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
  //trigger re-render
  const __threeAspect = useAspect(window.innerWidth, window.innerHeight / 2, 1);
  const shader: THREE.Shader = {
    uniforms: {
      u_texture: { value: drawer.texture },
      u_mouse: { value: new THREE.Vector2() },
      u_aspect: { value: drawer.aspect },
      u_enable: { value: false },
      u_radius: { value: 0.3 },
      u_diverge: { value: 0.25 },
    },
    vertexShader,
    fragmentShader,
  };
  const target = new THREE.Vector2();
  useFrame((delta) => {
    if (window.innerWidth < 500) {
      shader.uniforms.u_mouse.value = {
        x: THREE.MathUtils.smoothstep(
          Math.abs(Math.sin(delta.clock.elapsedTime * 0.4)),
          0,
          1
        ),
        y: 0.5,
      };
      shader.uniforms.u_aspect.value =
        window.innerWidth / (window.innerHeight * 0.5);
      shader.uniforms.u_radius.value = 0.1;
      shader.uniforms.u_aspect.value = drawer.aspect;
      shader.uniforms.u_diverge.value = 0.4;
    } else {
      shader.uniforms.u_radius.value = 0.3;
      shader.uniforms.u_mouse.value = target;
      shader.uniforms.u_mouse.value.lerp(target, 0.1);
      shader.uniforms.u_aspect.value = drawer.aspect;
      shader.uniforms.u_diverge.value = 0.25;
    }
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    !(window.innerWidth < 500) && target.copy(e.uv!);
  };

  const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
    if (!(window.innerWidth < 500)) {
      shader.uniforms.u_mouse.value.copy(e.uv!);
      shader.uniforms.u_enable.value = true;
    }
  };

  const handlePointerLeave = () => {
    if (!(window.innerWidth < 500)) {
      shader.uniforms.u_enable.value = false;
    }
  };

  return (
    <Plane
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
