import Vector2 from "@/lib/Vector2";
import Body2D, { BodyType } from "@/components/Body2D";
import Graphics from "@/components/Graphics";
import Entity from "@/entity/Entity";
import CircleCollider2D from "@/components/CircleCollider2D";
import { Collision2D } from "@/types/components";

export default class Player extends Entity {
  state: "AIMING" | "SHOT" | "FLYING" = "AIMING";

  constructor(initialPosition: Vector2) {
    super();

    const graphicsComponent = new Graphics(initialPosition);
    graphicsComponent.drawCircle(10, "green");

    const body2DComponent = new Body2D({ type: BodyType.DYNAMIC, initialPosition: initialPosition });
    const circleCollider2DComponent = new CircleCollider2D(body2DComponent, 15, { debug: true, bounciness: 0.5 });

    circleCollider2DComponent.onCollisionEnter = ({ collider, otherCollider }: Collision2D) => {
      // Resolve Circle to Circle collision
      if (collider instanceof CircleCollider2D && otherCollider instanceof CircleCollider2D) {
        this.resolveCollision(collider, otherCollider);
      }
    };

    this.addComponent(graphicsComponent);
    this.addComponent(body2DComponent);
    this.addComponent(circleCollider2DComponent);
  }

  resolveCollision(collider: CircleCollider2D, otherCollider: CircleCollider2D) {
    const mass1 = collider.attachedBody.mass;
    const mass2 = otherCollider.attachedBody.mass;
    const coefficientOfRestitution =
      (2 * collider.bounciness * otherCollider.bounciness) / (collider.bounciness + otherCollider.bounciness);

    const initialVelocity1 = collider.attachedBody.velocity;
    const initialVelocity2 = otherCollider.attachedBody.velocity;

    // Conservation of momentum
    collider.attachedBody.velocity = new Vector2(
      (mass1 * initialVelocity1.x +
        mass2 * initialVelocity2.x +
        coefficientOfRestitution * mass2 * (initialVelocity2.x - initialVelocity1.x)) /
        (mass1 + mass2),
      (mass1 * initialVelocity1.y +
        mass2 * initialVelocity2.y +
        coefficientOfRestitution * mass2 * (initialVelocity2.y - initialVelocity1.y)) /
        (mass1 + mass2)
    );
  }
}
