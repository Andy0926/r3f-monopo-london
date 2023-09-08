import { Canvas } from "@react-three/fiber";
import { Suspense, VFC } from "react";
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
      <Suspense fallback={null}>
        {/* <Lense /> */}
        <TextPlane
          text={"VUI123"}
          blur={true}
          vertexShader={blurVertexShader}
          fragmentShader={blurFragmentShader}
        />
        <TextPlane
          text={"VUI123"}
          blur={false}
          vertexShader={clearVertexShader}
          fragmentShader={clearFragmentShader}
        />
        <Background />
      </Suspense>
      {/* helper */}
      {/* <Stats /> */}
    </Canvas>
  );
};
