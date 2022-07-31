var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  render: () => render_default
});
module.exports = __toCommonJS(src_exports);

// src/render.ts
var import_stream = require("stream");

// src/instances.ts
var instances_default = /* @__PURE__ */ new WeakMap();

// src/temir.ts
var import_is_ci = __toESM(require("is-ci"));
var import_auto_bind = __toESM(require("auto-bind"));
var import_lodash = require("lodash");
var import_ansi_escapes2 = __toESM(require("ansi-escapes"));
var import_vue2 = require("vue");
var import_signal_exit = __toESM(require("signal-exit"));
var import_patch_console = __toESM(require("patch-console"));

// src/dom/index.ts
var import_yoga_layout_prebuilt2 = __toESM(require("yoga-layout-prebuilt"));

// src/dom/styles.ts
var import_yoga_layout_prebuilt = __toESM(require("yoga-layout-prebuilt"));
var applyPositionStyles = (node, style) => {
  if ("position" in style) {
    node.setPositionType(
      style.position === "absolute" ? import_yoga_layout_prebuilt.default.POSITION_TYPE_ABSOLUTE : import_yoga_layout_prebuilt.default.POSITION_TYPE_RELATIVE
    );
  }
};
var applyMarginStyles = (node, style) => {
  if ("marginLeft" in style)
    node.setMargin(import_yoga_layout_prebuilt.default.EDGE_START, style.marginLeft || 0);
  if ("marginRight" in style)
    node.setMargin(import_yoga_layout_prebuilt.default.EDGE_END, style.marginRight || 0);
  if ("marginTop" in style)
    node.setMargin(import_yoga_layout_prebuilt.default.EDGE_TOP, style.marginTop || 0);
  if ("marginBottom" in style)
    node.setMargin(import_yoga_layout_prebuilt.default.EDGE_BOTTOM, style.marginBottom || 0);
};
var applyPaddingStyles = (node, style) => {
  if ("paddingLeft" in style)
    node.setPadding(import_yoga_layout_prebuilt.default.EDGE_LEFT, style.paddingLeft || 0);
  if ("paddingRight" in style)
    node.setPadding(import_yoga_layout_prebuilt.default.EDGE_RIGHT, style.paddingRight || 0);
  if ("paddingTop" in style)
    node.setPadding(import_yoga_layout_prebuilt.default.EDGE_TOP, style.paddingTop || 0);
  if ("paddingBottom" in style)
    node.setPadding(import_yoga_layout_prebuilt.default.EDGE_BOTTOM, style.paddingBottom || 0);
};
var applyFlexStyles = (node, style) => {
  if ("flexGrow" in style)
    node.setFlexGrow(style.flexGrow ?? 0);
  if ("flexShrink" in style) {
    node.setFlexShrink(
      typeof style.flexShrink === "number" ? style.flexShrink : 1
    );
  }
  if ("flexDirection" in style) {
    if (style.flexDirection === "row")
      node.setFlexDirection(import_yoga_layout_prebuilt.default.FLEX_DIRECTION_ROW);
    if (style.flexDirection === "row-reverse")
      node.setFlexDirection(import_yoga_layout_prebuilt.default.FLEX_DIRECTION_ROW_REVERSE);
    if (style.flexDirection === "column")
      node.setFlexDirection(import_yoga_layout_prebuilt.default.FLEX_DIRECTION_COLUMN);
    if (style.flexDirection === "column-reverse")
      node.setFlexDirection(import_yoga_layout_prebuilt.default.FLEX_DIRECTION_COLUMN_REVERSE);
  }
  if ("flexBasis" in style) {
    if (typeof style.flexBasis === "number") {
      node.setFlexBasis(style.flexBasis);
    } else if (typeof style.flexBasis === "string") {
      node.setFlexBasisPercent(Number.parseInt(style.flexBasis, 10));
    } else {
      node.setFlexBasis(NaN);
    }
  }
  if ("alignItems" in style) {
    if (style.alignItems === "stretch" || !style.alignItems)
      node.setAlignItems(import_yoga_layout_prebuilt.default.ALIGN_STRETCH);
    if (style.alignItems === "flex-start")
      node.setAlignItems(import_yoga_layout_prebuilt.default.ALIGN_FLEX_START);
    if (style.alignItems === "center")
      node.setAlignItems(import_yoga_layout_prebuilt.default.ALIGN_CENTER);
    if (style.alignItems === "flex-end")
      node.setAlignItems(import_yoga_layout_prebuilt.default.ALIGN_FLEX_END);
  }
  if ("alignSelf" in style) {
    if (style.alignSelf === "auto" || !style.alignSelf)
      node.setAlignSelf(import_yoga_layout_prebuilt.default.ALIGN_AUTO);
    if (style.alignSelf === "flex-start")
      node.setAlignSelf(import_yoga_layout_prebuilt.default.ALIGN_FLEX_START);
    if (style.alignSelf === "center")
      node.setAlignSelf(import_yoga_layout_prebuilt.default.ALIGN_CENTER);
    if (style.alignSelf === "flex-end")
      node.setAlignSelf(import_yoga_layout_prebuilt.default.ALIGN_FLEX_END);
  }
  if ("justifyContent" in style) {
    if (style.justifyContent === "flex-start" || !style.justifyContent)
      node.setJustifyContent(import_yoga_layout_prebuilt.default.JUSTIFY_FLEX_START);
    if (style.justifyContent === "center")
      node.setJustifyContent(import_yoga_layout_prebuilt.default.JUSTIFY_CENTER);
    if (style.justifyContent === "flex-end")
      node.setJustifyContent(import_yoga_layout_prebuilt.default.JUSTIFY_FLEX_END);
    if (style.justifyContent === "space-between")
      node.setJustifyContent(import_yoga_layout_prebuilt.default.JUSTIFY_SPACE_BETWEEN);
    if (style.justifyContent === "space-around")
      node.setJustifyContent(import_yoga_layout_prebuilt.default.JUSTIFY_SPACE_AROUND);
  }
};
var applyDimensionStyles = (node, style) => {
  if ("width" in style) {
    if (typeof style.width === "number")
      node.setWidth(style.width);
    else if (typeof style.width === "string")
      node.setWidthPercent(Number.parseInt(style.width, 10));
    else
      node.setWidthAuto();
  }
  if ("height" in style) {
    if (typeof style.height === "number")
      node.setHeight(style.height);
    else if (typeof style.height === "string")
      node.setHeightPercent(Number.parseInt(style.height, 10));
    else
      node.setHeightAuto();
  }
  if ("minWidth" in style) {
    if (typeof style.minWidth === "string")
      node.setMinWidthPercent(Number.parseInt(style.minWidth, 10));
    else
      node.setMinWidth(style.minWidth ?? 0);
  }
  if ("minHeight" in style) {
    if (typeof style.minHeight === "string")
      node.setMinHeightPercent(Number.parseInt(style.minHeight, 10));
    else
      node.setMinHeight(style.minHeight ?? 0);
  }
};
var applyDisplayStyles = (node, style) => {
  if ("display" in style) {
    node.setDisplay(
      style.display === "flex" ? import_yoga_layout_prebuilt.default.DISPLAY_FLEX : import_yoga_layout_prebuilt.default.DISPLAY_NONE
    );
  }
};
var applyBorderStyles = (node, style) => {
  if ("borderStyle" in style) {
    const borderWidth = typeof style.borderStyle === "string" ? 1 : 0;
    node.setBorder(import_yoga_layout_prebuilt.default.EDGE_TOP, borderWidth);
    node.setBorder(import_yoga_layout_prebuilt.default.EDGE_BOTTOM, borderWidth);
    node.setBorder(import_yoga_layout_prebuilt.default.EDGE_LEFT, borderWidth);
    node.setBorder(import_yoga_layout_prebuilt.default.EDGE_RIGHT, borderWidth);
  }
};
var styles_default = (node, style = {}) => {
  applyPositionStyles(node, style);
  applyMarginStyles(node, style);
  applyPaddingStyles(node, style);
  applyFlexStyles(node, style);
  applyDimensionStyles(node, style);
  applyDisplayStyles(node, style);
  applyBorderStyles(node, style);
};

