import "./main.css";

import { renderToNode } from "canele";
import { Home } from "./pages/home";
import { Item } from "./pages/item";

let Page = () => <Home />;

if (location.pathname.startsWith("/item/")) {
  const id = parseInt(location.pathname.split("/").pop() || "0", 10);
  Page = () => <Item id={id} />;
}

await renderToNode(<Page />, document.body);
