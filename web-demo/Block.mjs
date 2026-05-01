const definitionMetadata = globalThis.Symbol.for("mlscript.definitionMetadata");
const prettyPrint = globalThis.Symbol.for("mlscript.prettyPrint");
import runtime from "./Runtime.mjs";
import Predef from "./Predef.mjs";
import Option from "./Option.mjs";
import StrOps from "./StrOps.mjs";
import Runtime from "./Runtime.mjs";
import fs from "fs";
import process from "process";
import path from "path";
import url from "url";
let Block2;
(class Block {
  static {
    Block2 = this
  }
  static #getmodule;
  static {
    this.Symbol = function Symbol(name) {
      return globalThis.Object.freeze(new Symbol.class(name));
    };
    (class Symbol {
      static {
        Block.Symbol.class = this
      }
      constructor(name) {
        this.name = name;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Symbol", ["name"]]; 
    });
    this.ClassSymbol = function ClassSymbol(name) {
      return globalThis.Object.freeze(new ClassSymbol.class(name));
    };
    (class ClassSymbol extends Block.Symbol.class {
      static {
        Block.ClassSymbol.class = this
      }
      constructor(name) {
        super(name);
        this.name = name;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "ClassSymbol", ["name"]]; 
    });
    this.VirtualClassSymbol = function VirtualClassSymbol(name) {
      return globalThis.Object.freeze(new VirtualClassSymbol.class(name));
    };
    (class VirtualClassSymbol extends Block.ClassSymbol.class {
      static {
        Block.VirtualClassSymbol.class = this
      }
      constructor(name) {
        super(name);
        this.name = name;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "VirtualClassSymbol", ["name"]]; 
    });
    this.ConcreteClassSymbol = function ConcreteClassSymbol(name, value, paramsOpt, auxParams, redirect) {
      return globalThis.Object.freeze(new ConcreteClassSymbol.class(name, value, paramsOpt, auxParams, redirect));
    };
    (class ConcreteClassSymbol extends Block.ClassSymbol.class {
      static {
        Block.ConcreteClassSymbol.class = this
      }
      constructor(name, value, paramsOpt, auxParams, redirect) {
        super(name);
        this.name = name;
        this.value = value;
        this.paramsOpt = paramsOpt;
        this.auxParams = auxParams;
        this.redirect = redirect;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "ConcreteClassSymbol", ["name", "value", "paramsOpt", "auxParams", "redirect"]]; 
    });
    this.ModuleSymbol = function ModuleSymbol(name, value, redirect) {
      return globalThis.Object.freeze(new ModuleSymbol.class(name, value, redirect));
    };
    (class ModuleSymbol extends Block.Symbol.class {
      static {
        Block.ModuleSymbol.class = this
      }
      constructor(name, value, redirect) {
        super(name);
        this.name = name;
        this.value = value;
        this.redirect = redirect;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "ModuleSymbol", ["name", "value", "redirect"]]; 
    });
    this.NoSymbol = function NoSymbol() {
      return globalThis.Object.freeze(new NoSymbol.class());
    };
    (class NoSymbol extends Block.Symbol.class {
      static {
        Block.NoSymbol.class = this
      }
      constructor() {
        super("$no_symbol$");
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "NoSymbol", []]; 
    });
    (class Constraint {
      static {
        Block.Constraint = this
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Constraint"]; 
    });
    this.Dynamic = function Dynamic() {
      return globalThis.Object.freeze(new Dynamic.class());
    };
    (class Dynamic extends Block.Constraint {
      static {
        Block.Dynamic.class = this
      }
      constructor() {
        super();
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Dynamic", []]; 
    });
    this.Static = function Static() {
      return globalThis.Object.freeze(new Static.class());
    };
    (class Static extends Block.Constraint {
      static {
        Block.Static.class = this
      }
      constructor() {
        super();
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Static", []]; 
    });
    this.Param = function Param(constraint, sym) {
      return globalThis.Object.freeze(new Param.class(constraint, sym));
    };
    (class Param {
      static {
        Block.Param.class = this
      }
      constructor(constraint, sym) {
        this.constraint = constraint;
        this.sym = sym;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Param", ["constraint", "sym"]]; 
    });
    this.Arm = function Arm(cse, body) {
      return globalThis.Object.freeze(new Arm.class(cse, body));
    };
    (class Arm {
      static {
        Block.Arm.class = this
      }
      constructor(cse, body) {
        this.cse = cse;
        this.body = body;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Arm", ["cse", "body"]]; 
    });
    this.Arg = function Arg(value) {
      return globalThis.Object.freeze(new Arg.class(value));
    };
    (class Arg {
      static {
        Block.Arg.class = this
      }
      constructor(value) {
        this.value = value;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Arg", ["value"]]; 
    });
    (class Case {
      static {
        Block.Case = this
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Case"]; 
    });
    this.Lit = function Lit(lit) {
      return globalThis.Object.freeze(new Lit.class(lit));
    };
    (class Lit extends Block.Case {
      static {
        Block.Lit.class = this
      }
      constructor(lit) {
        super();
        this.lit = lit;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Lit", ["lit"]]; 
    });
    this.Cls = function Cls(cls, path1) {
      return globalThis.Object.freeze(new Cls.class(cls, path1));
    };
    (class Cls extends Block.Case {
      static {
        Block.Cls.class = this
      }
      constructor(cls, path1) {
        super();
        this.cls = cls;
        this.path = path1;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Cls", ["cls", "path"]]; 
    });
    this.Tup = function Tup(len) {
      return globalThis.Object.freeze(new Tup.class(len));
    };
    (class Tup extends Block.Case {
      static {
        Block.Tup.class = this
      }
      constructor(len) {
        super();
        this.len = len;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Tup", ["len"]]; 
    });
    (class Result {
      static {
        Block.Result = this
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Result"]; 
    });
    this.Call = function Call(_fun, args) {
      return globalThis.Object.freeze(new Call.class(_fun, args));
    };
    (class Call extends Block.Result {
      static {
        Block.Call.class = this
      }
      constructor(_fun, args) {
        super();
        this._fun = _fun;
        this.args = args;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Call", ["_fun", "args"]]; 
    });
    this.Instantiate = function Instantiate(cls, args) {
      return globalThis.Object.freeze(new Instantiate.class(cls, args));
    };
    (class Instantiate extends Block.Result {
      static {
        Block.Instantiate.class = this
      }
      constructor(cls, args) {
        super();
        this.cls = cls;
        this.args = args;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Instantiate", ["cls", "args"]]; 
    });
    this.Tuple = function Tuple(elems) {
      return globalThis.Object.freeze(new Tuple.class(elems));
    };
    (class Tuple extends Block.Result {
      static {
        Block.Tuple.class = this
      }
      constructor(elems) {
        super();
        this.elems = elems;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Tuple", ["elems"]]; 
    });
    (class Path extends Block.Result {
      static {
        Block.Path = this
      }
      constructor() {
        super();
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Path"]; 
    });
    this.Select = function Select(qual, name) {
      return globalThis.Object.freeze(new Select.class(qual, name));
    };
    (class Select extends Block.Path {
      static {
        Block.Select.class = this
      }
      constructor(qual, name) {
        super();
        this.qual = qual;
        this.name = name;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Select", ["qual", "name"]]; 
    });
    this.DynSelect = function DynSelect(qual, fld, arrayIdx) {
      return globalThis.Object.freeze(new DynSelect.class(qual, fld, arrayIdx));
    };
    (class DynSelect extends Block.Path {
      static {
        Block.DynSelect.class = this
      }
      constructor(qual, fld, arrayIdx) {
        super();
        this.qual = qual;
        this.fld = fld;
        this.arrayIdx = arrayIdx;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "DynSelect", ["qual", "fld", "arrayIdx"]]; 
    });
    this.ValueRef = function ValueRef(l) {
      return globalThis.Object.freeze(new ValueRef.class(l));
    };
    (class ValueRef extends Block.Path {
      static {
        Block.ValueRef.class = this
      }
      constructor(l) {
        super();
        this.l = l;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "ValueRef", ["l"]]; 
    });
    this.ValueLit = function ValueLit(lit) {
      return globalThis.Object.freeze(new ValueLit.class(lit));
    };
    (class ValueLit extends Block.Path {
      static {
        Block.ValueLit.class = this
      }
      constructor(lit) {
        super();
        this.lit = lit;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "ValueLit", ["lit"]]; 
    });
    (class Defn {
      static {
        Block.Defn = this
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Defn"]; 
    });
    this.ValDefn = function ValDefn(owner, sym, rhs) {
      return globalThis.Object.freeze(new ValDefn.class(owner, sym, rhs));
    };
    (class ValDefn extends Block.Defn {
      static {
        Block.ValDefn.class = this
      }
      constructor(owner, sym, rhs) {
        super();
        this.owner = owner;
        this.sym = sym;
        this.rhs = rhs;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "ValDefn", ["owner", "sym", "rhs"]]; 
    });
    this.ClsLikeDefn = function ClsLikeDefn(sym, methods, companion) {
      return globalThis.Object.freeze(new ClsLikeDefn.class(sym, methods, companion));
    };
    (class ClsLikeDefn extends Block.Defn {
      static {
        Block.ClsLikeDefn.class = this
      }
      constructor(sym, methods, companion) {
        super();
        this.sym = sym;
        this.methods = methods;
        this.companion = companion;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "ClsLikeDefn", ["sym", "methods", "companion"]]; 
    });
    this.FunDefn = function FunDefn(sym, params, body) {
      return globalThis.Object.freeze(new FunDefn.class(sym, params, body));
    };
    (class FunDefn extends Block.Defn {
      static {
        Block.FunDefn.class = this
      }
      constructor(sym, params, body) {
        super();
        this.sym = sym;
        this.params = params;
        this.body = body;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "FunDefn", ["sym", "params", "body"]]; 
    });
    this.ClsLikeBody = function ClsLikeBody(isym, methods, publicFields) {
      return globalThis.Object.freeze(new ClsLikeBody.class(isym, methods, publicFields));
    };
    (class ClsLikeBody {
      static {
        Block.ClsLikeBody.class = this
      }
      constructor(isym, methods, publicFields) {
        this.isym = isym;
        this.methods = methods;
        this.publicFields = publicFields;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "ClsLikeBody", ["isym", "methods", "publicFields"]]; 
    });
    (class Block1 {
      static {
        Block.Block = this
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Block"]; 
    });
    this.Match = function Match(scrut, arms, dflt, rest) {
      return globalThis.Object.freeze(new Match.class(scrut, arms, dflt, rest));
    };
    (class Match extends Block.Block {
      static {
        Block.Match.class = this
      }
      constructor(scrut, arms, dflt, rest) {
        super();
        this.scrut = scrut;
        this.arms = arms;
        this.dflt = dflt;
        this.rest = rest;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Match", ["scrut", "arms", "dflt", "rest"]]; 
    });
    this.Return = function Return(res, implct) {
      return globalThis.Object.freeze(new Return.class(res, implct));
    };
    (class Return extends Block.Block {
      static {
        Block.Return.class = this
      }
      constructor(res, implct) {
        super();
        this.res = res;
        this.implct = implct;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Return", ["res", "implct"]]; 
    });
    this.Assign = function Assign(lhs, rhs, rest) {
      return globalThis.Object.freeze(new Assign.class(lhs, rhs, rest));
    };
    (class Assign extends Block.Block {
      static {
        Block.Assign.class = this
      }
      constructor(lhs, rhs, rest) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.rest = rest;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Assign", ["lhs", "rhs", "rest"]]; 
    });
    this.Define = function Define(defn, rest) {
      return globalThis.Object.freeze(new Define.class(defn, rest));
    };
    (class Define extends Block.Block {
      static {
        Block.Define.class = this
      }
      constructor(defn, rest) {
        super();
        this.defn = defn;
        this.rest = rest;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Define", ["defn", "rest"]]; 
    });
    this.Scoped = function Scoped(symbols, rest) {
      return globalThis.Object.freeze(new Scoped.class(symbols, rest));
    };
    (class Scoped extends Block.Block {
      static {
        Block.Scoped.class = this
      }
      constructor(symbols, rest) {
        super();
        this.symbols = symbols;
        this.rest = rest;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Scoped", ["symbols", "rest"]]; 
    });
    this.End = function End() {
      return globalThis.Object.freeze(new End.class());
    };
    (class End extends Block.Block {
      static {
        Block.End.class = this
      }
      constructor() {
        super();
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "End", []]; 
    });
    this.Printer = function Printer(owner) {
      return globalThis.Object.freeze(new Printer.class(owner));
    };
    (class Printer {
      static {
        Block.Printer.class = this
      }
      constructor(owner) {
        this.owner = owner;
      }
      static {
        let tmp;
        tmp = Block.Printer(Option.None);
        this.default = tmp;
      }
      showLiteral(l) {
        let tmp, tmp1;
        if (l === undefined) {
          return "undefined"
        } else if (l === null) {
          return "null"
        } else if (typeof l === 'string') {
          tmp = runtime.safeCall(l.toString());
          tmp1 = "\"" + tmp;
          return tmp1 + "\""
        }
        return runtime.safeCall(l.toString());
      } 
      showDefnSymbol(s) {
        return s.name.replaceAll("$", "_")
      } 
      showSymbol(s) {
        let owner1, scrut, scrut1, arg$Some$0$, tmp, tmp1, tmp2, tmp3;
        split_1$: {
          if (s instanceof Block.ModuleSymbol.class) {
            scrut1 = this.owner;
            if (scrut1 instanceof Option.Some.class) {
              arg$Some$0$ = scrut1.value;
              owner1 = arg$Some$0$;
              scrut = s.redirect;
              if (scrut === true) {
                break split_1$
              }
              return s.name.replaceAll("$", "_")
            }
            return s.name.replaceAll("$", "_");
          } else if (s instanceof Block.ConcreteClassSymbol.class) {
            scrut1 = this.owner;
            if (scrut1 instanceof Option.Some.class) {
              arg$Some$0$ = scrut1.value;
              owner1 = arg$Some$0$;
              scrut = s.redirect;
              if (scrut === true) {
                break split_1$
              }
              return s.name.replaceAll("$", "_")
            }
            return s.name.replaceAll("$", "_");
          }
          return s.name.replaceAll("$", "_");
        }
        tmp = owner1.name + ".\"";
        tmp1 = tmp + s.name;
        tmp2 = tmp1 + "$";
        tmp3 = tmp2 + owner1.name;
        return tmp3 + "\""
      } 
      showPath(p) {
        let name, qual, sym, owner1, scrut, scrut1, sym1, qual1, fld, qual2, fld1, l, lit, arg$ValueLit$0$, arg$ValueRef$0$, arg$DynSelect$0$, arg$DynSelect$1$, arg$DynSelect$2$, arg$Select$0$, arg$Select$1$, arg$ValueRef$0$1, arg$Some$0$, arg$ValueRef$0$2, arg$Symbol$0$, arg$ModuleSymbol$0$, arg$ModuleSymbol$1$, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11;
        split_default$: {
          split_1$: {
            split_2$: {
              if (p instanceof Block.Select.class) {
                arg$Select$0$ = p.qual;
                arg$Select$1$ = p.name;
                if (arg$Select$0$ instanceof Block.ValueRef.class) {
                  arg$ValueRef$0$2 = arg$Select$0$.l;
                  if (arg$ValueRef$0$2 instanceof Block.Symbol.class) {
                    arg$Symbol$0$ = arg$ValueRef$0$2.name;
                    if (arg$Symbol$0$ === "runtime") {
                      if (arg$Select$1$ instanceof Block.ModuleSymbol.class) {
                        arg$ModuleSymbol$0$ = arg$Select$1$.name;
                        arg$ModuleSymbol$1$ = arg$Select$1$.value;
                        if (arg$ModuleSymbol$0$ === "Unit") {
                          if (arg$ModuleSymbol$1$ instanceof Runtime.Unit.class) {
                            return "()"
                          }
                          name = arg$Select$1$;
                          qual = arg$Select$0$;
                          if (qual instanceof Block.ValueRef.class) {
                            arg$ValueRef$0$1 = qual.l;
                            sym = arg$ValueRef$0$1;
                            scrut1 = this.owner;
                            if (scrut1 instanceof Option.Some.class) {
                              arg$Some$0$ = scrut1.value;
                              owner1 = arg$Some$0$;
                              scrut = Predef.equals(sym, owner1);
                              if (scrut === true) {
                                break split_1$
                              }
                              sym1 = arg$ValueRef$0$1;
                              if (sym1 instanceof Block.ClassSymbol.class) {
                                break split_2$
                              }
                            } else {
                              sym1 = arg$ValueRef$0$1;
                              if (sym1 instanceof Block.ClassSymbol.class) {
                                break split_2$
                              }
                            }
                          }
                        } else {
                          name = arg$Select$1$;
                          qual = arg$Select$0$;
                          if (qual instanceof Block.ValueRef.class) {
                            arg$ValueRef$0$1 = qual.l;
                            sym = arg$ValueRef$0$1;
                            scrut1 = this.owner;
                            if (scrut1 instanceof Option.Some.class) {
                              arg$Some$0$ = scrut1.value;
                              owner1 = arg$Some$0$;
                              scrut = Predef.equals(sym, owner1);
                              if (scrut === true) {
                                break split_1$
                              }
                              sym1 = arg$ValueRef$0$1;
                              if (sym1 instanceof Block.ClassSymbol.class) {
                                break split_2$
                              }
                            } else {
                              sym1 = arg$ValueRef$0$1;
                              if (sym1 instanceof Block.ClassSymbol.class) {
                                break split_2$
                              }
                            }
                          }
                        }
                      } else {
                        name = arg$Select$1$;
                        qual = arg$Select$0$;
                        if (qual instanceof Block.ValueRef.class) {
                          arg$ValueRef$0$1 = qual.l;
                          sym = arg$ValueRef$0$1;
                          scrut1 = this.owner;
                          if (scrut1 instanceof Option.Some.class) {
                            arg$Some$0$ = scrut1.value;
                            owner1 = arg$Some$0$;
                            scrut = Predef.equals(sym, owner1);
                            if (scrut === true) {
                              break split_1$
                            }
                            sym1 = arg$ValueRef$0$1;
                            if (sym1 instanceof Block.ClassSymbol.class) {
                              break split_2$
                            }
                          } else {
                            sym1 = arg$ValueRef$0$1;
                            if (sym1 instanceof Block.ClassSymbol.class) {
                              break split_2$
                            }
                          }
                        }
                      }
                    } else {
                      name = arg$Select$1$;
                      qual = arg$Select$0$;
                      if (qual instanceof Block.ValueRef.class) {
                        arg$ValueRef$0$1 = qual.l;
                        sym = arg$ValueRef$0$1;
                        scrut1 = this.owner;
                        if (scrut1 instanceof Option.Some.class) {
                          arg$Some$0$ = scrut1.value;
                          owner1 = arg$Some$0$;
                          scrut = Predef.equals(sym, owner1);
                          if (scrut === true) {
                            break split_1$
                          }
                          sym1 = arg$ValueRef$0$1;
                          if (sym1 instanceof Block.ClassSymbol.class) {
                            break split_2$
                          }
                        } else {
                          sym1 = arg$ValueRef$0$1;
                          if (sym1 instanceof Block.ClassSymbol.class) {
                            break split_2$
                          }
                        }
                      }
                    }
                  } else {
                    name = arg$Select$1$;
                    qual = arg$Select$0$;
                    if (qual instanceof Block.ValueRef.class) {
                      arg$ValueRef$0$1 = qual.l;
                      sym = arg$ValueRef$0$1;
                      scrut1 = this.owner;
                      if (scrut1 instanceof Option.Some.class) {
                        arg$Some$0$ = scrut1.value;
                        owner1 = arg$Some$0$;
                        scrut = Predef.equals(sym, owner1);
                        if (scrut === true) {
                          break split_1$
                        }
                        sym1 = arg$ValueRef$0$1;
                        if (sym1 instanceof Block.ClassSymbol.class) {
                          break split_2$
                        }
                      } else {
                        sym1 = arg$ValueRef$0$1;
                        if (sym1 instanceof Block.ClassSymbol.class) {
                          break split_2$
                        }
                      }
                    }
                  }
                } else {
                  name = arg$Select$1$;
                  qual = arg$Select$0$;
                  if (qual instanceof Block.ValueRef.class) {
                    arg$ValueRef$0$1 = qual.l;
                    sym = arg$ValueRef$0$1;
                    scrut1 = this.owner;
                    if (scrut1 instanceof Option.Some.class) {
                      arg$Some$0$ = scrut1.value;
                      owner1 = arg$Some$0$;
                      scrut = Predef.equals(sym, owner1);
                      if (scrut === true) {
                        break split_1$
                      }
                      sym1 = arg$ValueRef$0$1;
                      if (sym1 instanceof Block.ClassSymbol.class) {
                        break split_2$
                      }
                    } else {
                      sym1 = arg$ValueRef$0$1;
                      if (sym1 instanceof Block.ClassSymbol.class) {
                        break split_2$
                      }
                    }
                  }
                }
                tmp8 = this.showPath(qual);
                tmp9 = tmp8 + ".";
                tmp10 = this.showSymbol(name);
                return tmp9 + tmp10
              } else if (p instanceof Block.DynSelect.class) {
                arg$DynSelect$0$ = p.qual;
                arg$DynSelect$1$ = p.fld;
                arg$DynSelect$2$ = p.arrayIdx;
                switch (arg$DynSelect$2$) {
                  case false:
                    fld = arg$DynSelect$1$;
                    qual1 = arg$DynSelect$0$;
                    tmp = this.showPath(qual1);
                    tmp1 = tmp + ".(";
                    tmp2 = this.showPath(fld);
                    tmp3 = tmp1 + tmp2;
                    return tmp3 + ")";
                  case true:
                    fld1 = arg$DynSelect$1$;
                    qual2 = arg$DynSelect$0$;
                    tmp4 = this.showPath(qual2);
                    tmp5 = tmp4 + ".[";
                    tmp6 = this.showPath(fld1);
                    tmp7 = tmp5 + tmp6;
                    return tmp7 + "]";
                }
                break split_default$
              } else if (p instanceof Block.ValueRef.class) {
                arg$ValueRef$0$ = p.l;
                l = arg$ValueRef$0$;
                return this.showSymbol(l)
              } else if (p instanceof Block.ValueLit.class) {
                arg$ValueLit$0$ = p.lit;
                lit = arg$ValueLit$0$;
                return this.showLiteral(lit)
              }
              break split_default$;
            }
            tmp11 = this.showSymbol(name);
            return "this." + tmp11;
          }
          return this.showSymbol(name);
        }
        throw globalThis.Object.freeze(new globalThis.Error("match error"))
      } 
      showArg(arg) {
        return this.showPath(arg.value)
      } 
      showArgs(args) {
        let lambda, tmp;
        const this$Printer = this;
        lambda = (undefined, function (_0) {
          return this$Printer.showArg(_0)
        });
        tmp = runtime.safeCall(args.map(lambda));
        return runtime.safeCall(tmp.join(", "))
      } 
      showResult(r) {
        let fun_, args, rhs, lhs, cls, args1, prefix, scrut, scrut1, elems, arg$Tuple$0$, arg$Instantiate$0$, arg$Instantiate$1$, arg$Call$0$, arg$Call$1$, element1$, element0$, arg$ValueRef$0$, arg$Symbol$0$, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, arg$ValueRef$0$1, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18;
        if (r instanceof Block.Path) {
          return this.showPath(r)
        } else if (r instanceof Block.Call.class) {
          arg$Call$0$ = r._fun;
          arg$Call$1$ = r.args;
          args = arg$Call$1$;
          fun_ = arg$Call$0$;
          if (runtime.Tuple.isArrayLike(args) && args.length === 2) {
            element0$ = runtime.Tuple.get(args, 0);
            element1$ = runtime.Tuple.get(args, 1);
            rhs = element1$;
            lhs = element0$;
            if (fun_ instanceof Block.ValueRef.class) {
              arg$ValueRef$0$ = fun_.l;
              if (arg$ValueRef$0$ instanceof Block.Symbol.class) {
                arg$Symbol$0$ = arg$ValueRef$0$.name;
                switch (arg$Symbol$0$) {
                  case "+":
                    tmp = this.showArg(lhs);
                    tmp1 = tmp + " + ";
                    tmp2 = this.showArg(rhs);
                    return tmp1 + tmp2;
                  case "-":
                    tmp3 = this.showArg(lhs);
                    tmp4 = tmp3 + " - ";
                    tmp5 = this.showArg(rhs);
                    return tmp4 + tmp5;
                }
              }
            }
          }
          tmp15 = this.showPath(fun_);
          tmp16 = tmp15 + "(";
          tmp17 = this.showArgs(args);
          tmp18 = tmp16 + tmp17;
          return tmp18 + ")"
        } else if (r instanceof Block.Instantiate.class) {
          arg$Instantiate$0$ = r.cls;
          arg$Instantiate$1$ = r.args;
          args1 = arg$Instantiate$1$;
          cls = arg$Instantiate$0$;
          split_root$: {
            if (cls instanceof Block.ValueRef.class) {
              arg$ValueRef$0$1 = cls.l;
              if (arg$ValueRef$0$1 instanceof Block.ClassSymbol.class) {
                scrut = this.owner;
                if (scrut instanceof Option.Some.class) {
                  tmp6 = this.showPath(cls);
                  tmp7 = "new! " + tmp6;
                  break split_root$
                }
              }
            }
            tmp8 = this.showPath(cls);
            tmp7 = "new " + tmp8;
          }
          prefix = tmp7;
          scrut1 = Predef.nequals(args1.length, 0);
          if (scrut1 === true) {
            tmp9 = this.showArgs(args1);
            tmp10 = "(" + tmp9;
            tmp11 = tmp10 + ")";
            return prefix + tmp11
          }
          tmp11 = "";
          return prefix + tmp11;
        } else if (r instanceof Block.Tuple.class) {
          arg$Tuple$0$ = r.elems;
          elems = arg$Tuple$0$;
          tmp12 = this.showArgs(elems);
          tmp13 = "[" + tmp12;
          return tmp13 + "]"
        }
        tmp14 = StrOps.concat2("<unknown result:", r);
        return StrOps.concat2(tmp14, ">");
      } 
      showCase(c) {
        let l, cls, len, arg$Tup$0$, arg$Cls$0$, arg$Lit$0$, tmp, tmp1, tmp2, tmp3;
        if (c instanceof Block.Lit.class) {
          arg$Lit$0$ = c.lit;
          l = arg$Lit$0$;
          return this.showLiteral(l)
        } else if (c instanceof Block.Cls.class) {
          arg$Cls$0$ = c.cls;
          cls = arg$Cls$0$;
          return this.showSymbol(cls)
        } else if (c instanceof Block.Tup.class) {
          arg$Tup$0$ = c.len;
          len = arg$Tup$0$;
          tmp = runtime.safeCall(globalThis.Array(len));
          tmp1 = runtime.safeCall(tmp.fill("_"));
          tmp2 = runtime.safeCall(tmp1.join(", "));
          tmp3 = "[" + tmp2;
          return tmp3 + "]"
        }
        return "<unknown case>";
      } 
      showArm(a) {
        let scrut, tmp, tmp1, tmp2, tmp3, tmp4, tmp5;
        tmp = this.showCase(a.cse);
        tmp1 = tmp + " then";
        scrut = a.body;
        if (scrut instanceof Block.Return.class) {
          tmp2 = " ";
        } else {
          tmp2 = "\n  ";
        }
        tmp3 = tmp1 + tmp2;
        tmp4 = this.showBlock(a.body);
        tmp5 = Block.indent(tmp4);
        return tmp3 + tmp5
      } 
      showParams(pl) {
        let lambda, tmp, tmp1, tmp2;
        const this$Printer = this;
        lambda = (undefined, function (p) {
          return this$Printer.showSymbol(p.sym)
        });
        tmp = runtime.safeCall(pl.map(lambda));
        tmp1 = runtime.safeCall(tmp.join(", "));
        tmp2 = "(" + tmp1;
        return tmp2 + ")"
      } 
      showCtorParams(pl) {
        let lambda, tmp, tmp1, tmp2;
        const this$Printer = this;
        lambda = (undefined, function (p) {
          let tmp3;
          tmp3 = this$Printer.showSymbol(p.sym);
          return "val " + tmp3
        });
        tmp = runtime.safeCall(pl.map(lambda));
        tmp1 = runtime.safeCall(tmp.join(", "));
        tmp2 = "(" + tmp1;
        return tmp2 + ")"
      } 
      showParamsOpt(p) {
        let s, arg$Some$0$;
        if (p instanceof Option.Some.class) {
          arg$Some$0$ = p.value;
          s = arg$Some$0$;
          return this.showCtorParams(s)
        } else if (p instanceof Option.None.class) {
          return ""
        }
        throw globalThis.Object.freeze(new globalThis.Error("match error"));
      } 
      showParamList(ps) {
        let lambda, tmp;
        const this$Printer = this;
        lambda = (undefined, function (_0) {
          return this$Printer.showParams(_0)
        });
        tmp = runtime.safeCall(ps.map(lambda));
        return runtime.safeCall(tmp.join(""))
      } 
      showDefn(d) {
        let body, sym, ps, methods, sym1, rhs, sym2, arg$ValDefn$1$, arg$ValDefn$2$, arg$ClsLikeDefn$0$, arg$ClsLikeDefn$1$, arg$FunDefn$0$, arg$FunDefn$1$, arg$FunDefn$2$, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, lambda, tmp13, tmp14, tmp15, tmp16, lambda1, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26;
        if (d instanceof Block.FunDefn.class) {
          arg$FunDefn$0$ = d.sym;
          arg$FunDefn$1$ = d.params;
          arg$FunDefn$2$ = d.body;
          body = arg$FunDefn$2$;
          ps = arg$FunDefn$1$;
          sym = arg$FunDefn$0$;
          tmp = this.showDefnSymbol(sym);
          tmp1 = "fun " + tmp;
          tmp2 = this.showParamList(ps);
          tmp3 = tmp1 + tmp2;
          tmp4 = tmp3 + " =";
          if (body instanceof Block.Return.class) {
            tmp5 = " ";
          } else if (body instanceof Block.End.class) {
            tmp5 = " ";
          } else {
            tmp5 = "\n  ";
          }
          tmp6 = tmp4 + tmp5;
          tmp7 = this.showBlock(body);
          tmp8 = Block.indent(tmp7);
          return tmp6 + tmp8
        } else if (d instanceof Block.ClsLikeDefn.class) {
          arg$ClsLikeDefn$0$ = d.sym;
          arg$ClsLikeDefn$1$ = d.methods;
          methods = arg$ClsLikeDefn$1$;
          sym1 = arg$ClsLikeDefn$0$;
          tmp9 = this.showDefnSymbol(sym1);
          tmp10 = "data class " + tmp9;
          tmp11 = this.showParamsOpt(sym1.paramsOpt);
          tmp12 = tmp10 + tmp11;
          const this$Printer = this;
          lambda = (undefined, function (_0) {
            return this$Printer.showParams(_0)
          });
          tmp13 = runtime.safeCall(sym1.auxParams.map(lambda));
          tmp14 = runtime.safeCall(tmp13.join(""));
          tmp15 = tmp12 + tmp14;
          if (runtime.Tuple.isArrayLike(methods) && methods.length === 0) {
            tmp16 = "";
          } else {
            tmp16 = " with\n";
          }
          lambda1 = (undefined, function (_0) {
            return this$Printer.showDefn(_0)
          });
          tmp17 = runtime.safeCall(methods.map(lambda1));
          tmp18 = runtime.safeCall(tmp17.join("\n"));
          tmp19 = tmp16 + tmp18;
          tmp20 = Block.indent(tmp19);
          return tmp15 + tmp20
        } else if (d instanceof Block.ValDefn.class) {
          arg$ValDefn$1$ = d.sym;
          arg$ValDefn$2$ = d.rhs;
          rhs = arg$ValDefn$2$;
          sym2 = arg$ValDefn$1$;
          tmp21 = this.showSymbol(sym2);
          tmp22 = "val " + tmp21;
          tmp23 = tmp22 + " = ";
          tmp24 = this.showPath(rhs);
          return tmp23 + tmp24
        }
        tmp25 = runtime.safeCall(d.toString());
        tmp26 = "<unknown defn: " + tmp25;
        return tmp26 + " >";
      } 
      showBlock(b) {
        let rhs, rest, lhs, rest1, d, res, implct, scrut, rest2, dflt, arms, db, rest3, symbols, arg$Scoped$0$, arg$Scoped$1$, arg$Match$0$, arg$Match$1$, arg$Match$2$, arg$Match$3$, arg$Return$0$, arg$Return$1$, arg$Define$0$, arg$Define$1$, arg$Assign$0$, arg$Assign$1$, arg$Assign$2$, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, lambda, tmp12, tmp13, tmp14, tmp15, tmp16, arg$Some$0$, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30, tmp31;
        if (b instanceof Block.Assign.class) {
          arg$Assign$0$ = b.lhs;
          arg$Assign$1$ = b.rhs;
          arg$Assign$2$ = b.rest;
          rest = arg$Assign$2$;
          rhs = arg$Assign$1$;
          lhs = arg$Assign$0$;
          if (lhs instanceof Block.NoSymbol.class) {
            tmp = "";
          } else {
            tmp1 = this.showSymbol(lhs);
            tmp = tmp1 + " = ";
          }
          tmp2 = this.showResult(rhs);
          tmp3 = tmp + tmp2;
          tmp4 = this.showRestBlock(rest);
          return tmp3 + tmp4
        } else if (b instanceof Block.Define.class) {
          arg$Define$0$ = b.defn;
          arg$Define$1$ = b.rest;
          rest1 = arg$Define$1$;
          d = arg$Define$0$;
          tmp5 = this.showDefn(d);
          tmp6 = this.showRestBlock(rest1);
          return tmp5 + tmp6
        } else if (b instanceof Block.Return.class) {
          arg$Return$0$ = b.res;
          arg$Return$1$ = b.implct;
          implct = arg$Return$1$;
          res = arg$Return$0$;
          if (implct === true) {
            tmp7 = "return ";
          } else {
            tmp7 = "";
          }
          tmp8 = this.showResult(res);
          return tmp7 + tmp8
        } else if (b instanceof Block.Match.class) {
          arg$Match$0$ = b.scrut;
          arg$Match$1$ = b.arms;
          arg$Match$2$ = b.dflt;
          arg$Match$3$ = b.rest;
          rest2 = arg$Match$3$;
          dflt = arg$Match$2$;
          arms = arg$Match$1$;
          scrut = arg$Match$0$;
          tmp9 = this.showPath(scrut);
          tmp10 = "if " + tmp9;
          tmp11 = tmp10 + " is";
          const this$Printer = this;
          lambda = (undefined, function (_0) {
            return this$Printer.showArm(_0)
          });
          tmp12 = runtime.safeCall(arms.map(lambda));
          tmp13 = runtime.safeCall(tmp12.join("\n"));
          tmp14 = "\n" + tmp13;
          tmp15 = Block.indent(tmp14);
          tmp16 = tmp11 + tmp15;
          if (dflt instanceof Option.Some.class) {
            arg$Some$0$ = dflt.value;
            db = arg$Some$0$;
            if (db instanceof Block.Return.class) {
              tmp17 = " ";
            } else {
              tmp17 = "\n";
            }
            tmp18 = this.showBlock(db);
            tmp19 = tmp17 + tmp18;
            tmp20 = Block.indent(tmp19);
            tmp21 = "\nelse" + tmp20;
            tmp22 = Block.indent(tmp21);
          } else {
            tmp22 = "";
          }
          tmp23 = tmp16 + tmp22;
          tmp24 = this.showRestBlock(rest2);
          return tmp23 + tmp24
        } else if (b instanceof Block.Scoped.class) {
          arg$Scoped$0$ = b.symbols;
          arg$Scoped$1$ = b.rest;
          rest3 = arg$Scoped$1$;
          symbols = arg$Scoped$0$;
          tmp25 = runtime.safeCall(symbols.map(this.showSymbol));
          tmp26 = runtime.safeCall(tmp25.join(", "));
          tmp27 = "let {" + tmp26;
          tmp28 = tmp27 + "}";
          tmp29 = this.showRestBlock(rest3);
          return tmp28 + tmp29
        } else if (b instanceof Block.End.class) {
          return "()"
        }
        tmp30 = runtime.safeCall(b.toString());
        tmp31 = "<unknown block: " + tmp30;
        return tmp31 + " >";
      } 
      showRestBlock(b) {
        let tmp;
        if (b instanceof Block.End.class) {
          return ""
        }
        tmp = this.showBlock(b);
        return "\n" + tmp;
      } 
      show(x) {
        if (x instanceof Block.Symbol.class) {
          return this.showSymbol(x)
        } else if (x instanceof Block.Path) {
          return this.showPath(x)
        } else if (x instanceof Block.Result) {
          return this.showResult(x)
        } else if (x instanceof Block.Case) {
          return this.showCase(x)
        } else if (x instanceof Block.Defn) {
          return this.showDefn(x)
        } else if (x instanceof Block.Block) {
          return this.showBlock(x)
        }
        return "<unknown>";
      } 
      printCode(x) {
        let tmp;
        tmp = this.show(x);
        return Predef.print(tmp)
      } 
      printModule(name, methods) {
        let tmp, tmp1, lambda, tmp2, tmp3, tmp4, tmp5, tmp6;
        tmp = "module " + name;
        tmp1 = tmp + " with";
        const this$Printer = this;
        lambda = (undefined, function (_0) {
          return this$Printer.showDefn(_0)
        });
        tmp2 = runtime.safeCall(methods.map(lambda));
        tmp3 = runtime.safeCall(tmp2.join("\n"));
        tmp4 = "\n" + tmp3;
        tmp5 = Block.indent(tmp4);
        tmp6 = tmp1 + tmp5;
        return Predef.print(tmp6)
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Printer", ["owner"]]; 
    });
    Block.#getmodule = globalThis.Object.freeze(new globalThis.RegExp("module (\\w+) "));
  }
  static isPrimitiveType(sym) {
    let scrut;
    scrut = sym.name;
    switch (scrut) {
      case "Str":
        return true;
      case "Int":
        return true;
      case "Num":
        return true;
      case "Bool":
        return true;
    }
    return false
  } 
  static isPrimitiveTypeOf(sym, l) {
    let scrut, l1, i, n, b, element1$, element0$;
    scrut = globalThis.Object.freeze([
      sym.name,
      l
    ]);
    if (runtime.Tuple.isArrayLike(scrut) && scrut.length === 2) {
      element0$ = runtime.Tuple.get(scrut, 0);
      element1$ = runtime.Tuple.get(scrut, 1);
      switch (element0$) {
        case "Str":
          l1 = element1$;
          if (typeof l1 === 'string') {
            return true
          }
          return false;
        case "Int":
          i = element1$;
          if (globalThis.Number.isInteger(i)) {
            return true
          }
          return false;
        case "Num":
          n = element1$;
          if (typeof n === 'number') {
            return true
          }
          return false;
        case "Bool":
          b = element1$;
          if (typeof b === 'boolean') {
            return true
          }
          return false;
      }
      return false
    }
    return false;
  } 
  static concat(b1, b2) {
    let scrut, rest, dflt, arms, rhs, rest1, lhs, defn, rest2, rest3, symbols, arg$Scoped$0$, arg$Scoped$1$, arg$Define$0$, arg$Define$1$, arg$Assign$0$, arg$Assign$1$, arg$Assign$2$, arg$Match$0$, arg$Match$1$, arg$Match$2$, arg$Match$3$, tmp, tmp1, tmp2, tmp3;
    if (b1 instanceof Block.Return.class) {
      return b1
    } else if (b1 instanceof Block.End.class) {
      return b2
    } else if (b1 instanceof Block.Match.class) {
      arg$Match$0$ = b1.scrut;
      arg$Match$1$ = b1.arms;
      arg$Match$2$ = b1.dflt;
      arg$Match$3$ = b1.rest;
      rest = arg$Match$3$;
      dflt = arg$Match$2$;
      arms = arg$Match$1$;
      scrut = arg$Match$0$;
      tmp = Block.concat(rest, b2);
      return Block.Match(scrut, arms, dflt, tmp)
    } else if (b1 instanceof Block.Assign.class) {
      arg$Assign$0$ = b1.lhs;
      arg$Assign$1$ = b1.rhs;
      arg$Assign$2$ = b1.rest;
      rest1 = arg$Assign$2$;
      rhs = arg$Assign$1$;
      lhs = arg$Assign$0$;
      tmp1 = Block.concat(rest1, b2);
      return Block.Assign(lhs, rhs, tmp1)
    } else if (b1 instanceof Block.Define.class) {
      arg$Define$0$ = b1.defn;
      arg$Define$1$ = b1.rest;
      rest2 = arg$Define$1$;
      defn = arg$Define$0$;
      tmp2 = Block.concat(rest2, b2);
      return Block.Define(defn, tmp2)
    } else if (b1 instanceof Block.Scoped.class) {
      arg$Scoped$0$ = b1.symbols;
      arg$Scoped$1$ = b1.rest;
      rest3 = arg$Scoped$1$;
      symbols = arg$Scoped$0$;
      tmp3 = Block.concat(rest3, b2);
      return Block.Scoped(symbols, tmp3)
    }
    throw globalThis.Object.freeze(new globalThis.Error("match error"));
  } 
  static indent(s) {
    return s.replaceAll("\n", "\n  ")
  } 
  static codegen(name, cache, source, file) {
    let fullpath, code, scrut, originData, newData, scrut1, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, rcd;
    tmp = runtime.safeCall(process.cwd());
    fullpath = path.join(tmp, file);
    tmp1 = "import \"" + source;
    tmp2 = tmp1 + "\"\n";
    tmp3 = runtime.safeCall(cache.toString());
    tmp4 = Block.indent(tmp3);
    code = tmp2 + tmp4;
    tmp5 = runtime.safeCall(fs.existsSync(fullpath));
    scrut = ! tmp5;
    if (scrut === true) {
      tmp6 = runtime.safeCall(path.dirname(fullpath));
      rcd = globalThis.Object.freeze({
        recursive: true
      });
      fs.mkdirSync(tmp6, rcd);
      runtime.safeCall(fs.writeFileSync(fullpath, "", "utf8"));
    }
    originData = fs.readFileSync(fullpath, "utf8");
    newData = "#config(noFreeze: true)\n" + code;
    scrut1 = Predef.nequals(newData, originData);
    if (scrut1 === true) {
      runtime.safeCall(fs.writeFileSync(fullpath, newData, "utf8"));
      return runtime.Unit
    }
    return runtime.Unit;
  } 
  static generateAll(name, file, ...modules) {
    let fullpath, scrut, code, modLink, originData, newData, scrut1, tmp, tmp1, tmp2, rcd, lambda, tmp3, tmp4, lambda1, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15;
    tmp = runtime.safeCall(process.cwd());
    fullpath = path.join(tmp, file);
    tmp1 = runtime.safeCall(fs.existsSync(fullpath));
    scrut = ! tmp1;
    if (scrut === true) {
      tmp2 = runtime.safeCall(path.dirname(fullpath));
      rcd = globalThis.Object.freeze({
        recursive: true
      });
      fs.mkdirSync(tmp2, rcd);
      runtime.safeCall(fs.writeFileSync(fullpath, "", "utf8"));
    }
    lambda = (undefined, function (res, p) {
      let name1, source, mod, modStr, element2$, element1$, element0$, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23;
      if (runtime.Tuple.isArrayLike(p) && p.length === 3) {
        element0$ = runtime.Tuple.get(p, 0);
        element1$ = runtime.Tuple.get(p, 1);
        element2$ = runtime.Tuple.get(p, 2);
        source = element2$;
        name1 = element1$;
        mod = element0$;
        runtime.safeCall(mod.propagate());
        tmp16 = "cache$" + name1;
        tmp17 = runtime.safeCall(mod[tmp16].toString());
        modStr = tmp17.replace(Block.#getmodule, "module $1' ");
        tmp18 = res[0] + "import \"";
        tmp19 = tmp18 + source;
        tmp20 = tmp19 + "\"\n";
        tmp21 = Block.indent(modStr);
        tmp22 = res[2] + tmp21;
        tmp23 = tmp22 + "\n";
        return globalThis.Object.freeze([
          tmp20,
          res[1],
          tmp23
        ])
      }
      throw globalThis.Object.freeze(new globalThis.Error("match error"));
    });
    tmp3 = runtime.safeCall(Predef.fold(lambda));
    tmp4 = globalThis.Object.freeze([
      "",
      "",
      ""
    ]);
    code = runtime.safeCall(tmp3(tmp4, ...modules));
    lambda1 = (undefined, function (x) {
      let tmp16, tmp17, tmp18, tmp19, tmp20;
      tmp16 = "val " + x[1];
      tmp17 = tmp16 + ": module ";
      tmp18 = tmp17 + x[1];
      tmp19 = tmp18 + "' = ";
      tmp20 = tmp19 + x[1];
      return tmp20 + "'"
    });
    tmp5 = runtime.safeCall(modules.map(lambda1));
    modLink = runtime.safeCall(tmp5.join("\n"));
    originData = fs.readFileSync(fullpath, "utf8");
    tmp6 = "#config(noFreeze: true)\n" + code[0];
    tmp7 = tmp6 + "\n";
    tmp8 = tmp7 + code[1];
    tmp9 = tmp8 + "\n";
    tmp10 = tmp9 + code[2];
    tmp11 = tmp10 + "module ";
    tmp12 = tmp11 + name;
    tmp13 = tmp12 + " with";
    tmp14 = "\n" + modLink;
    tmp15 = Block.indent(tmp14);
    newData = tmp13 + tmp15;
    scrut1 = Predef.nequals(newData, originData);
    if (scrut1 === true) {
      runtime.safeCall(fs.writeFileSync(fullpath, newData, "utf8"));
      return runtime.Unit
    }
    return runtime.Unit;
  }
  toString() { return runtime.render(this); }
  static [definitionMetadata] = ["class", "Block"]; 
});
let Block = Block2; export default Block;
