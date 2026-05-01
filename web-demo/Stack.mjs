const definitionMetadata = globalThis.Symbol.for("mlscript.definitionMetadata");
const prettyPrint = globalThis.Symbol.for("mlscript.prettyPrint");
import runtime from "./Runtime.mjs";
import Predef from "./Predef.mjs";
let Stack1;
(class Stack {
  static {
    Stack1 = this
  }
  static {
    this.Cons = function Cons(head, tail) {
      return globalThis.Object.freeze(new Cons.class(head, tail));
    };
    (class Cons {
      static {
        Stack.Cons.class = this
      }
      constructor(head, tail) {
        this.head = head;
        this.tail = tail;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Cons", ["head", "tail"]]; 
    });
    (class Nil {
      static {
        new this
      }
      constructor() {
        Stack.Nil = this;
        Object.defineProperty(this, "class", {
          value: Nil
        });
        globalThis.Object.freeze(this);
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["object", "Nil"]; 
    });
  }
  static isEmpty(xs) {
    if (xs instanceof Stack.Nil.class) {
      return true
    }
    return false;
  } 
  static reverseAndAppend(xs, tail) {
    loopLabel: while (true) {
      let t, h, arg$Cons$0$, arg$Cons$1$, tmp;
      if (xs instanceof Stack.Cons.class) {
        arg$Cons$0$ = xs.head;
        arg$Cons$1$ = xs.tail;
        t = arg$Cons$1$;
        h = arg$Cons$0$;
        tmp = Stack.Cons(h, tail);
        xs = t;
        tail = tmp;
        continue loopLabel
      } else if (xs instanceof Stack.Nil.class) {
        return tail
      }
      throw globalThis.Object.freeze(new globalThis.Error("match error"));
    }
  } 
  static reverse(xs) {
    return Stack.reverseAndAppend(xs, Stack.Nil)
  } 
  static fromArray(arr) {
    let ls, i;
    ls = Stack.Nil;
    i = arr.length - 1;
    lbl: while (true) {
      let scrut, tmp, tmp1;
      scrut = i >= 0;
      if (scrut === true) {
        tmp = runtime.safeCall(arr.at(i));
        ls = Stack.Cons(tmp, ls);
        tmp1 = i - 1;
        i = tmp1;
        continue lbl
      }
      break;
    }
    return ls
  } 
  static toArray(xs) {
    let tmp;
    tmp = Stack.reverse(xs);
    return Stack.toReverseArray(tmp)
  } 
  static toReverseArray(xs) {
    let arr;
    arr = [];
    lbl: while (true) {
      let t, h, arg$Cons$0$, arg$Cons$1$;
      if (xs instanceof Stack.Cons.class) {
        arg$Cons$0$ = xs.head;
        arg$Cons$1$ = xs.tail;
        t = arg$Cons$1$;
        h = arg$Cons$0$;
        runtime.safeCall(arr.push(h));
        xs = t;
        continue lbl
      }
      break;
    }
    return arr
  } 
  static zip(...xss) {
    let go, tmp, tmp1;
    go = function go(heads, tails) {
      let lambda;
      lambda = (undefined, function (caseScrut) {
        let t, h, h2, t2, arg$Cons$0$, arg$Cons$1$, arg$Cons$0$1, arg$Cons$1$1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9;
        if (caseScrut instanceof Stack.Cons.class) {
          arg$Cons$0$ = caseScrut.head;
          arg$Cons$1$ = caseScrut.tail;
          t = arg$Cons$1$;
          h = arg$Cons$0$;
          if (h instanceof Stack.Cons.class) {
            arg$Cons$0$1 = h.head;
            arg$Cons$1$1 = h.tail;
            t2 = arg$Cons$1$1;
            h2 = arg$Cons$0$1;
            tmp2 = Stack.Cons(h2, heads);
            tmp3 = Stack.Cons(t2, tails);
            tmp4 = go(tmp2, tmp3);
            return runtime.safeCall(tmp4(t))
          } else if (h instanceof Stack.Nil.class) {
            tmp5 = go(heads, tails);
            return runtime.safeCall(tmp5(t))
          }
          throw globalThis.Object.freeze(new globalThis.Error("match error"));
        } else if (caseScrut instanceof Stack.Nil.class) {
          if (heads instanceof Stack.Nil.class) {
            if (tails instanceof Stack.Nil.class) {
              return Stack.Nil
            }
            return runtime.assertFail("mlscript-compile/Stack.mls", "50");
          }
          tmp6 = Stack.toArray(heads);
          tmp7 = go(Stack.Nil, Stack.Nil);
          tmp8 = Stack.reverse(tails);
          tmp9 = runtime.safeCall(tmp7(tmp8));
          return Stack.Cons(tmp6, tmp9);
        }
        throw globalThis.Object.freeze(new globalThis.Error("match error"));
      });
      return lambda
    };
    tmp = go(Stack.Nil, Stack.Nil);
    tmp1 = Stack.fromArray(xss);
    return runtime.safeCall(tmp(tmp1))
  } 
  static concat(xs, ys) {
    let tail$_, head$_, result, current, rest, arg$Cons$0$, arg$Cons$1$;
    if (ys instanceof Stack.Nil.class) {
      return xs
    }
    if (xs instanceof Stack.Nil.class) {
      return ys
    } else if (xs instanceof Stack.Cons.class) {
      arg$Cons$0$ = xs.head;
      arg$Cons$1$ = xs.tail;
      tail$_ = arg$Cons$1$;
      head$_ = arg$Cons$0$;
      result = new Stack.Cons.class(head$_, ys);
      current = result;
      rest = tail$_;
      lbl: while (true) {
        let head, tail, next, arg$Cons$0$1, arg$Cons$1$1;
        if (rest instanceof Stack.Cons.class) {
          arg$Cons$0$1 = rest.head;
          arg$Cons$1$1 = rest.tail;
          tail = arg$Cons$1$1;
          head = arg$Cons$0$1;
          next = new Stack.Cons.class(head, ys);
          current.tail = next;
          globalThis.Object.freeze(current);
          current = next;
          rest = tail;
          continue lbl
        }
        break;
      }
      return globalThis.Object.freeze(result)
    }
    throw globalThis.Object.freeze(new globalThis.Error("match error"));
  } 
  static append(xs, y) {
    let tmp;
    tmp = Stack.Cons(y, Stack.Nil);
    return Stack.concat(xs, tmp)
  } 
  static filter(xs, f) {
    loopLabel: while (true) {
      let head, tail, scrut, arg$Cons$0$, arg$Cons$1$, tmp;
      if (xs instanceof Stack.Cons.class) {
        arg$Cons$0$ = xs.head;
        arg$Cons$1$ = xs.tail;
        tail = arg$Cons$1$;
        head = arg$Cons$0$;
        scrut = runtime.safeCall(f(head));
        if (scrut === true) {
          tmp = Stack.filter(tail, f);
          return Stack.Cons(head, tmp)
        }
        xs = tail;
        continue loopLabel;
      } else if (xs instanceof Stack.Nil.class) {
        return Stack.Nil
      }
      throw globalThis.Object.freeze(new globalThis.Error("match error"));
    }
  }
  toString() { return runtime.render(this); }
  static [definitionMetadata] = ["class", "Stack"]; 
});
let Stack = Stack1; export default Stack;
