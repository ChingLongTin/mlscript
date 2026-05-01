const definitionMetadata = globalThis.Symbol.for("mlscript.definitionMetadata");
const prettyPrint = globalThis.Symbol.for("mlscript.prettyPrint");
import runtime from "./Runtime.mjs";
import Predef from "./Predef.mjs";
let Option1;
(class Option {
  static {
    Option1 = this
  }
  static {
    this.Some = function Some(value) {
      return globalThis.Object.freeze(new Some.class(value));
    };
    (class Some {
      static {
        Option.Some.class = this
      }
      constructor(value) {
        this.value = value;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Some", ["value"]]; 
    });
    (class None {
      static {
        new this
      }
      constructor() {
        Option.None = this;
        Object.defineProperty(this, "class", {
          value: None
        });
        globalThis.Object.freeze(this);
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["object", "None"]; 
    });
    this.Both = function Both(fst, snd) {
      return globalThis.Object.freeze(new Both.class(fst, snd));
    };
    (class Both {
      static {
        Option.Both.class = this
      }
      constructor(fst, snd) {
        this.fst = fst;
        this.snd = snd;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Both", ["fst", "snd"]]; 
    });
    (class unsafe {
      static {
        Option.unsafe = this
      }
      static get(opt) {
        let value, arg$Some$0$;
        if (opt instanceof Option.Some.class) {
          arg$Some$0$ = opt.value;
          value = arg$Some$0$;
          return value
        } else if (opt instanceof Option.None.class) {
          throw runtime.safeCall(globalThis.Error("None.get"))
        }
        throw globalThis.Object.freeze(new globalThis.Error("match error"));
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "unsafe"]; 
    });
  }
  static isDefined(x) {
    if (x instanceof Option.Some.class) {
      return true
    } else if (x instanceof Option.None.class) {
      return false
    }
    throw globalThis.Object.freeze(new globalThis.Error("match error"));
  } 
  static getOrElse(opt, default1) {
    let value, arg$Some$0$;
    if (opt instanceof Option.Some.class) {
      arg$Some$0$ = opt.value;
      value = arg$Some$0$;
      return value
    } else if (opt instanceof Option.None.class) {
      return default1
    }
    throw globalThis.Object.freeze(new globalThis.Error("match error"));
  } 
  static flatMap(opt, f) {
    let value, arg$Some$0$;
    if (opt instanceof Option.Some.class) {
      arg$Some$0$ = opt.value;
      value = arg$Some$0$;
      return runtime.safeCall(f(value))
    } else if (opt instanceof Option.None.class) {
      return Option.None
    }
    throw globalThis.Object.freeze(new globalThis.Error("match error"));
  }
  toString() { return runtime.render(this); }
  static [definitionMetadata] = ["class", "Option"]; 
});
let Option = Option1; export default Option;
