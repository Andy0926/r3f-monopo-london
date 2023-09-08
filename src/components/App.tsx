import { css } from "@emotion/css";
import { VFC } from "react";
import { TCanvas } from "./three/TCanvas";

export const App: VFC = () => {
  return (
    <div className={styles.container}>
      <div
        style={{
          width: "100vw",
          height: "50vh",
        }}
      >
        <TCanvas />
      </div>
    </div>
  );
};

const styles = {
  container: css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  `,
};