// src/dom/measure-text.ts
var import_widest_line = __toESM(require("widest-line"));
var cache = {};
var measure_text_default = (text) => {
  if (text.length === 0) {
    return {
      width: 0,
      height: 0
    };
  }
  if (cache[text])
    return cache[text];
  const width = (0, import_widest_line.default)(text);
  const height = text.split("\n").length;
  cache[text] = { width, height };
  return { width, height };
};

// src/dom/squash-text-nodes.ts
var squashTextNodes = (node) => {
  let text = "";
  if (node.childNodes.length > 0) {
    for (const childNode of node.childNodes) {
      let nodeText = "";
      if (childNode.nodeName === "#text") {
        nodeText = childNode.nodeValue;
      } else {
        if (childNode.nodeName === "temir-text" || childNode.nodeName === "temir-virtual-text")
          nodeText = squashTextNodes(childNode);
        if (nodeText.length > 0 && typeof childNode.internal_transform === "function")
          nodeText = childNode.internal_transform(nodeText);
      }
      text += nodeText;
    }
  }
  return text;
};
var squash_text_nodes_default = squashTextNodes;

// src/dom/wrap-text.ts
var import_wrap_ansi = __toESM(require("wrap-ansi"));
var import_cli_truncate = __toESM(require("cli-truncate"));
var cache2 = {};
var wrap_text_default = (text, maxWidth, wrapType) => {
  const cacheKey = text + String(maxWidth) + String(wrapType);
  if (cache2[cacheKey])
    return cache2[cacheKey];
  let wrappedText = text;
  if (wrapType === "wrap") {
    wrappedText = (0, import_wrap_ansi.default)(text, maxWidth, {
      trim: false,
      hard: true
    });
  }
  if (wrapType.startsWith("truncate")) {
    let position = "end";
    if (wrapType === "truncate-middle")
      position = "middle";
    if (wrapType === "truncate-start")
      position = "start";
    wrappedText = (0, import_cli_truncate.default)(text, maxWidth, { position });
  }
  cache2[cacheKey] = wrappedText;
  return wrappedText;
};

