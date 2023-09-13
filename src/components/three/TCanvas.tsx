import { Canvas } from "@react-three/fiber";
import { VFC } from "react";
import * as THREE from "three";
import {
  blurFragmentShader,
  blurVertexShader,
  clearFragmentShader,
  clearVertexShader,
} from "../../modules/glsl/shader";
import { Background } from "./Background";
import { TextPlane } from "./TextPlane";

export const TCanvas: VFC = () => {
  const OrthographicCamera = new THREE.OrthographicCamera(
    -1,
    1,
    1,
    -1,
    -10,
    10
  );

  return (
    <Canvas camera={OrthographicCamera} dpr={window.devicePixelRatio}>
      {/* <Lense /> */}
      <TextPlane
        text={"RECRUIT"}
        blur={true}
        vertexShader={blurVertexShader}
        fragmentShader={blurFragmentShader}
      />
      <TextPlane
        text={"RECRUIT"}
        blur={false}
        vertexShader={clearVertexShader}
        fragmentShader={clearFragmentShader}
      />
      <Background />

      {/* helper */}
      {/* <Stats /> */}
    </Canvas>
  );
};
