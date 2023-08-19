import { BaseCollider, BaseComponent, Collision2D } from "@/types/components";
import Body2D from "./Body2D";
import Graphics from "./Graphics";

export default class CircleCollider2D implements BaseComponent, BaseCollider {
  name = "CircleCollider2D";

  readonly attachedBody: Body2D;
  readonly radius: number;
  /**
   * Used to resolve collisions. If 1 is perfectly elastic, if 0 is perfectly inelastic
   */
  readonly bounciness: number = 0.1;
  readonly debug: boolean = false;
  readonly debugGraphics: Graphics | undefined;

  onCollisionEnter(collision: Collision2D) {
    return;
  }

  constructor(attachedBody: Body2D, radius: number, opt?: { debug?: boolean; bounciness?: number }) {
    this.attachedBody = attachedBody;
    this.radius = radius;
    this.bounciness = Math.max(0.1, Math.min(opt?.bounciness ?? 0.1, 1));

    if (opt?.debug) {
      this.debug = true;
      this.debugGraphics = new Graphics(this.attachedBody.position);
      this.debugGraphics.drawCircle(this.radius, "yellow", true);
    }
  }
}
