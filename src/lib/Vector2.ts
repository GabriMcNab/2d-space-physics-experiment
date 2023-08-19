export default class Vector2 {
  x: number;
  y: number;

  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get normalized() {
    return new Vector2(this.x / this.magnitude, this.y / this.magnitude);
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static getDistance(pointA: Vector2, pointB: Vector2) {
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static add(vectorA: Vector2, vectorB: Vector2) {
    return new Vector2(vectorA.x + vectorB.x, vectorA.y + vectorB.y);
  }

  static subtract(vectorA: Vector2, vectorB: Vector2) {
    return new Vector2(vectorA.x - vectorB.x, vectorA.y - vectorB.y);
  }

  static dotProduct(vectorA: Vector2, vectorB: Vector2) {
    return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
  }

  scale(amount: number) {
    this.x *= amount;
    this.y *= amount;
  }
}