// src/dom/index.ts
var measureTextNode = function(node, width) {
  var _a;
  const text = node.nodeName === "#text" ? node.nodeValue : squash_text_nodes_default(node);
  const dimensions = measure_text_default(text);
  if (dimensions.width <= width)
    return dimensions;
  if (dimensions.width >= 1 && width > 0 && width < 1)
    return dimensions;
  const textWrap = ((_a = node.style) == null ? void 0 : _a.textWrap) ?? "wrap";
  const wrappedText = wrap_text_default(text, width, textWrap);
  return measure_text_default(wrappedText);
};
var createNode = (nodeName) => {
  var _a;
  const node = {
    nodeName,
    style: {},
    attributes: {},
    childNodes: [],
    parentNode: null,
    yogaNode: nodeName === "temir-virtual-text" ? void 0 : import_yoga_layout_prebuilt2.default.Node.create()
  };
  if (nodeName === "temir-text")
    (_a = node.yogaNode) == null ? void 0 : _a.setMeasureFunc(measureTextNode.bind(null, node));
  return node;
};
var findClosestYogaNode = (node) => {
  if (!node || !node.parentNode)
    return void 0;
  return node.yogaNode ?? findClosestYogaNode(node.parentNode);
};
var findRootNode = (node) => {
  if (node.nodeName === "temir-root")
    return node;
  if (!node.parentNode)
    return null;
  return findRootNode(node.parentNode);
};
var markNodeAsDirty = (node) => {
  const yogaNode = findClosestYogaNode(node);
  yogaNode == null ? void 0 : yogaNode.markDirty();
};
var removeChildNode = (node, removeNode) => {
  var _a, _b;
  if (removeNode.yogaNode)
    (_b = (_a = removeNode.parentNode) == null ? void 0 : _a.yogaNode) == null ? void 0 : _b.removeChild(removeNode.yogaNode);
  removeNode.parentNode = null;
  const index = node.childNodes.indexOf(removeNode);
  if (index >= 0)
    node.childNodes.splice(index, 1);
  if (node.nodeName === "temir-text" || node.nodeName === "temir-virtual-text")
    markNodeAsDirty(node);
};
var appendChildNode = (childNode, node) => {
  var _a;
  if (!childNode || !childNode.nodeValue && !childNode.yogaNode)
    return;
  if (childNode.parentNode)
    removeChildNode(childNode.parentNode, childNode);
  childNode.parentNode = node;
  node.childNodes.push(childNode);
  if (childNode.yogaNode) {
    (_a = node.yogaNode) == null ? void 0 : _a.insertChild(
      childNode.yogaNode,
      node.yogaNode.getChildCount()
    );
  }
  if (node.nodeName === "temir-text" || node.nodeName === "temir-virtual-text")
    markNodeAsDirty(node);
};
var setTextNodeValue = (node, text) => {
  if (typeof text !== "string")
    text = String(text);
  node.nodeValue = text;
  const rootNode = findRootNode(node);
  markNodeAsDirty(node);
  rootNode == null ? void 0 : rootNode.onRender();
};
var createTextNode = (text) => {
  const node = {
    nodeName: "#text",
    nodeValue: text,
    yogaNode: void 0,
    parentNode: null,
    style: {}
  };
  setTextNodeValue(node, text);
  return node;
};
var setAttribute = (node, key, value) => {
  node.attributes[key] = value;
};
var setStyle = (node, style) => {
  node.style = style;
  if (node.yogaNode)
    styles_default(node.yogaNode, style);
};
var updateProps = (node, key, value) => {
  if (key === "style")
    setStyle(node, value);
  else if (key === "internal_transform")
    node.internal_transform = value;
  else if (key === "internal_static")
    node.internal_static = true;
  else
    setAttribute(node, key, value);
};
var createElement = (nodeName, _, __, props) => {
  const node = createNode(nodeName);
  for (const key in props)
    updateProps(node, key, props[key]);
  return node;
};

