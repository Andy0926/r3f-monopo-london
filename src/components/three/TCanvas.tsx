import { Canvas } from "@react-three/fiber";
import { Suspense, VFC } from "react";
import * as THREE from "three";
import {
  enFragmentShader,
  enVertexShader,
  jpFragmentShader,
  jpVertexShader,
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
          text={"RECRUIT"}
          blur={true}
          vertexShader={enVertexShader}
          fragmentShader={enFragmentShader}
        />
        <TextPlane
          text={"RECRUIT"}
          blur={false}
          vertexShader={jpVertexShader}
          fragmentShader={jpFragmentShader}
        />
        <Background />
      </Suspense>
      {/* helper */}
      {/* <Stats /> */}
    </Canvas>
  );
};
