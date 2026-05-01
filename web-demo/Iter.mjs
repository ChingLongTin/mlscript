const definitionMetadata = globalThis.Symbol.for("mlscript.definitionMetadata");
const prettyPrint = globalThis.Symbol.for("mlscript.prettyPrint");
import runtime from "./Runtime.mjs";
import Predef from "./Predef.mjs";
import Option from "./Option.mjs";
import Stack from "./Stack.mjs";
let Iter1;
(class Iter {
  static {
    Iter1 = this
  }
  static {
    (class IterableBase {
      static {
        Iter.IterableBase = this
      }
      constructor() {
        this[globalThis.Symbol.iterator] = this.iterator;
        this.#array = null;
      }
      #array;
      iterator() {
        throw globalThis.Object.freeze(new globalThis.Error("Not implemented: iterator()"))
      } 
      toArray() {
        return globalThis.Object.freeze([
          ...this
        ])
      } 
      get asArray() {
        let tmp, tmp1;
        if (this.#array === null) {
          tmp = this.toArray();
          tmp1 = globalThis.Object.freeze(tmp);
          this.#array = tmp1;
          return this.#array
        }
        return this.#array;
      } 
      at(idx) {
        return runtime.safeCall(this.asArray.at(idx))
      } 
      concat(...xs) {
        return runtime.safeCall(this.asArray.concat(...xs))
      } 
      copyWithin(...args) {
        return runtime.safeCall(this.asArray.copyWithin(...args))
      } 
      entries() {
        return runtime.safeCall(this.asArray.entries())
      } 
      every(...args) {
        return runtime.safeCall(this.asArray.every(...args))
      } 
      filter(...args) {
        return runtime.safeCall(this.asArray.filter(...args))
      } 
      find(...args) {
        return runtime.safeCall(this.asArray.find(...args))
      } 
      findIndex(...args) {
        return runtime.safeCall(this.asArray.findIndex(...args))
      } 
      findLast(...args) {
        return runtime.safeCall(this.asArray.findLast(...args))
      } 
      findLastIndex(...args) {
        return runtime.safeCall(this.asArray.findLastIndex(...args))
      } 
      flat(...args) {
        return runtime.safeCall(this.asArray.flat(...args))
      } 
      flatMap(...args) {
        return runtime.safeCall(this.asArray.flatMap(...args))
      } 
      forEach(...args) {
        return runtime.safeCall(this.asArray.forEach(...args))
      } 
      includes(...args) {
        return runtime.safeCall(this.asArray.includes(...args))
      } 
      indexOf(...args) {
        return runtime.safeCall(this.asArray.indexOf(...args))
      } 
      join(...args) {
        return runtime.safeCall(this.asArray.join(...args))
      } 
      keys() {
        return runtime.safeCall(this.asArray.keys())
      } 
      lastIndexOf(...args) {
        return runtime.safeCall(this.asArray.lastIndexOf(...args))
      } 
      map(...args) {
        return runtime.safeCall(this.asArray.map(...args))
      } 
      reduce(...args) {
        return runtime.safeCall(this.asArray.reduce(...args))
      } 
      reduceRight(...args) {
        return runtime.safeCall(this.asArray.reduceRight(...args))
      } 
      slice(...args) {
        return runtime.safeCall(this.asArray.slice(...args))
      } 
      some(...args) {
        return runtime.safeCall(this.asArray.some(...args))
      } 
      toLocaleString(...args) {
        return runtime.safeCall(this.asArray.toLocaleString(...args))
      } 
      toReversed() {
        return runtime.safeCall(this.asArray.toReversed())
      } 
      toSorted(...args) {
        return runtime.safeCall(this.asArray.toSorted(...args))
      } 
      toSpliced(...args) {
        return runtime.safeCall(this.asArray.toSpliced(...args))
      } 
      toString() {
        return runtime.safeCall(this.asArray.toString())
      } 
      with(...args) {
        return runtime.safeCall(this.asArray.with(...args))
      } 
      fill(...args) {
        let tmp;
        tmp = this.toArray();
        return runtime.safeCall(tmp.fill(...args))
      } 
      pop() {
        let tmp;
        tmp = this.toArray();
        return runtime.safeCall(tmp.pop())
      } 
      push(...args) {
        let tmp;
        tmp = this.toArray();
        return runtime.safeCall(tmp.push(...args))
      } 
      reverse() {
        let tmp;
        tmp = this.toArray();
        return runtime.safeCall(tmp.reverse())
      } 
      shift() {
        let tmp;
        tmp = this.toArray();
        return runtime.safeCall(tmp.shift())
      } 
      sort(...args) {
        let tmp;
        tmp = this.toArray();
        return runtime.safeCall(tmp.sort(...args))
      } 
      splice(...args) {
        let tmp;
        tmp = this.toArray();
        return runtime.safeCall(tmp.splice(...args))
      } 
      unshift(...args) {
        let tmp;
        tmp = this.toArray();
        return runtime.safeCall(tmp.unshift(...args))
      } 
      get length() {
        return this.asArray.length;
      } 
      values() {
        return this.iterator()
      }
      [prettyPrint]() { return this.toString(); }
      static [definitionMetadata] = ["class", "IterableBase"]; 
    });
    this.Iterable = function Iterable(mk) {
      return globalThis.Object.freeze(new Iterable.class(mk));
    };
    (class Iterable extends Iter.IterableBase {
      static {
        Iter.Iterable.class = this
      }
      constructor(mk) {
        super();
        this.#mk = mk;
      }
      #mk;
      iterator() {
        return runtime.safeCall(this.#mk())
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Iterable", [null]]; 
    });
    this.Iterator = function Iterator(next) {
      return globalThis.Object.freeze(new Iterator.class(next));
    };
    (class Iterator {
      static {
        Iter.Iterator.class = this
      }
      constructor(next) {
        this.next = next;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Iterator", ["next"]]; 
    });
    (class Result {
      static {
        Iter.Result = this
      }
      static {
        this.Next = function Next(value) {
          return globalThis.Object.freeze(new Next.class(value));
        };
        (class Next {
          static {
            Result.Next.class = this
          }
          constructor(value) {
            this.value = value;
            this.done = false;
          }
          toString() { return runtime.render(this); }
          static [definitionMetadata] = ["class", "Next", ["value"]]; 
        });
        (class Done {
          static {
            new this
          }
          constructor() {
            Result.Done = this;
            this.done = true;
            Object.defineProperty(this, "class", {
              value: Done
            });
            globalThis.Object.freeze(this);
          }
          toString() { return runtime.render(this); }
          static [definitionMetadata] = ["object", "Done"]; 
        });
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "Result"]; 
    });
  }
  static getIterator(something) {
    let test, prototype, tmp, tmp1;
    test = something[globalThis.Symbol.iterator];
    if (test === undefined) {
      switch (something) {
        case undefined:
          tmp = "undefined";
          break;
        case null:
          tmp = "null";
          break;
        default:
          prototype = globalThis.Reflect.getPrototypeOf(something);
          if (prototype === null) {
            tmp = "object";
          } else {
            tmp = prototype.constructor.name;
          }
      }
      tmp1 = "Not an iterable: " + tmp;
      throw runtime.safeCall(globalThis.TypeError(tmp1))
    }
    return runtime.safeCall(test.call(something));
  } 
  static adaptIterable(iterable, makeNext) {
    let lambda;
    lambda = (undefined, function () {
      let iterator, tmp;
      iterator = Iter.getIterator(iterable);
      tmp = runtime.safeCall(makeNext(iterator));
      return Iter.Iterator(tmp)
    });
    return Iter.Iterable(lambda)
  } 
  static mapping(xs, op) {
    let lambda;
    lambda = (undefined, function (iterator) {
      let lambda1;
      lambda1 = (undefined, function () {
        let next, scrut, tmp;
        next = runtime.safeCall(iterator.next());
        scrut = next.done;
        if (scrut === true) {
          return Iter.Result.Done
        }
        tmp = runtime.safeCall(op(next.value));
        return Iter.Result.Next(tmp);
      });
      return lambda1
    });
    return Iter.adaptIterable(xs, lambda)
  } 
  static withMap(op) {
    let lambda;
    lambda = (undefined, function (_0) {
      return Iter.mapping(_0, op)
    });
    return lambda
  } 
  static flattening(xss) {
    let lambda;
    lambda = (undefined, function () {
      let skipEmptyIterables, iterableIterator, currentIterator, firstIterableResult, scrut, tmp, tmp1, lambda1;
      skipEmptyIterables = function skipEmptyIterables() {
        let nextIterableResult, scrut1, nextIterator, nextResult, scrut2, tmp2;
        nextIterableResult = runtime.safeCall(iterableIterator.next());
        scrut1 = nextIterableResult.done;
        if (scrut1 === true) {
          return Option.None
        }
        nextIterator = Iter.getIterator(nextIterableResult.value);
        nextResult = runtime.safeCall(nextIterator.next());
        scrut2 = nextResult.done;
        if (scrut2 === true) {
          return skipEmptyIterables()
        }
        tmp2 = globalThis.Object.freeze([
          nextIterator,
          nextResult.value
        ]);
        return Option.Some(tmp2);
      };
      iterableIterator = Iter.getIterator(xss);
      firstIterableResult = runtime.safeCall(iterableIterator.next());
      scrut = firstIterableResult.done;
      if (scrut === true) {
        tmp = Option.None;
      } else {
        tmp1 = Iter.getIterator(firstIterableResult.value);
        tmp = Option.Some(tmp1);
      }
      currentIterator = tmp;
      lambda1 = (undefined, function () {
        let iterator, next, scrut1, scrut2, nextIterator, value, arg$Some$0$, arg$Some$0$1, element1$, element0$, tmp2;
        if (currentIterator instanceof Option.None.class) {
          return Iter.Result.Done
        } else if (currentIterator instanceof Option.Some.class) {
          arg$Some$0$ = currentIterator.value;
          iterator = arg$Some$0$;
          next = runtime.safeCall(iterator.next());
          scrut1 = next.done;
          if (scrut1 === true) {
            scrut2 = skipEmptyIterables();
            if (scrut2 instanceof Option.Some.class) {
              arg$Some$0$1 = scrut2.value;
              if (runtime.Tuple.isArrayLike(arg$Some$0$1) && arg$Some$0$1.length === 2) {
                element0$ = runtime.Tuple.get(arg$Some$0$1, 0);
                element1$ = runtime.Tuple.get(arg$Some$0$1, 1);
                value = element1$;
                nextIterator = element0$;
                tmp2 = Option.Some(nextIterator);
                currentIterator = tmp2;
                return Iter.Result.Next(value)
              }
            } else if (scrut2 instanceof Option.None.class) {
              currentIterator = Option.None;
              return Iter.Result.Done
            }
            return Iter.Result.Next(next.value)
          }
          return Iter.Result.Next(next.value);
        }
        throw globalThis.Object.freeze(new globalThis.Error("match error"));
      });
      return Iter.Iterator(lambda1)
    });
    return Iter.Iterable(lambda)
  } 
  static filtering(xs, op) {
    let lambda;
    lambda = (undefined, function (iterator) {
      let lambda1;
      lambda1 = (undefined, function () {
        let next, scrut;
        next = runtime.safeCall(iterator.next());
        lbl: while (true) {
          let scrut1, scrut2, tmp;
          scrut1 = next.done;
          if (scrut1 === false) {
            scrut2 = runtime.safeCall(op(next.value));
            if (scrut2 === false) {
              tmp = runtime.safeCall(iterator.next());
              next = tmp;
              continue lbl
            }
          }
          break;
        }
        scrut = next.done;
        if (scrut === true) {
          return Iter.Result.Done
        }
        return Iter.Result.Next(next.value);
      });
      return lambda1
    });
    return Iter.adaptIterable(xs, lambda)
  } 
  static withFilter(op) {
    let lambda;
    lambda = (undefined, function (_0) {
      return Iter.filtering(_0, op)
    });
    return lambda
  } 
  static taking(xs, n) {
    let lambda;
    lambda = (undefined, function (_) {
      let tmp;
      tmp = n - 1;
      n = tmp;
      return n >= 0
    });
    return Iter.filtering(xs, lambda)
  } 
  static withMax(n) {
    let lambda;
    lambda = (undefined, function (_0) {
      return Iter.taking(_0, n)
    });
    return lambda
  } 
  static leaving(xs, n) {
    let lambda;
    lambda = (undefined, function (_) {
      let tmp;
      tmp = n - 1;
      n = tmp;
      return n < 0
    });
    return Iter.filtering(xs, lambda)
  } 
  static withoutAtLeast(n) {
    let lambda;
    lambda = (undefined, function (_0) {
      return Iter.leaving(_0, n)
    });
    return lambda
  } 
  static zippingWithIndex(xs) {
    let i, lambda;
    i = 0;
    lambda = (undefined, function (x) {
      let j, tmp;
      j = i;
      tmp = i + 1;
      i = tmp;
      return globalThis.Object.freeze([
        x,
        j
      ])
    });
    return Iter.mapping(xs, lambda)
  } 
  static foldingImpl(iterator, acc, op) {
    let next;
    next = runtime.safeCall(iterator.next());
    lbl: while (true) {
      let scrut, tmp, tmp1;
      scrut = next.done;
      if (scrut === false) {
        tmp = runtime.safeCall(op(acc, next.value));
        acc = tmp;
        tmp1 = runtime.safeCall(iterator.next());
        next = tmp1;
        continue lbl
      }
      break;
    }
    return acc
  } 
  static appended(xs, ys) {
    let lambda;
    lambda = (undefined, function () {
      let xsIterator, currentIterator, lambda1;
      xsIterator = Iter.getIterator(xs);
      currentIterator = xsIterator;
      lambda1 = (undefined, function () {
        let next, scrut, scrut1, next1, scrut2, tmp;
        next = runtime.safeCall(currentIterator.next());
        scrut = next.done;
        if (scrut === true) {
          scrut1 = Predef.equals(currentIterator, xsIterator);
          if (scrut1 === true) {
            tmp = Iter.getIterator(ys);
            currentIterator = tmp;
            next1 = runtime.safeCall(currentIterator.next());
            scrut2 = next1.done;
            if (scrut2 === true) {
              return Iter.Result.Done
            }
            return Iter.Result.Next(next1.value);
          }
          return Iter.Result.Done;
        }
        return Iter.Result.Next(next.value);
      });
      return Iter.Iterator(lambda1)
    });
    return Iter.Iterable(lambda)
  } 
  static withAppended(xs) {
    let lambda;
    lambda = (undefined, function (_0) {
      return Iter.appended(_0, xs)
    });
    return lambda
  } 
  static reduced(xs, op) {
    let iterator, next, scrut;
    iterator = Iter.getIterator(xs);
    next = runtime.safeCall(iterator.next());
    scrut = next.done;
    if (scrut === true) {
      throw globalThis.Object.freeze(new globalThis.Error("Empty iterator"))
    }
    return Iter.foldingImpl(iterator, next.value, op);
  } 
  static folded(xs, z, op) {
    let iterator;
    iterator = Iter.getIterator(xs);
    return Iter.foldingImpl(iterator, z, op)
  } 
  static rightFolded(xs, z, op) {
    let go, iterator;
    go = function go() {
      let next, scrut, tmp;
      next = runtime.safeCall(iterator.next());
      scrut = next.done;
      if (scrut === true) {
        return z
      }
      tmp = go();
      return runtime.safeCall(op(next.value, tmp));
    };
    iterator = Iter.getIterator(xs);
    return go()
  } 
  static joined(xs, sep) {
    let iterator, next, scrut, tmp, lambda;
    iterator = Iter.getIterator(xs);
    next = runtime.safeCall(iterator.next());
    scrut = next.done;
    if (scrut === true) {
      return ""
    }
    runtime.safeCall(globalThis.String(sep));
    tmp = runtime.safeCall(globalThis.String(next.value));
    lambda = (undefined, function (acc, x) {
      let tmp1, tmp2;
      tmp1 = acc + sep;
      tmp2 = runtime.safeCall(globalThis.String(x));
      return tmp1 + tmp2
    });
    return Iter.foldingImpl(iterator, tmp, lambda);
  } 
  static firstDefined(xs, op) {
    let iterator, next, result;
    iterator = Iter.getIterator(xs);
    next = runtime.safeCall(iterator.next());
    result = Option.None;
    lbl: while (true) {
      let scrut, tmp, tmp1;
      scrut = next.done;
      if (scrut === false) {
        if (result instanceof Option.None.class) {
          tmp = runtime.safeCall(op(next.value));
          result = tmp;
          tmp1 = runtime.safeCall(iterator.next());
          next = tmp1;
          continue lbl
        }
      }
      break;
    }
    return result
  } 
  static some(xs, op) {
    let iterator, next;
    iterator = Iter.getIterator(xs);
    next = runtime.safeCall(iterator.next());
    lbl: while (true) {
      let scrut, scrut1, tmp;
      scrut = next.done;
      if (scrut === false) {
        scrut1 = runtime.safeCall(op(next.value));
        if (scrut1 === true) {
          return true
        }
        tmp = runtime.safeCall(iterator.next());
        next = tmp;
        continue lbl;
      }
      break;
    }
    return false
  } 
  static every(xs, op) {
    let iterator, next;
    iterator = Iter.getIterator(xs);
    next = runtime.safeCall(iterator.next());
    lbl: while (true) {
      let scrut, scrut1, tmp;
      scrut = next.done;
      if (scrut === false) {
        scrut1 = runtime.safeCall(op(next.value));
        if (scrut1 === false) {
          return false
        }
        tmp = runtime.safeCall(iterator.next());
        next = tmp;
        continue lbl;
      }
      break;
    }
    return true
  } 
  static each(xs, op) {
    let iterator, next;
    iterator = Iter.getIterator(xs);
    next = runtime.safeCall(iterator.next());
    lbl: while (true) {
      let scrut, tmp;
      scrut = next.done;
      if (scrut === false) {
        runtime.safeCall(op(next.value));
        tmp = runtime.safeCall(iterator.next());
        next = tmp;
        continue lbl
      }
      break;
    }
    return runtime.Unit
  } 
  static toArray(view) {
    return globalThis.Array.from(view)
  } 
  static fromStack(stack) {
    let lambda;
    lambda = (undefined, function () {
      let current, lambda1;
      current = stack;
      lambda1 = (undefined, function () {
        let head, tail, arg$Cons$0$, arg$Cons$1$;
        if (current instanceof Stack.Cons.class) {
          arg$Cons$0$ = current.head;
          arg$Cons$1$ = current.tail;
          tail = arg$Cons$1$;
          head = arg$Cons$0$;
          current = tail;
          return Iter.Result.Next(head)
        } else if (current instanceof Stack.Nil.class) {
          return Iter.Result.Done
        }
        throw globalThis.Object.freeze(new globalThis.Error("match error"));
      });
      return Iter.Iterator(lambda1)
    });
    return Iter.Iterable(lambda)
  } 
  static toStack(xs) {
    return Iter.rightFolded(xs, Stack.Nil, Stack.Cons)
  } 
  static isArrayLike(xs) {
    if (xs instanceof globalThis.Array) {
      return true
    } else if (xs instanceof Iter.IterableBase) {
      return true
    }
    return false;
  }
  toString() { return runtime.render(this); }
  static [definitionMetadata] = ["class", "Iter"]; 
});
let Iter = Iter1; export default Iter;
