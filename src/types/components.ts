import Body2D from "@/components/Body2D";
import BoxCollider2D from "@/components/BoxCollider2D";
import CircleCollider2D from "@/components/CircleCollider2D";
import Graphics from "@/components/Graphics";
import GravityField2D from "@/components/GravityField2D";

export interface BaseComponent {
  name: string;
}

export interface BaseCollider {
  onCollisionEnter: (collision: Collision2D) => void;
}

export interface Collision2D {
  collider: Collider2D;
  otherCollider: Collider2D;
}

export type Collider2D = CircleCollider2D | BoxCollider2D;
export type Component = Body2D | Graphics | Collider2D | GravityField2D;
