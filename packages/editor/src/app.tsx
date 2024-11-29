import { useStore } from "@nanostores/preact";
import { $github } from "./lib/server";

export function App() {
  const user = useStore($github);

  return (
    <>
      <pre>{JSON.stringify({ user }, null, 2)}</pre>
    </>
  );
}
