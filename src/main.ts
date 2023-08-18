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
// import { isCorrectInput } from "./utils/typeGuards";

// Global variables

const PLAYER_STARTING_POS = new Vector2(495, 700);

const app = new PIXI.Application<HTMLCanvasElement>({
  width: 1000,
  height: 850,
  eventMode: "passive",
});

// State

let mousePosition = new Vector2(0, 0);
const entities: Record<Entity["id"], Entity> = {};
// const CURRENT_INPUT: Record<UserInputKey, boolean> = {
//   w: false,
//   a: false,
//   s: false,
//   d: false,
// };

// Main

function main() {
  document.body.appendChild(app.view);
  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;

  const planet1 = new Planet(new Vector2(400, 300), 40, "orangered");
  const planet2 = new Planet(new Vector2(300, 100), 20, "lightblue");
  const player = new Player(PLAYER_STARTING_POS);
  const aimIndicator = new AimIndicator(PLAYER_STARTING_POS);

  // Add temporary walls
  const wallsDimensions = [
    [20, 20, 960, 10],
    [970, 20, 10, 790],
    [20, 800, 960, 10],
    [20, 20, 10, 790],
  ];
  for (let i = 0; i < 4; i++) {
    const wall = new Entity();
    const dim = wallsDimensions[i];

    const graphicsComponent = new Graphics(new Vector2(dim[0], dim[1]));
    graphicsComponent.drawBox(dim[2], dim[3], "0xde3249");

    const body2DComponent = new Body2D({
      type: BodyType.KINETIC,
      initialPosition: new Vector2(dim[0], dim[1]),
    });
    const boxCollider2Dcomponent = new BoxCollider2D(body2DComponent, dim[2], dim[3]);

    wall.addComponent(graphicsComponent);
    wall.addComponent(body2DComponent);
    wall.addComponent(boxCollider2Dcomponent);
    entities[wall.id] = wall;
  }

  // Add entities to the list
  entities[planet1.id] = planet1;
  entities[planet2.id] = planet2;
  entities[player.id] = player;
  entities[aimIndicator.id] = aimIndicator;

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

  // Render loop
  app.ticker.add((dt) => {
    const e = Object.values(entities);
    shootingSystem(player, aimIndicator, mousePosition);
    movementSystem(e, dt);
    collisionSystem(e);
    renderSystem(e);
  });
}

// Run

main();
