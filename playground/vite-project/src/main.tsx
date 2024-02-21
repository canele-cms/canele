import "./style.css";

import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";

import { setupCounter } from "./counter.ts";
import { renderToString } from "canele";

declare global {
  interface CaneleRenderContext {
    name: string;
  }
}

const Main: JSX.FC = (_, { name }) => {
  return (
    <div>
      <div>Name: {name}</div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src={typescriptLogo} className="logo vanilla" alt="TypeScript logo" />
      </a>
      <h1>Vite + TypeScript</h1>
      <div className="card">
        <button id="counter" type="button"></button>
      </div>
      <p className="read-the-docs">Click on the Vite and TypeScript logos to learn more</p>
    </div>
  );
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = await renderToString(<Main />, { name: "vite-project" });

setupCounter(document.querySelector("#counter") as HTMLButtonElement);
