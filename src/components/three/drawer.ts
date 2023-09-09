import * as THREE from "three";

export class Drawer {
  public texture;
  public aspect;

  private _ctx;
  private readonly _margin = 130;
  private handleResize = () => {
    // Update the canvas width and height
    this._ctx.canvas.width = window.innerWidth;
    this._ctx.canvas.height = window.innerHeight / 2;

    // Update the aspect ratio
    this.aspect = this._ctx.canvas.width / this._ctx.canvas.height;
    this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);

    // Redraw the canvas
    this.draw();
  };
  constructor(private _text1: string, private _blurry: boolean) {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;
    this._ctx = canvas.getContext("2d")!;
    this.aspect = canvas.width / canvas.height;
    this.texture = new THREE.CanvasTexture(canvas);
    // Listen for the resize event
    window.addEventListener("resize", this.handleResize);

    // Initial draw
    this.draw();
  }
  draw = () => {
    const ctx = this._ctx;
    const { width, height } = this._ctx.canvas;
    ctx.clearRect(0, 0, width, height);
    const fontSize = width * 0.125;

    ctx.textAlign = "center"; // Align text to center
    ctx.textBaseline = "middle";

    ctx.font = `bold ${fontSize}px 'Poppins'`;
    //ctx.fillStyle = "#000"; // Replace "#000" with your desired color
    // ctx.fillRect(0, 0, width, height);

    // const text2Metrics = ctx.measureText(this._text2)
    if (this._blurry) {
      ctx.filter = "blur(10px)"; // Apply blur filter
    }

    ctx.fillText(this._text1.split("").join(" "), width / 2, height / 2);
  };
}
