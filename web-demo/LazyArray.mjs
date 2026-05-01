const definitionMetadata = globalThis.Symbol.for("mlscript.definitionMetadata");
const prettyPrint = globalThis.Symbol.for("mlscript.prettyPrint");
import runtime from "./Runtime.mjs";
import Iter from "./Iter.mjs";
let Splice1, sliceHelper, enforceArray, concatHelper, LazyArray1, View1, SpliceMarker1, LazyArr1, normIdxSlice;
enforceArray = function enforceArray() {
  let lambda;
  lambda = (undefined, function (caseScrut) {
    let a, ow, tmp, tmp1;
    if (caseScrut instanceof LazyArr1) {
      a = caseScrut;
      return a
    } else if (caseScrut instanceof globalThis.Array) {
      a = caseScrut;
      return a
    } else if (caseScrut instanceof globalThis.String) {
      a = caseScrut;
      return a
    } else if (typeof caseScrut === 'string') {
      a = caseScrut;
      return a
    } else if (globalThis.ArrayBuffer.isView(caseScrut) && !(caseScrut instanceof globalThis.DataView)) {
      a = caseScrut;
      return a
    }
    ow = caseScrut;
    tmp = runtime.safeCall(ow.toString());
    tmp1 = "Expected an Array, got: " + tmp;
    throw runtime.safeCall(globalThis.Error(tmp1));
  });
  return lambda
};
concatHelper = function concatHelper(a, l, ...args) {
  let idx, init_len, tmp, tmp1;
  idx = 0;
  init_len = a.length;
  tmp = args.length * 2;
  tmp1 = init_len + tmp;
  a.length = tmp1;
  lbl: while (true) {
    let scrut, x, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10;
    scrut = idx < args.length;
    if (scrut === true) {
      x = args.at(idx);
      tmp2 = idx * 2;
      tmp3 = init_len + tmp2;
      a[tmp3] = SpliceMarker1;
      tmp4 = idx * 2;
      tmp5 = init_len + tmp4;
      tmp6 = tmp5 + 1;
      tmp7 = enforceArray();
      tmp8 = tmp7(x);
      a[tmp6] = tmp8;
      tmp9 = l + x.length;
      l = tmp9;
      tmp10 = idx + 1;
      idx = tmp10;
      continue lbl
    }
    break;
  }
  return Splice1(a, l)
};
normIdxSlice = function normIdxSlice(i, len) {
  let scrut, scrut1, tmp;
  scrut = i < 0;
  if (scrut === true) {
    tmp = - len;
    scrut1 = i >= tmp;
    if (scrut1 === true) {
      return len + i
    }
    return 0;
  }
  return i;
};
sliceHelper = function sliceHelper(beg, fin, arr) {
  let len, scrut, scrut1, scrut2, itr, end, start, s, tmp, tmp1, tmp2, tmp3, arg$View$0$, arg$View$1$, arg$View$2$, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11;
  len = arr.length;
  tmp = normIdxSlice(beg, len);
  beg = tmp;
  tmp1 = normIdxSlice(fin, len);
  fin = tmp1;
  scrut = beg >= len;
  if (scrut === true) {
    tmp2 = globalThis.Object.freeze([]);
    return View1(tmp2, 0, 0)
  }
  scrut1 = fin >= len;
  if (scrut1 === true) {
    fin = len;
  }
  scrut2 = fin <= beg;
  if (scrut2 === true) {
    tmp3 = globalThis.Object.freeze([]);
    return View1(tmp3, 0, 0)
  }
  if (arr instanceof View1.class) {
    arg$View$0$ = arr.underlying;
    arg$View$1$ = arr.start;
    arg$View$2$ = arr.end;
    end = arg$View$2$;
    start = arg$View$1$;
    itr = arg$View$0$;
    tmp4 = start + beg;
    tmp5 = len - fin;
    tmp6 = end + tmp5;
    return View1(itr, tmp4, tmp6)
  } else if (arr instanceof Splice1.class) {
    s = arr;
    tmp7 = runtime.safeCall(s.materialize());
    tmp8 = tmp7.slice(beg, fin);
    return View1(tmp8, 0, 0)
  }
  tmp9 = enforceArray();
  tmp10 = tmp9(arr);
  tmp11 = arr.length - fin;
  return View1(tmp10, beg, tmp11);
};
(class LazyArr extends Iter.IterableBase {
  static {
    LazyArr1 = this
  }
  constructor() {
    super();
  }
  toString() {
    let tmp, tmp1;
    tmp = Iter.joined(this, ", ");
    tmp1 = "[" + tmp;
    return tmp1 + "]"
  } 
  concat(...args) {
    let tmp;
    tmp = [
      SpliceMarker1,
      this
    ];
    return concatHelper(tmp, this.length, ...args)
  }
  [prettyPrint]() { return this.toString(); }
  static [definitionMetadata] = ["class", "LazyArr"]; 
});
View1 = function View(underlying, start, end) {
  return globalThis.Object.freeze(new View.class(underlying, start, end));
};
(class View extends LazyArr1 {
  static {
    View1.class = this
  }
  constructor(underlying, start, end) {
    super();
    let tmp, tmp1;
    this.underlying = underlying;
    this.start = start;
    this.end = end;
    tmp = this.underlying.length - this.start;
    tmp1 = tmp - this.end;
    this.len = tmp1;
  }
  iterator() {
    let idx, until, lambda;
    idx = this.start;
    until = this.underlying.length - this.end;
    const this$View = this;
    lambda = (undefined, function () {
      let scrut, next, tmp;
      scrut = idx < until;
      if (scrut === true) {
        next = runtime.safeCall(this$View.underlying.at(idx));
        tmp = idx + 1;
        idx = tmp;
        return Iter.Result.Next(next)
      }
      return Iter.Result.Done;
    });
    return Iter.Iterator(lambda)
  } 
  materialize() {
    let tmp;
    tmp = this.underlying.length - this.end;
    return this.underlying.slice(this.start, tmp)
  } 
  at(i) {
    let scrut, tmp, tmp1, tmp2, tmp3, tmp4;
    tmp = - this.length;
    tmp1 = i < tmp;
    if (tmp1 === false) {
      tmp2 = i >= this.length;
    } else {
      tmp2 = true;
    }
    scrut = tmp2;
    if (scrut === true) {
      throw runtime.safeCall(globalThis.RangeError("View.at: Index out of bounds"))
    }
    let i1, len, inlinedVal, scrut1;
    i1 = i;
    len = this.length;
    scrut1 = i1 < 0;
    if (scrut1 === true) {
      inlinedVal = len + i1;
    } else {
      inlinedVal = i1;
    }
    tmp3 = inlinedVal;
    tmp4 = tmp3 + this.start;
    return runtime.safeCall(this.underlying.at(tmp4));
  } 
  slice(beg, fin) {
    return sliceHelper(beg, fin, this)
  } 
  get length() {
    return this.len;
  } 
  toString() {
    let tmp, tmp1;
    tmp = Iter.joined(this, ", ");
    tmp1 = "[" + tmp;
    return tmp1 + "]"
  }
  [prettyPrint]() { return this.toString(); }
  static [definitionMetadata] = ["class", "View", ["underlying", "start", "end"]]; 
});
(class SpliceMarker {
  static {
    new this
  }
  constructor() {
    SpliceMarker1 = this;
    Object.defineProperty(this, "class", {
      value: SpliceMarker
    });
    globalThis.Object.freeze(this);
  }
  toString() { return runtime.render(this); }
  static [definitionMetadata] = ["object", "SpliceMarker"]; 
});
Splice1 = function Splice(bits, len) {
  return globalThis.Object.freeze(new Splice.class(bits, len));
};
(class Splice extends LazyArr1 {
  static {
    Splice1.class = this
  }
  constructor(bits, len) {
    super();
    this.bits = bits;
    this.len = len;
    this.#materialized = null;
  }
  #materialized;
  iterator() {
    let nextf, idx, uitr;
    const this$Splice = this;
    nextf = function nextf() {
      let scrut, scrut1, scrut2, n, scrut3, value, tmp, tmp1, tmp2, tmp3;
      scrut = idx < this$Splice.bits.length;
      if (scrut === true) {
        scrut1 = this$Splice.bits.at(idx);
        if (scrut1 instanceof SpliceMarker1.class) {
          scrut2 = uitr === null;
          if (scrut2 === true) {
            tmp = idx + 1;
            tmp1 = runtime.safeCall(this$Splice.bits.at(tmp)[globalThis.Symbol.iterator]());
            uitr = tmp1;
          }
          n = runtime.safeCall(uitr.next());
          scrut3 = n.done;
          if (scrut3 === true) {
            uitr = null;
            tmp2 = idx + 2;
            idx = tmp2;
            return nextf()
          }
          return n;
        }
        value = this$Splice.bits.at(idx);
        tmp3 = idx + 1;
        idx = tmp3;
        return Iter.Result.Next(value);
      }
      return Iter.Result.Done;
    };
    idx = 0;
    uitr = null;
    return Iter.Iterator(nextf)
  } 
  get reify() {
    let counter, arr, stack, tmp;
    counter = 0;
    arr = new globalThis.Array(this.len);
    stack = [];
    tmp = globalThis.Object.freeze([
      0,
      this.bits
    ]);
    runtime.safeCall(stack.push(tmp));
    lbl: while (true) {
      let scrut, e, idx, vals, scrut1, scrut2, scrut3, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
      scrut = stack.length > 0;
      if (scrut === true) {
        e = runtime.safeCall(stack.pop());
        idx = e.at(0);
        vals = e.at(1);
        if (vals instanceof Splice1.class) {
          vals = vals.bits;
        }
        lbl1: while (true) {
          let scrut4, scrut5, scrut6, scrut7, scrut8, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12;
          scrut4 = idx < vals.length;
          if (scrut4 === true) {
            scrut5 = runtime.safeCall(vals.at(idx));
            if (scrut5 instanceof SpliceMarker1.class) {
              tmp7 = true;
            } else {
              tmp7 = false;
            }
            scrut6 = tmp7;
            if (scrut6 === false) {
              tmp8 = true;
            } else {
              tmp8 = false;
            }
            scrut7 = tmp8;
            if (scrut7 === true) {
              tmp9 = true;
            } else {
              tmp9 = false;
            }
          } else {
            tmp9 = false;
          }
          scrut8 = tmp9;
          if (scrut8 === true) {
            tmp10 = runtime.safeCall(vals.at(idx));
            arr[counter] = tmp10;
            tmp11 = counter + 1;
            counter = tmp11;
            tmp12 = idx + 1;
            idx = tmp12;
            continue lbl1
          }
          break;
        }
        scrut1 = idx < vals.length;
        if (scrut1 === true) {
          scrut2 = runtime.safeCall(vals.at(idx));
          if (scrut2 instanceof SpliceMarker1.class) {
            tmp1 = true;
          } else {
            tmp1 = false;
          }
        } else {
          tmp1 = false;
        }
        scrut3 = tmp1;
        if (scrut3 === true) {
          tmp2 = idx + 2;
          tmp3 = globalThis.Object.freeze([
            tmp2,
            vals
          ]);
          runtime.safeCall(stack.push(tmp3));
          tmp4 = idx + 1;
          tmp5 = runtime.safeCall(vals.at(tmp4));
          tmp6 = globalThis.Object.freeze([
            0,
            tmp5
          ]);
          runtime.safeCall(stack.push(tmp6));
          continue lbl
        }
        continue lbl;
      }
      break;
    }
    return arr;
  } 
  materialize() {
    let scrut;
    scrut = this.#materialized === null;
    if (scrut === true) {
      this.#materialized = this.reify;
      return this.#materialized
    }
    return this.#materialized;
  } 
  at(i) {
    let tmp;
    tmp = this.materialize();
    return runtime.safeCall(tmp.at(i))
  } 
  slice(beg, fin) {
    return sliceHelper(beg, fin, this)
  } 
  concat(...args) {
    let scrut, tmp, tmp1;
    scrut = this.#materialized === null;
    if (scrut === true) {
      tmp = [
        SpliceMarker1,
        this
      ];
      return concatHelper(tmp, this.len, ...args)
    }
    tmp1 = [
      SpliceMarker1,
      this.#materialized
    ];
    return concatHelper(tmp1, this.len, ...args);
  } 
  get length() {
    return this.len;
  } 
  toString() {
    let tmp, tmp1, tmp2;
    tmp = this.materialize();
    tmp1 = Iter.joined(tmp, ", ");
    tmp2 = "[" + tmp1;
    return tmp2 + "]"
  }
  [prettyPrint]() { return this.toString(); }
  static [definitionMetadata] = ["class", "Splice", ["bits", "len"]]; 
});
(class LazyArray {
  static {
    LazyArray1 = this
  }
  static {
    this.__split = SpliceMarker1;
  }
  static mk(...args) {
    return View1(args, 0, 0)
  } 
  static concat(...args) {
    let tmp;
    tmp = [];
    return concatHelper(tmp, 0, ...args)
  } 
  static dropLeftRight(beg, fin) {
    return (xs) => {
      let scrut, scrut1, tmp, tmp1, tmp2, tmp3, tmp4;
      tmp = beg < 0;
      if (tmp === false) {
        tmp1 = fin < 0;
      } else {
        tmp1 = true;
      }
      scrut = tmp1;
      if (scrut === true) {
        throw runtime.safeCall(globalThis.RangeError("LazyArray.dropLeftRight: indices must be non-negative"))
      }
      tmp2 = beg > xs.length;
      if (tmp2 === false) {
        tmp3 = fin > xs.length;
      } else {
        tmp3 = true;
      }
      scrut1 = tmp3;
      if (scrut1 === true) {
        throw runtime.safeCall(globalThis.RangeError("LazyArray.dropLeftRight: indices out of bounds"))
      }
      tmp4 = xs.length - fin;
      return sliceHelper(beg, tmp4, xs);
    }
  } 
  static equals(xs, ys) {
    let idx, tmp;
    tmp = xs.length === ys.length;
    if (tmp === true) {
      idx = 0;
      lbl: while (true) {
        let scrut, scrut1, tmp1, tmp2, tmp3;
        scrut = idx < xs.length;
        if (scrut === true) {
          tmp1 = runtime.safeCall(xs.at(idx));
          tmp2 = runtime.safeCall(ys.at(idx));
          scrut1 = tmp1 !== tmp2;
          if (scrut1 === true) {
            return false
          }
          tmp3 = idx + 1;
          idx = tmp3;
          continue lbl;
        }
        break;
      }
      return true
    }
    return false;
  } 
  static __concat(...args) {
    let len, idx;
    len = 0;
    idx = 0;
    lbl: while (true) {
      let scrut, scrut1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
      scrut = idx < args.length;
      if (scrut === true) {
        scrut1 = args.at(idx);
        if (scrut1 instanceof SpliceMarker1.class) {
          tmp = enforceArray();
          tmp1 = idx + 1;
          tmp2 = tmp(args.at(tmp1));
          tmp3 = len + tmp2.length;
          len = tmp3;
          tmp4 = idx + 2;
          idx = tmp4;
          continue lbl
        }
        tmp5 = len + 1;
        len = tmp5;
        tmp6 = idx + 1;
        idx = tmp6;
        continue lbl;
      }
      break;
    }
    return Splice1(args, len)
  }
  toString() { return runtime.render(this); }
  static [definitionMetadata] = ["class", "LazyArray"]; 
});
let LazyArray = LazyArray1; export default LazyArray;
