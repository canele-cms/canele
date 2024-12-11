import { Portal, render } from "solid-js/web";
import { App } from "./app";
import styles from "./styles.css?inline";

const root = document.getElementById("canele");
if (!root) throw new Error("Cannot find required element id 'canele'.");

render(
  () => (
    <Portal mount={root} useShadow>
      <style innerHTML={styles} />
      <App />
    </Portal>
  ),
  root,
);
