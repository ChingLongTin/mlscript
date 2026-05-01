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
    this.Ctx = function Ctx(ctx, valDefnCtx, allocs, thisShape) {
      return globalThis.Object.freeze(new Ctx.class(ctx, valDefnCtx, allocs, thisShape));
    };
    (class Ctx {
      static {
        SpecializeHelpers.Ctx.class = this
      }
      constructor(ctx, valDefnCtx, allocs, thisShape) {
        this.ctx = ctx;
        this.valDefnCtx = valDefnCtx;
        this.allocs = allocs;
        this.thisShape = thisShape;
      }
      static empty() {
        let tmp, tmp1, tmp2;
        tmp = globalThis.Object.freeze(new globalThis.Map());
        tmp1 = globalThis.Object.freeze(new globalThis.Map());
        tmp2 = [];
        return SpecializeHelpers.Ctx(tmp, tmp1, tmp2, Option.None)
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
        return SpecializeHelpers.Ctx(tmp, tmp1, this.allocs, this.thisShape);
      } 
      get clearCtx() {
        let tmp;
        tmp = globalThis.Object.freeze(new globalThis.Map());
        return SpecializeHelpers.Ctx(tmp, this.valDefnCtx, this.allocs, this.thisShape);
      } 
      add(path, ss) {
        let ps, scrut, tmp, tmp1;
        ps = SpecializeHelpers.showCtxPath(path);
        scrut = runtime.safeCall(this.ctx.has(ps));
        if (scrut === true) {
          tmp = runtime.safeCall(this.ctx.get(ps));
          tmp1 = ShapeSet.union(tmp, ss);
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
      static [definitionMetadata] = ["class", "Ctx", ["ctx", "valDefnCtx", "allocs", "thisShape"]]; 
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
            tmp6 = runtime.assertFail("mlscript-compile/SpecializeHelpers.mls", "131");
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
        return runtime.assertFail("mlscript-compile/SpecializeHelpers.mls", "145");
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
          let scrut2, litArg, recovered, clsSymb1, p, scrut3, arr, e, arr2, scrut4, clsSymb2, scrut5, cache1, scrut6, res1, symb2, name, fld, value, mapPropName, genMap, scrut7, f_gen, scrut8, res2, scrut9, v2p, scrut10, f_imp, evaluated, evaluated_path, arg$Select$0$, arg$Select$1$1, arg$ValueRef$0$1, arg$ModuleSymbol$0$, arg$ModuleSymbol$1$, arg$Symbol$0$, arg$ValueRef$0$2, arg$Select$0$1, arg$Select$1$2, arg$ValueRef$0$3, arg$Symbol$0$1, arg$ModuleSymbol$0$1, arg$Symbol$0$2, element1$, element0$, arg$Arg$0$, arg$Arg$0$1, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31, element0$1, arg$Arr$0$, element0$2, element0$3, arg$Arr$0$1, tmp32, tmp33, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39;
          split_1$: {
            split_2$: {
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
                } else if (arg$Select$0$ instanceof Block.ValueRef.class) {
                  arg$ValueRef$0$1 = arg$Select$0$.l;
                  if (arg$ValueRef$0$1 instanceof Block.ModuleSymbol.class) {
                    arg$ModuleSymbol$0$ = arg$ValueRef$0$1.name;
                    arg$ModuleSymbol$1$ = arg$ValueRef$0$1.value;
                    clsSymb1 = arg$Select$1$1;
                    if (clsSymb1 instanceof Block.ConcreteClassSymbol.class) {
                      tmp9 = Block.End();
                      tmp10 = ShapeSet.mkClass(clsSymb1, param4);
                      return globalThis.Object.freeze([
                        tmp9,
                        param1,
                        tmp10
                      ])
                    }
                    if (arg$Select$1$1 instanceof Block.Symbol.class) {
                      arg$Symbol$0$ = arg$Select$1$1.name;
                      if (arg$Symbol$0$ === "concat") {
                        p = arg$Select$0$;
                        break split_2$
                      }
                      fld = arg$Symbol$0$;
                      value = arg$ModuleSymbol$1$;
                      name = arg$ModuleSymbol$0$;
                      mapPropName = SpecializeHelpers.getGenMapName(name, false);
                      SpecializeHelpers.getCacheName(name, false);
                      genMap = value[mapPropName];
                      if (genMap === undefined) {
                        tmp11 = true;
                      } else {
                        tmp11 = false;
                      }
                      scrut7 = ! tmp11;
                      if (scrut7 === true) {
                        f_gen = runtime.safeCall(genMap.get(fld));
                        if (f_gen instanceof Runtime.Unit.class) {
                          tmp12 = true;
                        } else {
                          tmp12 = false;
                        }
                        scrut8 = ! tmp12;
                        if (scrut8 === true) {
                          res2 = runtime.safeCall(f_gen(...param4));
                          scrut9 = ShapeSet.staticSet(res2[1]);
                          if (scrut9 === true) {
                            tmp13 = ShapeSet.valOfSet(res2[1]);
                            v2p = ShapeSet.val2path(tmp13, param0.allocs);
                            return globalThis.Object.freeze([
                              v2p[0],
                              v2p[1],
                              res2[1]
                            ])
                          }
                          tmp14 = Block.End();
                          tmp15 = Block.ModuleSymbol(name, value);
                          tmp16 = Block.ValueRef(tmp15);
                          tmp17 = Block.Symbol(res2[0]);
                          tmp18 = Block.Select(tmp16, tmp17);
                          tmp19 = Block.Call(tmp18, param3);
                          return globalThis.Object.freeze([
                            tmp14,
                            tmp19,
                            res2[1]
                          ]);
                        }
                        tmp20 = "module " + name;
                        tmp21 = tmp20 + " is staged but function ";
                        tmp22 = tmp21 + fld;
                        tmp23 = tmp22 + " is not found in generator map";
                        throw runtime.safeCall(globalThis.Error(tmp23));
                      }
                      scrut10 = runtime.safeCall(param4.every(ShapeSet.staticSet));
                      if (scrut10 === true) {
                        f_imp = value[fld];
                        tmp24 = runtime.safeCall(param4.map(ShapeSet.valOfSet));
                        evaluated = runtime.safeCall(f_imp(...tmp24));
                        evaluated_path = ShapeSet.val2path(evaluated, param0.allocs);
                        tmp25 = SpecializeHelpers.sov(evaluated);
                        return globalThis.Object.freeze([
                          evaluated_path[0],
                          evaluated_path[1],
                          tmp25
                        ])
                      }
                    } else {
                      break split_1$
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
                tmp30 = Block.End();
                tmp31 = ShapeSet.mkDyn();
                return globalThis.Object.freeze([
                  tmp30,
                  param1,
                  tmp31
                ])
              } else if (param2 instanceof Block.ValueRef.class) {
                arg$ValueRef$0$2 = param2.l;
                clsSymb2 = arg$ValueRef$0$2;
                if (clsSymb2 instanceof Block.ConcreteClassSymbol.class) {
                  scrut5 = SpecializeHelpers.isStagedClass(clsSymb2.value);
                  if (scrut5 === true) {
                    cache1 = SpecializeHelpers.getClassCache(clsSymb2.value);
                    if (cache1 === undefined) {
                      tmp26 = true;
                    } else {
                      tmp26 = false;
                    }
                    scrut6 = ! tmp26;
                    if (scrut6 === true) {
                      res1 = SpecializeHelpers1.specializeCtor(clsSymb2, param4, param0.clearCtx);
                      tmp27 = Block.End();
                      return globalThis.Object.freeze([
                        tmp27,
                        param1,
                        res1
                      ])
                    }
                    throw runtime.safeCall(globalThis.Error("class is staged but cache not found"));
                  }
                  tmp28 = Block.End();
                  tmp29 = ShapeSet.mkClass(clsSymb2, param4);
                  return globalThis.Object.freeze([
                    tmp28,
                    param1,
                    tmp29
                  ]);
                }
                symb2 = arg$ValueRef$0$2;
                return SpecializeHelpers.sorBuiltinOp(param0, param1, param2, symb2.name, param3);
              }
              break split_1$;
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
              scrut12 = ShapeSet.val2path(tmp40, ctx1.allocs);
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
          let f1, symb3, implct, args2, scrut13, scrut14, res4, implct1, blk1, s1, r1, scrut15, rest, symbols, newAllocs, newCtx, res5, x, f2, restBlock, symb4, args3, res6, b2, scrut16, restBlock1, sym, opt, rhs, scrut17, blk2, s11, r11, scrut18, b21, s2, x1, restBlock2, r, scrut19, blk3, s12, r12, scrut20, b22, s21, restBlock3, dflt, arms, p1, s3, filteredArms, scrut21, scrut22, d, scrut23, d1, branchCtx, scrut24, newDflt, d2, branchCtx1, scrut25, newDflt1, arg$Match$0$, arg$Match$1$, arg$Match$2$, arg$Match$3$, arg$Assign$0$, arg$Assign$1$, arg$Assign$2$, element2$, element1$2, element0$5, element1$3, element0$6, arg$Define$0$, arg$Define$1$, arg$ValDefn$0$, arg$ValDefn$1$, arg$ValDefn$2$, element2$1, element1$4, element0$7, element1$5, element0$8, arg$Call$0$1, arg$Call$1$1, arg$Select$0$2, arg$Select$1$3, arg$ValueRef$0$4, arg$Symbol$0$3, arg$Scoped$0$, arg$Scoped$1$, arg$Return$0$, arg$Return$1$, element2$2, element1$6, element0$9, arg$Call$0$2, arg$Call$1$2, arg$Select$0$3, arg$Select$1$4, arg$ValueRef$0$5, arg$Symbol$0$4, tmp49, tmp50, tmp51, tmp52, lambda3, tmp53, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59, tmp60, tmp61, tmp62, tmp63, tmp64, tmp65, tmp66, tmp67, tmp68, tmp69, tmp70, tmp71, tmp72, tmp73, lambda4, tmp74, tmp75, tmp76, tmp77, arg$Some$0$, arg$Some$0$1, tmp78, tmp79, tmp80, tmp81, tmp82, tmp83, tmp84, tmp85, tmp86, tmp87, tmp88, tmp89, tmp90, tmp91, tmp92, tmp93, tmp94, tmp95, tmp96, tmp97, tmp98, ctx2;
          ctx2 = param0;
          split_1$1: {
            split_2$1: {
              if (param1 instanceof Block.End.class) {
                tmp49 = ShapeSet.mkBot();
                return globalThis.Object.freeze([
                  param1,
                  tmp49
                ])
              } else if (param1 instanceof Block.Return.class) {
                arg$Return$0$ = param1.res;
                arg$Return$1$ = param1.implct;
                if (arg$Return$0$ instanceof Block.Call.class) {
                  arg$Call$0$2 = arg$Return$0$._fun;
                  arg$Call$1$2 = arg$Return$0$.args;
                  if (arg$Call$0$2 instanceof Block.Select.class) {
                    arg$Select$0$3 = arg$Call$0$2.qual;
                    arg$Select$1$4 = arg$Call$0$2.name;
                    if (arg$Select$0$3 instanceof Block.ValueRef.class) {
                      arg$ValueRef$0$5 = arg$Select$0$3.l;
                      if (arg$Select$1$4 instanceof Block.Symbol.class) {
                        arg$Symbol$0$4 = arg$Select$1$4.name;
                        implct = arg$Return$1$;
                        args2 = arg$Call$1$2;
                        f1 = arg$Symbol$0$4;
                        symb3 = arg$ValueRef$0$5;
                        if (symb3 instanceof Block.ModuleSymbol.class) {
                          tmp50 = true;
                        } else {
                          tmp50 = false;
                        }
                        scrut14 = ! tmp50;
                        if (scrut14 === true) {
                          if (f1 === "concat") {
                            tmp51 = true;
                          } else {
                            tmp51 = false;
                          }
                          scrut13 = ! tmp51;
                          if (scrut13 === true) {
                            tmp52 = Option.Some(implct);
                            return SpecializeHelpers.dispatchMethodCall(ctx2, Option.None, tmp52, symb3, f1, args2)
                          }
                          implct1 = arg$Return$1$;
                          res4 = arg$Return$0$;
                          scrut15 = SpecializeHelpers.sor(ctx2, res4);
                          if (runtime.Tuple.isArrayLike(scrut15) && scrut15.length === 3) {
                            element0$9 = runtime.Tuple.get(scrut15, 0);
                            element1$6 = runtime.Tuple.get(scrut15, 1);
                            element2$2 = runtime.Tuple.get(scrut15, 2);
                            s1 = element2$2;
                            r1 = element1$6;
                            blk1 = element0$9;
                            break split_1$1
                          }
                        } else {
                          implct1 = arg$Return$1$;
                          res4 = arg$Return$0$;
                          scrut15 = SpecializeHelpers.sor(ctx2, res4);
                          if (runtime.Tuple.isArrayLike(scrut15) && scrut15.length === 3) {
                            element0$9 = runtime.Tuple.get(scrut15, 0);
                            element1$6 = runtime.Tuple.get(scrut15, 1);
                            element2$2 = runtime.Tuple.get(scrut15, 2);
                            s1 = element2$2;
                            r1 = element1$6;
                            blk1 = element0$9;
                            break split_1$1
                          }
                        }
                      } else {
                        implct1 = arg$Return$1$;
                        res4 = arg$Return$0$;
                        scrut15 = SpecializeHelpers.sor(ctx2, res4);
                        if (runtime.Tuple.isArrayLike(scrut15) && scrut15.length === 3) {
                          element0$9 = runtime.Tuple.get(scrut15, 0);
                          element1$6 = runtime.Tuple.get(scrut15, 1);
                          element2$2 = runtime.Tuple.get(scrut15, 2);
                          s1 = element2$2;
                          r1 = element1$6;
                          blk1 = element0$9;
                          break split_1$1
                        }
                      }
                    } else {
                      implct1 = arg$Return$1$;
                      res4 = arg$Return$0$;
                      scrut15 = SpecializeHelpers.sor(ctx2, res4);
                      if (runtime.Tuple.isArrayLike(scrut15) && scrut15.length === 3) {
                        element0$9 = runtime.Tuple.get(scrut15, 0);
                        element1$6 = runtime.Tuple.get(scrut15, 1);
                        element2$2 = runtime.Tuple.get(scrut15, 2);
                        s1 = element2$2;
                        r1 = element1$6;
                        blk1 = element0$9;
                        break split_1$1
                      }
                    }
                  } else {
                    implct1 = arg$Return$1$;
                    res4 = arg$Return$0$;
                    scrut15 = SpecializeHelpers.sor(ctx2, res4);
                    if (runtime.Tuple.isArrayLike(scrut15) && scrut15.length === 3) {
                      element0$9 = runtime.Tuple.get(scrut15, 0);
                      element1$6 = runtime.Tuple.get(scrut15, 1);
                      element2$2 = runtime.Tuple.get(scrut15, 2);
                      s1 = element2$2;
                      r1 = element1$6;
                      blk1 = element0$9;
                      break split_1$1
                    }
                  }
                } else {
                  implct1 = arg$Return$1$;
                  res4 = arg$Return$0$;
                  scrut15 = SpecializeHelpers.sor(ctx2, res4);
                  if (runtime.Tuple.isArrayLike(scrut15) && scrut15.length === 3) {
                    element0$9 = runtime.Tuple.get(scrut15, 0);
                    element1$6 = runtime.Tuple.get(scrut15, 1);
                    element2$2 = runtime.Tuple.get(scrut15, 2);
                    s1 = element2$2;
                    r1 = element1$6;
                    blk1 = element0$9;
                    break split_1$1
                  }
                }
              } else if (param1 instanceof Block.Scoped.class) {
                arg$Scoped$0$ = param1.symbols;
                arg$Scoped$1$ = param1.rest;
                rest = arg$Scoped$1$;
                symbols = arg$Scoped$0$;
                lambda3 = (undefined, function (x2, _, _1) {
                  let tmp99, tmp100;
                  tmp99 = Block.ValueRef(x2);
                  tmp100 = ShapeSet.mkBot();
                  return ctx2.add(tmp99, tmp100)
                });
                runtime.safeCall(symbols.forEach(lambda3));
                newAllocs = [];
                tmp53 = globalThis.Object.freeze(new globalThis.Map(ctx2.ctx));
                newCtx = SpecializeHelpers.Ctx(tmp53, ctx2.valDefnCtx, newAllocs, ctx2.thisShape);
                res5 = SpecializeHelpers.prop(newCtx, rest);
                tmp54 = globalThis.Object.freeze([
                  ...symbols,
                  ...newAllocs
                ]);
                tmp55 = SpecializeHelpers.wrapScoped(tmp54, res5[0]);
                return globalThis.Object.freeze([
                  tmp55,
                  res5[1]
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
                    if (arg$Select$0$2 instanceof Block.ValueRef.class) {
                      arg$ValueRef$0$4 = arg$Select$0$2.l;
                      if (arg$Select$1$3 instanceof Block.Symbol.class) {
                        arg$Symbol$0$3 = arg$Select$1$3.name;
                        restBlock = arg$Assign$2$;
                        args3 = arg$Call$1$1;
                        f2 = arg$Symbol$0$3;
                        symb4 = arg$ValueRef$0$4;
                        x = arg$Assign$0$;
                        if (symb4 instanceof Block.ModuleSymbol.class) {
                          tmp56 = true;
                        } else {
                          tmp56 = false;
                        }
                        scrut16 = ! tmp56;
                        if (scrut16 === true) {
                          tmp57 = Option.Some(x);
                          res6 = SpecializeHelpers.dispatchMethodCall(ctx2, tmp57, Option.None, symb4, f2, args3);
                          tmp58 = Block.ValueRef(x);
                          tmp59 = ctx2.add(tmp58, res6[1]);
                          b2 = SpecializeHelpers.prop(tmp59, restBlock);
                          tmp60 = Block.concat(res6[0], b2[0]);
                          return globalThis.Object.freeze([
                            tmp60,
                            b2[1]
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
                          tmp61 = Block.ValueRef(x1);
                          tmp62 = ctx2.add(tmp61, s12);
                          scrut20 = SpecializeHelpers.prop(tmp62, restBlock2);
                          if (runtime.Tuple.isArrayLike(scrut20) && scrut20.length === 2) {
                            element0$6 = runtime.Tuple.get(scrut20, 0);
                            element1$3 = runtime.Tuple.get(scrut20, 1);
                            s21 = element1$3;
                            b22 = element0$6;
                          } else {
                            break split_2$1
                          }
                        } else {
                          break split_2$1
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
                          tmp63 = Block.ValueRef(x1);
                          tmp64 = ctx2.add(tmp63, s12);
                          scrut20 = SpecializeHelpers.prop(tmp64, restBlock2);
                          if (runtime.Tuple.isArrayLike(scrut20) && scrut20.length === 2) {
                            element0$6 = runtime.Tuple.get(scrut20, 0);
                            element1$3 = runtime.Tuple.get(scrut20, 1);
                            s21 = element1$3;
                            b22 = element0$6;
                          } else {
                            break split_2$1
                          }
                        } else {
                          break split_2$1
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
                        tmp65 = Block.ValueRef(x1);
                        tmp66 = ctx2.add(tmp65, s12);
                        scrut20 = SpecializeHelpers.prop(tmp66, restBlock2);
                        if (runtime.Tuple.isArrayLike(scrut20) && scrut20.length === 2) {
                          element0$6 = runtime.Tuple.get(scrut20, 0);
                          element1$3 = runtime.Tuple.get(scrut20, 1);
                          s21 = element1$3;
                          b22 = element0$6;
                        } else {
                          break split_2$1
                        }
                      } else {
                        break split_2$1
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
                      tmp67 = Block.ValueRef(x1);
                      tmp68 = ctx2.add(tmp67, s12);
                      scrut20 = SpecializeHelpers.prop(tmp68, restBlock2);
                      if (runtime.Tuple.isArrayLike(scrut20) && scrut20.length === 2) {
                        element0$6 = runtime.Tuple.get(scrut20, 0);
                        element1$3 = runtime.Tuple.get(scrut20, 1);
                        s21 = element1$3;
                        b22 = element0$6;
                      } else {
                        break split_2$1
                      }
                    } else {
                      break split_2$1
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
                    tmp69 = Block.ValueRef(x1);
                    tmp70 = ctx2.add(tmp69, s12);
                    scrut20 = SpecializeHelpers.prop(tmp70, restBlock2);
                    if (runtime.Tuple.isArrayLike(scrut20) && scrut20.length === 2) {
                      element0$6 = runtime.Tuple.get(scrut20, 0);
                      element1$3 = runtime.Tuple.get(scrut20, 1);
                      s21 = element1$3;
                      b22 = element0$6;
                    } else {
                      break split_2$1
                    }
                  } else {
                    break split_2$1
                  }
                }
                tmp94 = Block.Assign(x1, r12, b22);
                tmp95 = Block.concat(blk3, tmp94);
                return globalThis.Object.freeze([
                  tmp95,
                  s21
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
                    element2$1 = runtime.Tuple.get(scrut17, 2);
                    s11 = element2$1;
                    r11 = element1$4;
                    blk2 = element0$7;
                    ctx2.addValDefn(sym.name, s11);
                    scrut18 = SpecializeHelpers.prop(ctx2, restBlock1);
                    if (runtime.Tuple.isArrayLike(scrut18) && scrut18.length === 2) {
                      element0$8 = runtime.Tuple.get(scrut18, 0);
                      element1$5 = runtime.Tuple.get(scrut18, 1);
                      s2 = element1$5;
                      b21 = element0$8;
                      tmp71 = Block.ValDefn(opt, sym, r11);
                      tmp72 = Block.Define(tmp71, b21);
                      tmp73 = Block.concat(blk2, tmp72);
                      return globalThis.Object.freeze([
                        tmp73,
                        s2
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
                p1 = arg$Match$0$;
                s3 = SpecializeHelpers.sop(ctx2, p1);
                lambda4 = (undefined, function (r2, arm) {
                  let fs, scrut26, branchCtx2, scrut27, res7, tmp99, tmp100, tmp101, tmp102, tmp103, tmp104;
                  fs = ShapeSet.filterSet(r2[0], arm.cse);
                  scrut26 = runtime.safeCall(fs.isEmpty());
                  if (scrut26 === true) {
                    return r2
                  }
                  branchCtx2 = ctx2.clone;
                  if (p1 instanceof Block.ValueLit.class) {
                    tmp99 = true;
                  } else {
                    tmp99 = false;
                  }
                  scrut27 = ! tmp99;
                  if (scrut27 === true) {
                    branchCtx2.add(p1, fs);
                  }
                  tmp100 = Block.concat(arm.body, restBlock3);
                  res7 = SpecializeHelpers.prop(branchCtx2, tmp100);
                  tmp101 = ShapeSet.restSet(r2[0], arm.cse);
                  tmp102 = ShapeSet.union(r2[1], res7[1]);
                  tmp103 = Block.Arm(arm.cse, res7[0]);
                  tmp104 = globalThis.Object.freeze([
                    ...r2[2],
                    tmp103
                  ]);
                  return globalThis.Object.freeze([
                    tmp101,
                    tmp102,
                    tmp104
                  ]);
                });
                tmp74 = runtime.safeCall(Predef.foldl(lambda4));
                tmp75 = ShapeSet.mkBot();
                tmp76 = globalThis.Object.freeze([]);
                tmp77 = globalThis.Object.freeze([
                  s3,
                  tmp75,
                  tmp76
                ]);
                filteredArms = runtime.safeCall(tmp74(tmp77, ...arms));
                scrut21 = filteredArms[2].length;
                switch (scrut21) {
                  case 0:
                    scrut22 = runtime.safeCall(filteredArms[0].isEmpty());
                    if (scrut22 === true) {
                      param0 = ctx2;
                      param1 = restBlock3;
                      id = 3;
                      continue loopLabel
                    }
                    if (dflt instanceof Option.Some.class) {
                      arg$Some$0$1 = dflt.value;
                      d = arg$Some$0$1;
                      tmp78 = d;
                    } else {
                      tmp78 = Block.End();
                    }
                    tmp79 = Block.concat(tmp78, restBlock3);
                    param0 = ctx2;
                    param1 = tmp79;
                    id = 3;
                    continue loopLabel;
                  case 1:
                    scrut23 = runtime.safeCall(filteredArms[0].isEmpty());
                    if (scrut23 === true) {
                      return globalThis.Object.freeze([
                        filteredArms[2][0].body,
                        filteredArms[1]
                      ])
                    }
                    if (dflt instanceof Option.Some.class) {
                      arg$Some$0$ = dflt.value;
                      d1 = arg$Some$0$;
                      branchCtx = ctx2.clone;
                      if (p1 instanceof Block.ValueLit.class) {
                        tmp80 = true;
                      } else {
                        tmp80 = false;
                      }
                      scrut24 = ! tmp80;
                      if (scrut24 === true) {
                        branchCtx.add(p1, filteredArms[0]);
                      }
                      tmp81 = Block.concat(d1, restBlock3);
                      newDflt = SpecializeHelpers.prop(branchCtx, tmp81);
                      tmp82 = Option.Some(newDflt[0]);
                      tmp83 = Block.End();
                      tmp84 = Block.Match(p1, filteredArms[2], tmp82, tmp83);
                      tmp85 = ShapeSet.union(filteredArms[1], newDflt[1]);
                      return globalThis.Object.freeze([
                        tmp84,
                        tmp85
                      ])
                    }
                    break;
                  default:
                    if (dflt instanceof Option.Some.class) {
                      arg$Some$0$ = dflt.value;
                      d2 = arg$Some$0$;
                      branchCtx1 = ctx2.clone;
                      if (p1 instanceof Block.ValueLit.class) {
                        tmp86 = true;
                      } else {
                        tmp86 = false;
                      }
                      scrut25 = ! tmp86;
                      if (scrut25 === true) {
                        branchCtx1.add(p1, filteredArms[0]);
                      }
                      tmp87 = Block.concat(d2, restBlock3);
                      newDflt1 = SpecializeHelpers.prop(branchCtx1, tmp87);
                      tmp88 = Option.Some(newDflt1[0]);
                      tmp89 = Block.End();
                      tmp90 = Block.Match(p1, filteredArms[2], tmp88, tmp89);
                      tmp91 = ShapeSet.union(filteredArms[1], newDflt1[1]);
                      return globalThis.Object.freeze([
                        tmp90,
                        tmp91
                      ])
                    }
                }
                tmp92 = Block.End();
                tmp93 = Block.Match(p1, filteredArms[2], Option.None, tmp92);
                return globalThis.Object.freeze([
                  tmp93,
                  filteredArms[1]
                ])
              }
            }
            tmp96 = ShapeSet.mkDyn();
            return globalThis.Object.freeze([
              param1,
              tmp96
            ]);
          }
          tmp97 = Block.Return(r1, implct1);
          tmp98 = Block.concat(blk1, tmp97);
          return globalThis.Object.freeze([
            tmp98,
            s1
          ]);
        case 4:
          let actualClass, defn, ps, scrut26, scrut27, preCtorBody, scrut28, scrut29, scrut30, ctorBody, scrut31, arg$FunDefn$0$, arg$FunDefn$1$, tmp99, lambda5, arg$FunDefn$2$, tmp100, arg$FunDefn$2$1, tmp101, tmp102, ctx3, argShapes;
          argShapes = param1;
          ctx3 = param2;
          actualClass = SpecializeHelpers.getActualClass(param0.value);
          defn = runtime.safeCall(actualClass["class$ctor$_instr"]());
          if (defn instanceof Block.FunDefn.class) {
            arg$FunDefn$0$ = defn.sym;
            arg$FunDefn$1$ = defn.params;
            if (arg$FunDefn$0$ instanceof Block.Symbol.class) {
              ps = arg$FunDefn$1$;
              tmp99 = globalThis.Object.freeze([
                argShapes
              ]);
              SpecializeHelpers.specializeName("class$ctor$", false, ps, tmp99);
              lambda5 = (undefined, function (p2, i, _) {
                let lambda6;
                lambda6 = (undefined, function (p21, j, _1) {
                  let tmp103;
                  tmp103 = Block.ValueRef(p21.sym);
                  return ctx3.add(tmp103, argShapes[j])
                });
                return runtime.safeCall(p2.forEach(lambda6))
              });
              runtime.safeCall(ps.forEach(lambda5));
              scrut26 = actualClass["preCtor$_instr"];
              if (scrut26 === undefined) {
                tmp100 = true;
              } else {
                tmp100 = false;
              }
              scrut27 = ! tmp100;
              if (scrut27 === true) {
                scrut28 = runtime.safeCall(actualClass["preCtor$_instr"]());
                if (scrut28 instanceof Block.FunDefn.class) {
                  arg$FunDefn$2$ = scrut28.body;
                  preCtorBody = arg$FunDefn$2$;
                  SpecializeHelpers.prop(ctx3, preCtorBody);
                  scrut29 = actualClass["class$ctor$_instr"];
                  if (scrut29 === undefined) {
                    tmp101 = true;
                  } else {
                    tmp101 = false;
                  }
                  scrut30 = ! tmp101;
                  if (scrut30 === true) {
                    scrut31 = runtime.safeCall(actualClass["class$ctor$_instr"]());
                    if (scrut31 instanceof Block.FunDefn.class) {
                      arg$FunDefn$2$1 = scrut31.body;
                      ctorBody = arg$FunDefn$2$1;
                      SpecializeHelpers.prop(ctx3, ctorBody);
                      tmp102 = Option.Some(ps);
                      return ShapeSet.mkClassFromMap(param0, ctx3.valDefnCtx, tmp102)
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
      throw globalThis.Object.freeze(new globalThis.Error("match error"));
    } else if (p instanceof Block.ValueLit.class) {
      arg$ValueLit$0$ = p.lit;
      lit = arg$ValueLit$0$;
      tmp9 = runtime.safeCall(lit.toString());
      tmp10 = "Lit(" + tmp9;
      return tmp10 + ")"
    }
    throw globalThis.Object.freeze(new globalThis.Error("match error"));
  } 
  static sov(v) {
    let scrut, scrut1, scrut2, scrut3, scrut4, meta, clsName, paramsOpt, scrut5, classSymbol, argsMap, scrut6, scrut7, scrut8, tmp, tmp1, tmp2, tmp3, tmp4, lambda, tmp5, tmp6, tmp7, lambda1, tmp8;
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
      tmp = runtime.safeCall(v.map(SpecializeHelpers.sov));
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
      scrut8 = ! tmp2;
      if (scrut8 === true) {
        scrut4 = v.constructor[Predef.Symbols.definitionMetadata];
        if (scrut4 === undefined) {
          tmp3 = true;
        } else {
          tmp3 = false;
        }
        scrut7 = ! tmp3;
        if (scrut7 === true) {
          meta = v.constructor[Predef.Symbols.definitionMetadata];
          clsName = meta[1];
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
          tmp6 = globalThis.Object.freeze([]);
          classSymbol = Block.ConcreteClassSymbol(clsName, v.constructor, paramsOpt, tmp6);
          argsMap = globalThis.Object.freeze(new globalThis.Map());
          if (paramsOpt instanceof Option.None.class) {
            tmp7 = true;
          } else {
            tmp7 = false;
          }
          scrut6 = ! tmp7;
          if (scrut6 === true) {
            lambda1 = (undefined, function (n, _, _1) {
              let tmp9;
              tmp9 = SpecializeHelpers.sov(v[n]);
              return argsMap.set(n, tmp9)
            });
            runtime.safeCall(meta[2].forEach(lambda1));
            return ShapeSet.mkClassFromMap(classSymbol, argsMap, Option.None)
          }
          return ShapeSet.mkClassFromMap(classSymbol, argsMap, Option.None);
        }
      }
    }
    tmp8 = runtime.safeCall(v.toString());
    throw globalThis.Error("unknown value from sov", tmp8);
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
            tmp5 = ShapeSet.union(tmp3, tmp4);
            knownMap.set(sym, tmp5);
            return acc
          }
          tmp6 = ShapeSet.lift(s);
          knownMap.set(sym, tmp6);
          return acc;
        }
      }
      tmp7 = ShapeSet.mkDyn();
      return ShapeSet.union(acc, tmp7)
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
  static dispatchMethodCall(ctx, xOpt, implctOpt, symb, f, args) {
    let pss, argShapes, splitRes, knownMap, unkShape, knownMapArr, isRet, scrut, dfltMatch, i, x, x_, C_i, ss_i, genMap, f_gen, ret, retSym, retShape, callRes, i1, x1, x_1, scrut1, armsRet, armsAcc, totalStagedRetShape, dfltRet, scrut2, dfltMatch1, i2, x2, x_2, matchBody, scrut3, scrut4, totalRetShape, tmp, lambda, tmp1, tmp2, tmp3, tmp4, tmp5, arg$Some$0$, tmp6, tmp7, tmp8, arg$Some$0$1, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, arg$Some$0$2, tmp17, tmp18, arg$Some$0$3, tmp19, tmp20, tmp21, lambda1, lambda2, lambda3, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, arg$Some$0$4, tmp29, tmp30, tmp31, tmp32, tmp33, arg$Some$0$5, tmp34, tmp35, tmp36, tmp37, tmp38, tmp39, tmp40, tmp41;
    tmp = Block.ValueRef(symb);
    pss = SpecializeHelpers.sop(ctx, tmp);
    lambda = (undefined, function (a) {
      return SpecializeHelpers.sop(ctx, a.value)
    });
    argShapes = runtime.safeCall(args.map(lambda));
    splitRes = SpecializeHelpers.fsplit(pss);
    knownMap = splitRes.knownMap;
    unkShape = splitRes.unkShape;
    tmp1 = runtime.safeCall(knownMap.entries());
    knownMapArr = globalThis.Object.freeze([
      ...tmp1
    ]);
    if (xOpt instanceof Option.None.class) {
      tmp2 = true;
    } else {
      tmp2 = false;
    }
    isRet = tmp2;
    scrut = knownMap.size;
    switch (scrut) {
      case 0:
        tmp3 = Block.ValueRef(symb);
        tmp4 = Block.Symbol(f);
        tmp5 = Block.Select(tmp3, tmp4);
        dfltMatch = Block.Call(tmp5, args);
        if (isRet === true) {
          if (implctOpt instanceof Option.Some.class) {
            arg$Some$0$ = implctOpt.value;
            i = arg$Some$0$;
            tmp6 = i;
          } else {
            tmp6 = false;
          }
          tmp7 = Block.Return(dfltMatch, tmp6);
          tmp8 = ShapeSet.mkDyn();
          return globalThis.Object.freeze([
            tmp7,
            tmp8
          ])
        }
        if (xOpt instanceof Option.Some.class) {
          arg$Some$0$1 = xOpt.value;
          x_ = arg$Some$0$1;
          tmp9 = x_;
          x = tmp9;
          tmp10 = Block.End();
          tmp11 = Block.Assign(x, dfltMatch, tmp10);
          tmp12 = ShapeSet.mkDyn();
          return globalThis.Object.freeze([
            tmp11,
            tmp12
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
          tmp13 = runtime.safeCall(f_gen(ss_i));
          ret = runtime.safeCall(tmp13(...argShapes));
          retSym = ret[0];
          retShape = ret[1];
          tmp14 = Block.ValueRef(symb);
          tmp15 = Block.Symbol(retSym);
          tmp16 = Block.Select(tmp14, tmp15);
          callRes = Block.Call(tmp16, args);
          if (isRet === true) {
            if (implctOpt instanceof Option.Some.class) {
              arg$Some$0$2 = implctOpt.value;
              i1 = arg$Some$0$2;
              tmp17 = i1;
            } else {
              tmp17 = false;
            }
            tmp18 = Block.Return(callRes, tmp17);
            return globalThis.Object.freeze([
              tmp18,
              retShape
            ])
          }
          if (xOpt instanceof Option.Some.class) {
            arg$Some$0$3 = xOpt.value;
            x_1 = arg$Some$0$3;
            tmp19 = x_1;
            x1 = tmp19;
            tmp20 = Block.End();
            tmp21 = Block.Assign(x1, callRes, tmp20);
            return globalThis.Object.freeze([
              tmp21,
              retShape
            ])
          }
          throw runtime.safeCall(globalThis.Error("unreachable"));
        }
        break;
    }
    lambda1 = (undefined, function (entry) {
      let C_i1, ss_i1, genMap1, f_gen1, retSym1, retShape1, callRes1, i3, x3, x_3, tmp42, tmp43, tmp44, tmp45, tmp46, tmp47, tmp48, tmp49, tmp50, arg$Some$0$6, tmp51, tmp52, tmp53, arg$Some$0$7, tmp54, tmp55, tmp56, tmp57, tmp58, tmp59;
      C_i1 = entry[0];
      ss_i1 = entry[1];
      genMap1 = SpecializeHelpers.getClassGenMap(C_i1.value);
      f_gen1 = runtime.safeCall(genMap1.get(f));
      tmp42 = runtime.safeCall(f_gen1(ss_i1));
      tmp43 = runtime.safeCall(tmp42(...argShapes));
      retSym1 = tmp43[0];
      tmp44 = runtime.safeCall(f_gen1(ss_i1));
      tmp45 = runtime.safeCall(tmp44(...argShapes));
      retShape1 = tmp45[1];
      tmp46 = Block.ValueRef(symb);
      tmp47 = Block.Symbol(retSym1);
      tmp48 = Block.Select(tmp46, tmp47);
      callRes1 = Block.Call(tmp48, args);
      if (isRet === true) {
        tmp49 = Block.ValueRef(symb);
        tmp50 = Block.Cls(C_i1, tmp49);
        if (implctOpt instanceof Option.Some.class) {
          arg$Some$0$6 = implctOpt.value;
          i3 = arg$Some$0$6;
          tmp51 = i3;
        } else {
          tmp51 = false;
        }
        tmp52 = Block.Return(callRes1, tmp51);
        tmp53 = Block.Arm(tmp50, tmp52);
        return globalThis.Object.freeze([
          tmp53,
          retShape1
        ])
      }
      if (xOpt instanceof Option.Some.class) {
        arg$Some$0$7 = xOpt.value;
        x_3 = arg$Some$0$7;
        tmp54 = x_3;
        x3 = tmp54;
        tmp55 = Block.ValueRef(symb);
        tmp56 = Block.Cls(C_i1, tmp55);
        tmp57 = Block.End();
        tmp58 = Block.Assign(x3, callRes1, tmp57);
        tmp59 = Block.Arm(tmp56, tmp58);
        return globalThis.Object.freeze([
          tmp59,
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
      return ShapeSet.union(acc, x3[1])
    });
    tmp22 = runtime.safeCall(Predef.foldl(lambda3));
    tmp23 = ShapeSet.mkBot();
    totalStagedRetShape = runtime.safeCall(tmp22(tmp23, ...armsRet));
    scrut2 = runtime.safeCall(unkShape.isEmpty());
    if (scrut2 === true) {
      tmp24 = ShapeSet.mkBot();
      tmp25 = globalThis.Object.freeze([
        Option.None,
        tmp24
      ]);
    } else {
      tmp26 = Block.ValueRef(symb);
      tmp27 = Block.Symbol(f);
      tmp28 = Block.Select(tmp26, tmp27);
      dfltMatch1 = Block.Call(tmp28, args);
      if (isRet === true) {
        if (implctOpt instanceof Option.Some.class) {
          arg$Some$0$4 = implctOpt.value;
          i2 = arg$Some$0$4;
          tmp29 = i2;
        } else {
          tmp29 = false;
        }
        tmp30 = Block.Return(dfltMatch1, tmp29);
        tmp31 = Option.Some(tmp30);
        tmp32 = ShapeSet.mkDyn();
        tmp33 = globalThis.Object.freeze([
          tmp31,
          tmp32
        ]);
      } else {
        if (xOpt instanceof Option.Some.class) {
          arg$Some$0$5 = xOpt.value;
          x_2 = arg$Some$0$5;
          tmp34 = x_2;
          x2 = tmp34;
          tmp35 = Block.End();
          tmp36 = Block.Assign(x2, dfltMatch1, tmp35);
          tmp37 = Option.Some(tmp36);
          tmp38 = ShapeSet.mkDyn();
          tmp33 = globalThis.Object.freeze([
            tmp37,
            tmp38
          ]);
        } else {
          throw runtime.safeCall(globalThis.Error("unreachable"))
        }
      }
      tmp25 = tmp33;
    }
    dfltRet = tmp25;
    split_root$: {
      scrut3 = knownMap.size;
      if (scrut3 === 1) {
        scrut4 = runtime.safeCall(unkShape.isEmpty());
        if (scrut4 === true) {
          tmp39 = armsAcc[0].body;
          break split_root$
        }
      }
      tmp40 = Block.ValueRef(symb);
      tmp41 = Block.End();
      tmp39 = Block.Match(tmp40, armsAcc, dfltRet[0], tmp41);
    }
    matchBody = tmp39;
    totalRetShape = ShapeSet.union(totalStagedRetShape, dfltRet[1]);
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
    let defn, body, ps, isMethod, scrut, newName, scrut1, x, paramShapes, ctx, res, bodyWithScoped, actualRetShape, finalBody, scrut2, allocs, v2p, entry, arg$FunDefn$0$, arg$FunDefn$1$, arg$FunDefn$2$, tmp, arg$Some$0$, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, lambda, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20;
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
            tmp4 = [];
            tmp5 = Option.Some(shapes[0][0]);
            tmp6 = SpecializeHelpers.Ctx(tmp2, tmp3, tmp4, tmp5);
          } else {
            tmp6 = SpecializeHelpers.Ctx.class.empty();
          }
          ctx = tmp6;
          if (isMethod === true) {
            tmp7 = Block.Symbol("_this");
            tmp8 = Block.ValueRef(tmp7);
            tmp9 = Option.Some(shapes[0][0]);
            ctx.add(tmp8, tmp9);
          }
          lambda = (undefined, function (p, i, _) {
            let lambda1;
            lambda1 = (undefined, function (p2, j, _1) {
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
            return runtime.safeCall(p.forEach(lambda1))
          });
          runtime.safeCall(ps.forEach(lambda));
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
            v2p = ShapeSet.val2path(tmp14, allocs);
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
