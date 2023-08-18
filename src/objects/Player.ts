import Vector2 from "@/lib/Vector2";
import Body2D, { BodyType } from "@/components/Body2D";
import Graphics from "@/components/Graphics";
import Entity from "@/entity/Entity";
import CircleCollider2D from "@/components/CircleCollider2D";

export default class Player extends Entity {
  state: "AIMING" | "SHOT" | "FLYING" = "AIMING";

  constructor(initialPosition: Vector2) {
    super();

    const graphicsComponent = new Graphics(initialPosition);
    graphicsComponent.drawCircle(10, "green");

    const body2DComponent = new Body2D({ type: BodyType.DYNAMIC, initialPosition: initialPosition });
    const circleCollider2DComponent = new CircleCollider2D(body2DComponent, 15, { debug: true });

    circleCollider2DComponent.onCollisionEnter = () => {
      console.log("player collision");
    };

    this.addComponent(graphicsComponent);
    this.addComponent(body2DComponent);
    this.addComponent(circleCollider2DComponent);
  }
}
