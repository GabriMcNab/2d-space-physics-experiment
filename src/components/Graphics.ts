import * as PIXI from "pixi.js";
import Vector2 from "@/lib/Vector2";
import { BaseComponent } from "@/types/components";

export default class Graphics implements BaseComponent {
  name = "Graphics";

  readonly graphics: PIXI.Graphics = new PIXI.Graphics();

  get position() {
    return new Vector2(this.graphics.x, this.graphics.y);
  }

  set position(pos: Vector2) {
    this.graphics.x = pos.x;
    this.graphics.y = pos.y;
  }

  constructor(initialPosition?: Vector2) {
    if (initialPosition) this.position = initialPosition;
  }

  drawCircle(radius: number, color: string, outlined = false) {
    if (outlined) this.graphics.lineStyle({ width: 1, color });
    else this.graphics.beginFill(color);

    this.graphics.drawCircle(0, 0, radius);
    this.graphics.endFill();
  }

  drawBox(width: number, height: number, color: string, outlined = false) {
    if (outlined) this.graphics.lineStyle({ width: 1, color });
    else this.graphics.beginFill(color);

    this.graphics.drawRect(0, 0, width, height);
    this.graphics.endFill();
  }

  drawLineTo(to: Vector2, color: string, thickness = 1) {
    this.graphics.lineStyle({ width: thickness, color }).moveTo(0, 0).lineTo(to.x, to.y);
  }
}
