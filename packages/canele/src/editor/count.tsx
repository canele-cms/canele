import { createSignal } from "solid-js";

export function Count() {
  const [count, setCount] = createSignal(0);

  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      count = {count()}
    </button>
  );
}
