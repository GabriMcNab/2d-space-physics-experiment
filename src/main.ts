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
// import { isCorrectInput } from "./utils/typeGuards";

// Global variables

const app = new PIXI.Application<HTMLCanvasElement>({
  width: 1000,
  height: 850,
  eventMode: "passive",
});

// State

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

  const planet1 = new Planet(new Vector2(400, 300), 40, "orangered");
  const planet2 = new Planet(new Vector2(300, 100), 20, "lightblue");
  const player = new Player(new Vector2(495, 840));

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
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xde3249);
    graphics.drawRect(dim[0], dim[1], dim[2], dim[3]);
    graphics.endFill();

    const graphicsComponent = new Graphics(graphics);

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

  // Set initial velocity to player
  const playerBodyComponent = player.getComponent<Body2D>("Body2D");
  if (playerBodyComponent) {
    playerBodyComponent.velocity = new Vector2(0.1, -1);
  }

  app.ticker.add((dt) => {
    const e = Object.values(entities);
    movementSystem(e, dt);
    renderSystem(e, app.stage);
  });
}

// Run

main();
