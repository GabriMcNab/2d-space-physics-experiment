import * as PIXI from "pixi.js";
import Vector2 from "@/lib/Vector2";
import { BaseComponent } from "@/types/components";

export default class Graphics implements BaseComponent {
  name = "Graphics";

  readonly graphics: PIXI.Graphics;

  get position() {
    return new Vector2(this.graphics.x, this.graphics.y);
  }

  set position(pos: Vector2) {
    this.graphics.x = pos.x;
    this.graphics.y = pos.y;
  }

  constructor(graphics: PIXI.Graphics) {
    this.graphics = graphics;
  }
}
