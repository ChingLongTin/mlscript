const definitionMetadata = globalThis.Symbol.for("mlscript.definitionMetadata");
const prettyPrint = globalThis.Symbol.for("mlscript.prettyPrint");
import runtime from "./Runtime.mjs";
import StrOps from "./StrOps.mjs";
import Iter from "./Iter.mjs";
import XML from "./XML.mjs";
import Option from "./Option.mjs";
import Runtime from "./Runtime.mjs";
import Predef from "./Predef.mjs";
import MutMap from "./MutMap.mjs";
import Block from "./Block.mjs";
import CachedHash from "./CachedHash.mjs";
import Shape from "./Shape.mjs";
import ShapeSet from "./ShapeSet.mjs";
import SpecializeHelpers from "./SpecializeHelpers.mjs";
import Examples from "./Examples.mjs";
import MLscript from "./MLscript.mjs";
let Main1;
(class Main {
  static {
    Main1 = this
  }
  static #query;
  static #editor;
  static #selector;
  static #parseButton;
  static #runButton;
  static #statusPanel;
  static #outputPanel;
  static #runnerEditor;
  static #runnerOutput;
  static #runStatus;
  static #stagedNamesPattern;
  static #specializedCode;
  static #compileAndSpecializationTime;
  static #indentRegex;
  static #errorDisplayStyle;
  static {
    let lambda, lambda1, lambda2, lambda3, lambda4;
    Main.#query = runtime.safeCall(globalThis.document.querySelector.bind(globalThis.document));
    Main.#editor = runtime.safeCall(Main.#query("#source-editor"));
    Main.#selector = runtime.safeCall(Main.#query("#demo-select"));
    Main.#parseButton = runtime.safeCall(Main.#query("#compile-button"));
    Main.#runButton = runtime.safeCall(Main.#query("#run-button"));
    Main.#statusPanel = runtime.safeCall(Main.#query("#compile-status"));
    Main.#outputPanel = runtime.safeCall(Main.#query("#specialized-code"));
    Main.#runnerEditor = runtime.safeCall(Main.#query("#runner-editor"));
    Main.#runnerOutput = runtime.safeCall(Main.#query("#runner-output"));
    Main.#runStatus = runtime.safeCall(Main.#query("#run-status"));
    Main.#stagedNamesPattern = (new globalThis.RegExp("^\\s*(?:staged\\s+)?(module|class)\\s+([A-Za-z_][A-Za-z0-9_]*)(?:\\([^()]+\\))*\\s+with\\b", "gm"));
    Main.#specializedCode = "";
    Main.#compileAndSpecializationTime = 0.0;
    lambda = (undefined, function (caseScrut) {
      let key, example, Option, scrut, element1$, element0$;
      if (runtime.Tuple.isArrayLike(caseScrut) && caseScrut.length === 2) {
        element0$ = runtime.Tuple.get(caseScrut, 0);
        element1$ = runtime.Tuple.get(caseScrut, 1);
        example = element1$;
        key = element0$;
        Option = runtime.safeCall(globalThis.document.createElement("Option"));
        Option.value = key;
        Option.textContent = example.name;
        runtime.safeCall(Main.#selector.appendChild(Option));
        scrut = Main.#editor.value;
        if (scrut === "") {
          Main.#editor.value = example.source;
          return runtime.Unit
        }
        return runtime.Unit;
      }
      throw (new globalThis.Error("match error"));
    });
    Iter.each(Examples.examples, lambda);
    lambda1 = (undefined, function (event) {
      let scrut, start, end, tmp, tmp1, tmp2, tmp3, tmp4;
      scrut = event.key;
      if (scrut === "Tab") {
        runtime.safeCall(event.preventDefault());
        start = Main.#editor.selectionStart;
        end = Main.#editor.selectionEnd;
        tmp = Main.#editor.value.substring(0, start);
        tmp1 = tmp + "  ";
        tmp2 = runtime.safeCall(Main.#editor.value.substring(end));
        tmp3 = tmp1 + tmp2;
        Main.#editor.value = tmp3;
        tmp4 = start + 2;
        Main.#editor.selectionEnd = tmp4;
        Main.#editor.selectionStart = Main.#editor.selectionEnd;
        return runtime.Unit
      }
      return runtime.Unit;
    });
    Main.#editor.addEventListener("keydown", lambda1);
    lambda2 = (undefined, function (event) {
      let scrut, example, arg$Some$0$, tmp, tmp1, tmp2;
      tmp = MutMap.get(Main.#selector.value);
      scrut = Predef.pipeInto(Examples.examples, tmp);
      if (scrut instanceof Option.Some.class) {
        arg$Some$0$ = scrut.value;
        example = arg$Some$0$;
        Main.#editor.value = example.source;
        return runtime.Unit
      } else if (scrut instanceof Option.None.class) {
        tmp1 = "Example \"" + Main.#selector.value;
        tmp2 = tmp1 + "\" not found";
        throw (new globalThis.Error(tmp2))
      }
      return runtime.Unit;
    });
    Main.#selector.addEventListener("change", lambda2);
    lambda3 = (undefined, function (event) {
      let lambda5, lambda6;
      Main.#outputPanel.textContent = "Compiling...";
      lambda5 = (undefined, function () {
        let propStat, showStat, scrut, begin, res, codegen, sections, generatedVars, generatedCode, compiledCode, scrut1, hasGeneratedCode, res1, end, scrut2, scrut3, scrut4, tmp, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, rcd, tmp9, tmp10, tmp11, tmp12, tmp13, tmp14, tmp15, tmp16, tmp17, tmp18, tmp19, tmp20, tmp21, tmp22, tmp23, tmp24, tmp25, tmp26, tmp27, tmp28, tmp29, tmp30;
        propStat = ([]);
        showStat = ([]);
        lbl: while (true) {
          let match, scrut5, scrut6, tmp31, tmp32, tmp33, tmp34, tmp35;
          match = runtime.safeCall(Main.#stagedNamesPattern.exec(Main.#editor.value));
          if (match === null) {
            tmp31 = true;
          } else {
            tmp31 = false;
          }
          scrut5 = ! tmp31;
          if (scrut5 === true) {
            scrut6 = match[1];
            switch (scrut6) {
              case "module":
                tmp32 = match[2] + ".propagate()";
                runtime.safeCall(propStat.push(tmp32));
                tmp33 = match[2] + ".show()";
                runtime.safeCall(showStat.push(tmp33));
                continue lbl;
              case "class":
                tmp34 = match[2] + ".\"class\".propagate()";
                runtime.safeCall(propStat.push(tmp34));
                tmp35 = match[2] + ".\"class\".show()";
                runtime.safeCall(showStat.push(tmp35));
                continue lbl;
            }
            throw (new globalThis.Error("match error"))
          }
          break;
        }
        globalThis.console.log(propStat, showStat);
        scrut = showStat.length;
        if (scrut === 0) {
          Main.#statusPanel.textContent = "No staged module found.";
        }
        begin = runtime.safeCall(globalThis.performance.now());
        codegen = false;
        tmp = ({
          codegen: codegen
        });
        tmp1 = Main.#editor.value + "\n";
        tmp2 = runtime.safeCall(propStat.join("\n"));
        tmp3 = tmp1 + tmp2;
        tmp4 = tmp3 + "\n";
        tmp5 = tmp4 + "[";
        tmp6 = runtime.safeCall(showStat.join(", "));
        tmp7 = tmp5 + tmp6;
        tmp8 = tmp7 + "].join(\"\\n\")";
        rcd = ({
          traces: tmp
        });
        res = MLscript.compile(tmp8, rcd);
        tmp9 = Main.#editor.value + "\n";
        tmp10 = runtime.safeCall(propStat.join("\n"));
        tmp11 = tmp9 + tmp10;
        tmp12 = tmp11 + "\n";
        tmp13 = tmp12 + "[";
        tmp14 = runtime.safeCall(showStat.join(", "));
        tmp15 = tmp13 + tmp14;
        tmp16 = tmp15 + "].join(\"\\n\")";
        runtime.safeCall(globalThis.console.log(tmp16));
        sections = [];
        generatedVars = runtime.safeCall(res.codegen.vars.trim());
        generatedCode = runtime.safeCall(res.codegen.code.trim());
        tmp17 = Predef.nequals(generatedVars, "");
        if (tmp17 === true) {
          tmp18 = Predef.nequals(generatedCode, "");
        } else {
          tmp18 = false;
        }
        scrut1 = tmp18;
        if (scrut1 === true) {
          tmp19 = generatedVars + "\n\n";
          tmp20 = tmp19 + generatedCode;
        } else {
          tmp20 = generatedVars + generatedCode;
        }
        compiledCode = tmp20;
        hasGeneratedCode = Predef.nequals(compiledCode, "");
        if (hasGeneratedCode === true) {
          tmp21 = generatedVars + generatedCode;
          runtime.safeCall(globalThis.console.log(tmp21));
          tmp22 = generatedVars + generatedCode;
          res1 = runtime.safeCall(eval(tmp22));
          end = runtime.safeCall(globalThis.performance.now());
          Main.#specializedCode = res1;
          tmp23 = end - begin;
          Main.#compileAndSpecializationTime = tmp23;
          runtime.safeCall(sections.push(res1));
        }
        scrut2 = res.codegen.diagnostics.length > 0;
        if (scrut2 === true) {
          tmp24 = runtime.safeCall(res.codegen.diagnostics.join("\n"));
          tmp25 = "Diagnostics:\n" + tmp24;
          runtime.safeCall(sections.push(tmp25));
        }
        scrut3 = sections.length > 0;
        if (scrut3 === true) {
          tmp26 = runtime.safeCall(sections.join("\n\n"));
        } else {
          tmp26 = "No specialized code was generated.";
        }
        Main.#outputPanel.textContent = tmp26;
        scrut4 = res.codegen.diagnostics.length > 0;
        if (scrut4 === true) {
          tmp27 = "Compilation completed with code generation diagnostics.";
        } else {
          if (hasGeneratedCode === true) {
            tmp28 = runtime.safeCall(Main.#compileAndSpecializationTime.toString());
            tmp29 = "Compilation succeeded. Time: " + tmp28;
            tmp30 = tmp29 + "ms";
          } else {
            tmp30 = "Compilation completed. No specialized code was generated.";
          }
          tmp27 = tmp30;
        }
        Main.#statusPanel.textContent = tmp27;
        return runtime.Unit
      });
      lambda6 = (undefined, function (error) {
        let tmp;
        Main.#specializedCode = "";
        Main.#statusPanel.textContent = "Compilation failed. See the error output below.";
        tmp = Main.formatError(error);
        Main.#outputPanel.textContent = tmp;
        return runtime.Unit
      });
      return Runtime.try_catch(lambda5, lambda6)
    });
    Main.#parseButton.addEventListener("click", lambda3);
    lambda4 = (undefined, function (event) {
      let lambda5, lambda6;
      Main.#runStatus.textContent = "Running the combined code...";
      Main.#runnerOutput.textContent = "Running...";
      lambda5 = (undefined, function () {
        let scrut, combinedCode, codegen, generatedVars, generatedCode, compiledCode, scrut1, result, tmp, tmp1, tmp2, rcd, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8;
        scrut = Predef.equals(Main.#specializedCode, "");
        if (scrut === true) {
          Main.#runStatus.textContent = "Run unavailable. Compile the program first.";
          Main.#runnerOutput.textContent = "Compile the program first to populate the specialized code.";
          return runtime.Unit
        }
        codegen = false;
        tmp = ({
          codegen: codegen
        });
        tmp1 = Main.#specializedCode + "\n";
        tmp2 = tmp1 + Main.#runnerEditor.value;
        rcd = ({
          traces: tmp
        });
        combinedCode = MLscript.compile(tmp2, rcd);
        generatedVars = runtime.safeCall(combinedCode.codegen.vars.trim());
        generatedCode = runtime.safeCall(combinedCode.codegen.code.trim());
        tmp3 = Predef.nequals(generatedVars, "");
        if (tmp3 === true) {
          tmp4 = Predef.nequals(generatedCode, "");
        } else {
          tmp4 = false;
        }
        scrut1 = tmp4;
        if (scrut1 === true) {
          tmp5 = generatedVars + "\n\n";
          tmp6 = tmp5 + generatedCode;
        } else {
          tmp6 = generatedVars + generatedCode;
        }
        compiledCode = tmp6;
        runtime.safeCall(globalThis.console.log(compiledCode));
        tmp7 = compiledCode.replaceAll("runtime", "Runtime");
        tmp8 = tmp7.replaceAll("Option", "Option");
        result = runtime.safeCall(eval(tmp8));
        Main.#runnerOutput.textContent = result;
        Main.#runStatus.textContent = "Run succeeded. The return value is shown below.";
        return runtime.Unit;
      });
      lambda6 = (undefined, function (error) {
        let tmp;
        Main.#runStatus.textContent = "Run failed. See the runtime output below.";
        tmp = Main.formatError(error);
        Main.#runnerOutput.textContent = tmp;
        return runtime.Unit
      });
      return Runtime.try_catch(lambda5, lambda6)
    });
    Main.#runButton.addEventListener("click", lambda4);
    Main.#indentRegex = (new globalThis.RegExp("^(\\s*)"));
    Main.#errorDisplayStyle = "\n.error-container {\n  background-color: #fdd;\n  padding: 0.375rem 0.75rem 0.5rem;\n  font-family: var(--monospace);\n  color: #991b1bff;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.error-message {\n  margin: 0;\n  font-weight: bold;\n  font-size: 1.125rem;\n}\n.stack-trace {\n  font-size: 0.875rem;\n  margin: 0;\n  list-style-type: none;\n  padding-left: 0.5rem;\n}";
    (class CollapsibleTree extends globalThis.HTMLElement {
      static {
        Main.CollapsibleTree = this
      }
      constructor() {
        super();
      }
      connectedCallback() {
        let rawText, treeData, treeElement;
        rawText = this.textContent;
        this.textContent = "";
        treeData = Main.parseIndentedText(rawText);
        treeElement = this.createDetailsTree(treeData, 0);
        return runtime.safeCall(this.appendChild(treeElement))
      } 
      createDetailsTree(nodes, depth) {
        let fragment, lambda5;
        fragment = runtime.safeCall(globalThis.document.createDocumentFragment());
        const this$CollapsibleTree = this;
        lambda5 = (undefined, function (node) {
          let details, scrut, summary, scrut1, rule, tmp, tmp1;
          details = runtime.safeCall(globalThis.document.createElement("details"));
          scrut = depth < 4;
          if (scrut === true) {
            details.setAttribute("open", "");
          }
          summary = runtime.safeCall(globalThis.document.createElement("summary"));
          summary.textContent = node.text;
          runtime.safeCall(details.appendChild(summary));
          scrut1 = node.children.length > 0;
          if (scrut1 === true) {
            tmp = depth + 1;
            tmp1 = this$CollapsibleTree.createDetailsTree(node.children, tmp);
            runtime.safeCall(details.appendChild(tmp1));
          } else {
            details.setAttribute("leaf", "");
          }
          runtime.safeCall(fragment.appendChild(details));
          rule = runtime.safeCall(globalThis.document.createElement("rule"));
          runtime.safeCall(rule.classList.add("rule"));
          return runtime.safeCall(fragment.appendChild(rule))
        });
        Iter.each(nodes, lambda5);
        return fragment
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "CollapsibleTree"]; 
    });
    globalThis.customElements.define("collapsible-tree", Main.CollapsibleTree);
    (class ErrorDisplay extends globalThis.HTMLElement {
      static {
        Main.ErrorDisplay = this
      }
      constructor() {
        super();
        let rcd;
        rcd = ({
          mode: "open"
        });
        runtime.safeCall(this.attachShadow(rcd));
        this.#_error = Option.None;
      }
      #_error;
      connectedCallback() {
        return this.render()
      } 
      setError(value) {
        let tmp;
        tmp = Option.Some(value);
        this.#_error = tmp;
        return this.render()
      } 
      render() {
        let error, stackLines, scrut, arg$Some$0$, rcd, tmp, rcd1, tmp1, tmp2, tmp3, tmp4, rcd2, tmp5, lambda5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11;
        if (this.#_error instanceof Option.Some.class) {
          arg$Some$0$ = this.#_error.value;
          error = arg$Some$0$;
          stackLines = runtime.safeCall(error.stack.split("\n"));
          scrut = runtime.safeCall(stackLines.at(0).startsWith(error.name));
          if (scrut === true) {
            runtime.safeCall(stackLines.shift());
          }
          rcd = ({
            "class": "error-container"
          });
          tmp = XML.elem("div", rcd);
          rcd1 = ({
            "class": "error-message"
          });
          tmp1 = XML.elem("h3", rcd1);
          tmp2 = error.name + ": ";
          tmp3 = tmp2 + error.message;
          tmp4 = runtime.safeCall(tmp1(tmp3));
          rcd2 = ({
            "class": "stack-trace"
          });
          tmp5 = XML.elem("ul", rcd2);
          lambda5 = (undefined, function (line) {
            let tmp12, tmp13;
            tmp12 = XML.elem("li");
            tmp13 = runtime.safeCall(line.trim());
            return runtime.safeCall(tmp12(tmp13))
          });
          tmp6 = Iter.mapping(stackLines, lambda5);
          tmp7 = Iter.joined(tmp6, "");
          tmp8 = runtime.safeCall(tmp5(tmp7));
          tmp9 = XML.elem("style");
          tmp10 = runtime.safeCall(tmp9(Main.#errorDisplayStyle));
          tmp11 = runtime.safeCall(tmp(tmp4, tmp8, tmp10));
          this.shadowRoot.innerHTML = tmp11;
          return runtime.Unit
        }
        return runtime.Unit;
      }
      toString() { return runtime.render(this); }
      static [definitionMetadata] = ["class", "ErrorDisplay"]; 
    });
    globalThis.customElements.define("error-display", Main.ErrorDisplay);
  }
  static formatError(error) {
    let scrut, tmp, tmp1, tmp2;
    tmp = error.name + ": ";
    tmp1 = tmp + error.message;
    scrut = error.stack;
    if (typeof scrut === 'string') {
      tmp2 = "\n" + error.stack;
      return tmp1 + tmp2
    }
    tmp2 = "";
    return tmp1 + tmp2;
  } 
  static parseIndentedText(text) {
    let root, text1, children, stack, node, indent, tmp, tmp1, lambda, tmp2, lambda1;
    text1 = "";
    children = [];
    root = ({
      text: text1,
      children: children
    });
    node = root;
    indent = - 1;
    tmp = ({
      node: node,
      indent: indent
    });
    stack = [
      tmp
    ];
    tmp1 = runtime.safeCall(text.split("\n"));
    lambda = (undefined, function (line) {
      let tmp3;
      tmp3 = runtime.safeCall(line.trim());
      return tmp3.length > 0
    });
    tmp2 = Iter.filtering(tmp1, lambda);
    lambda1 = (undefined, function (line) {
      let indent1, text2, newNode, text3, children1, tmp3, tmp4, rcd;
      tmp3 = runtime.safeCall(line.match(Main.#indentRegex));
      indent1 = tmp3.at(1).length;
      text2 = runtime.safeCall(line.substring(indent1));
      lbl: while (true) {
        let scrut, tmp5;
        tmp5 = stack.length - 1;
        scrut = indent1 <= stack.at(tmp5).indent;
        if (scrut === true) {
          runtime.safeCall(stack.pop());
          continue lbl
        }
        break;
      }
      text3 = text2;
      children1 = [];
      newNode = ({
        text: text3,
        children: children1
      });
      tmp4 = stack.length - 1;
      runtime.safeCall(stack.at(tmp4).node.children.push(newNode));
      rcd = ({
        node: newNode,
        indent: indent1
      });
      return runtime.safeCall(stack.push(rcd))
    });
    Iter.each(tmp2, lambda1);
    return root.children
  }
  toString() { return runtime.render(this); }
  static [definitionMetadata] = ["class", "Main"]; 
});