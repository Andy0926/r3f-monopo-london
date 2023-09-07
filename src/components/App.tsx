import { css } from "@emotion/css";
import { VFC } from "react";
import { TCanvas } from "./three/TCanvas";

export const App: VFC = () => {
  return (
    <div className={styles.container}>
      <TCanvas />
    </div>
  );
};

const styles = {
  container: css`
    position: relative;
    width: 100vw;
    height: 50vh;
  `,
};
