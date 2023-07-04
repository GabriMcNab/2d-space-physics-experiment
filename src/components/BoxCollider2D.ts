import { BaseCollider, BaseComponent, Collider2D } from "@/types/components";
import Body2D from "./Body2D";

export default class BoxCollider2D implements BaseComponent, BaseCollider {
  name = "BoxCollider2D";

  readonly attachedBody: Body2D;
  readonly width: number;
  readonly height: number;
  readonly debug: boolean = false;

  onCollisionEnter = (collider: Collider2D) => {
    console.log("collision!", collider);
  };

  constructor(attachedBody: Body2D, width: number, height: number, opt?: { debug?: boolean }) {
    this.attachedBody = attachedBody;
    this.width = width;
    this.height = height;

    if (opt?.debug) {
      this.debug = true;
    }
  }
}
