import Body2D, { BodyType } from "@/components/Body2D";
import CircleCollider2D from "@/components/CircleCollider2D";
import Graphics from "@/components/Graphics";
import Entity from "@/entity/Entity";
import BoxCollider2D from "@/components/BoxCollider2D";
import Vector2 from "@/lib/Vector2";
import AimIndicator from "@/objects/AimIndicator";

/**
 * This system is used to update the graphics on every frame
 * @param entities
 * @param mousePosition
 */
export default function renderSystem(entities: Entity[]) {
  for (const entity of entities) {
    const bodyComponent = entity.getComponent<Body2D>("Body2D");
    const graphicsComponent = entity.getComponent<Graphics>("Graphics");
    const boxColliderComponent = entity.getComponent<BoxCollider2D>("BoxCollider2D");
    const circleColliderComponent = entity.getComponent<CircleCollider2D>("CircleCollider2D");

    if (graphicsComponent) {
      if (bodyComponent && bodyComponent.type !== BodyType.KINETIC) {
        // Set the graphics positions to the updated body position
        graphicsComponent.graphics.position.set(bodyComponent.position.x, bodyComponent.position.y);
      }

      if (entity instanceof AimIndicator) {
        graphicsComponent.graphics.clear();
        graphicsComponent.drawLineTo(entity.target, "yellow");
      }
    }

    // Collider debug
    if (
      bodyComponent &&
      circleColliderComponent &&
      circleColliderComponent.debug &&
      circleColliderComponent.debugGraphics
    ) {
      circleColliderComponent.debugGraphics.position = new Vector2(bodyComponent.position.x, bodyComponent.position.y);
    }
    if (bodyComponent && boxColliderComponent && boxColliderComponent.debug && boxColliderComponent.debugGraphics) {
      boxColliderComponent.debugGraphics.position = new Vector2(bodyComponent.position.x, bodyComponent.position.y);
    }
  }
}
