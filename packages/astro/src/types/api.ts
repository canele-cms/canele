export interface Tree {
  tree: TreeNode[];
}

export interface TreeNode {
  sha: string;
  path: string;
  type: "blob" | "tree";
}
