import { renderToNode } from "canele";
import * as hn from "../lib/hackernews";

const loadCommentKids = async (e: Event, comment: hn.Comment) => {
  const kids = await Promise.all(comment.kids.map(hn.item));
  const comments = kids.filter(hn.comment);

  await renderToNode(
    <ul>
      {comments.map((comment) => (
        <Comment {...comment} />
      ))}
    </ul>,
    e.target as Node
  );
};

export const Comment: JSX.FC<hn.Comment> = (comment) => {
  return (
    <li class="my-4">
      <div class="text-sm text-gray-400 mb-2">{comment.by}</div>
      <div html={comment.text} />
      {comment.kids && <button onclick={(e: Event) => loadCommentKids(e, comment)}>...</button>}
    </li>
  );
};
