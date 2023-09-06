import * as THREE from "three";

export class Drawer {
  public texture;
  public aspect;

  private _ctx;
  private readonly _margin = 130;

  constructor(private _text1: string, private _blurry: boolean) {
    const canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this._ctx = canvas.getContext("2d")!;
    this.aspect = canvas.width / canvas.height;
    this.texture = new THREE.CanvasTexture(canvas);
  }

  draw = () => {
    const ctx = this._ctx;
    const { width, height } = this._ctx.canvas;
    ctx.clearRect(0, 0, width, height);

    const fontSize = 200;

    ctx.textAlign = "center"; // Align text to center
    ctx.textBaseline = "middle";

    ctx.font = `bold ${fontSize}px 'Poppins'`;
	//ctx.fillStyle = "#000"; // Replace "#000" with your desired color
	// ctx.fillRect(0, 0, width, height);
	
    const x = width / 2; // X coordinate at the center of the canvas
    const y = height / 2; // Y coordinate at the center of the canvas

    // const text2Metrics = ctx.measureText(this._text2)
    if (this._blurry) {
      ctx.filter = "blur(5px)"; // Apply blur filter
    }

    ctx.fillText(this._text1.split("").join(" "), width / 2, height / 2);
    // ctx.fillText(this._text2, width - text2Metrics.width - this._margin, height - (fontSize + this._margin))

    // ctx.lineWidth = 3
    // ctx.strokeStyle = '#f00'
    // ctx.strokeRect(0, 0, width, height)
  };
}
