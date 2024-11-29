import preactCustomElement from "preact-custom-element";
import { App } from "./app";

const tag = "canele-frontend";

export interface CaneleProps {
  repository: `${string}/${string}`;
}

export default function register(props: CaneleProps) {
  if (!document.querySelector(tag)) {
    const element = document.createElement(tag);

    for (const [key, value] of Object.keys(props)) {
      if (key && value) element.setAttribute(key, value);
    }

    document.body.appendChild(element);
  }

  preactCustomElement(App, tag, Object.keys(props), { shadow: true });
}
