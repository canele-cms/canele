import * as hn from "../lib/hackernews";

export const Home: JSX.FC = async () => {
  const ids = await hn.top();
  const items = await Promise.all(ids.slice(0, 25).map(hn.item));
  const stories = items.filter(hn.story);

  return (
    <ul>
      {stories.map((story) => (
        <li class="my-8">
          <a href={story.url} target="_blank">
            {story.title}
          </a>

          <div class="text-sm text-gray-400">
            <span>{story.score} pts</span>
            {" | "}
            <a href={`/item/${story.id}`}>{story.descendants} comments</a>
          </div>
        </li>
      ))}
    </ul>
  );
};
