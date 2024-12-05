import styles from "~/styles.css?inline";
import { Tree } from "~/components/tree";
import { useBranchContentsTree } from "./hooks/use-api";

export function App() {
  const content = useBranchContentsTree("main");

  return (
    <>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: */}
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {content.data?.tree.map((node) => (
        <Tree key={node.sha} {...node} />
      ))}
    </>
  );
}