// src/createRenderer.ts
var import_runtime_core = require("@vue/runtime-core");
var renderder = (0, import_runtime_core.createRenderer)({
  createElement,
  createText(text) {
    return createTextNode(text);
  },
  createComment() {
  },
  insert: appendChildNode,
  patchProp(el, key, oldProps, newProps) {
    var _a;
    el[key] = newProps;
    updateProps(el, key, newProps);
    (_a = findRootNode(el)) == null ? void 0 : _a.onRender();
  },
  setText: setTextNodeValue,
  remove(el) {
  },
  parentNode() {
  },
  nextSibling() {
  }
});
var createRenderer_default = renderder;

// src/log-update.ts
var import_ansi_escapes = __toESM(require("ansi-escapes"));
var import_cli_cursor = __toESM(require("cli-cursor"));
var create = (stream, { showCursor = false } = {}) => {
  let previousLineCount = 0;
  let previousOutput = "";
  let hasHiddenCursor = false;
  const render2 = (str) => {
    if (!showCursor && !hasHiddenCursor) {
      import_cli_cursor.default.hide();
      hasHiddenCursor = true;
    }
    const output = `${str}
`;
    if (output === previousOutput)
      return;
    previousOutput = output;
    stream.write(import_ansi_escapes.default.eraseLines(previousLineCount) + output);
    previousLineCount = output.split("\n").length;
  };
  render2.clear = () => {
    stream.write(import_ansi_escapes.default.eraseLines(previousLineCount));
    previousOutput = "";
    previousLineCount = 0;
  };
  render2.done = () => {
    previousOutput = "";
    previousLineCount = 0;
    if (!showCursor) {
      import_cli_cursor.default.show();
      hasHiddenCursor = false;
    }
  };
  return render2;
};
var log_update_default = { create };

// src/renderer.ts
var import_yoga_layout_prebuilt5 = __toESM(require("yoga-layout-prebuilt"));

// src/render-node-to-output.ts
var import_yoga_layout_prebuilt4 = __toESM(require("yoga-layout-prebuilt"));
var import_widest_line2 = __toESM(require("widest-line"));
var import_indent_string = __toESM(require("indent-string"));

// src/dom/get-max-width.ts
var import_yoga_layout_prebuilt3 = __toESM(require("yoga-layout-prebuilt"));
var get_max_width_default = (yogaNode) => {
  return yogaNode.getComputedWidth() - yogaNode.getComputedPadding(import_yoga_layout_prebuilt3.default.EDGE_LEFT) - yogaNode.getComputedPadding(import_yoga_layout_prebuilt3.default.EDGE_RIGHT) - yogaNode.getComputedBorder(import_yoga_layout_prebuilt3.default.EDGE_LEFT) - yogaNode.getComputedBorder(import_yoga_layout_prebuilt3.default.EDGE_RIGHT);
};

// src/dom/render-border.ts
var import_cli_boxes = __toESM(require("cli-boxes"));

