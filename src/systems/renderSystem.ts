import * as PIXI from "pixi.js";
import Body2D, { BodyType } from "@/components/Body2D";
import CircleCollider2D from "@/components/CircleCollider2D";
import Graphics from "@/components/Graphics";
import Entity from "@/entity/Entity";
import BoxCollider2D from "@/components/BoxCollider2D";

const colliderDebugGraphics = new PIXI.Graphics();

export default function renderSystem(entities: Entity[], stage: PIXI.Container) {
  colliderDebugGraphics.clear();

  for (const entity of entities) {
    const graphics = new PIXI.Graphics();
    const bodyComponent = entity.getComponent<Body2D>("Body2D");
    const graphicsComponent = entity.getComponent<Graphics>("Graphics");
    const boxColliderComponent = entity.getComponent<BoxCollider2D>("BoxCollider2D");
    const circleColliderComponent = entity.getComponent<CircleCollider2D>("CircleCollider2D");

    if (graphicsComponent) {
      if (bodyComponent && bodyComponent.type !== BodyType.KINETIC) {
        // Set the graphics positions to the updated body position
        graphicsComponent.graphics.position.set(bodyComponent.position.x, bodyComponent.position.y);
      }
      graphics.addChild(graphicsComponent.graphics);
    }

    // Collider debug
    if (bodyComponent && circleColliderComponent && circleColliderComponent.debug) {
      colliderDebugGraphics.lineStyle({ width: 1, color: "yellow" });
      colliderDebugGraphics.drawCircle(
        bodyComponent.position.x,
        bodyComponent.position.y,
        circleColliderComponent.radius
      );
      colliderDebugGraphics.endFill();

      graphics.addChild(colliderDebugGraphics);
    }
    if (bodyComponent && boxColliderComponent && boxColliderComponent.debug) {
      colliderDebugGraphics.lineStyle({ width: 1, color: "yellow" });
      colliderDebugGraphics.drawRect(
        bodyComponent.position.x,
        bodyComponent.position.y,
        boxColliderComponent.width,
        boxColliderComponent.height
      );
      colliderDebugGraphics.endFill();

      graphics.addChild(colliderDebugGraphics);
    }

    // Render the stage
    stage.addChild(graphics);
  }
}
