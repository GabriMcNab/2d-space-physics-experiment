import Body2D, { BodyType } from "@/components/Body2D";
import Entity from "@/entity/Entity";

export default function movementSystem(entities: Entity[], deltaTime: number) {
  for (const entity of entities) {
    const bodyComponent = entity.getComponent<Body2D>("Body2D");

    if (bodyComponent && bodyComponent.type !== BodyType.KINETIC) {
      bodyComponent.position.x += bodyComponent.velocity.x * deltaTime;
      bodyComponent.position.y += bodyComponent.velocity.y * deltaTime;
    }
  }
}
