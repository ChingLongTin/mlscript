const definitionMetadata = globalThis.Symbol.for("mlscript.definitionMetadata");
const prettyPrint = globalThis.Symbol.for("mlscript.prettyPrint");
import runtime from "./Runtime.mjs";
import MutMap from "./MutMap.mjs";
import Predef from "./Predef.mjs";
let Examples1;
(class Examples {
  static {
    Examples1 = this
  }
  static {
    let rcd, tmp, rcd1, tmp1, rcd2, tmp2, rcd3, tmp3;
    this.examples = MutMap.empty;
    rcd = globalThis.Object.freeze({
      name: "Power",
      source: "staged module Math with\n  fun pow(x, n) =\n    if n is\n      1 then x\n      else x * pow(x, n - 1)\n  fun square(x) = pow(x, 2)\n  fun cube(x) = pow(x, 3)\n"
    });
    tmp = MutMap.insert("Power.mls", rcd);
    Predef.pipeInto(Examples.examples, tmp);
    rcd1 = globalThis.Object.freeze({
      name: "Folding",
      source: "staged module Folding with\n  fun sq(x) = x * x\n  fun fib(n) = if n is \n    1 then 1\n    2 then 1\n    n then fib(n - 1) + fib(n - 2)\n  fun f(x, y) = x + y + 1 - 1\n  fun test(x) =\n    fib(f(2, 3)) + sq(3) + sq(x)\n"
    });
    tmp1 = MutMap.insert("Folding.mls", rcd1);
    Predef.pipeInto(Examples.examples, tmp1);
    rcd2 = globalThis.Object.freeze({
      name: "Classes",
      source: "staged class C(val x, val y)\n\nstaged module M with\n  fun test() = new C(1, 2).y\n  fun test2() = new C(1, 2).x\n"
    });
    tmp2 = MutMap.insert("Classes.mls", rcd2);
    Predef.pipeInto(Examples.examples, tmp2);
    rcd3 = globalThis.Object.freeze({
      name: "Area",
      source: "staged class Circle(val radius) with\n  fun area() = 3.14 * radius * radius \n\nstaged class Square(val side) with\n  fun area() = side * side\n  \nstaged module TestMethodCall with\n  fun pick(b) = if b then Circle(1) else Square(10)\n  fun test(b) = pick(b).area()\n"
    });
    tmp3 = MutMap.insert("Area.mls", rcd3);
    Predef.pipeInto(Examples.examples, tmp3);
  }
  toString() { return runtime.render(this); }
  static [definitionMetadata] = ["class", "Examples"]; 
});
let Examples = Examples1; export default Examples;
