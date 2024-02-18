export function renderAttributes(element: JSX.Element) {
  return Object.entries(element.p).reduce((prev, arr) => {
    let name = arr[0];

    if (name !== "children" && arr[1] !== null && arr[1] !== undefined) {
      if (name === "className") name = "class";

      return prev + ` ${name}="${renderAttributeValue(arr[1])}"`;
    }

    return prev;
  }, "");
}

function renderAttributeValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();

  if (value === true) return "true";
  if (value === false) return "false";

  if (Array.isArray(value)) {
    return value.map(renderAttributeValue).join(" ");
  }

  return "";
}
