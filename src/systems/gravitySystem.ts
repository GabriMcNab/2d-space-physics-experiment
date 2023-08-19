import Body2D, { BodyType } from "@/components/Body2D";
import GravityField2D from "@/components/GravityField2D";
import Entity from "@/entity/Entity";
import Vector2 from "@/lib/Vector2";

export default function gravitySystem(entities: Entity[], deltaTime: number) {
  for (const entity of entities) {
    const otherObjects = [];
    const objBody = entity.getComponent<Body2D>("Body2D");
    const gravityFieldComponent = entity.getComponent<GravityField2D>("GravityField2D");

    if (!gravityFieldComponent || !objBody) {
      continue;
    }

    for (const e of entities) {
      const bodyComponent = e.getComponent<Body2D>("Body2D");

      if (e.id === entity.id || !bodyComponent || bodyComponent.type !== BodyType.DYNAMIC) {
        continue;
      }

      otherObjects.push(bodyComponent);
    }

    for (const otherObj of otherObjects) {
      const distanceVector = Vector2.subtract(objBody.position, otherObj.position);

      // F = (m1 * m2) / r^2
      const force = (objBody.mass * otherObj.mass) / Math.pow(distanceVector.magnitude, 2);
      // a = F / m
      const acceleration = force / otherObj.mass;

      const forceVector = distanceVector.normalized;
      forceVector.scale(acceleration * deltaTime);

      // velocity += acceleration * dt
      otherObj.velocity = Vector2.add(otherObj.velocity, forceVector);
    }
  }
}
