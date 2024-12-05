import { useState } from "preact/hooks";
import type { TreeNode } from "@canele-cms/astro/types/api";
import { useTree } from "~/hooks/use-api";

export type TreeProps = TreeNode;

export function Tree({ sha, path }: TreeProps) {
  const [open, setOpen] = useState(false);
  const res = useTree(sha, true);

  const onClickOpen = () => {
    if (open === false) {
      res.execute().then(() => {
        setOpen(true);
      });
    }
  };

  return (
    <details className="pl-2 border-l border-gray-500" open={open}>
      <summary onClick={onClickOpen} onKeyUp={onClickOpen}>
        {path}
        {res?.loading && "..."}
      </summary>

      <ul className="pl-1 flex flex-col gap-1 justify-start items-start">
        {res?.data?.tree.map((node) => {
          return (
            <li key={node.sha}>{node.type === "tree" ? <Tree {...node} /> : <button type="button">{node.path}</button>}</li>
          );
        })}
      </ul>
    </details>
  );
}
