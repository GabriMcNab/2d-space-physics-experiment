import Body2D from "@/components/Body2D";
import { EventBus } from "@/lib/EventBus";
import Vector2 from "@/lib/Vector2";
import AimIndicator from "@/objects/AimIndicator";
import Player from "@/objects/Player";

export default function shootingSystem(player: Player, aimIndicator: AimIndicator, mousePosition: Vector2) {
  const playerBodyComponent = player.getComponent<Body2D>("Body2D");
  if (playerBodyComponent) {
    if (player.state === "AIMING") {
      const mousePositionRelativeToPlayer = Vector2.subtract(mousePosition, playerBodyComponent.position).normalized;
      mousePositionRelativeToPlayer.scale(100);
      aimIndicator.target = mousePositionRelativeToPlayer;
    }
    if (player.state === "SHOT") {
      const targetVelocity = aimIndicator.target.normalized;
      targetVelocity.scale(5);
      playerBodyComponent.velocity = targetVelocity;
      player.state = "FLYING";

      // Remove aim indicator
      EventBus.getInstance().emit("destroy", aimIndicator.id);
    }
  }
}
