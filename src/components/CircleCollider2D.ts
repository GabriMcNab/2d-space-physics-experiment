import { BaseCollider, BaseComponent, Collider2D } from "@/types/components";
import Body2D from "./Body2D";

export default class CircleCollider2D implements BaseComponent, BaseCollider {
  name = "CircleCollider2D";

  readonly attachedBody: Body2D;
  readonly radius: number;
  readonly debug: boolean = false;

  onCollisionEnter = (collider: Collider2D) => {
    console.log("collision!", collider);
  };

  constructor(attachedBody: Body2D, radius: number, opt?: { debug?: boolean }) {
    this.attachedBody = attachedBody;
    this.radius = radius;

    if (opt?.debug) {
      this.debug = true;
    }
  }
}
