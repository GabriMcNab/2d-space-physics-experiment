import BoxCollider2D from "@/components/BoxCollider2D";
import CircleCollider2D from "@/components/CircleCollider2D";
import Entity from "@/entity/Entity";

export default function collisionSystem(entities: Entity[], deltaTime: number) {
  for (const entity of entities) {
    const circleColliderComponent = entity.getComponent<CircleCollider2D>("CircleCollider2D");
    const boxColliderComponent = entity.getComponent<BoxCollider2D>("BoxCollider2D");

    if (!(circleColliderComponent || boxColliderComponent)) {
      return;
    }

    // Loop other entities, if they have a collider, calculate collision
    // If there is a collision, call the "onCollisionEnter" callback on the collider
  }
}
