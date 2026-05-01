const definitionMetadata = globalThis.Symbol.for("mlscript.definitionMetadata");
const prettyPrint = globalThis.Symbol.for("mlscript.prettyPrint");
import runtime from "./Runtime.mjs";
import Block from "./Block.mjs";
import CachedHash from "./CachedHash.mjs";
import Option from "./Option.mjs";
import Predef from "./Predef.mjs";
import Shape from "./Shape.mjs";
import StrOps from "./StrOps.mjs";
import Runtime from "./Runtime.mjs";
let ShapeSet2;
(class ShapeSet {
  static {
    ShapeSet2 = this
  }
  static #idCounter;
  static {
    this.ShapeSet = function ShapeSet(shapeset) {
      return globalThis.Object.freeze(new ShapeSet.class(shapeset));
    };
    (class ShapeSet1 extends CachedHash {
      static {
        ShapeSet.ShapeSet.class = this
      }
      constructor(shapeset) {
        super();
        this.shapeset = shapeset;
      }
      static get empty() {
        let tmp;
        tmp = globalThis.Object.freeze(new globalThis.Map());
        return ShapeSet.ShapeSet(tmp);
      }
      keys() {
        let tmp, tmp1;
        tmp = runtime.safeCall(this.shapeset.keys());
        tmp1 = runtime.safeCall(tmp.toArray());
        return runtime.safeCall(tmp1.toSorted())
      } 
      values() {
        let tmp;
        tmp = runtime.safeCall(this.shapeset.values());
        return runtime.safeCall(tmp.toArray())
      } 
      isEmpty() {
        return Predef.equals(this.shapeset.size, 0)
      } 
      contains(s) {
        let tmp;
        tmp = runtime.safeCall(s.hash());
        return runtime.safeCall(this.shapeset.has(tmp))
      } 
      flatMap(f) {
        let tmp, tmp1;
        tmp = this.values();
        tmp1 = runtime.safeCall(tmp.flatMap(f));
        return ShapeSet.liftMany(tmp1)
      } 
      toString() {
        let tmp, tmp1, tmp2, tmp3;
        tmp = this.keys();
        tmp1 = runtime.safeCall(tmp.toSorted());
        tmp2 = runtime.safeCall(tmp1.toString());
        tmp3 = StrOps.concat2("{", tmp2);
        return StrOps.concat2(tmp3, "}")
      } 
      isDyn() {
        let scrut, scrut1, tmp;
        scrut = Predef.equals(this.shapeset.size, 1);
        if (scrut === true) {
          tmp = this.values();
          scrut1 = tmp[0];
          if (scrut1 instanceof Shape.Dyn.class) {
            return true
          }
          return false;
        }
        return false;
      }
      [prettyPrint]() { return this.toString(); }
      static [definitionMetadata] = ["class", "ShapeSet", ["shapeset"]]; 
    });
    ShapeSet.#idCounter = 0;
  }
  static lift(s) {
    let tmp, tmp1, tmp2, tmp3;
    tmp = runtime.safeCall(s.hash());
    tmp1 = globalThis.Object.freeze([
      tmp,
      s
    ]);
    tmp2 = globalThis.Object.freeze([
      tmp1
    ]);
    tmp3 = globalThis.Object.freeze(new globalThis.Map(tmp2));
    return ShapeSet.ShapeSet(tmp3)
  } 
  static liftMany(arr) {
    let lambda, tmp, tmp1;
    lambda = (undefined, function (s) {
      let tmp2;
      tmp2 = runtime.safeCall(s.hash());
      return globalThis.Object.freeze([
        tmp2,
        s
      ])
    });
    tmp = runtime.safeCall(arr.map(lambda));
    tmp1 = globalThis.Object.freeze(new globalThis.Map(tmp));
    return ShapeSet.ShapeSet(tmp1)
  } 
  static union(s1, s2) {
    let scrut, scrut1, tmp, tmp1;
    scrut = s1.isDyn();
    if (scrut === true) {
      return s1
    }
    scrut1 = s2.isDyn();
    if (scrut1 === true) {
      return s2
    }
    tmp = globalThis.Object.freeze([
      ...s1.shapeset,
      ...s2.shapeset
    ]);
    tmp1 = globalThis.Object.freeze(new globalThis.Map(tmp));
    return ShapeSet.ShapeSet(tmp1);
  } 
  static flat(arr) {
    let lambda, tmp, tmp1, tmp2;
    lambda = (undefined, function (_0) {
      let tmp3;
      tmp3 = runtime.safeCall(_0.shapeset.entries());
      return runtime.safeCall(tmp3.toArray())
    });
    tmp = runtime.safeCall(arr.map(lambda));
    tmp1 = runtime.safeCall(tmp.flat());
    tmp2 = globalThis.Object.freeze(new globalThis.Map(tmp1));
    return ShapeSet.ShapeSet(tmp2)
  } 
  static prod(xs) {
    let lambda, tmp, tmp1;
    lambda = (undefined, function (a, b) {
      let lambda1;
      lambda1 = (undefined, function (d) {
        let lambda2;
        lambda2 = (undefined, function (e) {
          return globalThis.Object.freeze([
            ...d,
            e
          ])
        });
        return runtime.safeCall(b.map(lambda2))
      });
      return runtime.safeCall(a.flatMap(lambda1))
    });
    tmp = globalThis.Object.freeze([]);
    tmp1 = globalThis.Object.freeze([
      tmp
    ]);
    return xs.reduce(lambda, tmp1)
  } 
  static mkBot() {
    return ShapeSet.ShapeSet.class.empty
  } 
  static mkDyn() {
    let tmp;
    tmp = Shape.Dyn();
    return ShapeSet.lift(tmp)
  } 
  static mkLit(l) {
    let tmp;
    tmp = Shape.Lit(l);
    return ShapeSet.lift(tmp)
  } 
  static mkArr(shapes) {
    let lambda, tmp, tmp1, lambda1, tmp2;
    lambda = (undefined, function (_0) {
      let tmp3;
      tmp3 = runtime.safeCall(_0.shapeset.values());
      return runtime.safeCall(tmp3.toArray())
    });
    tmp = runtime.safeCall(shapes.map(lambda));
    tmp1 = Predef.pipeInto(tmp, ShapeSet.prod);
    lambda1 = (undefined, function (x) {
      return Shape.Arr(x)
    });
    tmp2 = runtime.safeCall(tmp1.map(lambda1));
    return Predef.pipeInto(tmp2, ShapeSet.liftMany)
  } 
  static mkClass(sym, params) {
    let lambda, tmp, tmp1, lambda1, tmp2;
    lambda = (undefined, function (_0) {
      let tmp3;
      tmp3 = runtime.safeCall(_0.shapeset.values());
      return runtime.safeCall(tmp3.toArray())
    });
    tmp = runtime.safeCall(params.map(lambda));
    tmp1 = Predef.pipeInto(tmp, ShapeSet.prod);
    lambda1 = (undefined, function (_0) {
      return Shape.Class(sym, _0)
    });
    tmp2 = runtime.safeCall(tmp1.map(lambda1));
    return Predef.pipeInto(tmp2, ShapeSet.liftMany)
  } 
  static mkClassFromMap(sym, paramsMap, psOpt) {
    let name, value, auxParams, entries, keys, params, newSym, arg$ConcreteClassSymbol$0$, arg$ConcreteClassSymbol$1$, arg$ConcreteClassSymbol$3$, tmp, lambda, lambda1, tmp1, lambda2, tmp2, tmp3, lambda3, tmp4;
    if (sym instanceof Block.ConcreteClassSymbol.class) {
      arg$ConcreteClassSymbol$0$ = sym.name;
      arg$ConcreteClassSymbol$1$ = sym.value;
      arg$ConcreteClassSymbol$3$ = sym.auxParams;
      auxParams = arg$ConcreteClassSymbol$3$;
      value = arg$ConcreteClassSymbol$1$;
      name = arg$ConcreteClassSymbol$0$;
      tmp = runtime.safeCall(paramsMap.entries());
      entries = globalThis.Object.freeze([
        ...tmp
      ]);
      lambda = (undefined, function (a) {
        let s, pss, found, arg$Some$0$, tmp5, lambda4;
        s = Block.Symbol(a[0]);
        if (psOpt instanceof Option.Some.class) {
          arg$Some$0$ = psOpt.value;
          pss = arg$Some$0$;
          tmp5 = runtime.safeCall(pss.flat());
          lambda4 = (undefined, function (p) {
            return p.sym.name === a[0]
          });
          found = runtime.safeCall(tmp5.find(lambda4));
          if (found instanceof Runtime.Unit.class) {
            return Block.Param(Option.None, s)
          }
          return found;
        }
        return Block.Param(Option.None, s);
      });
      keys = runtime.safeCall(entries.map(lambda));
      lambda1 = (undefined, function (_0) {
        return _0[1]
      });
      params = runtime.safeCall(entries.map(lambda1));
      tmp1 = Option.Some(keys);
      newSym = Block.ConcreteClassSymbol(name, value, tmp1, auxParams);
      lambda2 = (undefined, function (_0) {
        let tmp5;
        tmp5 = runtime.safeCall(_0.shapeset.values());
        return runtime.safeCall(tmp5.toArray())
      });
      tmp2 = runtime.safeCall(params.map(lambda2));
      tmp3 = Predef.pipeInto(tmp2, ShapeSet.prod);
      lambda3 = (undefined, function (_0) {
        return Shape.Class(newSym, _0)
      });
      tmp4 = runtime.safeCall(tmp3.map(lambda3));
      return Predef.pipeInto(tmp4, ShapeSet.liftMany)
    }
    throw globalThis.Object.freeze(new globalThis.Error("match error"));
  } 
  static filterSet(s, p) {
    let lambda;
    lambda = (undefined, function (_0) {
      return Shape.filter(_0, p)
    });
    return s.flatMap(lambda)
  } 
  static restSet(s, p) {
    let lambda;
    lambda = (undefined, function (_0) {
      return Shape.rest(_0, p)
    });
    return s.flatMap(lambda)
  } 
  static isFalseShape(s) {
    let scrut, l, scrut1, arg$Lit$0$, tmp, tmp1;
    tmp = s.values();
    scrut = tmp.length;
    if (scrut === 1) {
      tmp1 = s.values();
      scrut1 = tmp1[0];
      if (scrut1 instanceof Shape.Lit.class) {
        arg$Lit$0$ = scrut1.l;
        l = arg$Lit$0$;
        if (l === false) {
          return true
        }
        return false;
      }
      return false;
    }
    return false;
  } 
  static isTrueShape(s) {
    let scrut, l, scrut1, arg$Lit$0$, tmp, tmp1;
    tmp = s.values();
    scrut = tmp.length;
    if (scrut === 1) {
      tmp1 = s.values();
      scrut1 = tmp1[0];
      if (scrut1 instanceof Shape.Lit.class) {
        arg$Lit$0$ = scrut1.l;
        l = arg$Lit$0$;
        if (l === true) {
          return true
        }
        return false;
      }
      return false;
    }
    return false;
  } 
  static binOpSet(op, s1, s2) {
    let scrut, scrut1, scrut2, scrut3, scrut4, scrut5, pairs, res, scrut6, st, isBoolOp, scrut7, tmp, tmp1, tmp2, lambda, lambda1, tmp3, tmp4;
    split_1$: {
      switch (op) {
        case "&&":
          scrut = ShapeSet.isFalseShape(s1);
          if (scrut === true) {
            return ShapeSet.mkLit(false)
          }
          scrut1 = ShapeSet.isFalseShape(s2);
          if (scrut1 === true) {
            return ShapeSet.mkLit(false)
          }
          scrut4 = s1.isDyn();
          if (scrut4 === true) {
            break split_1$
          }
          scrut5 = s2.isDyn();
          if (scrut5 === true) {
            break split_1$
          }
          break;
        case "||":
          scrut2 = ShapeSet.isTrueShape(s1);
          if (scrut2 === true) {
            return ShapeSet.mkLit(true)
          }
          scrut3 = ShapeSet.isTrueShape(s2);
          if (scrut3 === true) {
            return ShapeSet.mkLit(true)
          }
          scrut4 = s1.isDyn();
          if (scrut4 === true) {
            break split_1$
          }
          scrut5 = s2.isDyn();
          if (scrut5 === true) {
            break split_1$
          }
          break;
        default:
          scrut4 = s1.isDyn();
          if (scrut4 === true) {
            break split_1$
          }
          scrut5 = s2.isDyn();
          if (scrut5 === true) {
            break split_1$
          }
      }
      tmp = s1.values();
      tmp1 = s2.values();
      tmp2 = globalThis.Object.freeze([
        tmp,
        tmp1
      ]);
      pairs = ShapeSet.prod(tmp2);
      lambda = (undefined, function (pair) {
        let scrut8, l1, l2, scrut9, arg$Lit$0$, arg$Lit$0$1, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19;
        scrut8 = pair[0];
        if (scrut8 instanceof Shape.Lit.class) {
          arg$Lit$0$ = scrut8.l;
          l1 = arg$Lit$0$;
          scrut9 = pair[1];
          if (scrut9 instanceof Shape.Lit.class) {
            arg$Lit$0$1 = scrut9.l;
            l2 = arg$Lit$0$1;
            switch (op) {
              case "+":
                tmp5 = l1 + l2;
                return Shape.Lit(tmp5);
              case "-":
                tmp6 = l1 - l2;
                return Shape.Lit(tmp6);
              case "*":
                tmp7 = l1 * l2;
                return Shape.Lit(tmp7);
              case "/":
                tmp8 = l1 / l2;
                return Shape.Lit(tmp8);
              case "%":
                tmp9 = l1 % l2;
                return Shape.Lit(tmp9);
              case "==":
                tmp10 = Predef.equals(l1, l2);
                return Shape.Lit(tmp10);
              case "!=":
                tmp11 = Predef.nequals(l1, l2);
                return Shape.Lit(tmp11);
              case "<":
                tmp12 = l1 < l2;
                return Shape.Lit(tmp12);
              case "<=":
                tmp13 = l1 <= l2;
                return Shape.Lit(tmp13);
              case ">":
                tmp14 = l1 > l2;
                return Shape.Lit(tmp14);
              case ">=":
                tmp15 = l1 >= l2;
                return Shape.Lit(tmp15);
              case "===":
                tmp16 = l1 === l2;
                return Shape.Lit(tmp16);
              case "!==":
                tmp17 = l1 !== l2;
                return Shape.Lit(tmp17);
              case "&&":
                if (l1 === true) {
                  tmp18 = l2;
                  return Shape.Lit(tmp18)
                }
                tmp18 = false;
                return Shape.Lit(tmp18);
              case "||":
                if (l1 === false) {
                  tmp19 = l2;
                  return Shape.Lit(tmp19)
                }
                tmp19 = true;
                return Shape.Lit(tmp19);
            }
            return Shape.Dyn()
          }
          return Shape.Dyn();
        }
        return Shape.Dyn();
      });
      res = runtime.safeCall(pairs.map(lambda));
      lambda1 = (undefined, function (_0) {
        if (_0 instanceof Shape.Dyn.class) {
          return true
        }
        return false;
      });
      scrut6 = runtime.safeCall(res.some(lambda1));
      if (scrut6 === true) {
        return ShapeSet.mkDyn()
      }
      st = ShapeSet.liftMany(res);
      switch (op) {
        case "==":
          tmp3 = true;
          break;
        case "!=":
          tmp3 = true;
          break;
        case "<":
          tmp3 = true;
          break;
        case "<=":
          tmp3 = true;
          break;
        case ">":
          tmp3 = true;
          break;
        case ">=":
          tmp3 = true;
          break;
        case "===":
          tmp3 = true;
          break;
        case "!==":
          tmp3 = true;
          break;
        case "&&":
          tmp3 = true;
          break;
        case "||":
          tmp3 = true;
          break;
        default:
          tmp3 = false;
      }
      isBoolOp = tmp3;
      if (isBoolOp === true) {
        tmp4 = runtime.safeCall(st.values());
        scrut7 = tmp4.length > 1;
        if (scrut7 === true) {
          return ShapeSet.mkDyn()
        }
        return st;
      }
      return st;
    }
    return ShapeSet.mkDyn()
  } 
  static selSet(s1, s2) {
    let tmp, tmp1, tmp2, tmp3, lambda, tmp4;
    tmp = s1.values();
    tmp1 = s2.values();
    tmp2 = globalThis.Object.freeze([
      tmp,
      tmp1
    ]);
    tmp3 = ShapeSet.prod(tmp2);
    lambda = (undefined, function (pair) {
      return Shape.sel(pair[0], pair[1])
    });
    tmp4 = runtime.safeCall(tmp3.flatMap(lambda));
    return Predef.pipeInto(tmp4, ShapeSet.liftMany)
  } 
  static staticSet(s) {
    let v, scrut, scrut1;
    v = s.values();
    scrut = v.length;
    scrut1 = Predef.equals(scrut, 1);
    if (scrut1 === true) {
      return Shape.static(v[0])
    }
    return false;
  } 
  static valOf(s) {
    let l, shapes, params, value, arg$Class$0$, arg$Class$1$, arg$ConcreteClassSymbol$1$, arg$Arr$0$, arg$Lit$0$, lambda, tmp, tmp1;
    if (s instanceof Shape.Dyn.class) {
      throw runtime.safeCall(globalThis.Error("valOf on Dyn"))
    } else if (s instanceof Shape.Lit.class) {
      arg$Lit$0$ = s.l;
      l = arg$Lit$0$;
      return l
    } else if (s instanceof Shape.Arr.class) {
      arg$Arr$0$ = s.shapes;
      shapes = arg$Arr$0$;
      lambda = (undefined, function (x, _, _1) {
        return ShapeSet.valOf(x)
      });
      return runtime.safeCall(shapes.map(lambda))
    } else if (s instanceof Shape.Class.class) {
      arg$Class$0$ = s.sym;
      arg$Class$1$ = s.fields;
      if (arg$Class$0$ instanceof Block.ConcreteClassSymbol.class) {
        arg$ConcreteClassSymbol$1$ = arg$Class$0$.value;
        params = arg$Class$1$;
        value = arg$ConcreteClassSymbol$1$;
        tmp = runtime.safeCall(params.map(ShapeSet.valOf));
        return globalThis.Object.freeze(new value(...tmp))
      }
    }
    tmp1 = "Unknown shape: " + s;
    throw runtime.safeCall(globalThis.Error(tmp1))
  } 
  static valOfSet(s) {
    let scrut, scrut1, tmp, tmp1;
    tmp = s.values();
    scrut = tmp.length;
    scrut1 = Predef.equals(scrut, 1);
    if (scrut1 === true) {
      tmp1 = s.values();
      return ShapeSet.valOf(tmp1[0])
    }
    throw runtime.safeCall(globalThis.Error("valOfSet on non-singleton ShapeSet"));
  } 
  static freshId(prefix) {
    let tmp, tmp1, tmp2, tmp3;
    tmp = ShapeSet.#idCounter + 1;
    ShapeSet.#idCounter = tmp;
    tmp1 = prefix + "_";
    tmp2 = runtime.safeCall(ShapeSet.#idCounter.toString());
    tmp3 = tmp1 + tmp2;
    return Block.Symbol(tmp3)
  } 
  static val2path(v, allocs) {
    let scrut, scrut1, mapped, blocks, paths, tupSym, tupAssign, fullBlock, scrut2, scrut3, scrut4, meta, clsName, paramNames, scrut5, ps, classSym, mapped1, blocks1, paths1, objSym, objAssign, fullBlock1, scrut6, scrut7, scrut8, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, lambda, lambda1, lambda2, lambda3, tmp8, tmp9, tmp10, lambda4, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, lambda5, lambda6, lambda7, tmp19, lambda8, tmp20, tmp21, tmp22, lambda9, tmp23, tmp24, tmp25, tmp26;
    tmp = typeof v;
    tmp1 = Predef.equals(tmp, "number");
    if (tmp1 === false) {
      tmp3 = typeof v;
      tmp2 = Predef.equals(tmp3, "string");
    } else {
      tmp2 = true;
    }
    if (tmp2 === false) {
      tmp5 = typeof v;
      tmp4 = Predef.equals(tmp5, "boolean");
    } else {
      tmp4 = true;
    }
    scrut = tmp4;
    if (scrut === true) {
      tmp6 = Block.End();
      tmp7 = Block.ValueLit(v);
      return globalThis.Object.freeze([
        tmp6,
        tmp7
      ])
    }
    scrut1 = globalThis.Array.isArray(v);
    if (scrut1 === true) {
      lambda = (undefined, function (_0) {
        return ShapeSet.val2path(_0, allocs)
      });
      mapped = runtime.safeCall(v.map(lambda));
      lambda1 = (undefined, function (_0) {
        return _0[0]
      });
      blocks = runtime.safeCall(mapped.map(lambda1));
      lambda2 = (undefined, function (_0) {
        return _0[1]
      });
      paths = runtime.safeCall(mapped.map(lambda2));
      tupSym = ShapeSet.freshId("tup");
      runtime.safeCall(allocs.push(tupSym));
      lambda3 = (undefined, function (_0) {
        return Block.Arg(_0)
      });
      tmp8 = runtime.safeCall(paths.map(lambda3));
      tmp9 = Block.Tuple(tmp8);
      tmp10 = Block.End();
      tupAssign = Block.Assign(tupSym, tmp9, tmp10);
      lambda4 = (undefined, function (b, acc) {
        return Block.concat(b, acc)
      });
      tmp11 = runtime.safeCall(Predef.foldl(lambda4));
      fullBlock = runtime.safeCall(tmp11(tupAssign, ...blocks));
      tmp12 = Block.ValueRef(tupSym);
      return globalThis.Object.freeze([
        fullBlock,
        tmp12
      ])
    }
    if (v === undefined) {
      tmp13 = true;
    } else {
      tmp13 = false;
    }
    scrut2 = ! tmp13;
    if (scrut2 === true) {
      if (v === null) {
        tmp14 = true;
      } else {
        tmp14 = false;
      }
      scrut8 = ! tmp14;
      if (scrut8 === true) {
        scrut3 = v.constructor;
        if (scrut3 === undefined) {
          tmp15 = true;
        } else {
          tmp15 = false;
        }
        scrut7 = ! tmp15;
        if (scrut7 === true) {
          scrut4 = v.constructor[Predef.Symbols.definitionMetadata];
          if (scrut4 === undefined) {
            tmp16 = true;
          } else {
            tmp16 = false;
          }
          scrut6 = ! tmp16;
          if (scrut6 === true) {
            meta = v.constructor[Predef.Symbols.definitionMetadata];
            clsName = meta[1];
            scrut5 = meta[2];
            if (scrut5 === undefined) {
              tmp17 = globalThis.Object.freeze([]);
            } else {
              ps = scrut5;
              tmp17 = ps;
            }
            paramNames = tmp17;
            tmp18 = globalThis.Object.freeze([]);
            classSym = Block.ConcreteClassSymbol(clsName, undefined, Option.None, tmp18);
            lambda5 = (undefined, function (fld, _, _1) {
              return ShapeSet.val2path(v[fld], allocs)
            });
            mapped1 = runtime.safeCall(paramNames.map(lambda5));
            lambda6 = (undefined, function (_0) {
              return _0[0]
            });
            blocks1 = runtime.safeCall(mapped1.map(lambda6));
            lambda7 = (undefined, function (_0) {
              return _0[1]
            });
            paths1 = runtime.safeCall(mapped1.map(lambda7));
            objSym = ShapeSet.freshId("obj");
            runtime.safeCall(allocs.push(objSym));
            tmp19 = Block.ValueRef(classSym);
            lambda8 = (undefined, function (_0) {
              return Block.Arg(_0)
            });
            tmp20 = runtime.safeCall(paths1.map(lambda8));
            tmp21 = Block.Instantiate(tmp19, tmp20);
            tmp22 = Block.End();
            objAssign = Block.Assign(objSym, tmp21, tmp22);
            lambda9 = (undefined, function (b, acc) {
              return Block.concat(acc, b)
            });
            tmp23 = runtime.safeCall(Predef.fold(lambda9));
            fullBlock1 = runtime.safeCall(tmp23(objAssign, ...blocks1));
            tmp24 = Block.ValueRef(objSym);
            return globalThis.Object.freeze([
              fullBlock1,
              tmp24
            ])
          }
        }
      }
    }
    tmp25 = Block.End();
    tmp26 = Block.ValueLit(42);
    return globalThis.Object.freeze([
      tmp25,
      tmp26
    ]);
  }
  toString() { return runtime.render(this); }
  static [definitionMetadata] = ["class", "ShapeSet"]; 
});
let ShapeSet = ShapeSet2; export default ShapeSet;
