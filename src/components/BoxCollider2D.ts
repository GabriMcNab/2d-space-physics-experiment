import { BaseCollider, BaseComponent, Collision2D } from "@/types/components";
import Body2D from "./Body2D";
import Graphics from "./Graphics";

export default class BoxCollider2D implements BaseComponent, BaseCollider {
  name = "BoxCollider2D";

  readonly attachedBody: Body2D;
  readonly width: number;
  readonly height: number;
  readonly debug: boolean = false;
  readonly debugGraphics: Graphics | undefined;

  onCollisionEnter(collision: Collision2D) {
    return;
  }

  constructor(attachedBody: Body2D, width: number, height: number, opt?: { debug?: boolean }) {
    this.attachedBody = attachedBody;
    this.width = width;
    this.height = height;

    if (opt?.debug) {
      this.debug = true;
      this.debugGraphics = new Graphics(this.attachedBody.position);
      this.debugGraphics.drawBox(this.width, this.height, "yellow", true);
    }
  }
}
