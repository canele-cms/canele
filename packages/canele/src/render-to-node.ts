/// <reference lib="dom" />

import { isJSXElement } from "./is-jsx-element";
import { renderElementAttributes } from "./render-attributes";

export async function renderToNode(children: JSX.Children, node: Node): Promise<void> {
  try {
    children = await Promise.resolve(children);

    if (children === null || children === undefined || children === true || children === false) return;

    if (typeof children === "string") {
      node.appendChild(document.createTextNode(children));
    } else if (typeof children === "number") {
      node.appendChild(document.createTextNode(children.toString()));
    } else if (Array.isArray(children)) {
      await Promise.all(
        children.map(async (child) => {
          renderToNode(child, node);
        })
      );
    } else if (typeof children === "object" && isJSXElement(children)) {
      if (typeof children.t === "function") {
        renderToNode(children.t(children.p, node), node);
      } else {
        const element = document.createElement(children.t);
        renderElementAttributes(children, element);
        await renderToNode(children.p.children, element);
        node.appendChild(element);
      }
    }
  } catch (e) {
    throw e;
  }
}
