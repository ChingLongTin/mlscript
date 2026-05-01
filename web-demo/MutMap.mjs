const definitionMetadata = globalThis.Symbol.for("mlscript.definitionMetadata");
const prettyPrint = globalThis.Symbol.for("mlscript.prettyPrint");
import runtime from "./Runtime.mjs";
import Option from "./Option.mjs";
import Predef from "./Predef.mjs";
let MutMap2;
(class MutMap {
  static {
    MutMap2 = this
  }
  static {
    this.MutMap = function MutMap(underlying) {
      return globalThis.Object.freeze(new MutMap.class(underlying));
    };
    (class MutMap1 {
      static {
        MutMap.MutMap.class = this
      }
      constructor(underlying) {
        let lambda;
        this.underlying = underlying;
        const this$MutMap = this;
        lambda = (undefined, function () {
          return runtime.safeCall(this$MutMap.underlying[globalThis.Symbol.iterator]())
        });
        this[globalThis.Symbol.iterator] = lambda;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "MutMap", ["underlying"]]; 
    });
  }
  static get(key) {
    return (m) => {
      let scrut, tmp;
      scrut = runtime.safeCall(m.underlying.has(key));
      if (scrut === true) {
        tmp = runtime.safeCall(m.underlying.get(key));
        return Option.Some(tmp)
      }
      return Option.None;
    }
  } 
  static insert(key, value) {
    return (m) => {
      m.underlying.set(key, value);
      return runtime.Unit
    }
  } 
  static delete(key) {
    return (m) => {
      runtime.safeCall(m.underlying.delete(key));
      return runtime.Unit
    }
  } 
  static updateWith(key) {
    return (op) => {
      return (m) => {
        let scrut, value, arg$Some$0$, tmp, tmp1;
        tmp = MutMap.get(key);
        tmp1 = Predef.pipeInto(m, tmp);
        scrut = runtime.safeCall(op(tmp1));
        if (scrut instanceof Option.Some.class) {
          arg$Some$0$ = scrut.value;
          value = arg$Some$0$;
          return m.underlying.set(key, value)
        } else if (scrut instanceof Option.None.class) {
          return runtime.safeCall(m.underlying.delete(key))
        }
        throw globalThis.Object.freeze(new globalThis.Error("match error"));
      }
    }
  } 
  static keysIterator(m) {
    return runtime.safeCall(m.underlying.keys())
  } 
  static valuesIterator(m) {
    return runtime.safeCall(m.underlying.values())
  } 
  static values(m) {
    let tmp;
    tmp = runtime.safeCall(m.underlying.values());
    return globalThis.Array.from(tmp)
  } 
  static toMap(entries) {
    let m, i, length;
    m = MutMap.empty;
    i = 0;
    length = entries.length;
    lbl: while (true) {
      let scrut, tmp, tmp1, tmp2;
      scrut = i < length;
      if (scrut === true) {
        tmp = runtime.safeCall(entries.at(i));
        tmp1 = MutMap.insert(...tmp);
        Predef.pipeInto(m, tmp1);
        tmp2 = i + 1;
        i = tmp2;
        continue lbl
      }
      break;
    }
    return m
  } 
  static get empty() {
    let tmp;
    tmp = globalThis.Object.freeze(new globalThis.Map());
    return globalThis.Object.freeze(new MutMap.MutMap.class(tmp));
  }
  toString() { return runtime.render(this); }
  static [definitionMetadata] = ["class", "MutMap"]; 
});
let MutMap = MutMap2; export default MutMap;
