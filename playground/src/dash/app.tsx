import styles from "./style.css?inline";

export function App() {
  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: */}
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div>hi</div>
    </>
  );
}
