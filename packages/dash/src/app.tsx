import { useStore } from "@nanostores/preact";
import styles from "./styles.css?inline";
import { $githubTree } from "./lib/api";

export function App() {
  const tree = useStore($githubTree);

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: */}
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <h1>Tree</h1>

      <pre>{JSON.stringify(tree, null, 2)}</pre>
    </>
  );
}
