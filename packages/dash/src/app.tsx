import { useStore } from "@nanostores/preact";
import styles from "./styles.css?inline";
import { $githubUser } from "./lib/api";

export function App() {
  const user = useStore($githubUser);

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: */}
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <h1>Canele!</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}
