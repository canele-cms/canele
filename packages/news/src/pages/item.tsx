import * as hn from "../lib/hackernews";
import { Story } from "./story";

export interface ItemProps {
  id: number;
}

export const Item: JSX.FC<ItemProps> = async ({ id }) => {
  const item = await hn.item(id);

  if (hn.story(item)) {
    return <Story {...item} />;
  }

  return <pre>{JSON.stringify(item, null, 2)}</pre>;
};
