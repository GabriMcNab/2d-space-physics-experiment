import Vector2 from "@/lib/Vector2";
import Entity from "@/entity/Entity";
import Body2D, { BodyType } from "@/components/Body2D";
import Graphics from "@/components/Graphics";
import GravityField2D from "@/components/GravityField2D";
import CircleCollider2D from "@/components/CircleCollider2D";

export default class Planet extends Entity {
  constructor(position: Vector2, size: number, color: string) {
    super();

    const graphicsComponent = new Graphics(position);
    graphicsComponent.drawCircle(size, color);

    const body2DComponent = new Body2D({ type: BodyType.KINETIC, initialPosition: position, mass: size * 5 });
    const circleCollider2DComponent = new CircleCollider2D(body2DComponent, size + 5, { debug: true, bounciness: 0.5 });
    const gravityField2DComponent = new GravityField2D();

    this.addComponent(graphicsComponent);
    this.addComponent(body2DComponent);
    this.addComponent(circleCollider2DComponent);
    this.addComponent(gravityField2DComponent);

    console.log(this);
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
