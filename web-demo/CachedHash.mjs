const definitionMetadata = globalThis.Symbol.for("mlscript.definitionMetadata");
const prettyPrint = globalThis.Symbol.for("mlscript.prettyPrint");
import runtime from "./Runtime.mjs";
let CachedHash1;
(class CachedHash {
  static {
    CachedHash1 = this
  }
  constructor() {
    this.#_hash = null;
  }
  #_hash;
  hash() {
    let scrut, h;
    scrut = this.#_hash !== null;
    if (scrut === true) {
      return this.#_hash
    }
    h = runtime.safeCall(this.toString());
    this.#_hash = h;
    return h;
  }
  toString() { return runtime.render(this); }
  static [definitionMetadata] = ["class", "CachedHash"]; 
});
let CachedHash = CachedHash1; export default CachedHash;
