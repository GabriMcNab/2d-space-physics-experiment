import Vector2 from "@/lib/Vector2";
import { BaseComponent } from "@/types/components";

export enum BodyType {
  "KINETIC",
  "DYNAMIC",
}

export default class Body2D implements BaseComponent {
  name = "Body2D";

  readonly type: BodyType;

  mass = 1;
  position: Vector2;
  velocity: Vector2;

  constructor(opt?: { type?: BodyType; initialPosition?: Vector2; initialVelocity?: Vector2; mass?: number }) {
    this.type = opt?.type ?? BodyType.KINETIC;
    this.mass = opt?.mass ?? 1;
    this.position = opt?.initialPosition ?? new Vector2(0, 0);
    this.velocity = opt?.initialVelocity ?? new Vector2(0, 0);
  }
}
