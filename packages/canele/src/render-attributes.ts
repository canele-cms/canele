export function renderAttributes(element: JSX.Element) {
  return Object.entries(element.p).reduce((prev, [name, value]) => {
    if (name !== "children" && value !== null && value !== undefined) {
      if (name === "className") name = "class";

      return prev + ` ${name}="${renderAttributeValue(value)}"`;
    }

    return prev;
  }, "");
}

export function renderElementAttributes(element: JSX.Element, node: HTMLElement) {
  Object.entries(element.p).forEach(([name, value]) => {
    if (name !== "children" && value !== null && value !== undefined) {
      if (name === "className") name = "class";

      if (name === "html") {
        node.innerHTML = renderAttributeValue(value);
      } else if (name === "onclick" && typeof value === "function") {
        node.addEventListener("click", (e) => value(e));
      } else {
        node.setAttribute(name, renderAttributeValue(value));
      }
    }
  });
}

function renderAttributeValue(value: unknown): string {
  if (value === true) return "true";

  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();

  if (Array.isArray(value)) {
    return value.reduce((prev, value) => {
      const result = renderAttributeValue(value);

      if (result) {
        if (prev) return `${prev} ${result}`;
        return result;
      }

      return prev;
    }, "");
  }

  return "";
}
