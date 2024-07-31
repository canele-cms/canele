import * as hn from "../lib/hackernews";
import { Comment } from "./comment";

export const Story: JSX.FC<hn.Story> = async (story) => {
  const items = await Promise.all(story.kids.map(hn.item));
  const comments = items.filter(hn.comment);

  return (
    <>
      <a href={story.url} target="_blank" class="block font-bold text-lg my-4">
        {story.title}
      </a>

      <ul>
        {comments.map((comment) => (
          <Comment {...comment} />
        ))}
      </ul>
    </>
  );
};