// src/dom/colorize.ts
var import_chalk = __toESM(require("chalk"));
var RGB_LIKE_REGEX = /^(rgb|hsl|hsv|hwb)\(\s?(\d+),\s?(\d+),\s?(\d+)\s?\)$/;
var ANSI_REGEX = /^(ansi|ansi256)\(\s?(\d+)\s?\)$/;
var getMethod = (name, type) => {
  if (type === "foreground")
    return name;
  return `bg${name[0].toUpperCase()}${name.slice(1)}`;
};
var colorize_default = (str, color, type) => {
  if (!color)
    return str;
  if (color in import_chalk.default) {
    const method = getMethod(color, type);
    return import_chalk.default[method](str);
  }
  if (color.startsWith("#")) {
    const method = getMethod("hex", type);
    return import_chalk.default[method](color)(str);
  }
  if (color.startsWith("ansi")) {
    const matches = ANSI_REGEX.exec(color);
    if (!matches)
      return str;
    const method = getMethod(matches[1], type);
    const value = Number(matches[2]);
    return import_chalk.default[method](value)(str);
  }
  const isRgbLike = color.startsWith("rgb") || color.startsWith("hsl") || color.startsWith("hsv") || color.startsWith("hwb");
  if (isRgbLike) {
    const matches = RGB_LIKE_REGEX.exec(color);
    if (!matches)
      return str;
    const method = getMethod(matches[1], type);
    const firstValue = Number(matches[2]);
    const secondValue = Number(matches[3]);
    const thirdValue = Number(matches[4]);
    return import_chalk.default[method](firstValue, secondValue, thirdValue)(str);
  }
  return str;
};

// src/dom/render-border.ts
var render_border_default = (x, y, node, output) => {
  if (typeof node.style.borderStyle === "string") {
    const width = node.yogaNode.getComputedWidth();
    const height = node.yogaNode.getComputedHeight();
    const color = node.style.borderColor;
    const box = import_cli_boxes.default[node.style.borderStyle];
    const topBorder = colorize_default(
      box.topLeft + box.horizontal.repeat(width - 2) + box.topRight,
      color,
      "foreground"
    );
    const verticalBorder = `${colorize_default(box.vertical, color, "foreground")}
`.repeat(height - 2);
    const bottomBorder = colorize_default(
      box.bottomLeft + box.horizontal.repeat(width - 2) + box.bottomRight,
      color,
      "foreground"
    );
    output.write(x, y, topBorder, { transformers: [] });
    output.write(x, y + 1, verticalBorder, { transformers: [] });
    output.write(x + width - 1, y + 1, verticalBorder, { transformers: [] });
    output.write(x, y + height - 1, bottomBorder, { transformers: [] });
  }
};

// src/render-node-to-output.ts
var applyPaddingToText = (node, text) => {
  var _a;
  const yogaNode = (_a = node.childNodes[0]) == null ? void 0 : _a.yogaNode;
  if (yogaNode) {
    const offsetX = yogaNode.getComputedLeft();
    const offsetY = yogaNode.getComputedTop();
    text = "\n".repeat(offsetY) + (0, import_indent_string.default)(text, offsetX);
  }
  return text;
};
var renderNodeToOutput = (node, output, options) => {
  const {
    offsetX = 0,
    offsetY = 0,
    transformers = [],
    skipStaticElements
  } = options;
  if (skipStaticElements && node.internal_static)
    return;
  const { yogaNode } = node;
  if (yogaNode) {
    if (yogaNode.getDisplay() === import_yoga_layout_prebuilt4.default.DISPLAY_NONE)
      return;
    const x = offsetX + yogaNode.getComputedLeft();
    const y = offsetY + yogaNode.getComputedTop();
    let newTransformers = transformers;
    if (typeof node.internal_transform === "function")
      newTransformers = [node.internal_transform, ...transformers];
    if (node.nodeName === "temir-text") {
      let text = squash_text_nodes_default(node);
      if (text.length > 0) {
        const currentWidth = (0, import_widest_line2.default)(text);
        const maxWidth = get_max_width_default(yogaNode);
        if (currentWidth > maxWidth) {
          const textWrap = node.style.textWrap ?? "wrap";
          text = wrap_text_default(text, maxWidth, textWrap);
        }
        text = applyPaddingToText(node, text);
        output.write(x, y, text, { transformers: newTransformers });
      }
      return;
    }
    if (node.nodeName === "temir-box")
      render_border_default(x, y, node, output);
    if (node.nodeName === "temir-root" || node.nodeName === "temir-box") {
      for (const childNode of node.childNodes) {
        renderNodeToOutput(childNode, output, {
          offsetX: x,
          offsetY: y,
          transformers: newTransformers,
          skipStaticElements
        });
      }
    }
  }
};
var render_node_to_output_default = renderNodeToOutput;

