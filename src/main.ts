import * as PIXI from "pixi.js";
import Planet from "./objects/Planet";
import Vector2 from "./lib/Vector2";
import Player from "./objects/Player";
import Entity from "./entity/Entity";
import Graphics from "./components/Graphics";
import Body2D, { BodyType } from "./components/Body2D";
import movementSystem from "./systems/movementSystem";
import renderSystem from "./systems/renderSystem";
import BoxCollider2D from "./components/BoxCollider2D";
import collisionSystem from "./systems/collisionSystem";
import CircleCollider2D from "./components/CircleCollider2D";
import AimIndicator from "./objects/AimIndicator";
import shootingSystem from "./systems/shootingSystem";
import { EventBus } from "./lib/EventBus";
import gravitySystem from "./systems/gravitySystem";
// import { isCorrectInput } from "./utils/typeGuards";

// Global variables

const PLAYER_STARTING_POS = new Vector2(250, 600);

// State

let mousePosition = new Vector2(0, 0);
let entities: Record<Entity["id"], Entity> = {};

// Entities

const planet1 = new Planet(new Vector2(400, 500), 80, "orangered");
const planet2 = new Planet(new Vector2(1000, 300), 80, "lightblue");
const player = new Player(PLAYER_STARTING_POS);
const aimIndicator = new AimIndicator(PLAYER_STARTING_POS);

entities = {
  [planet1.id]: planet1,
  [planet2.id]: planet2,
  [player.id]: player,
  [aimIndicator.id]: aimIndicator,
};

// Main

function main() {
  const app = setupScene(entities);
  document.body.appendChild(app.view);

  // Render loop
  app.ticker.add((dt) => {
    const e = Object.values(entities);
    shootingSystem(player, aimIndicator, mousePosition);
    gravitySystem(e, dt);
    collisionSystem(e);
    movementSystem(e, dt);
    renderSystem(e);
  });
}

// Helpers

function setupScene(entities: Record<Entity["id"], Entity>) {
  const app = new PIXI.Application<HTMLCanvasElement>({
    width: 1400,
    height: 850,
    eventMode: "passive",
  });

  // Scene config
  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;

  // Scene event handlers
  app.stage.on("pointermove", (e) => {
    mousePosition = new Vector2(e.global.x, e.global.y);
  });
  app.stage.on("click", () => {
    if (player.state === "AIMING") {
      player.state = "SHOT";
    }
  });
  EventBus.getInstance().on("destroy", (objId) => {
    const graphicsComponent = entities[objId as unknown as number].getComponent<Graphics>("Graphics");
    if (graphicsComponent) {
      graphicsComponent.graphics.destroy();
      entities[objId as unknown as number].removeComponent("Graphics");
    }
    delete entities[objId as unknown as number];
  });

  // Setup scene
  for (const entity of Object.values(entities)) {
    const bodyComponent = entity.getComponent<Body2D>("Body2D");
    const graphicsComponent = entity.getComponent<Graphics>("Graphics");
    const boxColliderComponent = entity.getComponent<BoxCollider2D>("BoxCollider2D");
    const circleColliderComponent = entity.getComponent<CircleCollider2D>("CircleCollider2D");

    if (graphicsComponent) {
      app.stage.addChild(graphicsComponent.graphics);
    }
    if (
      bodyComponent &&
      circleColliderComponent &&
      circleColliderComponent.debug &&
      circleColliderComponent.debugGraphics
    ) {
      app.stage.addChild(circleColliderComponent.debugGraphics.graphics);
    }
    if (bodyComponent && boxColliderComponent && boxColliderComponent.debug && boxColliderComponent.debugGraphics) {
      app.stage.addChild(boxColliderComponent.debugGraphics.graphics);
    }
  }

  return app;
}

// Run

main();
