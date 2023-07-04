import Body2D from "@/components/Body2D";
import BoxCollider2D from "@/components/BoxCollider2D";
import CircleCollider2D from "@/components/CircleCollider2D";
import Graphics from "@/components/Graphics";

export interface BaseComponent {
  name: string;
}

export interface BaseCollider {
  onCollisionEnter: (collider: Collider2D) => void;
}

export type Collider2D = CircleCollider2D | BoxCollider2D;
export type Component = Body2D | Graphics | Collider2D;
