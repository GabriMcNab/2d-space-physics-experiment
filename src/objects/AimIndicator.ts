import Vector2 from "@/lib/Vector2";
import Graphics from "@/components/Graphics";
import Entity from "@/entity/Entity";

export default class AimIndicator extends Entity {
  target = new Vector2(0, 0);

  constructor(initialPosition: Vector2) {
    super();
    const graphicsComponent = new Graphics(initialPosition);
    this.addComponent(graphicsComponent);
  }
}
