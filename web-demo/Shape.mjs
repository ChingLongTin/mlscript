const definitionMetadata = globalThis.Symbol.for("mlscript.definitionMetadata");
const prettyPrint = globalThis.Symbol.for("mlscript.prettyPrint");
import runtime from "./Runtime.mjs";
import Block from "./Block.mjs";
import Option from "./Option.mjs";
import CachedHash from "./CachedHash.mjs";
let Shape2;
(class Shape {
  static {
    Shape2 = this
  }
  static {
    let tmp;
    tmp = Block.Printer(Option.None);
    this.printer = tmp;
    (class Shape1 extends CachedHash {
      static {
        Shape.Shape = this
      }
      constructor() {
        super();
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Shape"]; 
    });
    this.Dyn = function Dyn() {
      return globalThis.Object.freeze(new Dyn.class());
    };
    (class Dyn extends Shape.Shape {
      static {
        Shape.Dyn.class = this
      }
      constructor() {
        super();
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Dyn", []]; 
    });
    this.Lit = function Lit(l) {
      return globalThis.Object.freeze(new Lit.class(l));
    };
    (class Lit extends Shape.Shape {
      static {
        Shape.Lit.class = this
      }
      constructor(l) {
        super();
        this.l = l;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Lit", ["l"]]; 
    });
    this.Arr = function Arr(shapes) {
      return globalThis.Object.freeze(new Arr.class(shapes));
    };
    (class Arr extends Shape.Shape {
      static {
        Shape.Arr.class = this
      }
      constructor(shapes) {
        super();
        this.shapes = shapes;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Arr", ["shapes"]]; 
    });
    this.Class = function Class(sym, fields) {
      return globalThis.Object.freeze(new Class.class(sym, fields));
    };
    (class Class extends Shape.Shape {
      static {
        Shape.Class.class = this
      }
      constructor(sym, fields) {
        super();
        this.sym = sym;
        this.fields = fields;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Class", ["sym", "fields"]]; 
    });
  }
  static show(s) {
    let lit, shapes, sym, fields, arg$Class$0$, arg$Class$1$, arg$Arr$0$, arg$Lit$0$, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, lambda, tmp10, tmp11, tmp12;
    if (s instanceof Shape.Dyn.class) {
      return "Dyn"
    } else if (s instanceof Shape.Lit.class) {
      arg$Lit$0$ = s.l;
      lit = arg$Lit$0$;
      tmp = runtime.safeCall(Shape.printer.showLiteral(lit));
      tmp1 = "Lit(" + tmp;
      return tmp1 + ")"
    } else if (s instanceof Shape.Arr.class) {
      arg$Arr$0$ = s.shapes;
      shapes = arg$Arr$0$;
      tmp2 = runtime.safeCall(shapes.map(Shape.show));
      tmp3 = runtime.safeCall(tmp2.join(", "));
      tmp4 = "Arr(" + tmp3;
      return tmp4 + ")"
    } else if (s instanceof Shape.Class.class) {
      arg$Class$0$ = s.sym;
      arg$Class$1$ = s.fields;
      fields = arg$Class$1$;
      sym = arg$Class$0$;
      tmp5 = runtime.safeCall(Shape.printer.showSymbol(sym));
      tmp6 = "Class(" + tmp5;
      tmp7 = tmp6 + ", {";
      tmp8 = runtime.safeCall(fields.entries());
      tmp9 = globalThis.Object.freeze([
        ...tmp8
      ]);
      lambda = (undefined, function (e) {
        let tmp13, tmp14;
        tmp13 = e[0] + ": ";
        tmp14 = Shape.show(e[1]);
        return tmp13 + tmp14
      });
      tmp10 = runtime.safeCall(tmp9.map(lambda));
      tmp11 = runtime.safeCall(tmp10.join(", "));
      tmp12 = tmp7 + tmp11;
      return tmp12 + "})"
    }
    throw globalThis.Object.freeze(new globalThis.Error("match error"));
  } 
  static sel(s1, s2) {
    let scrut, n, params, paramsOpt, paramsSymb, scrut1, n1, n2, n3, shapes, scrut2, shapes1, element1$, element0$, arg$Arr$0$, arg$Lit$0$, arg$Class$0$, arg$Class$1$, arg$ConcreteClassSymbol$2$, arg$Some$0$, lambda, tmp, tmp1;
    scrut = globalThis.Object.freeze([
      s1,
      s2
    ]);
    if (runtime.Tuple.isArrayLike(scrut) && scrut.length === 2) {
      element0$ = runtime.Tuple.get(scrut, 0);
      element1$ = runtime.Tuple.get(scrut, 1);
      if (element0$ instanceof Shape.Class.class) {
        arg$Class$0$ = element0$.sym;
        arg$Class$1$ = element0$.fields;
        if (arg$Class$0$ instanceof Block.ConcreteClassSymbol.class) {
          arg$ConcreteClassSymbol$2$ = arg$Class$0$.paramsOpt;
          if (element1$ instanceof Shape.Lit.class) {
            arg$Lit$0$ = element1$.l;
            n = arg$Lit$0$;
            params = arg$Class$1$;
            paramsOpt = arg$ConcreteClassSymbol$2$;
            if (typeof n === 'string') {
              if (paramsOpt instanceof Option.Some.class) {
                arg$Some$0$ = paramsOpt.value;
                paramsSymb = arg$Some$0$;
                lambda = (undefined, function (_0) {
                  return _0.sym.name
                });
                tmp = runtime.safeCall(paramsSymb.map(lambda));
                scrut1 = runtime.safeCall(tmp.indexOf(n));
                if (scrut1 === -1) {
                  return globalThis.Object.freeze([])
                }
                n1 = scrut1;
                return globalThis.Object.freeze([
                  params[n1]
                ]);
              }
              return globalThis.Object.freeze([]);
            }
            return globalThis.Object.freeze([]);
          } else if (element1$ instanceof Shape.Dyn.class) {} else {
            return globalThis.Object.freeze([])
          }
        } else {
          return globalThis.Object.freeze([])
        }
      } else if (element0$ instanceof Shape.Dyn.class) {
        if (element1$ instanceof Shape.Lit.class) {
          arg$Lit$0$ = element1$.l;
          n2 = arg$Lit$0$;
          if (typeof n2 === 'string') {} else if (globalThis.Number.isInteger(n2)) {} else {
            throw runtime.safeCall(globalThis.Error("Unknown selection"))
          }
        } else if (element1$ instanceof Shape.Dyn.class) {} else {
          return globalThis.Object.freeze([])
        }
      } else if (element0$ instanceof Shape.Arr.class) {
        arg$Arr$0$ = element0$.shapes;
        if (element1$ instanceof Shape.Lit.class) {
          arg$Lit$0$ = element1$.l;
          n3 = arg$Lit$0$;
          shapes = arg$Arr$0$;
          scrut2 = n3 < shapes.length;
          if (scrut2 === true) {
            return globalThis.Object.freeze([
              shapes[n3]
            ])
          }
          throw runtime.safeCall(globalThis.Error("Array out of bound"));
        } else if (element1$ instanceof Shape.Dyn.class) {
          shapes1 = arg$Arr$0$;
          return shapes1
        }
        return globalThis.Object.freeze([]);
      } else {
        return globalThis.Object.freeze([])
      }
      tmp1 = Shape.Dyn();
      return globalThis.Object.freeze([
        tmp1
      ])
    }
    return globalThis.Object.freeze([]);
  } 
  static static(s) {
    let l, scrut, params, shapes, arg$Arr$0$, arg$Class$1$, arg$Lit$0$, tmp;
    if (s instanceof Shape.Dyn.class) {
      return false
    } else if (s instanceof Shape.Lit.class) {
      arg$Lit$0$ = s.l;
      l = arg$Lit$0$;
      if (typeof l === 'string') {
        scrut = Block.isPrimitiveType(l);
        if (scrut === true) {
          tmp = true;
          return ! tmp
        }
        tmp = false;
        return ! tmp;
      }
      tmp = false;
      return ! tmp;
    } else if (s instanceof Shape.Class.class) {
      arg$Class$1$ = s.fields;
      params = arg$Class$1$;
      return runtime.safeCall(params.every(Shape.static))
    } else if (s instanceof Shape.Arr.class) {
      arg$Arr$0$ = s.shapes;
      shapes = arg$Arr$0$;
      return runtime.safeCall(shapes.every(Shape.static))
    }
    throw globalThis.Object.freeze(new globalThis.Error("match error"));
  } 
  static silh(p) {
    let l, clsSymb, paramsSize, scrut, params, n, arg$Tup$0$, arg$Cls$0$, arg$Lit$0$, arg$Some$0$, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6;
    if (p instanceof Block.Lit.class) {
      arg$Lit$0$ = p.lit;
      l = arg$Lit$0$;
      return Shape.Lit(l)
    } else if (p instanceof Block.Cls.class) {
      arg$Cls$0$ = p.cls;
      clsSymb = arg$Cls$0$;
      scrut = clsSymb.paramsOpt;
      if (scrut instanceof Option.Some.class) {
        arg$Some$0$ = scrut.value;
        params = arg$Some$0$;
        tmp = params.length;
      } else {
        tmp = 0;
      }
      paramsSize = tmp;
      tmp1 = runtime.safeCall(globalThis.Array(paramsSize));
      tmp2 = Shape.Dyn();
      tmp3 = runtime.safeCall(tmp1.fill(tmp2));
      return Shape.Class(clsSymb, tmp3)
    } else if (p instanceof Block.Tup.class) {
      arg$Tup$0$ = p.len;
      n = arg$Tup$0$;
      tmp4 = runtime.safeCall(globalThis.Array(n));
      tmp5 = Shape.Dyn();
      tmp6 = runtime.safeCall(tmp4.fill(tmp5));
      return Shape.Arr(tmp6)
    }
    throw globalThis.Object.freeze(new globalThis.Error("match error"));
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
  static isSubClassOf(d, b) {
    let tmp, tmp1;
    tmp = Shape.getActualClass(b);
    tmp1 = Shape.getActualClass(d);
    return runtime.safeCall(tmp.isPrototypeOf(tmp1))
  } 
  static filter(s, p) {
    let scrut, l1, l2, scrut1, l, c, scrut2, n, ls, scrut3, c2, c1, scrut4, c21, c11, scrut5, element1$, element0$, arg$Class$0$, arg$Cls$0$, arg$Arr$0$, arg$Tup$0$, arg$Lit$0$, arg$Lit$0$1, tmp;
    scrut = globalThis.Object.freeze([
      s,
      p
    ]);
    if (runtime.Tuple.isArrayLike(scrut) && scrut.length === 2) {
      element0$ = runtime.Tuple.get(scrut, 0);
      element1$ = runtime.Tuple.get(scrut, 1);
      if (element0$ instanceof Shape.Lit.class) {
        arg$Lit$0$ = element0$.l;
        if (element1$ instanceof Block.Lit.class) {
          arg$Lit$0$1 = element1$.lit;
          l2 = arg$Lit$0$1;
          l1 = arg$Lit$0$;
          scrut1 = l1 == l2;
          if (scrut1 === true) {
            return globalThis.Object.freeze([
              s
            ])
          }
        } else if (element1$ instanceof Block.Cls.class) {
          arg$Cls$0$ = element1$.cls;
          c = arg$Cls$0$;
          l = arg$Lit$0$;
          scrut2 = Block.isPrimitiveTypeOf(c, l);
          if (scrut2 === true) {
            return globalThis.Object.freeze([
              s
            ])
          }
        }
        return globalThis.Object.freeze([])
      } else if (element0$ instanceof Shape.Arr.class) {
        arg$Arr$0$ = element0$.shapes;
        if (element1$ instanceof Block.Tup.class) {
          arg$Tup$0$ = element1$.len;
          n = arg$Tup$0$;
          ls = arg$Arr$0$;
          scrut3 = ls.length == n;
          if (scrut3 === true) {
            return globalThis.Object.freeze([
              s
            ])
          }
        }
        return globalThis.Object.freeze([])
      } else if (element0$ instanceof Shape.Class.class) {
        arg$Class$0$ = element0$.sym;
        if (element1$ instanceof Block.Cls.class) {
          arg$Cls$0$ = element1$.cls;
          c2 = arg$Cls$0$;
          c1 = arg$Class$0$;
          if (c1 instanceof Block.ConcreteClassSymbol.class) {
            if (c2 instanceof Block.ConcreteClassSymbol.class) {
              scrut4 = c1.value == c2.value;
              if (scrut4 === true) {
                return globalThis.Object.freeze([
                  s
                ])
              }
              c21 = arg$Cls$0$;
              c11 = arg$Class$0$;
              if (c11 instanceof Block.ConcreteClassSymbol.class) {
                if (c21 instanceof Block.ConcreteClassSymbol.class) {
                  scrut5 = Shape.isSubClassOf(c11.value, c21.value);
                  if (scrut5 === true) {
                    return globalThis.Object.freeze([
                      s
                    ])
                  }
                }
              }
            } else {
              c21 = arg$Cls$0$;
              c11 = arg$Class$0$;
              if (c11 instanceof Block.ConcreteClassSymbol.class) {
                if (c21 instanceof Block.ConcreteClassSymbol.class) {
                  scrut5 = Shape.isSubClassOf(c11.value, c21.value);
                  if (scrut5 === true) {
                    return globalThis.Object.freeze([
                      s
                    ])
                  }
                }
              }
            }
          } else {
            c21 = arg$Cls$0$;
            c11 = arg$Class$0$;
            if (c11 instanceof Block.ConcreteClassSymbol.class) {
              if (c21 instanceof Block.ConcreteClassSymbol.class) {
                scrut5 = Shape.isSubClassOf(c11.value, c21.value);
                if (scrut5 === true) {
                  return globalThis.Object.freeze([
                    s
                  ])
                }
              }
            }
          }
        }
        return globalThis.Object.freeze([])
      } else if (element0$ instanceof Shape.Dyn.class) {
        tmp = Shape.silh(p);
        return globalThis.Object.freeze([
          tmp
        ])
      }
      return globalThis.Object.freeze([]);
    }
    return globalThis.Object.freeze([]);
  } 
  static rest(s, p) {
    let scrut, l1, l2, scrut1, l, c, scrut2, n, ls, scrut3, c2, c1, scrut4, c21, c11, scrut5, c22, c12, element1$, element0$, arg$Class$0$, arg$Cls$0$, arg$Arr$0$, arg$Tup$0$, arg$Lit$0$, arg$Lit$0$1;
    scrut = globalThis.Object.freeze([
      s,
      p
    ]);
    if (runtime.Tuple.isArrayLike(scrut) && scrut.length === 2) {
      element0$ = runtime.Tuple.get(scrut, 0);
      element1$ = runtime.Tuple.get(scrut, 1);
      if (element0$ instanceof Shape.Lit.class) {
        arg$Lit$0$ = element0$.l;
        if (element1$ instanceof Block.Lit.class) {
          arg$Lit$0$1 = element1$.lit;
          l2 = arg$Lit$0$1;
          l1 = arg$Lit$0$;
          scrut1 = l1 == l2;
          if (scrut1 === true) {
            return globalThis.Object.freeze([])
          }
        } else if (element1$ instanceof Block.Cls.class) {
          arg$Cls$0$ = element1$.cls;
          c = arg$Cls$0$;
          l = arg$Lit$0$;
          scrut2 = Block.isPrimitiveTypeOf(c, l);
          if (scrut2 === true) {
            return globalThis.Object.freeze([])
          }
        }
        return globalThis.Object.freeze([
          s
        ])
      } else if (element0$ instanceof Shape.Arr.class) {
        arg$Arr$0$ = element0$.shapes;
        if (element1$ instanceof Block.Tup.class) {
          arg$Tup$0$ = element1$.len;
          n = arg$Tup$0$;
          ls = arg$Arr$0$;
          scrut3 = ls.length == n;
          if (scrut3 === true) {
            return globalThis.Object.freeze([])
          }
        }
        return globalThis.Object.freeze([
          s
        ])
      } else if (element0$ instanceof Shape.Class.class) {
        arg$Class$0$ = element0$.sym;
        if (element1$ instanceof Block.Cls.class) {
          arg$Cls$0$ = element1$.cls;
          c2 = arg$Cls$0$;
          c1 = arg$Class$0$;
          if (c1 instanceof Block.ConcreteClassSymbol.class) {
            if (c2 instanceof Block.ConcreteClassSymbol.class) {
              scrut4 = c1.value == c2.value;
              if (scrut4 === true) {
                return globalThis.Object.freeze([])
              }
              c21 = arg$Cls$0$;
              c11 = arg$Class$0$;
              if (c11 instanceof Block.ConcreteClassSymbol.class) {
                if (c21 instanceof Block.ConcreteClassSymbol.class) {
                  scrut5 = Shape.isSubClassOf(c11.value, c21.value);
                  if (scrut5 === true) {
                    return globalThis.Object.freeze([])
                  }
                  c22 = arg$Cls$0$;
                  c12 = arg$Class$0$;
                  c12.name == c22.name;
                } else {
                  c22 = arg$Cls$0$;
                  c12 = arg$Class$0$;
                  c12.name == c22.name;
                }
              } else {
                c22 = arg$Cls$0$;
                c12 = arg$Class$0$;
                c12.name == c22.name;
              }
            } else {
              c21 = arg$Cls$0$;
              c11 = arg$Class$0$;
              if (c11 instanceof Block.ConcreteClassSymbol.class) {
                if (c21 instanceof Block.ConcreteClassSymbol.class) {
                  scrut5 = Shape.isSubClassOf(c11.value, c21.value);
                  if (scrut5 === true) {
                    return globalThis.Object.freeze([])
                  }
                  c22 = arg$Cls$0$;
                  c12 = arg$Class$0$;
                  c12.name == c22.name;
                } else {
                  c22 = arg$Cls$0$;
                  c12 = arg$Class$0$;
                  c12.name == c22.name;
                }
              } else {
                c22 = arg$Cls$0$;
                c12 = arg$Class$0$;
                c12.name == c22.name;
              }
            }
          } else {
            c21 = arg$Cls$0$;
            c11 = arg$Class$0$;
            if (c11 instanceof Block.ConcreteClassSymbol.class) {
              if (c21 instanceof Block.ConcreteClassSymbol.class) {
                scrut5 = Shape.isSubClassOf(c11.value, c21.value);
                if (scrut5 === true) {
                  return globalThis.Object.freeze([])
                }
                c22 = arg$Cls$0$;
                c12 = arg$Class$0$;
                c12.name == c22.name;
              } else {
                c22 = arg$Cls$0$;
                c12 = arg$Class$0$;
                c12.name == c22.name;
              }
            } else {
              c22 = arg$Cls$0$;
              c12 = arg$Class$0$;
              c12.name == c22.name;
            }
          }
        }
        return globalThis.Object.freeze([
          s
        ])
      }
      return globalThis.Object.freeze([
        s
      ]);
    }
    return globalThis.Object.freeze([
      s
    ]);
  }
  toString() { return runtime.render(this); }
  static [definitionMetadata] = ["class", "Shape"]; 
});
let Shape = Shape2; export default Shape;