// src/output.ts
var import_slice_ansi = __toESM(require("slice-ansi"));
var import_string_width = __toESM(require("string-width"));
var Output = class {
  width;
  height;
  writes = [];
  constructor(options) {
    const { width, height } = options;
    this.width = width;
    this.height = height;
  }
  write(x, y, text, options) {
    const { transformers } = options;
    if (!text)
      return;
    this.writes.push({ x, y, text, transformers });
  }
  get() {
    const output = [];
    for (let y = 0; y < this.height; y++)
      output.push(" ".repeat(this.width));
    for (const write of this.writes) {
      const { x, y, text, transformers } = write;
      const lines = text.split("\n");
      let offsetY = 0;
      for (let line of lines) {
        const currentLine = output[y + offsetY];
        if (!currentLine)
          continue;
        const width = (0, import_string_width.default)(line);
        for (const transformer of transformers)
          line = transformer(line);
        output[y + offsetY] = (0, import_slice_ansi.default)(currentLine, 0, x) + line + (0, import_slice_ansi.default)(currentLine, x + width);
        offsetY++;
      }
    }
    const generatedOutput = output.map((line) => line.trimRight()).join("\n");
    return {
      output: generatedOutput,
      height: output.length
    };
  }
};

// src/renderer.ts
var renderer_default = (node, terminalWidth) => {
  var _a;
  node.yogaNode.setWidth(terminalWidth);
  if (node.yogaNode) {
    node.yogaNode.calculateLayout(void 0, void 0, import_yoga_layout_prebuilt5.default.DIRECTION_LTR);
    const output = new Output({
      width: node.yogaNode.getComputedWidth(),
      height: node.yogaNode.getComputedHeight()
    });
    render_node_to_output_default(node, output, { skipStaticElements: true });
    let staticOutput;
    if ((_a = node.staticNode) == null ? void 0 : _a.yogaNode) {
      staticOutput = new Output({
        width: node.staticNode.yogaNode.getComputedWidth(),
        height: node.staticNode.yogaNode.getComputedHeight()
      });
      render_node_to_output_default(node.staticNode, staticOutput, {
        skipStaticElements: false
      });
    }
    const { output: generatedOutput, height: outputHeight } = output.get();
    return {
      output: generatedOutput,
      outputHeight,
      staticOutput: staticOutput ? `${staticOutput.get().output}
` : ""
    };
  }
  return {
    output: "",
    outputHeight: 0,
    staticOutput: ""
  };
};

