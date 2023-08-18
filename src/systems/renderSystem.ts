import * as PIXI from "pixi.js";
import Body2D, { BodyType } from "@/components/Body2D";
import CircleCollider2D from "@/components/CircleCollider2D";
import Graphics from "@/components/Graphics";
import Entity from "@/entity/Entity";
import BoxCollider2D from "@/components/BoxCollider2D";
import Player from "@/objects/Player";
import Planet from "@/objects/Planet";
import Vector2 from "@/lib/Vector2";

const aimIndicator = new Graphics();

/**
 * This system is used to update the graphics on every frame
 * @param entities
 * @param mousePosition
 */
export default function renderSystem(
  entities: Entity[] | Player[] | Planet[],
  stage: PIXI.Container,
  mousePosition: Vector2
) {
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

    // Aiming system
    if (bodyComponent && entity instanceof Player && entity.isAiming) {
      const mousePositionRelativeToPlayer = new Vector2(
        mousePosition.x - bodyComponent.position.x,
        mousePosition.y - bodyComponent.position.y
      ).normalized;
      mousePositionRelativeToPlayer.scale(100);

      aimIndicator.graphics.clear();
      aimIndicator.position = bodyComponent.position;
      aimIndicator.drawLineTo(mousePositionRelativeToPlayer, "yellow");
      stage.addChild(aimIndicator.graphics);
    }
  }
}
