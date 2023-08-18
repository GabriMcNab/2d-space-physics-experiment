import { BaseCollider, BaseComponent, Collider2D } from "@/types/components";
import Body2D from "./Body2D";
import Graphics from "./Graphics";

export default class CircleCollider2D implements BaseComponent, BaseCollider {
  name = "CircleCollider2D";

  readonly attachedBody: Body2D;
  readonly radius: number;
  readonly debug: boolean = false;
  readonly debugGraphics: Graphics | undefined;

  onCollisionEnter = (collider: Collider2D) => {
    console.log("collision circle!", collider);
  };

  constructor(attachedBody: Body2D, radius: number, opt?: { debug?: boolean }) {
    this.attachedBody = attachedBody;
    this.radius = radius;

    if (opt?.debug) {
      this.debug = true;
      this.debugGraphics = new Graphics(this.attachedBody.position);
      this.debugGraphics.drawCircle(this.radius, "yellow", true);
    }
  }
}