// src/components/App.ts
var import_vue = require("vue");
var import_cli_cursor2 = __toESM(require("cli-cursor"));
var TAB = "	";
var SHIFT_TAB = "\x1B[Z";
var ESC = "\x1B";
var App = (0, import_vue.defineComponent)({
  props: ["children", "stdin", "stdout", "stderr", "writeToStdout", "writeToStderr", "exitOnCtrlC", "onExit"],
  setup(props) {
    let rawModeEnabledCount = 0;
    const activeFocusId = (0, import_vue.ref)();
    const focusables = (0, import_vue.ref)();
    const isFocusEnabled = (0, import_vue.ref)();
    (0, import_vue.onMounted)(() => {
      import_cli_cursor2.default.hide(props.stdout);
    });
    (0, import_vue.onUnmounted)(() => {
      import_cli_cursor2.default.show(props.stdout);
    });
    function isRawModeSupported() {
      var _a;
      return (_a = props == null ? void 0 : props.stdin) == null ? void 0 : _a.isTTY;
    }
    function handleSetRawMode(isEnabled) {
      const { stdin } = props;
      if (!isRawModeSupported()) {
        if (stdin === process.stdin) {
          throw new Error(
            "Raw mode is not supported on the current process.stdin, which Temir uses as input stream by default.\nRead about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported"
          );
        } else {
          throw new Error(
            "Raw mode is not supported on the stdin provided to Temir.\nRead about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported"
          );
        }
      }
      stdin.setEncoding("utf8");
      if (isEnabled) {
        if (rawModeEnabledCount === 0) {
          stdin.addListener("data", handleInput);
          stdin.resume();
          stdin.setRawMode(true);
        }
        rawModeEnabledCount++;
        return;
      }
      if (--rawModeEnabledCount === 0) {
        stdin.setRawMode(false);
        stdin.removeListener("data", handleInput);
        stdin.pause();
      }
    }
    function enableFocus() {
      isFocusEnabled.value = true;
    }
    function disableFocus() {
      isFocusEnabled.value = false;
    }
    function focus(id) {
      const hasFocusableId = focusables.value.some(
        (focusable) => (focusable == null ? void 0 : focusable.id) === id
      );
      if (hasFocusableId)
        activeFocusId.value = id;
    }
    function handleInput(input) {
      if (input === "" && props.exitOnCtrlC)
        handleExit();
      if (input === ESC && activeFocusId.value)
        activeFocusId.value = void 0;
      if (isFocusEnabled.value && focusables.value.length > 0) {
        if (input === TAB)
          focusNext();
        if (input === SHIFT_TAB)
          focusPrevious();
      }
    }
    function handleExit(error) {
      if (isRawModeSupported())
        handleSetRawMode(false);
      props.onExit(error);
    }
    function addFocusable(id, { autoFocus }) {
      if (!activeFocusId.value && autoFocus)
        activeFocusId.value = id;
      focusables.value = [
        ...focusables.value,
        {
          id,
          isActive: true
        }
      ];
    }
    function removeFocusable(id) {
      activeFocusId.value = activeFocusId.value === id ? void 0 : activeFocusId.value;
      focusables.value = focusables.value.filter(({ id: focusableId }) => focusableId !== id);
    }
    function activateFocusable(id) {
      focusables.value = focusables.value.map((focusable) => {
        if (focusable.id !== id)
          return focusable;
        return {
          id,
          isActive: true
        };
      });
    }
    function deactivateFocusable(id) {
      activeFocusId.value = activeFocusId.value === id ? void 0 : activeFocusId.value;
      focusables.value = focusables.value.map((focusable) => {
        if (focusable.id !== id)
          return focusable;
        return {
          id,
          isActive: false
        };
      });
    }
    function findNextFocusable() {
      var _a;
      const activeIndex = focusables.value.findIndex((focusable) => {
        return focusable.id === activeFocusId.value;
      });
      for (let index = activeIndex + 1; index < focusables.value.length; index++) {
        if ((_a = focusables.value[index]) == null ? void 0 : _a.isActive)
          return focusables.value[index].id;
      }
      return void 0;
    }
    function findPreviousFocusable() {
      var _a;
      const activeIndex = focusables.value.findIndex((focusable) => {
        return focusable.id === activeFocusId.value;
      });
      for (let index = activeIndex - 1; index >= 0; index--) {
        if ((_a = focusables.value[index]) == null ? void 0 : _a.isActive)
          return focusables.value[index].id;
      }
      return void 0;
    }
    function focusNext() {
      var _a;
      const firstFocusableId = (_a = focusables.value[0]) == null ? void 0 : _a.id;
      const nextFocusableId = findNextFocusable();
      activeFocusId.value = nextFocusableId || firstFocusableId;
    }
    function focusPrevious() {
      var _a;
      const lastFocusableId = (_a = focusables.value[focusables.value.length - 1]) == null ? void 0 : _a.id;
      const previousFocusableId = findPreviousFocusable();
      activeFocusId.value = previousFocusableId || lastFocusableId;
    }
    return () => {
      return (0, import_vue.h)(props.children);
    };
  }
});
var App_default = App;

