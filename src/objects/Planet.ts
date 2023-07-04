import * as PIXI from "pixi.js";
import Vector2 from "@/lib/Vector2";
import Entity from "@/entity/Entity";
import Body2D, { BodyType } from "@/components/Body2D";
import Graphics from "@/components/Graphics";

export default class Planet extends Entity {
  constructor(position: Vector2, size: number, color: string) {
    super();

    const graphicsComponent = new Graphics(this.createGraphic(position, size, color));
    const body2DComponent = new Body2D({ type: BodyType.KINETIC, initialPosition: position });

    this.addComponent(graphicsComponent);
    this.addComponent(body2DComponent);
  }

  private createGraphic(initialPosition: Vector2, size: number, color: string) {
    const graphics = new PIXI.Graphics();
    graphics.x = initialPosition.x;
    graphics.y = initialPosition.y;

    graphics.beginFill(color);
    graphics.drawCircle(0, 0, size);
    graphics.endFill();
    return graphics;
  }

  // orbitAround(targetObjPosition: Vector2, speed: number) {
  //   this.graphics.angle += speed;

  //   // Calculate the new position
  //   const radius = Vector2.getDistance(this.graphics, targetObjPosition);
  //   const newPosition = new Vector2(
  //     targetObjPosition.x + Math.cos(this.graphics.angle) * radius,
  //     targetObjPosition.y + Math.sin(this.graphics.angle) * radius
  //   );
  //   this.position = newPosition;
  // }
}
