class Triangle {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  getArea() {
    return (this.a * this.b) / 2;
  }

  getHypotenuse() {
    return Math.sqrt(
        this.a ** 2 + this.b ** 2);
  }

  describe() {
    return `Area is ${this.getArea()}.`;
  }
}


class ColorTriangle extends Triangle {
  constructor(a, b, color) {
    // call parent constructor w/(a, b)
    super(a, b);
    this.color = color;
  }

  // "inherits" getArea, getHypotenuse

  // "override" describe() w/new version

  describe() {
    return super.describe() +
        ` Color is ${this.color}!`;
  }
}


class RainbowTriangle extends ColorTriangle {
  constructor(a, b) {
    // call parent constructor
    super(a, b, "rainbow");
  }

  // inherits getArea, getHypotenuse

  describe() {
    return "I'm a beautiful rainbow!";
  }
}
// end