import * as PIXI from "pixi.js";
import Vector2 from "@/lib/Vector2";
import Body2D, { BodyType } from "@/components/Body2D";
import Graphics from "@/components/Graphics";
import Entity from "@/entity/Entity";
import CircleCollider2D from "@/components/CircleCollider2D";
import { Collider2D } from "@/types/components";

export default class Player extends Entity {
  constructor(initialPosition: Vector2) {
    super();

    const graphicsComponent = new Graphics(this.createGraphic(initialPosition));
    const body2DComponent = new Body2D({ type: BodyType.DYNAMIC, initialPosition: initialPosition });
    const circleCollider2DComponent = new CircleCollider2D(body2DComponent, 15, { debug: true });

    circleCollider2DComponent.onCollisionEnter = (collider: Collider2D) => {
      console.log("player collision", collider);
    };

    this.addComponent(graphicsComponent);
    this.addComponent(body2DComponent);
    this.addComponent(circleCollider2DComponent);
  }

  private createGraphic(initialPosition: Vector2) {
    const graphics = new PIXI.Graphics();
    graphics.x = initialPosition.x;
    graphics.y = initialPosition.y;

    graphics.beginFill("green");
    graphics.drawCircle(0, 0, 10);
    graphics.endFill();
    return graphics;
  }
}
