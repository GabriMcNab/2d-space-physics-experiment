import BoxCollider2D from "@/components/BoxCollider2D";
import CircleCollider2D from "@/components/CircleCollider2D";
import Entity from "@/entity/Entity";
import Vector2 from "@/lib/Vector2";

export default function collisionSystem(entities: Entity[]) {
  for (const entity of entities) {
    const circleColliderComponent = entity.getComponent<CircleCollider2D>("CircleCollider2D");
    const boxColliderComponent = entity.getComponent<BoxCollider2D>("BoxCollider2D");

    if (!(circleColliderComponent || boxColliderComponent)) {
      continue;
    }

    // Loop other entities, if they have a collider, calculate collision
    // TODO: Potential improvement: Check only entities that could possibly be colliding with current obj (for example, entities in a certain radius)
    for (let i = 0; i < entities.length; i++) {
      const otherEntity = entities[i];

      if (otherEntity.id === entity.id) {
        continue;
      }

      const otherCircleColliderComponent = otherEntity.getComponent<CircleCollider2D>("CircleCollider2D");
      const otherBoxColliderComponent = otherEntity.getComponent<BoxCollider2D>("BoxCollider2D");

      if (!(otherCircleColliderComponent || otherBoxColliderComponent)) {
        continue;
      }

      if (circleColliderComponent && otherBoxColliderComponent) {
        const hit = detectCircleAndBoxCollision(circleColliderComponent, otherBoxColliderComponent);
        if (hit) circleColliderComponent.onCollisionEnter(circleColliderComponent);
      }
    }
    // If there is a collision, call the "onCollisionEnter" callback on the collider
  }
}

function detectCircleAndBoxCollision(circle: CircleCollider2D, box: BoxCollider2D) {
  const { x: circleX, y: circleY } = circle.attachedBody.position;
  const { x: boxX, y: boxY } = box.attachedBody.position;

  let closestX = circleX;
  let closestY = circleY;

  // Check which edge is closest
  if (circleX < boxX) closestX = boxX; // left edge
  else if (circleX > boxX + box.width) closestX = boxX + box.width; // right edge
  if (circleY < boxY) closestY = boxY; // top edge
  else if (circleY > boxY + box.height) closestY = boxY + box.height; // bottom edge

  // get distance from closest edges
  const distance = Vector2.getDistance(circle.attachedBody.position, new Vector2(closestX, closestY));

  // if the distance is less than the radius, collision!
  if (distance <= circle.radius) {
    return true;
  }
  return false;
}
