const definitionMetadata = globalThis.Symbol.for("mlscript.definitionMetadata");
const prettyPrint = globalThis.Symbol.for("mlscript.prettyPrint");
import runtime from "./Runtime.mjs";
import Block from "./Block.mjs";
import Shape from "./Shape.mjs";
import Option from "./Option.mjs";
import ShapeSet from "./ShapeSet.mjs";
import Predef from "./Predef.mjs";
import Runtime from "./Runtime.mjs";
let SpecializeHelpers1;
(class SpecializeHelpers {
  static {
    SpecializeHelpers1 = this
  }
  static #moduleGenMapPrefix;
  static #classGenMapPrefix;
  static #moduleCachePrefix;
  static #classCachePrefix;
  static {
    SpecializeHelpers.#moduleGenMapPrefix = "generatorMap$";
    SpecializeHelpers.#classGenMapPrefix = "class$generatorMap$";
    SpecializeHelpers.#moduleCachePrefix = "cache$";
    SpecializeHelpers.#classCachePrefix = "class$cache$";
    this.Ctx = function Ctx(ctx, valueNameCtx, valDefnCtx, allocs, thisShape) {
      return globalThis.Object.freeze(new Ctx.class(ctx, valueNameCtx, valDefnCtx, allocs, thisShape));
    };
    (class Ctx {
      static {
        SpecializeHelpers.Ctx.class = this
      }
      constructor(ctx, valueNameCtx, valDefnCtx, allocs, thisShape) {
        this.ctx = ctx;
        this.valueNameCtx = valueNameCtx;
        this.valDefnCtx = valDefnCtx;
        this.allocs = allocs;
        this.thisShape = thisShape;
      }
      static empty() {
        let tmp, tmp1, tmp2, tmp3;
        tmp = globalThis.Object.freeze(new globalThis.Map());
        tmp1 = globalThis.Object.freeze(new globalThis.Map());
        tmp2 = globalThis.Object.freeze(new globalThis.Map());
        tmp3 = [];
        return SpecializeHelpers.Ctx(tmp, tmp1, tmp2, tmp3, Option.None)
      }
      get(path) {
        let ps, scrut, tmp;
        ps = SpecializeHelpers.showCtxPath(path);
        scrut = runtime.safeCall(this.ctx.has(ps));
        if (scrut === true) {
          tmp = runtime.safeCall(this.ctx.get(ps));
          return Option.Some(tmp)
        }
        return Option.None;
      } 
      getValDefn(name) {
        let scrut, tmp;
        scrut = runtime.safeCall(this.valDefnCtx.has(name));
        if (scrut === true) {
          tmp = runtime.safeCall(this.valDefnCtx.get(name));
          return Option.Some(tmp)
        }
        return Option.None;
      } 
      get clone() {
        let tmp, tmp1;
        tmp = globalThis.Object.freeze(new globalThis.Map(this.ctx));
        tmp1 = globalThis.Object.freeze(new globalThis.Map(this.valDefnCtx));
        return SpecializeHelpers.Ctx(tmp, this.valueNameCtx, tmp1, this.allocs, this.thisShape);
      } 
      get clearCtx() {
        let tmp;
        tmp = globalThis.Object.freeze(new globalThis.Map());
        return SpecializeHelpers.Ctx(tmp, this.valueNameCtx, this.valDefnCtx, this.allocs, this.thisShape);
      } 
      sub(other) {
        let res, lambda;
        res = globalThis.Object.freeze(new globalThis.Map());
        lambda = (undefined, function (ss, ps, _) {
          let scrut, scrut1, tmp;
          tmp = runtime.safeCall(ss.isEmpty());
          scrut = ! tmp;
          if (scrut === true) {
            let ps1, inlinedVal, scrut2, tmp1;
            ps1 = ps;
            scrut2 = runtime.safeCall(other.ctx.has(ps1));
            if (scrut2 === true) {
              tmp1 = runtime.safeCall(other.ctx.get(ps1));
              inlinedVal = runtime.safeCall(tmp1.isEmpty());
            } else {
              inlinedVal = false;
            }
            scrut1 = inlinedVal;
            if (scrut1 === true) {
              res.set(ps, ss);
              return runtime.Unit
            }
            return runtime.Unit;
          }
          return runtime.Unit;
        });
        runtime.safeCall(this.ctx.forEach(lambda));
        return res
      } 
      add(path, ss) {
        let ps, scrut, tmp, tmp1;
        ps = SpecializeHelpers.showCtxPath(path);
        scrut = runtime.safeCall(this.ctx.has(ps));
        if (scrut === true) {
          tmp = runtime.safeCall(this.ctx.get(ps));
          tmp1 = ShapeSet.union2(tmp, ss);
          this.ctx.set(ps, tmp1);
          return this
        }
        this.ctx.set(ps, ss);
        return this;
      } 
      addValDefn(ps, ss) {
        this.valDefnCtx.set(ps, ss);
        return this
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Ctx", ["ctx", "valueNameCtx", "valDefnCtx", "allocs", "thisShape"]]; 
    });
    this.FunCache = function FunCache(owner, cache) {
      return globalThis.Object.freeze(new FunCache.class(owner, cache));
    };
    (class FunCache {
      static {
        SpecializeHelpers.FunCache.class = this
      }
      constructor(owner, cache) {
        let tmp, tmp1;
        this.owner = owner;
        this.cache = cache;
        tmp = Option.Some(this.owner);
        tmp1 = Block.Printer(tmp);
        this.printer = tmp1;
      }
      static empty(owner) {
        let tmp;
        tmp = globalThis.Object.freeze(new globalThis.Map());
        return SpecializeHelpers.FunCache(owner, tmp)
      }
      getFun(k) {
        let scrut, tmp;
        scrut = runtime.safeCall(this.cache.has(k));
        if (scrut === true) {
          tmp = runtime.safeCall(this.cache.get(k));
          return Option.Some(tmp)
        }
        return Option.None;
      } 
      setFun(k, v) {
        let tmp;
        tmp = this.cache.set(k, v);
        return (tmp , v)
      } 
      toString() {
        let removeExtraValDefn, inlineAssigments, InlinePrinter1, inlineResult, paramList, decl, scrut, runtimeClass, scrut1, scrut2, scrut3, ps, extendsClause, scrut4, preCtor, ctor, scrut5, params, ctorBody, scrut6, scrut7, tmp, arg$ConcreteClassSymbol$2$, tmp1, arg$Some$0$, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, lambda, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, lambda1, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29;
        inlineResult = function inlineResult(ctx) {
          return (r) => {
            let tmp30;
            tmp30 = InlinePrinter1(ctx);
            return runtime.safeCall(tmp30.showResult(r))
          }
        };
        inlineAssigments = function inlineAssigments(ctx) {
          return (b) => {
            let res, rest, rhs, rest1, lhs, arg$Assign$0$, arg$Assign$1$, arg$Assign$2$, arg$Scoped$1$, arg$Return$0$, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37;
            if (b instanceof Block.Return.class) {
              arg$Return$0$ = b.res;
              res = arg$Return$0$;
              tmp30 = inlineResult(ctx);
              return runtime.safeCall(tmp30(res))
            } else if (b instanceof Block.Scoped.class) {
              arg$Scoped$1$ = b.rest;
              rest = arg$Scoped$1$;
              tmp31 = inlineAssigments(ctx);
              return runtime.safeCall(tmp31(rest))
            } else if (b instanceof Block.Assign.class) {
              arg$Assign$0$ = b.lhs;
              arg$Assign$1$ = b.rhs;
              arg$Assign$2$ = b.rest;
              rest1 = arg$Assign$2$;
              rhs = arg$Assign$1$;
              lhs = arg$Assign$0$;
              tmp32 = inlineResult(ctx);
              tmp33 = runtime.safeCall(tmp32(rhs));
              tmp34 = ctx.set(lhs, tmp33);
              tmp35 = inlineAssigments(tmp34);
              return runtime.safeCall(tmp35(rest1))
            } else if (b instanceof Block.End.class) {
              return ""
            }
            tmp36 = runtime.safeCall(b.toString());
            tmp37 = "unexpected Block type in constructor: " + tmp36;
            throw runtime.safeCall(globalThis.Error(tmp37));
          }
        };
        removeExtraValDefn = function removeExtraValDefn(params1, block) {
          let rhs, rest, scrut8, scrut9, rest1, dflt, arms, rhs1, rest2, lhs, defn, rest3, rest4, symbols, arg$Scoped$0$, arg$Scoped$1$, arg$Define$0$, arg$Define$1$, arg$Assign$0$, arg$Assign$1$, arg$Assign$2$, arg$Match$0$, arg$Match$1$, arg$Match$2$, arg$Match$3$, arg$ValDefn$0$, arg$ValDefn$2$, arg$ValueRef$0$, tmp30, tmp31, tmp32, tmp33;
          if (block instanceof Block.Define.class) {
            arg$Define$0$ = block.defn;
            arg$Define$1$ = block.rest;
            if (arg$Define$0$ instanceof Block.ValDefn.class) {
              arg$ValDefn$0$ = arg$Define$0$.owner;
              arg$ValDefn$2$ = arg$Define$0$.rhs;
              if (arg$ValDefn$0$ instanceof Option.Some.class) {
                if (arg$ValDefn$2$ instanceof Block.ValueRef.class) {
                  arg$ValueRef$0$ = arg$ValDefn$2$.l;
                  rest = arg$Define$1$;
                  rhs = arg$ValueRef$0$;
                  scrut8 = runtime.safeCall(params1.has(rhs));
                  if (scrut8 === true) {
                    return removeExtraValDefn(params1, rest)
                  }
                  rest3 = arg$Define$1$;
                  defn = arg$Define$0$;
                } else {
                  rest3 = arg$Define$1$;
                  defn = arg$Define$0$;
                }
              } else {
                rest3 = arg$Define$1$;
                defn = arg$Define$0$;
              }
            } else {
              rest3 = arg$Define$1$;
              defn = arg$Define$0$;
            }
            tmp33 = removeExtraValDefn(params1, rest3);
            return Block.Define(defn, tmp33)
          } else if (block instanceof Block.Match.class) {
            arg$Match$0$ = block.scrut;
            arg$Match$1$ = block.arms;
            arg$Match$2$ = block.dflt;
            arg$Match$3$ = block.rest;
            rest1 = arg$Match$3$;
            dflt = arg$Match$2$;
            arms = arg$Match$1$;
            scrut9 = arg$Match$0$;
            tmp30 = removeExtraValDefn(params1, rest1);
            return Block.Match(scrut9, arms, dflt, tmp30)
          } else if (block instanceof Block.Assign.class) {
            arg$Assign$0$ = block.lhs;
            arg$Assign$1$ = block.rhs;
            arg$Assign$2$ = block.rest;
            rest2 = arg$Assign$2$;
            rhs1 = arg$Assign$1$;
            lhs = arg$Assign$0$;
            tmp31 = removeExtraValDefn(params1, rest2);
            return Block.Assign(lhs, rhs1, tmp31)
          } else if (block instanceof Block.Scoped.class) {
            arg$Scoped$0$ = block.symbols;
            arg$Scoped$1$ = block.rest;
            rest4 = arg$Scoped$1$;
            symbols = arg$Scoped$0$;
            tmp32 = removeExtraValDefn(params1, rest4);
            return Block.Scoped(symbols, tmp32)
          }
          return block;
        };
        scrut = this.owner;
        if (scrut instanceof Block.ConcreteClassSymbol.class) {
          tmp = "class ";
        } else if (scrut instanceof Block.ModuleSymbol.class) {
          tmp = "module ";
        } else {
          throw globalThis.Object.freeze(new globalThis.Error("match error"))
        }
        decl = tmp;
        scrut1 = this.owner;
        if (scrut1 instanceof Block.ConcreteClassSymbol.class) {
          arg$ConcreteClassSymbol$2$ = scrut1.paramsOpt;
          if (arg$ConcreteClassSymbol$2$ instanceof Option.Some.class) {
            tmp1 = this.owner.value.class;
          } else {
            tmp1 = this.owner.value;
          }
        } else {
          tmp1 = this.owner.value;
        }
        runtimeClass = tmp1;
        scrut2 = this.owner;
        if (scrut2 instanceof Block.ConcreteClassSymbol.class) {
          scrut3 = this.owner.paramsOpt;
          if (scrut3 instanceof Option.Some.class) {
            arg$Some$0$ = scrut3.value;
            ps = arg$Some$0$;
            tmp2 = globalThis.Object.freeze([
              ps,
              ...this.owner.auxParams
            ]);
          } else {
            tmp2 = this.owner.auxParams;
          }
        } else if (scrut2 instanceof Block.ModuleSymbol.class) {
          tmp2 = globalThis.Object.freeze([]);
        } else {
          throw globalThis.Object.freeze(new globalThis.Error("match error"))
        }
        paramList = tmp2;
        const this$FunCache = this;
        InlinePrinter1 = function InlinePrinter(ctx) {
          return globalThis.Object.freeze(new InlinePrinter.class(ctx));
        };
        (class InlinePrinter extends Block.Printer.class {
          static {
            InlinePrinter1.class = this
          }
          constructor(ctx) {
            let tmp30;
            tmp30 = Option.Some(this$FunCache.owner);
            super(tmp30);
            this.#ctx = ctx;
          }
          #ctx;
          showPath(p) {
            let s, scrut8, name, qual, qual1, fld, qual2, fld1, s1, lit, arg$ValueLit$0$, arg$ValueRef$0$, arg$DynSelect$0$, arg$DynSelect$1$, arg$DynSelect$2$, arg$Select$0$, arg$Select$1$, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40;
            if (p instanceof Block.ValueRef.class) {
              arg$ValueRef$0$ = p.l;
              s = arg$ValueRef$0$;
              scrut8 = runtime.safeCall(this.#ctx.has(s));
              if (scrut8 === true) {
                return runtime.safeCall(this.#ctx.get(s))
              }
              s1 = arg$ValueRef$0$;
              return runtime.safeCall(this.showSymbol(s1));
            } else if (p instanceof Block.Select.class) {
              arg$Select$0$ = p.qual;
              arg$Select$1$ = p.name;
              name = arg$Select$1$;
              qual = arg$Select$0$;
              tmp30 = this.showPath(qual);
              tmp31 = tmp30 + ".";
              tmp32 = runtime.safeCall(this.showSymbol(name));
              return tmp31 + tmp32
            } else if (p instanceof Block.DynSelect.class) {
              arg$DynSelect$0$ = p.qual;
              arg$DynSelect$1$ = p.fld;
              arg$DynSelect$2$ = p.arrayIdx;
              switch (arg$DynSelect$2$) {
                case false:
                  fld = arg$DynSelect$1$;
                  qual1 = arg$DynSelect$0$;
                  tmp33 = this.showPath(qual1);
                  tmp34 = tmp33 + ".(";
                  tmp35 = this.showPath(fld);
                  tmp36 = tmp34 + tmp35;
                  return tmp36 + ")";
                case true:
                  fld1 = arg$DynSelect$1$;
                  qual2 = arg$DynSelect$0$;
                  tmp37 = this.showPath(qual2);
                  tmp38 = tmp37 + ".[";
                  tmp39 = this.showPath(fld1);
                  tmp40 = tmp38 + tmp39;
                  return tmp40 + "]";
              }
              throw globalThis.Object.freeze(new globalThis.Error("match error"))
            } else if (p instanceof Block.ValueLit.class) {
              arg$ValueLit$0$ = p.lit;
              lit = arg$ValueLit$0$;
              return runtime.safeCall(this.showLiteral(lit))
            }
            throw globalThis.Object.freeze(new globalThis.Error("match error"));
          }
          toString() { return runtime.render(this); }
          static [definitionMetadata] = ["class", "InlinePrinter", [null]]; 
        });
        scrut4 = this.owner;
        if (scrut4 instanceof Block.ConcreteClassSymbol.class) {
          tmp3 = runtime.safeCall(runtimeClass["preCtor$_instr"]());
          preCtor = tmp3.body;
          if (preCtor instanceof Block.Block) {
            tmp4 = globalThis.Object.freeze(new globalThis.Map());
            tmp5 = inlineAssigments(tmp4);
            tmp6 = runtime.safeCall(tmp5(preCtor));
          } else {
            tmp6 = runtime.assertFail("mlscript-compile/SpecializeHelpers.mls", "146");
          }
          tmp7 = tmp6;
        } else {
          tmp7 = "";
        }
        extendsClause = tmp7;
        scrut5 = this.owner;
        if (scrut5 instanceof Block.ConcreteClassSymbol.class) {
          tmp8 = "class$";
        } else {
          tmp8 = "";
        }
        tmp9 = tmp8 + "ctor$_instr";
        ctor = runtime.safeCall(runtimeClass[tmp9]());
        if (ctor instanceof Block.FunDefn.class) {
          tmp10 = runtime.safeCall(ctor.params.flat());
          lambda = (undefined, function (_0) {
            return _0.sym
          });
          tmp11 = runtime.safeCall(tmp10.map(lambda));
          params = globalThis.Object.freeze(new globalThis.Set(tmp11));
          ctorBody = removeExtraValDefn(params, ctor.body);
          tmp12 = decl + this.owner.name;
          tmp13 = runtime.safeCall(this.printer.showParamList(paramList));
          tmp14 = tmp12 + tmp13;
          scrut6 = Predef.equals(extendsClause, "");
          if (scrut6 === true) {
            tmp15 = "";
          } else {
            tmp15 = " extends " + extendsClause;
          }
          tmp16 = tmp14 + tmp15;
          scrut7 = Predef.equals(this.cache.length, 0);
          if (scrut7 === true) {
            tmp17 = "";
          } else {
            tmp17 = " with";
          }
          tmp18 = tmp16 + tmp17;
          tmp19 = runtime.safeCall(this.printer.showBlock(ctorBody));
          tmp20 = "\n" + tmp19;
          tmp21 = Block.indent(tmp20);
          tmp22 = tmp18 + tmp21;
          tmp23 = runtime.safeCall(this.cache.values());
          lambda1 = (undefined, function (p) {
            return runtime.safeCall(this$FunCache.printer.showDefn(p[0]))
          });
          tmp24 = runtime.safeCall(tmp23.map(lambda1));
          tmp25 = runtime.safeCall(tmp24.toArray());
          tmp26 = runtime.safeCall(tmp25.sort());
          tmp27 = runtime.safeCall(tmp26.join("\n"));
          tmp28 = "\n" + tmp27;
          tmp29 = Block.indent(tmp28);
          return tmp22 + tmp29
        }
        return runtime.assertFail("mlscript-compile/SpecializeHelpers.mls", "160");
      }
      [prettyPrint]() { return this.toString(); }
      static [definitionMetadata] = ["class", "FunCache", ["owner", "cache"]]; 
    });
    this.SplitResult = function SplitResult(knownMap, unkShape) {
      return globalThis.Object.freeze(new SplitResult.class(knownMap, unkShape));
    };
    (class SplitResult {
      static {
        SpecializeHelpers.SplitResult.class = this
      }
      constructor(knownMap, unkShape) {
        this.knownMap = knownMap;
        this.unkShape = unkShape;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "SplitResult", ["knownMap", "unkShape"]]; 
    });
    this.ValueCollection = function ValueCollection(defn) {
      return globalThis.Object.freeze(new ValueCollection.class(defn));
    };
    (class ValueCollection extends Block.Printer.class {
      static {
        SpecializeHelpers.ValueCollection.class = this
      }
      constructor(defn) {
        super(Option.None);
        this.#defn = defn;
      }
      #defn;
      showSymbol(s) {
        let tmp;
        split_root$: {
          if (s instanceof Block.ConcreteClassSymbol.class) {} else if (s instanceof Block.ModuleSymbol.class) {} else {
            break split_root$
          }
          tmp = SpecializeHelpers.getActualClass(s.value);
          this.#defn.set(tmp, s);
        }
        return ""
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "ValueCollection", [null]]; 
    });
  }
  static sorInstantiate_sorCall_sor_prop_specializeCtor(id, param0, param1, param2, param3, param4) {
    loopLabel: while (true) {
      switch (id) {
        case 0:
          let clsSymb, symb, symb1, argsShape, scrut, cache, scrut1, res, arg$Select$1$, arg$ValueRef$0$, tmp, tmp1, tmp2, lambda, tmp3, tmp4, tmp5, tmp6, ctx;
          ctx = param0;
          split_root$: {
            if (param2 instanceof Block.ValueRef.class) {
              arg$ValueRef$0$ = param2.l;
              symb = arg$ValueRef$0$;
              if (symb instanceof Block.ConcreteClassSymbol.class) {
                tmp = symb;
                break split_root$
              }
            } else if (param2 instanceof Block.Select.class) {
              arg$Select$1$ = param2.name;
              symb1 = arg$Select$1$;
              if (symb1 instanceof Block.ConcreteClassSymbol.class) {
                tmp = symb1;
                break split_root$
              }
            }
            tmp1 = runtime.safeCall(param2.toString());
            tmp2 = "Instantiate with non-ClassSymbol in shape propagation: " + tmp1;
            throw runtime.safeCall(globalThis.Error(tmp2));
          }
          clsSymb = tmp;
          lambda = (undefined, function (a) {
            return SpecializeHelpers.sop(ctx, a.value)
          });
          argsShape = runtime.safeCall(param3.map(lambda));
          scrut = SpecializeHelpers.isStagedClass(clsSymb.value);
          if (scrut === true) {
            cache = SpecializeHelpers.getClassCache(clsSymb.value);
            if (cache === undefined) {
              tmp3 = true;
            } else {
              tmp3 = false;
            }
            scrut1 = ! tmp3;
            if (scrut1 === true) {
              res = SpecializeHelpers1.specializeCtor(clsSymb, argsShape, ctx.clearCtx);
              tmp4 = Block.End();
              return globalThis.Object.freeze([
                tmp4,
                param1,
                res
              ])
            }
            throw runtime.safeCall(globalThis.Error("cache not found in staged class"));
          }
          tmp5 = Block.End();
          tmp6 = ShapeSet.mkClass(clsSymb, argsShape);
          return globalThis.Object.freeze([
            tmp5,
            param1,
            tmp6
          ]);
        case 1:
          let scrut2, litArg, recovered, p, scrut3, arr, e, arr2, scrut4, clsSymb1, clsSymb2, scrut5, cache1, scrut6, res1, symb2, name, redir, fld, value, mapPropName, genMap, scrut7, f_gen, scrut8, res2, scrut9, v2p, scrut10, f_imp, evaluated, evaluated_path, arg$Select$0$, arg$Select$1$1, arg$ValueRef$0$1, arg$ModuleSymbol$0$, arg$ModuleSymbol$1$, arg$ModuleSymbol$2$, arg$Symbol$0$, arg$ValueRef$0$2, arg$Select$0$1, arg$Select$1$2, arg$ValueRef$0$3, arg$Symbol$0$1, arg$ModuleSymbol$0$1, arg$Symbol$0$2, element1$, element0$, arg$Arg$0$, arg$Arg$0$1, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, element0$1, arg$Arr$0$, element0$2, element0$3, arg$Arr$0$1, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39;
          split_1$: {
            split_2$: {
              split_3$: {
                if (param2 instanceof Block.Select.class) {
                  arg$Select$0$ = param2.qual;
                  arg$Select$1$1 = param2.name;
                  if (arg$Select$0$ instanceof Block.Select.class) {
                    arg$Select$0$1 = arg$Select$0$.qual;
                    arg$Select$1$2 = arg$Select$0$.name;
                    if (arg$Select$0$1 instanceof Block.ValueRef.class) {
                      arg$ValueRef$0$3 = arg$Select$0$1.l;
                      if (arg$ValueRef$0$3 instanceof Block.Symbol.class) {
                        arg$Symbol$0$1 = arg$ValueRef$0$3.name;
                        if (arg$Symbol$0$1 === "runtime") {
                          if (arg$Select$1$2 instanceof Block.Symbol.class) {
                            arg$Symbol$0$2 = arg$Select$1$2.name;
                            if (arg$Symbol$0$2 === "Tuple") {
                              if (arg$Select$1$1 instanceof Block.Symbol.class) {
                                arg$Symbol$0$ = arg$Select$1$1.name;
                                switch (arg$Symbol$0$) {
                                  case "get":
                                    if (runtime.Tuple.isArrayLike(param3) && param3.length === 2) {
                                      element0$ = runtime.Tuple.get(param3, 0);
                                      element1$ = runtime.Tuple.get(param3, 1);
                                      if (element0$ instanceof Block.Arg.class) {
                                        arg$Arg$0$ = element0$.value;
                                        if (element1$ instanceof Block.Arg.class) {
                                          arg$Arg$0$1 = element1$.value;
                                          litArg = arg$Arg$0$1;
                                          scrut2 = arg$Arg$0$;
                                          recovered = Block.DynSelect(scrut2, litArg, false);
                                          tmp7 = Block.End();
                                          tmp8 = SpecializeHelpers.sop(param0, recovered);
                                          return globalThis.Object.freeze([
                                            tmp7,
                                            recovered,
                                            tmp8
                                          ])
                                        }
                                        break split_1$;
                                      }
                                      break split_1$;
                                    }
                                    break split_1$;
                                  case "slice":
                                    throw runtime.safeCall(globalThis.Error("runtime.Tuple.slice not handled in shape propagation"));
                                  case "concat":
                                    p = arg$Select$0$;
                                    break split_2$;
                                }
                                break split_1$
                              }
                              break split_1$;
                            }
                            if (arg$Select$1$1 instanceof Block.Symbol.class) {
                              arg$Symbol$0$ = arg$Select$1$1.name;
                              if (arg$Symbol$0$ === "concat") {
                                p = arg$Select$0$;
                                break split_2$
                              }
                              break split_1$;
                            }
                            break split_1$;
                          }
                          if (arg$Select$1$1 instanceof Block.Symbol.class) {
                            arg$Symbol$0$ = arg$Select$1$1.name;
                            if (arg$Symbol$0$ === "concat") {
                              p = arg$Select$0$;
                              break split_2$
                            }
                            break split_1$;
                          }
                          break split_1$;
                        }
                        if (arg$Select$1$1 instanceof Block.Symbol.class) {
                          arg$Symbol$0$ = arg$Select$1$1.name;
                          if (arg$Symbol$0$ === "concat") {
                            p = arg$Select$0$;
                            break split_2$
                          }
                          if (arg$Symbol$0$1 === "globalThis") {
                            if (arg$Select$1$2 instanceof Block.ModuleSymbol.class) {
                              arg$ModuleSymbol$0$1 = arg$Select$1$2.name;
                              if (arg$ModuleSymbol$0$1 === "Math") {
                                switch (arg$Symbol$0$) {
                                  case "sin":
                                    break;
                                  case "cos":
                                    break;
                                  default:
                                    break split_1$;
                                }
                              } else {
                                break split_1$
                              }
                            } else {
                              break split_1$
                            }
                          } else {
                            break split_1$
                          }
                        } else {
                          if (arg$Symbol$0$1 === "globalThis") {
                            if (arg$Select$1$2 instanceof Block.ModuleSymbol.class) {
                              arg$ModuleSymbol$0$1 = arg$Select$1$2.name;
                              if (arg$ModuleSymbol$0$1 === "Math") {
                                break split_1$
                              }
                              break split_1$;
                            }
                            break split_1$;
                          }
                          break split_1$;
                        }
                      } else {
                        if (arg$Select$1$1 instanceof Block.Symbol.class) {
                          arg$Symbol$0$ = arg$Select$1$1.name;
                          if (arg$Symbol$0$ === "concat") {
                            p = arg$Select$0$;
                            break split_2$
                          }
                          break split_1$;
                        }
                        break split_1$;
                      }
                    } else {
                      if (arg$Select$1$1 instanceof Block.Symbol.class) {
                        arg$Symbol$0$ = arg$Select$1$1.name;
                        if (arg$Symbol$0$ === "concat") {
                          p = arg$Select$0$;
                          break split_2$
                        }
                        break split_1$;
                      }
                      break split_1$;
                    }
                  } else {
                    if (arg$Select$1$1 instanceof Block.Symbol.class) {
                      arg$Symbol$0$ = arg$Select$1$1.name;
                      if (arg$Symbol$0$ === "concat") {
                        p = arg$Select$0$;
                        break split_2$
                      }
                      if (arg$Select$0$ instanceof Block.ValueRef.class) {
                        arg$ValueRef$0$1 = arg$Select$0$.l;
                        if (arg$ValueRef$0$1 instanceof Block.ModuleSymbol.class) {
                          arg$ModuleSymbol$0$ = arg$ValueRef$0$1.name;
                          arg$ModuleSymbol$1$ = arg$ValueRef$0$1.value;
                          arg$ModuleSymbol$2$ = arg$ValueRef$0$1.redirect;
                          clsSymb1 = arg$Select$1$1;
                          if (clsSymb1 instanceof Block.ConcreteClassSymbol.class) {} else {
                            fld = arg$Symbol$0$;
                            redir = arg$ModuleSymbol$2$;
                            value = arg$ModuleSymbol$1$;
                            name = arg$ModuleSymbol$0$;
                            mapPropName = SpecializeHelpers.getGenMapName(name, false);
                            SpecializeHelpers.getCacheName(name, false);
                            genMap = value[mapPropName];
                            if (genMap === undefined) {
                              tmp9 = true;
                            } else {
                              tmp9 = false;
                            }
                            scrut7 = ! tmp9;
                            if (scrut7 === true) {
                              f_gen = runtime.safeCall(genMap.get(fld));
                              if (f_gen instanceof Runtime.Unit.class) {
                                tmp10 = true;
                              } else {
                                tmp10 = false;
                              }
                              scrut8 = ! tmp10;
                              if (scrut8 === true) {
                                res2 = runtime.safeCall(f_gen(...param4));
                                scrut9 = ShapeSet.staticSet(res2[1]);
                                if (scrut9 === true) {
                                  tmp11 = ShapeSet.valOfSet(res2[1]);
                                  v2p = ShapeSet.val2path(tmp11, param0.allocs, param0.valueNameCtx);
                                  return globalThis.Object.freeze([
                                    v2p[0],
                                    v2p[1],
                                    res2[1]
                                  ])
                                }
                                tmp12 = Block.End();
                                tmp13 = Block.ModuleSymbol(name, value, redir);
                                tmp14 = Block.ValueRef(tmp13);
                                tmp15 = Block.Symbol(res2[0]);
                                tmp16 = Block.Select(tmp14, tmp15);
                                tmp17 = Block.Call(tmp16, param3);
                                return globalThis.Object.freeze([
                                  tmp12,
                                  tmp17,
                                  res2[1]
                                ]);
                              }
                              tmp18 = "module " + name;
                              tmp19 = tmp18 + " is staged but function ";
                              tmp20 = tmp19 + fld;
                              tmp21 = tmp20 + " is not found in generator map";
                              throw runtime.safeCall(globalThis.Error(tmp21));
                            }
                            scrut10 = runtime.safeCall(param4.every(ShapeSet.staticSet));
                            if (scrut10 === true) {
                              f_imp = value[fld];
                              tmp22 = runtime.safeCall(param4.map(ShapeSet.valOfSet));
                              evaluated = runtime.safeCall(f_imp(...tmp22));
                              evaluated_path = ShapeSet.val2path(evaluated, param0.allocs, param0.valueNameCtx);
                              tmp23 = SpecializeHelpers.sov(evaluated, param0.valueNameCtx);
                              return globalThis.Object.freeze([
                                evaluated_path[0],
                                evaluated_path[1],
                                tmp23
                              ])
                            }
                            break split_3$;
                          }
                        } else {
                          break split_1$
                        }
                      } else {
                        break split_1$
                      }
                    } else {
                      if (arg$Select$0$ instanceof Block.ValueRef.class) {
                        arg$ValueRef$0$1 = arg$Select$0$.l;
                        if (arg$ValueRef$0$1 instanceof Block.ModuleSymbol.class) {
                          arg$ModuleSymbol$0$ = arg$ValueRef$0$1.name;
                          arg$ModuleSymbol$1$ = arg$ValueRef$0$1.value;
                          arg$ModuleSymbol$2$ = arg$ValueRef$0$1.redirect;
                          clsSymb1 = arg$Select$1$1;
                          if (clsSymb1 instanceof Block.ConcreteClassSymbol.class) {} else {
                            break split_1$
                          }
                        } else {
                          break split_1$
                        }
                      } else {
                        break split_1$
                      }
                    }
                    tmp28 = Block.End();
                    tmp29 = ShapeSet.mkClass(clsSymb1, param4);
                    return globalThis.Object.freeze([
                      tmp28,
                      param1,
                      tmp29
                    ])
                  }
                } else if (param2 instanceof Block.ValueRef.class) {
                  arg$ValueRef$0$2 = param2.l;
                  clsSymb2 = arg$ValueRef$0$2;
                  if (clsSymb2 instanceof Block.ConcreteClassSymbol.class) {
                    scrut5 = SpecializeHelpers.isStagedClass(clsSymb2.value);
                    if (scrut5 === true) {
                      cache1 = SpecializeHelpers.getClassCache(clsSymb2.value);
                      if (cache1 === undefined) {
                        tmp24 = true;
                      } else {
                        tmp24 = false;
                      }
                      scrut6 = ! tmp24;
                      if (scrut6 === true) {
                        res1 = SpecializeHelpers1.specializeCtor(clsSymb2, param4, param0.clearCtx);
                        tmp25 = Block.End();
                        return globalThis.Object.freeze([
                          tmp25,
                          param1,
                          res1
                        ])
                      }
                      throw runtime.safeCall(globalThis.Error("class is staged but cache not found"));
                    }
                    tmp26 = Block.End();
                    tmp27 = ShapeSet.mkClass(clsSymb2, param4);
                    return globalThis.Object.freeze([
                      tmp26,
                      param1,
                      tmp27
                    ]);
                  }
                  symb2 = arg$ValueRef$0$2;
                  return SpecializeHelpers.sorBuiltinOp(param0, param1, param2, symb2.name, param3);
                } else {
                  break split_1$
                }
              }
              tmp30 = Block.End();
              tmp31 = ShapeSet.mkDyn();
              return globalThis.Object.freeze([
                tmp30,
                param1,
                tmp31
              ]);
            }
            tmp32 = SpecializeHelpers.sop(param0, p);
            scrut3 = runtime.safeCall(tmp32.values());
            if (runtime.Tuple.isArrayLike(scrut3) && scrut3.length === 1) {
              element0$1 = runtime.Tuple.get(scrut3, 0);
              if (element0$1 instanceof Shape.Arr.class) {
                arg$Arr$0$ = element0$1.shapes;
                arr = arg$Arr$0$;
                if (runtime.Tuple.isArrayLike(param3) && param3.length === 1) {
                  element0$2 = runtime.Tuple.get(param3, 0);
                  e = element0$2;
                  scrut4 = SpecializeHelpers.sop(param0, e.value);
                  if (runtime.Tuple.isArrayLike(scrut4) && scrut4.length === 1) {
                    element0$3 = runtime.Tuple.get(scrut4, 0);
                    if (element0$3 instanceof Shape.Arr.class) {
                      arg$Arr$0$1 = element0$3.shapes;
                      arr2 = arg$Arr$0$1;
                      tmp33 = Block.End();
                      tmp34 = runtime.safeCall(arr.concat(arr2));
                      tmp35 = ShapeSet.mkArr(tmp34);
                      return globalThis.Object.freeze([
                        tmp33,
                        param1,
                        tmp35
                      ])
                    }
                  }
                }
              }
            }
            tmp36 = Block.End();
            tmp37 = ShapeSet.mkDyn();
            return globalThis.Object.freeze([
              tmp36,
              param1,
              tmp37
            ]);
          }
          tmp38 = runtime.safeCall(param1.toString());
          tmp39 = "unknown call in sor: " + tmp38;
          throw runtime.safeCall(globalThis.Error(tmp39));
        case 2:
          let s, scrut11, blk, res3, scrut12, cls, args, elems, f, args1, arg$Call$0$, arg$Call$1$, arg$Tuple$0$, arg$Instantiate$0$, arg$Instantiate$1$, element1$1, element0$4, tmp40, tmp41, tmp42, tmp43, lambda1, tmp44, tmp45, lambda2, tmp46, tmp47, tmp48, ctx1;
          ctx1 = param0;
          if (param1 instanceof Block.Path) {
            s = SpecializeHelpers.sop(ctx1, param1);
            scrut11 = ShapeSet.staticSet(s);
            if (scrut11 === true) {
              tmp40 = ShapeSet.valOfSet(s);
              scrut12 = ShapeSet.val2path(tmp40, ctx1.allocs, ctx1.valueNameCtx);
              if (runtime.Tuple.isArrayLike(scrut12) && scrut12.length === 2) {
                element0$4 = runtime.Tuple.get(scrut12, 0);
                element1$1 = runtime.Tuple.get(scrut12, 1);
                res3 = element1$1;
                blk = element0$4;
                return globalThis.Object.freeze([
                  blk,
                  res3,
                  s
                ])
              }
              tmp41 = Block.End();
              return globalThis.Object.freeze([
                tmp41,
                param1,
                s
              ]);
            }
            tmp42 = Block.End();
            return globalThis.Object.freeze([
              tmp42,
              param1,
              s
            ]);
          } else if (param1 instanceof Block.Instantiate.class) {
            arg$Instantiate$0$ = param1.cls;
            arg$Instantiate$1$ = param1.args;
            args = arg$Instantiate$1$;
            cls = arg$Instantiate$0$;
            param0 = ctx1;
            param2 = cls;
            param3 = args;
            id = 0;
            continue loopLabel
          } else if (param1 instanceof Block.Tuple.class) {
            arg$Tuple$0$ = param1.elems;
            elems = arg$Tuple$0$;
            tmp43 = Block.End();
            lambda1 = (undefined, function (a) {
              return SpecializeHelpers.sop(ctx1, a.value)
            });
            tmp44 = runtime.safeCall(elems.map(lambda1));
            tmp45 = ShapeSet.mkArr(tmp44);
            return globalThis.Object.freeze([
              tmp43,
              param1,
              tmp45
            ])
          } else if (param1 instanceof Block.Call.class) {
            arg$Call$0$ = param1._fun;
            arg$Call$1$ = param1.args;
            args1 = arg$Call$1$;
            f = arg$Call$0$;
            lambda2 = (undefined, function (a, _, _1) {
              return SpecializeHelpers.sop(ctx1, a.value)
            });
            tmp46 = runtime.safeCall(args1.map(lambda2));
            param0 = ctx1;
            param2 = f;
            param3 = args1;
            param4 = tmp46;
            id = 1;
            continue loopLabel
          }
          tmp47 = runtime.safeCall(param1.toString());
          tmp48 = "unknown result in sor: " + tmp47;
          throw runtime.safeCall(globalThis.Error(tmp48));
        case 3:
          let mergeAssigned, propBranch, f1, implct, p1, args2, symb3, scrut13, scrut14, res4, implct1, blk1, s1, r1, scrut15, rest, symbols, newAllocs, newCtx, res5, x, f2, restBlock, p2, args3, symb4, res6, b2, scrut16, res7, b21, restBlock1, sym, opt, rhs, scrut17, blk2, s11, r11, scrut18, b22, s2, canReachEnd, x1, restBlock2, r, scrut19, blk3, s12, r12, scrut20, b23, s21, canReachEnd1, restBlock3, dflt, arms, p3, s3, filteredArms, dfltRes, scrut21, d, res8, canReachEnd2, scrut22, restRes, retShape, scrut23, d1, scrut24, scrut25, d2, dcanReachEnd, scrut26, scrut27, scrut28, arg$Match$0$, arg$Match$1$, arg$Match$2$, arg$Match$3$, arg$Assign$0$, arg$Assign$1$, arg$Assign$2$, element2$, element1$2, element0$5, element2$1, element1$3, element0$6, arg$Define$0$, arg$Define$1$, arg$ValDefn$0$, arg$ValDefn$1$, arg$ValDefn$2$, element2$2, element1$4, element0$7, element2$3, element1$5, element0$8, arg$Call$0$1, arg$Call$1$1, arg$Select$0$2, arg$Select$1$3, arg$Symbol$0$3, arg$Select$0$3, arg$ValueRef$0$4, arg$ValueRef$0$5, arg$Scoped$0$, arg$Scoped$1$, arg$Return$0$, arg$Return$1$, element2$4, element1$6, element0$9, arg$Call$0$2, arg$Call$1$2, arg$Select$0$4, arg$Select$1$4, arg$Symbol$0$4, arg$Select$0$5, arg$ValueRef$0$6, arg$ValueRef$0$7, tmp49, tmp50, tmp51, lambda3, tmp52, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, tmp74, tmp75, tmp76, tmp77, tmp78, tmp79, tmp80, lambda4, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, arg$Some$0$, tmp89, tmp90, tmp91, tmp92, tmp93, lambda5, tmp94, arg$Some$0$1, tmp95, tmp96, arg$Some$0$2, arg$Some$0$3, arg$Some$0$4, tmp97, tmp98, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104, tmp105, tmp106, tmp107, tmp108, ctx2;
          ctx2 = param0;
          split_1$1: {
            split_2$1: {
              split_3$1: {
                if (param1 instanceof Block.End.class) {
                  tmp49 = ShapeSet.mkBot();
                  return globalThis.Object.freeze([
                    param1,
                    tmp49,
                    true
                  ])
                } else if (param1 instanceof Block.Return.class) {
                  arg$Return$0$ = param1.res;
                  arg$Return$1$ = param1.implct;
                  if (arg$Return$0$ instanceof Block.Call.class) {
                    arg$Call$0$2 = arg$Return$0$._fun;
                    arg$Call$1$2 = arg$Return$0$.args;
                    if (arg$Call$0$2 instanceof Block.Select.class) {
                      arg$Select$0$4 = arg$Call$0$2.qual;
                      arg$Select$1$4 = arg$Call$0$2.name;
                      if (arg$Select$1$4 instanceof Block.Symbol.class) {
                        arg$Symbol$0$4 = arg$Select$1$4.name;
                        implct = arg$Return$1$;
                        args2 = arg$Call$1$2;
                        f1 = arg$Symbol$0$4;
                        p1 = arg$Select$0$4;
                        if (f1 === "concat") {
                          tmp50 = true;
                        } else {
                          tmp50 = false;
                        }
                        scrut14 = ! tmp50;
                        if (scrut14 === true) {
                          if (p1 instanceof Block.ValueRef.class) {
                            arg$ValueRef$0$7 = p1.l;
                            symb3 = arg$ValueRef$0$7;
                            if (symb3 instanceof Block.ModuleSymbol.class) {
                              tmp51 = true;
                            } else {
                              tmp51 = false;
                            }
                            scrut13 = ! tmp51;
                            if (scrut13 === true) {
                              break split_1$1
                            }
                            implct1 = arg$Return$1$;
                            res4 = arg$Return$0$;
                            scrut15 = SpecializeHelpers.sor(ctx2, res4);
                            if (runtime.Tuple.isArrayLike(scrut15) && scrut15.length === 3) {
                              element0$9 = runtime.Tuple.get(scrut15, 0);
                              element1$6 = runtime.Tuple.get(scrut15, 1);
                              element2$4 = runtime.Tuple.get(scrut15, 2);
                              s1 = element2$4;
                              r1 = element1$6;
                              blk1 = element0$9;
                              break split_2$1
                            }
                          } else if (p1 instanceof Block.Select.class) {
                            arg$Select$0$5 = p1.qual;
                            if (arg$Select$0$5 instanceof Block.ValueRef.class) {
                              arg$ValueRef$0$6 = arg$Select$0$5.l;
                              if (arg$ValueRef$0$6 instanceof Block.ConcreteClassSymbol.class) {
                                break split_1$1
                              }
                              implct1 = arg$Return$1$;
                              res4 = arg$Return$0$;
                              scrut15 = SpecializeHelpers.sor(ctx2, res4);
                              if (runtime.Tuple.isArrayLike(scrut15) && scrut15.length === 3) {
                                element0$9 = runtime.Tuple.get(scrut15, 0);
                                element1$6 = runtime.Tuple.get(scrut15, 1);
                                element2$4 = runtime.Tuple.get(scrut15, 2);
                                s1 = element2$4;
                                r1 = element1$6;
                                blk1 = element0$9;
                                break split_2$1
                              }
                            } else {
                              implct1 = arg$Return$1$;
                              res4 = arg$Return$0$;
                              scrut15 = SpecializeHelpers.sor(ctx2, res4);
                              if (runtime.Tuple.isArrayLike(scrut15) && scrut15.length === 3) {
                                element0$9 = runtime.Tuple.get(scrut15, 0);
                                element1$6 = runtime.Tuple.get(scrut15, 1);
                                element2$4 = runtime.Tuple.get(scrut15, 2);
                                s1 = element2$4;
                                r1 = element1$6;
                                blk1 = element0$9;
                                break split_2$1
                              }
                            }
                          } else {
                            implct1 = arg$Return$1$;
                            res4 = arg$Return$0$;
                            scrut15 = SpecializeHelpers.sor(ctx2, res4);
                            if (runtime.Tuple.isArrayLike(scrut15) && scrut15.length === 3) {
                              element0$9 = runtime.Tuple.get(scrut15, 0);
                              element1$6 = runtime.Tuple.get(scrut15, 1);
                              element2$4 = runtime.Tuple.get(scrut15, 2);
                              s1 = element2$4;
                              r1 = element1$6;
                              blk1 = element0$9;
                              break split_2$1
                            }
                          }
                        } else {
                          implct1 = arg$Return$1$;
                          res4 = arg$Return$0$;
                          scrut15 = SpecializeHelpers.sor(ctx2, res4);
                          if (runtime.Tuple.isArrayLike(scrut15) && scrut15.length === 3) {
                            element0$9 = runtime.Tuple.get(scrut15, 0);
                            element1$6 = runtime.Tuple.get(scrut15, 1);
                            element2$4 = runtime.Tuple.get(scrut15, 2);
                            s1 = element2$4;
                            r1 = element1$6;
                            blk1 = element0$9;
                            break split_2$1
                          }
                        }
                      } else {
                        implct1 = arg$Return$1$;
                        res4 = arg$Return$0$;
                        scrut15 = SpecializeHelpers.sor(ctx2, res4);
                        if (runtime.Tuple.isArrayLike(scrut15) && scrut15.length === 3) {
                          element0$9 = runtime.Tuple.get(scrut15, 0);
                          element1$6 = runtime.Tuple.get(scrut15, 1);
                          element2$4 = runtime.Tuple.get(scrut15, 2);
                          s1 = element2$4;
                          r1 = element1$6;
                          blk1 = element0$9;
                          break split_2$1
                        }
                      }
                    } else {
                      implct1 = arg$Return$1$;
                      res4 = arg$Return$0$;
                      scrut15 = SpecializeHelpers.sor(ctx2, res4);
                      if (runtime.Tuple.isArrayLike(scrut15) && scrut15.length === 3) {
                        element0$9 = runtime.Tuple.get(scrut15, 0);
                        element1$6 = runtime.Tuple.get(scrut15, 1);
                        element2$4 = runtime.Tuple.get(scrut15, 2);
                        s1 = element2$4;
                        r1 = element1$6;
                        blk1 = element0$9;
                        break split_2$1
                      }
                    }
                  } else {
                    implct1 = arg$Return$1$;
                    res4 = arg$Return$0$;
                    scrut15 = SpecializeHelpers.sor(ctx2, res4);
                    if (runtime.Tuple.isArrayLike(scrut15) && scrut15.length === 3) {
                      element0$9 = runtime.Tuple.get(scrut15, 0);
                      element1$6 = runtime.Tuple.get(scrut15, 1);
                      element2$4 = runtime.Tuple.get(scrut15, 2);
                      s1 = element2$4;
                      r1 = element1$6;
                      blk1 = element0$9;
                      break split_2$1
                    }
                  }
                } else if (param1 instanceof Block.Scoped.class) {
                  arg$Scoped$0$ = param1.symbols;
                  arg$Scoped$1$ = param1.rest;
                  rest = arg$Scoped$1$;
                  symbols = arg$Scoped$0$;
                  lambda3 = (undefined, function (x2) {
                    let tmp109, tmp110;
                    tmp109 = Block.ValueRef(x2);
                    tmp110 = ShapeSet.mkBot();
                    return ctx2.add(tmp109, tmp110)
                  });
                  runtime.safeCall(symbols.forEach(lambda3));
                  newAllocs = [];
                  tmp52 = globalThis.Object.freeze(new globalThis.Map(ctx2.ctx));
                  newCtx = SpecializeHelpers.Ctx(tmp52, ctx2.valueNameCtx, ctx2.valDefnCtx, newAllocs, ctx2.thisShape);
                  res5 = SpecializeHelpers.prop(newCtx, rest);
                  tmp53 = globalThis.Object.freeze([
                    ...symbols,
                    ...newAllocs
                  ]);
                  tmp54 = SpecializeHelpers.wrapScoped(tmp53, res5[0]);
                  return globalThis.Object.freeze([
                    tmp54,
                    res5[1],
                    res5[2]
                  ])
                } else if (param1 instanceof Block.Assign.class) {
                  arg$Assign$0$ = param1.lhs;
                  arg$Assign$1$ = param1.rhs;
                  arg$Assign$2$ = param1.rest;
                  if (arg$Assign$1$ instanceof Block.Call.class) {
                    arg$Call$0$1 = arg$Assign$1$._fun;
                    arg$Call$1$1 = arg$Assign$1$.args;
                    if (arg$Call$0$1 instanceof Block.Select.class) {
                      arg$Select$0$2 = arg$Call$0$1.qual;
                      arg$Select$1$3 = arg$Call$0$1.name;
                      if (arg$Select$1$3 instanceof Block.Symbol.class) {
                        arg$Symbol$0$3 = arg$Select$1$3.name;
                        restBlock = arg$Assign$2$;
                        args3 = arg$Call$1$1;
                        f2 = arg$Symbol$0$3;
                        p2 = arg$Select$0$2;
                        x = arg$Assign$0$;
                        if (p2 instanceof Block.ValueRef.class) {
                          arg$ValueRef$0$5 = p2.l;
                          symb4 = arg$ValueRef$0$5;
                          if (symb4 instanceof Block.ModuleSymbol.class) {
                            tmp55 = true;
                          } else {
                            tmp55 = false;
                          }
                          scrut16 = ! tmp55;
                          if (scrut16 === true) {
                            tmp56 = Option.Some(x);
                            res6 = SpecializeHelpers.dispatchMethodCall(ctx2, tmp56, Option.None, p2, f2, args3);
                            tmp57 = Block.ValueRef(x);
                            tmp58 = ctx2.add(tmp57, res6[1]);
                            b2 = SpecializeHelpers.prop(tmp58, restBlock);
                            tmp59 = Block.concat(res6[0], b2[0]);
                            return globalThis.Object.freeze([
                              tmp59,
                              b2[1],
                              b2[2]
                            ])
                          }
                          restBlock2 = arg$Assign$2$;
                          r = arg$Assign$1$;
                          x1 = arg$Assign$0$;
                          scrut19 = SpecializeHelpers.sor(ctx2, r);
                          if (runtime.Tuple.isArrayLike(scrut19) && scrut19.length === 3) {
                            element0$5 = runtime.Tuple.get(scrut19, 0);
                            element1$2 = runtime.Tuple.get(scrut19, 1);
                            element2$ = runtime.Tuple.get(scrut19, 2);
                            s12 = element2$;
                            r12 = element1$2;
                            blk3 = element0$5;
                            tmp60 = Block.ValueRef(x1);
                            tmp61 = ctx2.add(tmp60, s12);
                            scrut20 = SpecializeHelpers.prop(tmp61, restBlock2);
                            if (runtime.Tuple.isArrayLike(scrut20) && scrut20.length === 3) {
                              element0$6 = runtime.Tuple.get(scrut20, 0);
                              element1$3 = runtime.Tuple.get(scrut20, 1);
                              element2$1 = runtime.Tuple.get(scrut20, 2);
                              canReachEnd1 = element2$1;
                              s21 = element1$3;
                              b23 = element0$6;
                            } else {
                              break split_3$1
                            }
                          } else {
                            break split_3$1
                          }
                        } else if (p2 instanceof Block.Select.class) {
                          arg$Select$0$3 = p2.qual;
                          if (arg$Select$0$3 instanceof Block.ValueRef.class) {
                            arg$ValueRef$0$4 = arg$Select$0$3.l;
                            if (arg$ValueRef$0$4 instanceof Block.ConcreteClassSymbol.class) {
                              tmp62 = Option.Some(x);
                              res7 = SpecializeHelpers.dispatchMethodCall(ctx2, tmp62, Option.None, p2, f2, args3);
                              tmp63 = Block.ValueRef(x);
                              tmp64 = ctx2.add(tmp63, res7[1]);
                              b21 = SpecializeHelpers.prop(tmp64, restBlock);
                              tmp65 = Block.concat(res7[0], b21[0]);
                              return globalThis.Object.freeze([
                                tmp65,
                                b21[1],
                                b21[2]
                              ])
                            }
                            restBlock2 = arg$Assign$2$;
                            r = arg$Assign$1$;
                            x1 = arg$Assign$0$;
                            scrut19 = SpecializeHelpers.sor(ctx2, r);
                            if (runtime.Tuple.isArrayLike(scrut19) && scrut19.length === 3) {
                              element0$5 = runtime.Tuple.get(scrut19, 0);
                              element1$2 = runtime.Tuple.get(scrut19, 1);
                              element2$ = runtime.Tuple.get(scrut19, 2);
                              s12 = element2$;
                              r12 = element1$2;
                              blk3 = element0$5;
                              tmp66 = Block.ValueRef(x1);
                              tmp67 = ctx2.add(tmp66, s12);
                              scrut20 = SpecializeHelpers.prop(tmp67, restBlock2);
                              if (runtime.Tuple.isArrayLike(scrut20) && scrut20.length === 3) {
                                element0$6 = runtime.Tuple.get(scrut20, 0);
                                element1$3 = runtime.Tuple.get(scrut20, 1);
                                element2$1 = runtime.Tuple.get(scrut20, 2);
                                canReachEnd1 = element2$1;
                                s21 = element1$3;
                                b23 = element0$6;
                              } else {
                                break split_3$1
                              }
                            } else {
                              break split_3$1
                            }
                          } else {
                            restBlock2 = arg$Assign$2$;
                            r = arg$Assign$1$;
                            x1 = arg$Assign$0$;
                            scrut19 = SpecializeHelpers.sor(ctx2, r);
                            if (runtime.Tuple.isArrayLike(scrut19) && scrut19.length === 3) {
                              element0$5 = runtime.Tuple.get(scrut19, 0);
                              element1$2 = runtime.Tuple.get(scrut19, 1);
                              element2$ = runtime.Tuple.get(scrut19, 2);
                              s12 = element2$;
                              r12 = element1$2;
                              blk3 = element0$5;
                              tmp68 = Block.ValueRef(x1);
                              tmp69 = ctx2.add(tmp68, s12);
                              scrut20 = SpecializeHelpers.prop(tmp69, restBlock2);
                              if (runtime.Tuple.isArrayLike(scrut20) && scrut20.length === 3) {
                                element0$6 = runtime.Tuple.get(scrut20, 0);
                                element1$3 = runtime.Tuple.get(scrut20, 1);
                                element2$1 = runtime.Tuple.get(scrut20, 2);
                                canReachEnd1 = element2$1;
                                s21 = element1$3;
                                b23 = element0$6;
                              } else {
                                break split_3$1
                              }
                            } else {
                              break split_3$1
                            }
                          }
                        } else {
                          restBlock2 = arg$Assign$2$;
                          r = arg$Assign$1$;
                          x1 = arg$Assign$0$;
                          scrut19 = SpecializeHelpers.sor(ctx2, r);
                          if (runtime.Tuple.isArrayLike(scrut19) && scrut19.length === 3) {
                            element0$5 = runtime.Tuple.get(scrut19, 0);
                            element1$2 = runtime.Tuple.get(scrut19, 1);
                            element2$ = runtime.Tuple.get(scrut19, 2);
                            s12 = element2$;
                            r12 = element1$2;
                            blk3 = element0$5;
                            tmp70 = Block.ValueRef(x1);
                            tmp71 = ctx2.add(tmp70, s12);
                            scrut20 = SpecializeHelpers.prop(tmp71, restBlock2);
                            if (runtime.Tuple.isArrayLike(scrut20) && scrut20.length === 3) {
                              element0$6 = runtime.Tuple.get(scrut20, 0);
                              element1$3 = runtime.Tuple.get(scrut20, 1);
                              element2$1 = runtime.Tuple.get(scrut20, 2);
                              canReachEnd1 = element2$1;
                              s21 = element1$3;
                              b23 = element0$6;
                            } else {
                              break split_3$1
                            }
                          } else {
                            break split_3$1
                          }
                        }
                      } else {
                        restBlock2 = arg$Assign$2$;
                        r = arg$Assign$1$;
                        x1 = arg$Assign$0$;
                        scrut19 = SpecializeHelpers.sor(ctx2, r);
                        if (runtime.Tuple.isArrayLike(scrut19) && scrut19.length === 3) {
                          element0$5 = runtime.Tuple.get(scrut19, 0);
                          element1$2 = runtime.Tuple.get(scrut19, 1);
                          element2$ = runtime.Tuple.get(scrut19, 2);
                          s12 = element2$;
                          r12 = element1$2;
                          blk3 = element0$5;
                          tmp72 = Block.ValueRef(x1);
                          tmp73 = ctx2.add(tmp72, s12);
                          scrut20 = SpecializeHelpers.prop(tmp73, restBlock2);
                          if (runtime.Tuple.isArrayLike(scrut20) && scrut20.length === 3) {
                            element0$6 = runtime.Tuple.get(scrut20, 0);
                            element1$3 = runtime.Tuple.get(scrut20, 1);
                            element2$1 = runtime.Tuple.get(scrut20, 2);
                            canReachEnd1 = element2$1;
                            s21 = element1$3;
                            b23 = element0$6;
                          } else {
                            break split_3$1
                          }
                        } else {
                          break split_3$1
                        }
                      }
                    } else {
                      restBlock2 = arg$Assign$2$;
                      r = arg$Assign$1$;
                      x1 = arg$Assign$0$;
                      scrut19 = SpecializeHelpers.sor(ctx2, r);
                      if (runtime.Tuple.isArrayLike(scrut19) && scrut19.length === 3) {
                        element0$5 = runtime.Tuple.get(scrut19, 0);
                        element1$2 = runtime.Tuple.get(scrut19, 1);
                        element2$ = runtime.Tuple.get(scrut19, 2);
                        s12 = element2$;
                        r12 = element1$2;
                        blk3 = element0$5;
                        tmp74 = Block.ValueRef(x1);
                        tmp75 = ctx2.add(tmp74, s12);
                        scrut20 = SpecializeHelpers.prop(tmp75, restBlock2);
                        if (runtime.Tuple.isArrayLike(scrut20) && scrut20.length === 3) {
                          element0$6 = runtime.Tuple.get(scrut20, 0);
                          element1$3 = runtime.Tuple.get(scrut20, 1);
                          element2$1 = runtime.Tuple.get(scrut20, 2);
                          canReachEnd1 = element2$1;
                          s21 = element1$3;
                          b23 = element0$6;
                        } else {
                          break split_3$1
                        }
                      } else {
                        break split_3$1
                      }
                    }
                  } else {
                    restBlock2 = arg$Assign$2$;
                    r = arg$Assign$1$;
                    x1 = arg$Assign$0$;
                    scrut19 = SpecializeHelpers.sor(ctx2, r);
                    if (runtime.Tuple.isArrayLike(scrut19) && scrut19.length === 3) {
                      element0$5 = runtime.Tuple.get(scrut19, 0);
                      element1$2 = runtime.Tuple.get(scrut19, 1);
                      element2$ = runtime.Tuple.get(scrut19, 2);
                      s12 = element2$;
                      r12 = element1$2;
                      blk3 = element0$5;
                      tmp76 = Block.ValueRef(x1);
                      tmp77 = ctx2.add(tmp76, s12);
                      scrut20 = SpecializeHelpers.prop(tmp77, restBlock2);
                      if (runtime.Tuple.isArrayLike(scrut20) && scrut20.length === 3) {
                        element0$6 = runtime.Tuple.get(scrut20, 0);
                        element1$3 = runtime.Tuple.get(scrut20, 1);
                        element2$1 = runtime.Tuple.get(scrut20, 2);
                        canReachEnd1 = element2$1;
                        s21 = element1$3;
                        b23 = element0$6;
                      } else {
                        break split_3$1
                      }
                    } else {
                      break split_3$1
                    }
                  }
                  tmp102 = Block.Assign(x1, r12, b23);
                  tmp103 = Block.concat(blk3, tmp102);
                  return globalThis.Object.freeze([
                    tmp103,
                    s21,
                    canReachEnd1
                  ])
                } else if (param1 instanceof Block.Define.class) {
                  arg$Define$0$ = param1.defn;
                  arg$Define$1$ = param1.rest;
                  if (arg$Define$0$ instanceof Block.ValDefn.class) {
                    arg$ValDefn$0$ = arg$Define$0$.owner;
                    arg$ValDefn$1$ = arg$Define$0$.sym;
                    arg$ValDefn$2$ = arg$Define$0$.rhs;
                    restBlock1 = arg$Define$1$;
                    rhs = arg$ValDefn$2$;
                    sym = arg$ValDefn$1$;
                    opt = arg$ValDefn$0$;
                    scrut17 = SpecializeHelpers.sor(ctx2, rhs);
                    if (runtime.Tuple.isArrayLike(scrut17) && scrut17.length === 3) {
                      element0$7 = runtime.Tuple.get(scrut17, 0);
                      element1$4 = runtime.Tuple.get(scrut17, 1);
                      element2$2 = runtime.Tuple.get(scrut17, 2);
                      s11 = element2$2;
                      r11 = element1$4;
                      blk2 = element0$7;
                      ctx2.addValDefn(sym.name, s11);
                      scrut18 = SpecializeHelpers.prop(ctx2, restBlock1);
                      if (runtime.Tuple.isArrayLike(scrut18) && scrut18.length === 3) {
                        element0$8 = runtime.Tuple.get(scrut18, 0);
                        element1$5 = runtime.Tuple.get(scrut18, 1);
                        element2$3 = runtime.Tuple.get(scrut18, 2);
                        canReachEnd = element2$3;
                        s2 = element1$5;
                        b22 = element0$8;
                        tmp78 = Block.ValDefn(opt, sym, r11);
                        tmp79 = Block.Define(tmp78, b22);
                        tmp80 = Block.concat(blk2, tmp79);
                        return globalThis.Object.freeze([
                          tmp80,
                          s2,
                          canReachEnd
                        ])
                      }
                    }
                  }
                } else if (param1 instanceof Block.Match.class) {
                  arg$Match$0$ = param1.scrut;
                  arg$Match$1$ = param1.arms;
                  arg$Match$2$ = param1.dflt;
                  arg$Match$3$ = param1.rest;
                  restBlock3 = arg$Match$3$;
                  dflt = arg$Match$2$;
                  arms = arg$Match$1$;
                  p3 = arg$Match$0$;
                  mergeAssigned = function mergeAssigned(acc, assigned) {
                    let lambda6;
                    lambda6 = (undefined, function (ss, ps, _) {
                      let scrut29, tmp109, tmp110;
                      scrut29 = runtime.safeCall(acc.has(ps));
                      if (scrut29 === true) {
                        tmp109 = runtime.safeCall(acc.get(ps));
                        tmp110 = ShapeSet.union2(tmp109, ss);
                        return acc.set(ps, tmp110)
                      }
                      return acc.set(ps, ss);
                    });
                    return runtime.safeCall(assigned.forEach(lambda6))
                  };
                  propBranch = function propBranch(body, branchShape) {
                    let branchCtx, scrut29, res9, tmp109, tmp110;
                    branchCtx = ctx2.clone;
                    if (p3 instanceof Block.ValueLit.class) {
                      tmp109 = true;
                    } else {
                      tmp109 = false;
                    }
                    scrut29 = ! tmp109;
                    if (scrut29 === true) {
                      branchCtx.add(p3, branchShape);
                    }
                    res9 = SpecializeHelpers.prop(branchCtx, body);
                    tmp110 = runtime.safeCall(branchCtx.sub(ctx2));
                    return globalThis.Object.freeze([
                      ...res9,
                      tmp110
                    ])
                  };
                  s3 = SpecializeHelpers.sop(ctx2, p3);
                  lambda4 = (undefined, function (r2, arm) {
                    let fs, scrut29, res9, tmp109, tmp110, tmp111, tmp112, tmp113;
                    fs = ShapeSet.filterSet(r2[0], arm.cse);
                    scrut29 = runtime.safeCall(fs.isEmpty());
                    if (scrut29 === true) {
                      return r2
                    }
                    res9 = propBranch(arm.body, fs);
                    mergeAssigned(r2[3], res9[3]);
                    tmp109 = ShapeSet.restSet(r2[0], arm.cse);
                    tmp110 = ShapeSet.union2(r2[1], res9[1]);
                    tmp111 = Block.Arm(arm.cse, res9[0]);
                    tmp112 = globalThis.Object.freeze([
                      ...r2[2],
                      tmp111
                    ]);
                    if (r2[4] === false) {
                      tmp113 = res9[2];
                      return globalThis.Object.freeze([
                        tmp109,
                        tmp110,
                        tmp112,
                        r2[3],
                        tmp113
                      ])
                    }
                    tmp113 = true;
                    return globalThis.Object.freeze([
                      tmp109,
                      tmp110,
                      tmp112,
                      r2[3],
                      tmp113
                    ]);
                  });
                  tmp81 = runtime.safeCall(Predef.foldl(lambda4));
                  tmp82 = ShapeSet.mkBot();
                  tmp83 = globalThis.Object.freeze([]);
                  tmp84 = globalThis.Object.freeze(new globalThis.Map());
                  tmp85 = globalThis.Object.freeze([
                    s3,
                    tmp82,
                    tmp83,
                    tmp84,
                    false
                  ]);
                  filteredArms = runtime.safeCall(tmp81(tmp85, ...arms));
                  scrut21 = runtime.safeCall(filteredArms[0].isEmpty());
                  if (scrut21 === true) {
                    tmp86 = ShapeSet.mkBot();
                    tmp87 = globalThis.Object.freeze(new globalThis.Map());
                    tmp88 = globalThis.Object.freeze([
                      Option.None,
                      tmp86,
                      tmp87,
                      Option.None
                    ]);
                  } else {
                    if (dflt instanceof Option.Some.class) {
                      arg$Some$0$ = dflt.value;
                      d = arg$Some$0$;
                      res8 = propBranch(d, filteredArms[0]);
                      tmp89 = Option.Some(res8[0]);
                      tmp90 = Option.Some(res8[2]);
                      tmp91 = globalThis.Object.freeze([
                        tmp89,
                        res8[1],
                        res8[3],
                        tmp90
                      ]);
                    } else {
                      tmp92 = ShapeSet.mkBot();
                      tmp93 = globalThis.Object.freeze(new globalThis.Map());
                      tmp91 = globalThis.Object.freeze([
                        Option.None,
                        tmp92,
                        tmp93,
                        Option.None
                      ]);
                    }
                    tmp88 = tmp91;
                  }
                  dfltRes = tmp88;
                  mergeAssigned(filteredArms[3], dfltRes[2]);
                  lambda5 = (undefined, function (ss, ps, _) {
                    let scrut29, tmp109, tmp110;
                    scrut29 = runtime.safeCall(ctx2.ctx.has(ps));
                    if (scrut29 === true) {
                      tmp109 = runtime.safeCall(ctx2.ctx.get(ps));
                      tmp110 = ShapeSet.union2(tmp109, ss);
                      return ctx2.ctx.set(ps, tmp110)
                    }
                    return ctx2.ctx.set(ps, ss);
                  });
                  runtime.safeCall(filteredArms[3].forEach(lambda5));
                  if (filteredArms[4] === false) {
                    scrut22 = dfltRes[3];
                    if (scrut22 instanceof Option.Some.class) {
                      arg$Some$0$1 = scrut22.value;
                      if (arg$Some$0$1 === true) {
                        tmp95 = true;
                      } else {
                        tmp95 = false;
                      }
                    } else {
                      tmp95 = false;
                    }
                    tmp94 = tmp95;
                  } else {
                    tmp94 = true;
                  }
                  canReachEnd2 = tmp94;
                  restRes = SpecializeHelpers.prop(ctx2, restBlock3);
                  if (canReachEnd2 === true) {
                    tmp96 = ShapeSet.union(filteredArms[1], dfltRes[1], restRes[1]);
                  } else {
                    tmp96 = ShapeSet.union(filteredArms[1], dfltRes[1]);
                  }
                  retShape = tmp96;
                  scrut23 = filteredArms[2].length;
                  switch (scrut23) {
                    case 0:
                      if (canReachEnd2 === true) {
                        scrut24 = dfltRes[0];
                        if (scrut24 instanceof Option.Some.class) {
                          arg$Some$0$4 = scrut24.value;
                          d1 = arg$Some$0$4;
                          tmp97 = Block.concat(d1, restRes[0]);
                          return globalThis.Object.freeze([
                            tmp97,
                            retShape,
                            true
                          ])
                        }
                        scrut25 = ! canReachEnd2;
                        if (scrut25 === true) {
                          scrut27 = dfltRes[0];
                          if (scrut27 instanceof Option.Some.class) {
                            arg$Some$0$2 = scrut27.value;
                            d2 = arg$Some$0$2;
                            scrut26 = dfltRes[3];
                            if (scrut26 instanceof Option.Some.class) {
                              arg$Some$0$3 = scrut26.value;
                              dcanReachEnd = arg$Some$0$3;
                              return globalThis.Object.freeze([
                                d2,
                                retShape,
                                dcanReachEnd
                              ])
                            }
                            return restRes;
                          }
                          return restRes;
                        }
                        return restRes;
                      }
                      scrut25 = ! canReachEnd2;
                      if (scrut25 === true) {
                        scrut27 = dfltRes[0];
                        if (scrut27 instanceof Option.Some.class) {
                          arg$Some$0$2 = scrut27.value;
                          d2 = arg$Some$0$2;
                          scrut26 = dfltRes[3];
                          if (scrut26 instanceof Option.Some.class) {
                            arg$Some$0$3 = scrut26.value;
                            dcanReachEnd = arg$Some$0$3;
                            return globalThis.Object.freeze([
                              d2,
                              retShape,
                              dcanReachEnd
                            ])
                          }
                          return restRes;
                        }
                        return restRes;
                      }
                      return restRes;
                    case 1:
                      scrut28 = dfltRes[0];
                      if (scrut28 instanceof Option.None.class) {
                        tmp98 = Block.concat(filteredArms[2][0].body, restRes[0]);
                        if (canReachEnd2 === false) {
                          tmp99 = restRes[2];
                          return globalThis.Object.freeze([
                            tmp98,
                            retShape,
                            tmp99
                          ])
                        }
                        tmp99 = true;
                        return globalThis.Object.freeze([
                          tmp98,
                          retShape,
                          tmp99
                        ]);
                      }
                      break;
                  }
                  tmp100 = Block.Match(p3, filteredArms[2], dfltRes[0], restRes[0]);
                  if (canReachEnd2 === false) {
                    tmp101 = restRes[2];
                    return globalThis.Object.freeze([
                      tmp100,
                      retShape,
                      tmp101
                    ])
                  }
                  tmp101 = true;
                  return globalThis.Object.freeze([
                    tmp100,
                    retShape,
                    tmp101
                  ]);
                }
              }
              tmp104 = ShapeSet.mkDyn();
              return globalThis.Object.freeze([
                param1,
                tmp104,
                true
              ]);
            }
            tmp105 = Block.Return(r1, implct1);
            tmp106 = Block.concat(blk1, tmp105);
            return globalThis.Object.freeze([
              tmp106,
              s1,
              false
            ]);
          }
          tmp107 = Option.Some(implct);
          tmp108 = SpecializeHelpers.dispatchMethodCall(ctx2, Option.None, tmp107, p1, f1, args2);
          return globalThis.Object.freeze([
            ...tmp108,
            false
          ]);
        case 4:
          let actualClass, defn, ps, scrut29, scrut30, preCtorBody, scrut31, scrut32, scrut33, ctorBody, scrut34, arg$FunDefn$0$, arg$FunDefn$1$, tmp109, lambda6, arg$FunDefn$2$, tmp110, arg$FunDefn$2$1, tmp111, tmp112, argShapes, ctx3;
          argShapes = param1;
          ctx3 = param2;
          actualClass = SpecializeHelpers.getActualClass(param0.value);
          defn = runtime.safeCall(actualClass["class$ctor$_instr"]());
          if (defn instanceof Block.FunDefn.class) {
            arg$FunDefn$0$ = defn.sym;
            arg$FunDefn$1$ = defn.params;
            if (arg$FunDefn$0$ instanceof Block.Symbol.class) {
              ps = arg$FunDefn$1$;
              tmp109 = globalThis.Object.freeze([
                argShapes
              ]);
              SpecializeHelpers.specializeName("class$ctor$", false, ps, tmp109);
              lambda6 = (undefined, function (p4, i, _) {
                let lambda7;
                lambda7 = (undefined, function (p21, j, _1) {
                  let tmp113;
                  tmp113 = Block.ValueRef(p21.sym);
                  return ctx3.add(tmp113, argShapes[j])
                });
                return runtime.safeCall(p4.forEach(lambda7))
              });
              runtime.safeCall(ps.forEach(lambda6));
              scrut29 = actualClass["preCtor$_instr"];
              if (scrut29 === undefined) {
                tmp110 = true;
              } else {
                tmp110 = false;
              }
              scrut30 = ! tmp110;
              if (scrut30 === true) {
                scrut31 = runtime.safeCall(actualClass["preCtor$_instr"]());
                if (scrut31 instanceof Block.FunDefn.class) {
                  arg$FunDefn$2$ = scrut31.body;
                  preCtorBody = arg$FunDefn$2$;
                  SpecializeHelpers.prop(ctx3, preCtorBody);
                  scrut32 = actualClass["class$ctor$_instr"];
                  if (scrut32 === undefined) {
                    tmp111 = true;
                  } else {
                    tmp111 = false;
                  }
                  scrut33 = ! tmp111;
                  if (scrut33 === true) {
                    scrut34 = runtime.safeCall(actualClass["class$ctor$_instr"]());
                    if (scrut34 instanceof Block.FunDefn.class) {
                      arg$FunDefn$2$1 = scrut34.body;
                      ctorBody = arg$FunDefn$2$1;
                      SpecializeHelpers.prop(ctx3, ctorBody);
                      tmp112 = Option.Some(ps);
                      return ShapeSet.mkClassFromMap(param0, ctx3.valDefnCtx, tmp112)
                    }
                    throw runtime.safeCall(globalThis.Error("ctor not found in staged class"));
                  }
                  throw runtime.safeCall(globalThis.Error("ctor not found in staged class"));
                }
                throw runtime.safeCall(globalThis.Error("preCtor not found in staged class"));
              }
              throw runtime.safeCall(globalThis.Error("preCtor not found in staged class"));
            }
            throw runtime.safeCall(globalThis.Error("instrumented method is not a FunDefn"));
          }
          throw runtime.safeCall(globalThis.Error("instrumented method is not a FunDefn"));
      }
      break;
    }
  } 
  static isStagedClass(c) {
    let scrut, tmp;
    scrut = SpecializeHelpers.getClassGenMap(c);
    if (scrut === undefined) {
      tmp = true;
      return ! tmp
    }
    tmp = false;
    return ! tmp;
  } 
  static getGenMapName(name, isClass) {
    let tmp;
    if (isClass === true) {
      tmp = SpecializeHelpers.#classGenMapPrefix;
      return tmp + name
    }
    tmp = SpecializeHelpers.#moduleGenMapPrefix;
    return tmp + name;
  } 
  static getCacheName(name, isClass) {
    let tmp;
    if (isClass === true) {
      tmp = SpecializeHelpers.#classCachePrefix;
      return tmp + name
    }
    tmp = SpecializeHelpers.#moduleCachePrefix;
    return tmp + name;
  } 
  static getActualClass(c) {
    let scrut, scrut1, tmp;
    scrut = c["class"];
    if (scrut === undefined) {
      tmp = true;
    } else {
      tmp = false;
    }
    scrut1 = ! tmp;
    if (scrut1 === true) {
      return c.class
    }
    return c;
  } 
  static getStagedClassInfo(c) {
    let actualClass, clsName;
    actualClass = SpecializeHelpers.getActualClass(c);
    clsName = actualClass[Predef.Symbols.definitionMetadata][1];
    return globalThis.Object.freeze([
      actualClass,
      clsName
    ])
  } 
  static getClassGenMap(c) {
    let info, tmp;
    info = SpecializeHelpers.getStagedClassInfo(c);
    tmp = SpecializeHelpers.getGenMapName(info[1], true);
    return info[0][tmp]
  } 
  static getClassCache(c) {
    let info, tmp;
    info = SpecializeHelpers.getStagedClassInfo(c);
    tmp = SpecializeHelpers.getCacheName(info[1], true);
    return info[0][tmp]
  } 
  static wrapScoped(symbols, block) {
    let scrut, rest, oldSymbols, arg$Scoped$0$, arg$Scoped$1$, tmp;
    scrut = symbols.length;
    if (scrut === 0) {
      return block
    }
    if (block instanceof Block.Scoped.class) {
      arg$Scoped$0$ = block.symbols;
      arg$Scoped$1$ = block.rest;
      rest = arg$Scoped$1$;
      oldSymbols = arg$Scoped$0$;
      tmp = globalThis.Object.freeze([
        ...symbols,
        ...oldSymbols
      ]);
      return Block.Scoped(tmp, rest)
    }
    return Block.Scoped(symbols, block);
  } 
  static showCtxPath(p) {
    let name, qual, qual1, fld, l, n, n1, n2, lit, arg$ValueLit$0$, arg$ValueRef$0$, arg$Symbol$0$, arg$ModuleSymbol$0$, arg$ConcreteClassSymbol$0$, arg$DynSelect$0$, arg$DynSelect$1$, arg$Select$0$, arg$Select$1$, arg$Symbol$0$1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10;
    if (p instanceof Block.Select.class) {
      arg$Select$0$ = p.qual;
      arg$Select$1$ = p.name;
      if (arg$Select$1$ instanceof Block.Symbol.class) {
        arg$Symbol$0$1 = arg$Select$1$.name;
        name = arg$Symbol$0$1;
        qual = arg$Select$0$;
        tmp = SpecializeHelpers.showCtxPath(qual);
        tmp1 = tmp + ".";
        return tmp1 + name
      }
      throw globalThis.Object.freeze(new globalThis.Error("match error"));
    } else if (p instanceof Block.DynSelect.class) {
      arg$DynSelect$0$ = p.qual;
      arg$DynSelect$1$ = p.fld;
      fld = arg$DynSelect$1$;
      qual1 = arg$DynSelect$0$;
      tmp2 = SpecializeHelpers.showCtxPath(qual1);
      tmp3 = tmp2 + ".(";
      tmp4 = SpecializeHelpers.showCtxPath(fld);
      tmp5 = tmp3 + tmp4;
      return tmp5 + ")"
    } else if (p instanceof Block.ValueRef.class) {
      arg$ValueRef$0$ = p.l;
      l = arg$ValueRef$0$;
      if (l instanceof Block.ConcreteClassSymbol.class) {
        arg$ConcreteClassSymbol$0$ = l.name;
        n = arg$ConcreteClassSymbol$0$;
        tmp6 = "ClassSymbol(" + n;
        return tmp6 + ")"
      } else if (l instanceof Block.ModuleSymbol.class) {
        arg$ModuleSymbol$0$ = l.name;
        n1 = arg$ModuleSymbol$0$;
        tmp7 = "ModuleSymbol(" + n1;
        return tmp7 + ")"
      } else if (l instanceof Block.Symbol.class) {
        arg$Symbol$0$ = l.name;
        n2 = arg$Symbol$0$;
        tmp8 = "Symbol(" + n2;
        return tmp8 + ")"
      }
      throw runtime.safeCall(globalThis.Error(l));
    } else if (p instanceof Block.ValueLit.class) {
      arg$ValueLit$0$ = p.lit;
      lit = arg$ValueLit$0$;
      tmp9 = runtime.safeCall(lit.toString());
      tmp10 = "Lit(" + tmp9;
      return tmp10 + ")"
    }
    throw globalThis.Object.freeze(new globalThis.Error("match error"));
  } 
  static sov(v, valueMap) {
    let scrut, scrut1, scrut2, scrut3, scrut4, meta, paramsOpt, scrut5, scrut6, classSymbol, argsMap, scrut7, scrut8, scrut9, tmp, tmp1, tmp2, tmp3, tmp4, lambda, tmp5, tmp6, lambda1, tmp7;
    scrut = typeof v;
    switch (scrut) {
      case "number":
        return ShapeSet.mkLit(v);
      case "string":
        return ShapeSet.mkLit(v);
      case "boolean":
        return ShapeSet.mkLit(v);
    }
    scrut1 = globalThis.Array.isArray(v);
    if (scrut1 === true) {
      tmp = v.map(SpecializeHelpers.sov, valueMap);
      return ShapeSet.mkArr(tmp)
    }
    if (v === undefined) {
      tmp1 = true;
    } else {
      tmp1 = false;
    }
    scrut2 = ! tmp1;
    if (scrut2 === true) {
      scrut3 = v.constructor;
      if (scrut3 === undefined) {
        tmp2 = true;
      } else {
        tmp2 = false;
      }
      scrut9 = ! tmp2;
      if (scrut9 === true) {
        scrut4 = v.constructor[Predef.Symbols.definitionMetadata];
        if (scrut4 === undefined) {
          tmp3 = true;
        } else {
          tmp3 = false;
        }
        scrut8 = ! tmp3;
        if (scrut8 === true) {
          meta = v.constructor[Predef.Symbols.definitionMetadata];
          meta[1];
          scrut5 = meta.length < 3;
          if (scrut5 === true) {
            tmp4 = Option.None;
          } else {
            lambda = (undefined, function (p) {
              if (p === null) {
                return Block.Symbol("")
              }
              return Block.Symbol(p);
            });
            tmp5 = runtime.safeCall(meta[2].map(lambda));
            tmp4 = Option.Some(tmp5);
          }
          paramsOpt = tmp4;
          scrut6 = runtime.safeCall(valueMap.has(v.constructor));
          if (scrut6 === true) {
            classSymbol = runtime.safeCall(valueMap.get(v.constructor));
            argsMap = globalThis.Object.freeze(new globalThis.Map());
            if (paramsOpt instanceof Option.None.class) {
              tmp6 = true;
            } else {
              tmp6 = false;
            }
            scrut7 = ! tmp6;
            if (scrut7 === true) {
              lambda1 = (undefined, function (n, _, _1) {
                let tmp8;
                tmp8 = SpecializeHelpers.sov(v[n], valueMap);
                return argsMap.set(n, tmp8)
              });
              runtime.safeCall(meta[2].forEach(lambda1));
              return ShapeSet.mkClassFromMap(classSymbol, argsMap, Option.None)
            }
            return ShapeSet.mkClassFromMap(classSymbol, argsMap, Option.None);
          }
          return runtime.assertFail("mlscript-compile/SpecializeHelpers.mls", "188");
        }
      }
    }
    tmp7 = runtime.safeCall(v.toString());
    throw globalThis.Error("unknown value from sov", tmp7);
  } 
  static sop(ctx, p) {
    let scrut, s, name, clsSymb, scrut1, s1, name1, qual, scrut2, thisShape, qualShape, vals, scrut3, firstLen, scrut4, scrut5, qual1, fld, lit, arg$Some$0$, arg$ValueLit$0$, arg$DynSelect$0$, arg$DynSelect$1$, arg$Select$0$, arg$Select$1$, arg$Symbol$0$, arg$Some$0$1, arg$ValueRef$0$, arg$Some$0$2, lambda, lambda1, lambda2, lambda3, lambda4, lambda5, tmp, tmp1, tmp2, tmp3, tmp4;
    scrut = runtime.safeCall(ctx.get(p));
    if (scrut instanceof Option.Some.class) {
      arg$Some$0$ = scrut.value;
      s = arg$Some$0$;
      return s
    }
    split_default$: {
      split_1$: {
        split_2$: {
          if (p instanceof Block.Select.class) {
            arg$Select$0$ = p.qual;
            arg$Select$1$ = p.name;
            if (arg$Select$0$ instanceof Block.ValueRef.class) {
              arg$ValueRef$0$ = arg$Select$0$.l;
              if (arg$Select$1$ instanceof Block.Symbol.class) {
                arg$Symbol$0$ = arg$Select$1$.name;
                name = arg$Symbol$0$;
                clsSymb = arg$ValueRef$0$;
                if (clsSymb instanceof Block.ClassSymbol.class) {
                  scrut1 = runtime.safeCall(ctx.getValDefn(name));
                  if (scrut1 instanceof Option.Some.class) {
                    arg$Some$0$2 = scrut1.value;
                    s1 = arg$Some$0$2;
                    return s1
                  }
                  name1 = arg$Symbol$0$;
                  qual = arg$Select$0$;
                  scrut2 = ctx.thisShape;
                  if (scrut2 instanceof Option.Some.class) {
                    arg$Some$0$1 = scrut2.value;
                    thisShape = arg$Some$0$1;
                    break split_1$
                  }
                  if (name1 === "length") {
                    qualShape = SpecializeHelpers.sop(ctx, qual);
                    vals = runtime.safeCall(qualShape.values());
                    scrut3 = vals.length > 0;
                    if (scrut3 === true) {
                      lambda = (undefined, function (_0) {
                        if (_0 instanceof Shape.Arr.class) {
                          return true
                        }
                        return false;
                      });
                      scrut5 = runtime.safeCall(vals.every(lambda));
                      if (scrut5 === true) {
                        firstLen = vals[0].shapes.length;
                        lambda1 = (undefined, function (v) {
                          return Predef.equals(v.shapes.length, firstLen)
                        });
                        scrut4 = runtime.safeCall(vals.every(lambda1));
                        if (scrut4 === true) {
                          return ShapeSet.mkLit(firstLen)
                        }
                        break split_2$;
                      }
                      break split_2$;
                    }
                    break split_2$;
                  }
                } else {
                  name1 = arg$Symbol$0$;
                  qual = arg$Select$0$;
                  scrut2 = ctx.thisShape;
                  if (scrut2 instanceof Option.Some.class) {
                    arg$Some$0$1 = scrut2.value;
                    thisShape = arg$Some$0$1;
                    break split_1$
                  }
                  if (name1 === "length") {
                    qualShape = SpecializeHelpers.sop(ctx, qual);
                    vals = runtime.safeCall(qualShape.values());
                    scrut3 = vals.length > 0;
                    if (scrut3 === true) {
                      lambda2 = (undefined, function (_0) {
                        if (_0 instanceof Shape.Arr.class) {
                          return true
                        }
                        return false;
                      });
                      scrut5 = runtime.safeCall(vals.every(lambda2));
                      if (scrut5 === true) {
                        firstLen = vals[0].shapes.length;
                        lambda3 = (undefined, function (v) {
                          return Predef.equals(v.shapes.length, firstLen)
                        });
                        scrut4 = runtime.safeCall(vals.every(lambda3));
                        if (scrut4 === true) {
                          return ShapeSet.mkLit(firstLen)
                        }
                        break split_2$;
                      }
                      break split_2$;
                    }
                    break split_2$;
                  }
                }
              } else {
                break split_default$
              }
            } else {
              if (arg$Select$1$ instanceof Block.Symbol.class) {
                arg$Symbol$0$ = arg$Select$1$.name;
                name1 = arg$Symbol$0$;
                qual = arg$Select$0$;
                scrut2 = ctx.thisShape;
                if (scrut2 instanceof Option.Some.class) {
                  arg$Some$0$1 = scrut2.value;
                  thisShape = arg$Some$0$1;
                  break split_1$
                }
                if (name1 === "length") {
                  qualShape = SpecializeHelpers.sop(ctx, qual);
                  vals = runtime.safeCall(qualShape.values());
                  scrut3 = vals.length > 0;
                  if (scrut3 === true) {
                    lambda4 = (undefined, function (_0) {
                      if (_0 instanceof Shape.Arr.class) {
                        return true
                      }
                      return false;
                    });
                    scrut5 = runtime.safeCall(vals.every(lambda4));
                    if (scrut5 === true) {
                      firstLen = vals[0].shapes.length;
                      lambda5 = (undefined, function (v) {
                        return Predef.equals(v.shapes.length, firstLen)
                      });
                      scrut4 = runtime.safeCall(vals.every(lambda5));
                      if (scrut4 === true) {
                        return ShapeSet.mkLit(firstLen)
                      }
                      break split_2$;
                    }
                    break split_2$;
                  }
                  break split_2$;
                }
              } else {
                break split_default$
              }
            }
            tmp2 = SpecializeHelpers.sop(ctx, qual);
            tmp3 = ShapeSet.mkLit(name1);
            return ShapeSet.selSet(tmp2, tmp3)
          } else if (p instanceof Block.DynSelect.class) {
            arg$DynSelect$0$ = p.qual;
            arg$DynSelect$1$ = p.fld;
            fld = arg$DynSelect$1$;
            qual1 = arg$DynSelect$0$;
            tmp = SpecializeHelpers.sop(ctx, qual1);
            tmp1 = SpecializeHelpers.sop(ctx, fld);
            return ShapeSet.selSet(tmp, tmp1)
          } else if (p instanceof Block.ValueLit.class) {
            arg$ValueLit$0$ = p.lit;
            lit = arg$ValueLit$0$;
            return ShapeSet.mkLit(lit)
          } else if (p instanceof Block.ValueRef.class) {} else {
            break split_default$
          }
        }
        return ShapeSet.mkDyn();
      }
      tmp4 = ShapeSet.mkLit(name1);
      return ShapeSet.selSet(thisShape, tmp4);
    }
    throw globalThis.Object.freeze(new globalThis.Error("match error"));
  } 
  static fsplit(pss) {
    let knownMap, unkShape, lambda, tmp, tmp1, tmp2;
    knownMap = globalThis.Object.freeze(new globalThis.Map());
    lambda = (undefined, function (acc, s) {
      let sym, scrut, scrut1, arg$Class$0$, tmp3, tmp4, tmp5, tmp6, tmp7;
      if (s instanceof Shape.Class.class) {
        arg$Class$0$ = s.sym;
        sym = arg$Class$0$;
        scrut1 = SpecializeHelpers.isStagedClass(sym.value);
        if (scrut1 === true) {
          scrut = runtime.safeCall(knownMap.has(sym));
          if (scrut === true) {
            tmp3 = runtime.safeCall(knownMap.get(sym));
            tmp4 = ShapeSet.lift(s);
            tmp5 = ShapeSet.union2(tmp3, tmp4);
            knownMap.set(sym, tmp5);
            return acc
          }
          tmp6 = ShapeSet.lift(s);
          knownMap.set(sym, tmp6);
          return acc;
        }
      }
      tmp7 = ShapeSet.mkDyn();
      return ShapeSet.union2(acc, tmp7)
    });
    tmp = runtime.safeCall(Predef.foldl(lambda));
    tmp1 = ShapeSet.mkBot();
    tmp2 = runtime.safeCall(pss.values());
    unkShape = runtime.safeCall(tmp(tmp1, ...tmp2));
    return SpecializeHelpers.SplitResult(knownMap, unkShape)
  } 
  static lit(l) {
    let tmp, tmp1, tmp2;
    tmp = Block.End();
    tmp1 = Block.ValueLit(l);
    tmp2 = ShapeSet.mkLit(l);
    return globalThis.Object.freeze([
      tmp,
      tmp1,
      tmp2
    ])
  } 
  static sorInstantiate(ctx, r, cls, args) {
    return SpecializeHelpers.sorInstantiate_sorCall_sor_prop_specializeCtor(0, ctx, r, cls, args, undefined)
  } 
  static sorBuiltinOp(ctx, r, f, name, args) {
    let x, l, scrut, x1, y, s1, s2, bs, scrut1, evaledArgs, fullBlk, newArgs, newArgsWithLit, scrut2, l1, scrut3, l2, evaledArgs1, fullBlk1, newArgs1, element1$, element0$, element0$1, arg$Lit$0$, tmp, tmp1, tmp2, tmp3, tmp4, lambda, lambda1, tmp5, tmp6, lambda2, element0$2, arg$Lit$0$1, tmp7, tmp8, tmp9, element0$3, arg$Lit$0$2, tmp10, tmp11, tmp12, tmp13, lambda3, lambda4, tmp14, tmp15, lambda5, tmp16, tmp17;
    if (runtime.Tuple.isArrayLike(args) && args.length === 1) {
      element0$ = runtime.Tuple.get(args, 0);
      x = element0$;
      tmp = SpecializeHelpers.sop(ctx, x.value);
      scrut = runtime.safeCall(tmp.values());
      if (runtime.Tuple.isArrayLike(scrut) && scrut.length === 1) {
        element0$1 = runtime.Tuple.get(scrut, 0);
        if (element0$1 instanceof Shape.Lit.class) {
          arg$Lit$0$ = element0$1.l;
          l = arg$Lit$0$;
          switch (name) {
            case "!":
              tmp1 = ! l;
              return SpecializeHelpers.lit(tmp1);
            case "-":
              tmp2 = - l;
              return SpecializeHelpers.lit(tmp2);
            case "+":
              tmp3 = + l;
              return SpecializeHelpers.lit(tmp3);
          }
        }
      }
    } else if (runtime.Tuple.isArrayLike(args) && args.length === 2) {
      element0$ = runtime.Tuple.get(args, 0);
      element1$ = runtime.Tuple.get(args, 1);
      y = element1$;
      x1 = element0$;
      s1 = SpecializeHelpers.sop(ctx, x1.value);
      s2 = SpecializeHelpers.sop(ctx, y.value);
      bs = ShapeSet.binOpSet(name, s1, s2);
      scrut1 = ShapeSet.staticSet(bs);
      if (scrut1 === true) {
        tmp4 = ShapeSet.valOfSet(bs);
        return SpecializeHelpers.lit(tmp4)
      }
      lambda = (undefined, function (a) {
        return SpecializeHelpers.sor(ctx, a.value)
      });
      evaledArgs = runtime.safeCall(args.map(lambda));
      lambda1 = (undefined, function (acc, e) {
        return Block.concat(acc, e[0])
      });
      tmp5 = runtime.safeCall(Predef.foldl(lambda1));
      tmp6 = Block.End();
      fullBlk = runtime.safeCall(tmp5(tmp6, ...evaledArgs));
      lambda2 = (undefined, function (e) {
        let scrut4, tmp18;
        scrut4 = e[1];
        if (scrut4 instanceof Block.Path) {
          tmp18 = e[1];
          return Block.Arg(tmp18)
        }
        throw runtime.safeCall(globalThis.Error("expected path"));
      });
      newArgs = runtime.safeCall(evaledArgs.map(lambda2));
      split_root$: {
        scrut2 = runtime.safeCall(s1.values());
        if (runtime.Tuple.isArrayLike(scrut2) && scrut2.length === 1) {
          element0$2 = runtime.Tuple.get(scrut2, 0);
          if (element0$2 instanceof Shape.Lit.class) {
            arg$Lit$0$1 = element0$2.l;
            l1 = arg$Lit$0$1;
            tmp7 = Block.ValueLit(l1);
            tmp8 = Block.Arg(tmp7);
            tmp9 = globalThis.Object.freeze([
              tmp8,
              newArgs[1]
            ]);
            break split_root$
          }
        }
        scrut3 = runtime.safeCall(s2.values());
        if (runtime.Tuple.isArrayLike(scrut3) && scrut3.length === 1) {
          element0$3 = runtime.Tuple.get(scrut3, 0);
          if (element0$3 instanceof Shape.Lit.class) {
            arg$Lit$0$2 = element0$3.l;
            l2 = arg$Lit$0$2;
            tmp10 = Block.ValueLit(l2);
            tmp11 = Block.Arg(tmp10);
            tmp12 = globalThis.Object.freeze([
              newArgs[0],
              tmp11
            ]);
          } else {
            tmp12 = newArgs;
          }
        } else {
          tmp12 = newArgs;
        }
        tmp9 = tmp12;
      }
      newArgsWithLit = tmp9;
      tmp13 = Block.Call(f, newArgsWithLit);
      return globalThis.Object.freeze([
        fullBlk,
        tmp13,
        bs
      ]);
    }
    lambda3 = (undefined, function (a) {
      return SpecializeHelpers.sor(ctx, a.value)
    });
    evaledArgs1 = runtime.safeCall(args.map(lambda3));
    lambda4 = (undefined, function (acc, e) {
      return Block.concat(acc, e[0])
    });
    tmp14 = runtime.safeCall(Predef.foldl(lambda4));
    tmp15 = Block.End();
    fullBlk1 = runtime.safeCall(tmp14(tmp15, ...evaledArgs1));
    lambda5 = (undefined, function (e) {
      let scrut4, tmp18;
      scrut4 = e[1];
      if (scrut4 instanceof Block.Path) {
        tmp18 = e[1];
        return Block.Arg(tmp18)
      }
      throw runtime.safeCall(globalThis.Error("expected path"));
    });
    newArgs1 = runtime.safeCall(evaledArgs1.map(lambda5));
    tmp16 = Block.Call(f, newArgs1);
    tmp17 = ShapeSet.mkDyn();
    return globalThis.Object.freeze([
      fullBlk1,
      tmp16,
      tmp17
    ])
  } 
  static sorCall(ctx, r, f, args, argShapes) {
    return SpecializeHelpers.sorInstantiate_sorCall_sor_prop_specializeCtor(1, ctx, r, f, args, argShapes)
  } 
  static sor(ctx, r) {
    return SpecializeHelpers.sorInstantiate_sorCall_sor_prop_specializeCtor(2, ctx, r, undefined, undefined, undefined)
  } 
  static dispatchMethodCall(ctx, xOpt, implctOpt, p, f, args) {
    let pss, argShapes, splitRes, knownMap, unkShape, knownMapArr, isRet, scrut, dfltMatch, i, x, x_, C_i, ss_i, genMap, f_gen, ret, retSym, retShape, callRes, i1, x1, x_1, scrut1, armsRet, armsAcc, totalStagedRetShape, dfltRet, scrut2, dfltMatch1, i2, x2, x_2, matchBody, scrut3, scrut4, totalRetShape, lambda, tmp, tmp1, tmp2, tmp3, arg$Some$0$, tmp4, tmp5, tmp6, arg$Some$0$1, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, arg$Some$0$2, tmp14, tmp15, arg$Some$0$3, tmp16, tmp17, tmp18, lambda1, lambda2, lambda3, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, arg$Some$0$4, tmp25, tmp26, tmp27, tmp28, tmp29, arg$Some$0$5, tmp30, tmp31, tmp32, tmp33, tmp34, tmp35, tmp36;
    pss = SpecializeHelpers.sop(ctx, p);
    lambda = (undefined, function (a) {
      return SpecializeHelpers.sop(ctx, a.value)
    });
    argShapes = runtime.safeCall(args.map(lambda));
    splitRes = SpecializeHelpers.fsplit(pss);
    knownMap = splitRes.knownMap;
    unkShape = splitRes.unkShape;
    tmp = runtime.safeCall(knownMap.entries());
    knownMapArr = globalThis.Object.freeze([
      ...tmp
    ]);
    if (xOpt instanceof Option.None.class) {
      tmp1 = true;
    } else {
      tmp1 = false;
    }
    isRet = tmp1;
    scrut = knownMap.size;
    switch (scrut) {
      case 0:
        tmp2 = Block.Symbol(f);
        tmp3 = Block.Select(p, tmp2);
        dfltMatch = Block.Call(tmp3, args);
        if (isRet === true) {
          if (implctOpt instanceof Option.Some.class) {
            arg$Some$0$ = implctOpt.value;
            i = arg$Some$0$;
            tmp4 = i;
          } else {
            tmp4 = false;
          }
          tmp5 = Block.Return(dfltMatch, tmp4);
          tmp6 = ShapeSet.mkDyn();
          return globalThis.Object.freeze([
            tmp5,
            tmp6
          ])
        }
        if (xOpt instanceof Option.Some.class) {
          arg$Some$0$1 = xOpt.value;
          x_ = arg$Some$0$1;
          tmp7 = x_;
          x = tmp7;
          tmp8 = Block.End();
          tmp9 = Block.Assign(x, dfltMatch, tmp8);
          tmp10 = ShapeSet.mkDyn();
          return globalThis.Object.freeze([
            tmp9,
            tmp10
          ])
        }
        throw runtime.safeCall(globalThis.Error("unreachable"));
      case 1:
        scrut1 = runtime.safeCall(unkShape.isEmpty());
        if (scrut1 === true) {
          C_i = knownMapArr[0][0];
          ss_i = knownMapArr[0][1];
          genMap = SpecializeHelpers.getClassGenMap(C_i.value);
          f_gen = runtime.safeCall(genMap.get(f));
          tmp11 = runtime.safeCall(f_gen(ss_i));
          ret = runtime.safeCall(tmp11(...argShapes));
          retSym = ret[0];
          retShape = ret[1];
          tmp12 = Block.Symbol(retSym);
          tmp13 = Block.Select(p, tmp12);
          callRes = Block.Call(tmp13, args);
          if (isRet === true) {
            if (implctOpt instanceof Option.Some.class) {
              arg$Some$0$2 = implctOpt.value;
              i1 = arg$Some$0$2;
              tmp14 = i1;
            } else {
              tmp14 = false;
            }
            tmp15 = Block.Return(callRes, tmp14);
            return globalThis.Object.freeze([
              tmp15,
              retShape
            ])
          }
          if (xOpt instanceof Option.Some.class) {
            arg$Some$0$3 = xOpt.value;
            x_1 = arg$Some$0$3;
            tmp16 = x_1;
            x1 = tmp16;
            tmp17 = Block.End();
            tmp18 = Block.Assign(x1, callRes, tmp17);
            return globalThis.Object.freeze([
              tmp18,
              retShape
            ])
          }
          throw runtime.safeCall(globalThis.Error("unreachable"));
        }
        break;
    }
    lambda1 = (undefined, function (entry) {
      let C_i1, ss_i1, genMap1, f_gen1, retSym1, retShape1, callRes1, i3, x3, x_3, tmp37, tmp38, tmp39, tmp40, tmp41, tmp42, tmp43, arg$Some$0$6, tmp44, tmp45, tmp46, arg$Some$0$7, tmp47, tmp48, tmp49, tmp50, tmp51;
      C_i1 = entry[0];
      ss_i1 = entry[1];
      genMap1 = SpecializeHelpers.getClassGenMap(C_i1.value);
      f_gen1 = runtime.safeCall(genMap1.get(f));
      tmp37 = runtime.safeCall(f_gen1(ss_i1));
      tmp38 = runtime.safeCall(tmp37(...argShapes));
      retSym1 = tmp38[0];
      tmp39 = runtime.safeCall(f_gen1(ss_i1));
      tmp40 = runtime.safeCall(tmp39(...argShapes));
      retShape1 = tmp40[1];
      tmp41 = Block.Symbol(retSym1);
      tmp42 = Block.Select(p, tmp41);
      callRes1 = Block.Call(tmp42, args);
      if (isRet === true) {
        tmp43 = Block.Cls(C_i1, p);
        if (implctOpt instanceof Option.Some.class) {
          arg$Some$0$6 = implctOpt.value;
          i3 = arg$Some$0$6;
          tmp44 = i3;
        } else {
          tmp44 = false;
        }
        tmp45 = Block.Return(callRes1, tmp44);
        tmp46 = Block.Arm(tmp43, tmp45);
        return globalThis.Object.freeze([
          tmp46,
          retShape1
        ])
      }
      if (xOpt instanceof Option.Some.class) {
        arg$Some$0$7 = xOpt.value;
        x_3 = arg$Some$0$7;
        tmp47 = x_3;
        x3 = tmp47;
        tmp48 = Block.Cls(C_i1, p);
        tmp49 = Block.End();
        tmp50 = Block.Assign(x3, callRes1, tmp49);
        tmp51 = Block.Arm(tmp48, tmp50);
        return globalThis.Object.freeze([
          tmp51,
          retShape1
        ])
      }
      throw runtime.safeCall(globalThis.Error("unreachable"));
    });
    armsRet = runtime.safeCall(knownMapArr.map(lambda1));
    lambda2 = (undefined, function (_0) {
      return _0[0]
    });
    armsAcc = runtime.safeCall(armsRet.map(lambda2));
    lambda3 = (undefined, function (acc, x3) {
      return ShapeSet.union2(acc, x3[1])
    });
    tmp19 = runtime.safeCall(Predef.foldl(lambda3));
    tmp20 = ShapeSet.mkBot();
    totalStagedRetShape = runtime.safeCall(tmp19(tmp20, ...armsRet));
    scrut2 = runtime.safeCall(unkShape.isEmpty());
    if (scrut2 === true) {
      tmp21 = ShapeSet.mkBot();
      tmp22 = globalThis.Object.freeze([
        Option.None,
        tmp21
      ]);
    } else {
      tmp23 = Block.Symbol(f);
      tmp24 = Block.Select(p, tmp23);
      dfltMatch1 = Block.Call(tmp24, args);
      if (isRet === true) {
        if (implctOpt instanceof Option.Some.class) {
          arg$Some$0$4 = implctOpt.value;
          i2 = arg$Some$0$4;
          tmp25 = i2;
        } else {
          tmp25 = false;
        }
        tmp26 = Block.Return(dfltMatch1, tmp25);
        tmp27 = Option.Some(tmp26);
        tmp28 = ShapeSet.mkDyn();
        tmp29 = globalThis.Object.freeze([
          tmp27,
          tmp28
        ]);
      } else {
        if (xOpt instanceof Option.Some.class) {
          arg$Some$0$5 = xOpt.value;
          x_2 = arg$Some$0$5;
          tmp30 = x_2;
          x2 = tmp30;
          tmp31 = Block.End();
          tmp32 = Block.Assign(x2, dfltMatch1, tmp31);
          tmp33 = Option.Some(tmp32);
          tmp34 = ShapeSet.mkDyn();
          tmp29 = globalThis.Object.freeze([
            tmp33,
            tmp34
          ]);
        } else {
          throw runtime.safeCall(globalThis.Error("unreachable"))
        }
      }
      tmp22 = tmp29;
    }
    dfltRet = tmp22;
    split_root$: {
      scrut3 = knownMap.size;
      if (scrut3 === 1) {
        scrut4 = runtime.safeCall(unkShape.isEmpty());
        if (scrut4 === true) {
          tmp35 = armsAcc[0].body;
          break split_root$
        }
      }
      tmp36 = Block.End();
      tmp35 = Block.Match(p, armsAcc, dfltRet[0], tmp36);
    }
    matchBody = tmp35;
    totalRetShape = ShapeSet.union2(totalStagedRetShape, dfltRet[1]);
    return globalThis.Object.freeze([
      matchBody,
      totalRetShape
    ])
  } 
  static prop(ctx, b) {
    return SpecializeHelpers.sorInstantiate_sorCall_sor_prop_specializeCtor(3, ctx, b, undefined, undefined, undefined)
  } 
  static propStub(ctx, body) {
    let tmp;
    tmp = ShapeSet.mkDyn();
    return globalThis.Object.freeze([
      body,
      tmp
    ])
  } 
  static buildShapeName(s) {
    let lit, lit1, shapes, params, sym, scrut, arg$Class$0$, arg$Class$1$, arg$Arr$0$, arg$Lit$0$, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
    if (s instanceof Shape.Dyn.class) {
      return "Dyn"
    } else if (s instanceof Shape.Lit.class) {
      arg$Lit$0$ = s.l;
      lit = arg$Lit$0$;
      if (typeof lit === 'string') {
        return "Str" + lit
      }
      lit1 = arg$Lit$0$;
      tmp = runtime.safeCall(lit1.toString());
      tmp1 = tmp.replace(".", "_p_");
      return "Lit" + tmp1;
    } else if (s instanceof Shape.Arr.class) {
      arg$Arr$0$ = s.shapes;
      shapes = arg$Arr$0$;
      tmp2 = runtime.safeCall(shapes.map(SpecializeHelpers.buildShapeName));
      tmp3 = runtime.safeCall(tmp2.join("_"));
      tmp4 = "Arr_" + tmp3;
      return tmp4 + "_end"
    } else if (s instanceof Shape.Class.class) {
      arg$Class$0$ = s.sym;
      arg$Class$1$ = s.fields;
      params = arg$Class$1$;
      sym = arg$Class$0$;
      scrut = params.length;
      if (scrut === 0) {
        return sym.name
      }
      tmp5 = sym.name + "_";
      tmp6 = runtime.safeCall(params.map(SpecializeHelpers.buildShapeName));
      tmp7 = runtime.safeCall(tmp6.join("_"));
      return tmp5 + tmp7;
    }
    tmp8 = runtime.safeCall(s.toString());
    tmp9 = "unknown shape when building shape name" + tmp8;
    throw runtime.safeCall(globalThis.Error(tmp9));
  } 
  static buildShapeSetName(ss) {
    let vals, scrut, tmp, tmp1, tmp2;
    vals = runtime.safeCall(ss.values());
    scrut = vals.length;
    if (scrut === 1) {
      return SpecializeHelpers.buildShapeName(vals[0])
    }
    tmp = runtime.safeCall(vals.map(SpecializeHelpers.buildShapeName));
    tmp1 = runtime.safeCall(tmp.join("_"));
    tmp2 = "Union_" + tmp1;
    return tmp2 + "_end";
  } 
  static specializeName(funName, isMethod, ps, shapes) {
    let mappedShapes, scrut, lambda, lambda1, tmp, lambda2, tmp1, tmp2;
    lambda = (undefined, function (ss, i, _) {
      let lambda3;
      if (isMethod === true) {
        if (i === 0) {
          return ss
        }
      }
      lambda3 = (undefined, function (s, j, _1) {
        let psIdx, scrut1, tmp3, arg$Some$0$;
        if (isMethod === true) {
          tmp3 = i - 1;
        } else {
          tmp3 = i;
        }
        psIdx = tmp3;
        scrut1 = ps[psIdx][j].constraint;
        if (scrut1 instanceof Option.Some.class) {
          arg$Some$0$ = scrut1.value;
          if (arg$Some$0$ instanceof Block.Dynamic.class) {
            return ShapeSet.mkDyn()
          }
          return s;
        }
        return s;
      });
      return runtime.safeCall(ss.map(lambda3))
    });
    mappedShapes = runtime.safeCall(shapes.map(lambda));
    lambda1 = (undefined, function (_0) {
      let lambda3;
      lambda3 = (undefined, function (_01) {
        return runtime.safeCall(_01.isDyn())
      });
      return runtime.safeCall(_0.every(lambda3))
    });
    scrut = runtime.safeCall(mappedShapes.every(lambda1));
    if (scrut === true) {
      return funName
    }
    tmp = funName + "_";
    lambda2 = (undefined, function (pss) {
      let tmp3;
      tmp3 = runtime.safeCall(pss.map(SpecializeHelpers.buildShapeSetName));
      return runtime.safeCall(tmp3.join("_"))
    });
    tmp1 = runtime.safeCall(mappedShapes.map(lambda2));
    tmp2 = runtime.safeCall(tmp1.join("_dot_"));
    return tmp + tmp2;
  } 
  static specialize(cache, funName, dflt, shapes) {
    let defn, body, ps, isMethod, scrut, newName, scrut1, x, paramShapes, ctx, res, bodyWithScoped, actualRetShape, finalBody, scrut2, allocs, v2p, entry, arg$FunDefn$0$, arg$FunDefn$1$, arg$FunDefn$2$, tmp, arg$Some$0$, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, lambda, tmp8, tmp9, lambda1, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20;
    defn = runtime.safeCall(dflt());
    if (defn instanceof Block.FunDefn.class) {
      arg$FunDefn$0$ = defn.sym;
      arg$FunDefn$1$ = defn.params;
      arg$FunDefn$2$ = defn.body;
      if (arg$FunDefn$0$ instanceof Block.Symbol.class) {
        body = arg$FunDefn$2$;
        ps = arg$FunDefn$1$;
        scrut = cache.owner;
        if (scrut instanceof Block.ConcreteClassSymbol.class) {
          tmp = true;
        } else {
          tmp = false;
        }
        isMethod = tmp;
        newName = SpecializeHelpers.specializeName(funName, isMethod, ps, shapes);
        scrut1 = cache.getFun(newName);
        if (scrut1 instanceof Option.Some.class) {
          arg$Some$0$ = scrut1.value;
          x = arg$Some$0$;
          return globalThis.Object.freeze([
            x[0].sym.name,
            x[1]
          ])
        } else if (scrut1 instanceof Option.None.class) {
          if (isMethod === true) {
            tmp1 = runtime.safeCall(shapes.slice(1));
          } else {
            tmp1 = shapes;
          }
          paramShapes = tmp1;
          if (isMethod === true) {
            tmp2 = globalThis.Object.freeze(new globalThis.Map());
            tmp3 = globalThis.Object.freeze(new globalThis.Map());
            tmp4 = globalThis.Object.freeze(new globalThis.Map());
            tmp5 = [];
            tmp6 = Option.Some(shapes[0][0]);
            tmp7 = SpecializeHelpers.Ctx(tmp2, tmp3, tmp4, tmp5, tmp6);
          } else {
            tmp7 = SpecializeHelpers.Ctx.class.empty();
          }
          ctx = tmp7;
          lambda = (undefined, function (p, i, _) {
            let lambda2;
            lambda2 = (undefined, function (p2, j, _1) {
              let shape, scrut3, scrut4, arg$Some$0$1, tmp21, tmp22, tmp23, tmp24;
              scrut3 = p2.constraint;
              if (scrut3 instanceof Option.Some.class) {
                arg$Some$0$1 = scrut3.value;
                if (arg$Some$0$1 instanceof Block.Dynamic.class) {
                  tmp21 = ShapeSet.mkDyn();
                } else if (arg$Some$0$1 instanceof Block.Static.class) {
                  tmp22 = ShapeSet.staticSet(paramShapes[i][j]);
                  scrut4 = ! tmp22;
                  if (scrut4 === true) {
                    tmp23 = "Non-static shape given to static parameter " + p2;
                    throw runtime.safeCall(globalThis.Error(tmp23))
                  }
                  tmp21 = paramShapes[i][j];
                } else {
                  tmp21 = paramShapes[i][j];
                }
              } else {
                tmp21 = paramShapes[i][j];
              }
              shape = tmp21;
              tmp24 = Block.ValueRef(p2.sym);
              return ctx.add(tmp24, shape)
            });
            return runtime.safeCall(p.forEach(lambda2))
          });
          runtime.safeCall(ps.forEach(lambda));
          tmp8 = globalThis.Object.freeze(new SpecializeHelpers.ValueCollection.class(ctx.valueNameCtx));
          runtime.safeCall(tmp8.showBlock(body));
          tmp9 = runtime.safeCall(ctx.ctx.values());
          lambda1 = (undefined, function (_0) {
            let tmp21, lambda2, tmp22, lambda3;
            tmp21 = runtime.safeCall(_0.shapeset.values());
            lambda2 = (undefined, function (_01) {
              if (_01 instanceof Shape.Class.class) {
                return true
              }
              return false;
            });
            tmp22 = runtime.safeCall(tmp21.filter(lambda2));
            lambda3 = (undefined, function (s) {
              let tmp23;
              tmp23 = SpecializeHelpers.getActualClass(s.sym.value);
              return ctx.valueNameCtx.set(tmp23, s.sym)
            });
            return runtime.safeCall(tmp22.forEach(lambda3))
          });
          runtime.safeCall(tmp9.forEach(lambda1));
          tmp10 = Block.Symbol(newName);
          tmp11 = Block.FunDefn(tmp10, ps, body);
          tmp12 = ShapeSet.mkDyn();
          tmp13 = globalThis.Object.freeze([
            tmp11,
            tmp12
          ]);
          cache.setFun(newName, tmp13);
          res = SpecializeHelpers.prop(ctx, body);
          bodyWithScoped = SpecializeHelpers.wrapScoped(ctx.allocs, res[0]);
          actualRetShape = res[1];
          scrut2 = ShapeSet.staticSet(actualRetShape);
          if (scrut2 === true) {
            allocs = [];
            tmp14 = ShapeSet.valOfSet(actualRetShape);
            v2p = ShapeSet.val2path(tmp14, allocs, ctx.valueNameCtx);
            tmp15 = Block.Return(v2p[1], false);
            tmp16 = Block.concat(v2p[0], tmp15);
            tmp17 = SpecializeHelpers.wrapScoped(allocs, tmp16);
          } else {
            tmp17 = bodyWithScoped;
          }
          finalBody = tmp17;
          tmp18 = Block.Symbol(newName);
          tmp19 = Block.FunDefn(tmp18, ps, finalBody);
          tmp20 = globalThis.Object.freeze([
            tmp19,
            actualRetShape
          ]);
          entry = cache.setFun(newName, tmp20);
          return globalThis.Object.freeze([
            entry[0].sym.name,
            entry[1]
          ])
        }
        throw globalThis.Object.freeze(new globalThis.Error("match error"));
      }
      throw runtime.safeCall(globalThis.Error("instrumented function is not a FunDefn"));
    }
    throw runtime.safeCall(globalThis.Error("instrumented function is not a FunDefn"));
  } 
  static specializeCtor(classSymb, argShapes, ctx) {
    return SpecializeHelpers.sorInstantiate_sorCall_sor_prop_specializeCtor(4, classSymb, argShapes, ctx, undefined, undefined)
  }
  toString() { return runtime.render(this); }
  static [definitionMetadata] = ["class", "SpecializeHelpers"]; 
});
let SpecializeHelpers = SpecializeHelpers1; export default SpecializeHelpers;
