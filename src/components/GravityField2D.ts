import { BaseComponent } from "@/types/components";
import Body2D from "./Body2D";

export default class GravityField2D implements BaseComponent {
  name = "GravityField2D";
  readonly attractee: Body2D[] = [];
}