// src/temir.ts
var isCI = process.env.CI === "false" ? false : import_is_ci.default;
var Temir = class {
  options;
  log;
  throttledLog;
  isUnmounted;
  rootNode;
  fullStaticOutput;
  lastOutput;
  exitPromise;
  restoreConsole;
  unsubscribeResize;
  VueApp;
  constructor(options) {
    (0, import_auto_bind.default)(this);
    this.options = options;
    this.rootNode = createNode("temir-root");
    this.rootNode.onRender = this.onRender;
    this.log = log_update_default.create(options.stdout);
    this.throttledLog = options.debug ? this.log : (0, import_lodash.throttle)(this.log, void 0, {
      leading: true,
      trailing: true
    });
    this.isUnmounted = false;
    this.lastOutput = "";
    this.unsubscribeExit = (0, import_signal_exit.default)(this.unmount, { alwaysLast: false });
    if (options.patchConsole)
      this.patchConsole();
    if (!isCI) {
      options.stdout.on("resize", this.onRender);
      this.unsubscribeResize = () => {
        options.stdout.off("resize", this.onRender);
      };
    }
  }
  resolveExitPromise = () => {
  };
  rejectExitPromise = () => {
  };
  unsubscribeExit = () => {
  };
  onRender = () => {
    const { output, outputHeight, staticOutput } = renderer_default(
      this.rootNode,
      this.options.stdout.columns || 80
    );
    const hasStaticOutput = staticOutput && staticOutput !== "\n";
    if (this.options.debug) {
      if (hasStaticOutput)
        this.fullStaticOutput += staticOutput;
      this.options.stdout.write(this.fullStaticOutput + output);
      this.options.stdout.write(this.fullStaticOutput + output);
      return;
    }
    if (isCI) {
      if (hasStaticOutput)
        this.options.stdout.write(staticOutput);
      this.lastOutput = output;
      return;
    }
    if (hasStaticOutput)
      this.fullStaticOutput += staticOutput;
    if (outputHeight >= this.options.stdout.rows) {
      this.options.stdout.write(
        import_ansi_escapes2.default.clearTerminal + this.fullStaticOutput + output
      );
      this.lastOutput = output;
      return;
    }
    if (hasStaticOutput) {
      this.log.clear();
      this.options.stdout.write(staticOutput);
      this.log(output);
    }
    if (!hasStaticOutput && output !== this.lastOutput)
      this.throttledLog(output);
    this.lastOutput = output;
  };
  render(node) {
    const options = this.options;
    const context = this;
    const Root = (0, import_vue2.defineComponent)({
      setup() {
        return () => (0, import_vue2.h)(App_default, {
          stdin: options.stdin,
          stdout: options.stdout,
          stderr: options.stderr,
          writeToStdout: context.writeToStdout,
          writeToStderr: context.writeToStderr,
          exitOnCtrlC: options.exitOnCtrlC,
          onExit: context.unmount,
          children: node
        });
      }
    });
    this.VueApp = createRenderer_default.createApp(Root);
    this.VueApp.config.warnHandler = () => null;
    this.VueApp.mount(this.rootNode);
    this.onRender();
  }
  unmount(error) {
    var _a;
    if (this.isUnmounted)
      return;
    this.onRender();
    this.unsubscribeExit();
    if (typeof this.restoreConsole === "function")
      this.restoreConsole();
    if (typeof this.unsubscribeResize === "function")
      this.unsubscribeResize();
    if (isCI)
      this.options.stdout.write(`${this.lastOutput}
`);
    else if (!this.options.debug)
      this.log.done();
    this.isUnmounted = true;
    (_a = this.VueApp) == null ? void 0 : _a.unmount();
    instances_default.delete(this.options.stdout);
    if (error instanceof Error)
      this.rejectExitPromise(error);
    else
      this.resolveExitPromise();
  }
  waitUntilExit() {
    if (!this.exitPromise) {
      this.exitPromise = new Promise((resolve, reject) => {
        this.resolveExitPromise = resolve;
        this.rejectExitPromise = reject;
      });
    }
    return this.exitPromise;
  }
  clear() {
    if (!isCI && !this.options.debug)
      this.log.clear();
  }
  writeToStdout(data) {
    if (this.isUnmounted)
      return;
    if (this.options.debug) {
      this.options.stdout.write(data + this.fullStaticOutput + this.lastOutput);
      return;
    }
    if (isCI) {
      this.options.stdout.write(data);
      return;
    }
    this.log.clear();
    this.options.stdout.write(data);
    this.log(this.lastOutput);
  }
  writeToStderr(data) {
    if (this.isUnmounted)
      return;
    if (this.options.debug) {
      this.options.stderr.write(data);
      this.options.stdout.write(this.fullStaticOutput + this.lastOutput);
      return;
    }
    if (isCI) {
      this.options.stderr.write(data);
      return;
    }
    this.log.clear();
    this.options.stderr.write(data);
    this.log(this.lastOutput);
  }
  patchConsole() {
    if (this.options.debug)
      return;
    this.restoreConsole = (0, import_patch_console.default)((stream, data) => {
      if (stream === "stdout")
        this.writeToStdout(data);
      this.writeToStderr(data);
    });
  }
};

// src/render.ts
var getOptions = (stdout = {}) => {
  if (stdout instanceof import_stream.Stream) {
    return {
      stdout,
      stdin: process.stdin
    };
  }
  return stdout;
};
var getInstance = (stdout, createInstance) => {
  let instance;
  if (instances_default.has(stdout)) {
    instance = instances_default.get(stdout);
  } else {
    instance = createInstance();
    instances_default.set(stdout, instance);
  }
  return instance;
};
var render = (node, options) => {
  const temirOptions = {
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr,
    debug: false,
    exitOnCtrlC: true,
    patchConsole: true,
    ...getOptions(options)
  };
  const instance = getInstance(
    temirOptions.stdout,
    () => new Temir(temirOptions)
  );
  instance.render(node);
  return {
    rerender: instance.render,
    unmount: () => instance.unmount(),
    waitUntilExit: instance.waitUntilExit,
    cleanup: () => instances_default.delete(temirOptions.stdout),
    clear: instance.clear
  };
};
var render_default = render;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  render
});
