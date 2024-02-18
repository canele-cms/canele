import { isJSXElement } from "./is-jsx-element";
import { renderAttributes } from "./render-attributes";

export async function renderToString(children: JSX.Children, context: JSX.RenderContext): Promise<string> {
  try {
    children = await Promise.resolve(children);

    if (children === null || children === undefined || children === true || children === false) return "";

    if (typeof children === "string") return children;
    if (typeof children === "number") return children.toString();

    if (Array.isArray(children)) {
      const promises = children.map(async (child) => renderToString(child, context));
      return (await Promise.all(promises)).join("");
    }

    if (typeof children === "object" && isJSXElement(children)) {
      if (typeof children.t === "function") {
        return renderToString(children.t(children.p, context), context);
      }

      const child = await renderToString(children.p.children, context);

      return `<${children.t}${renderAttributes(children)}>${child}</${children.t}>`;
    }

    return "";
  } catch (e) {
    throw new Error("render error");
  }
}
