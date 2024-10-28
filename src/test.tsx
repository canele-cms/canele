export function Parent() {
  let count = 0;
  let message = "test";

  return (
    <main x-data={{ count, message }}>
      <span x-text={() => message}>{message}</span>

      <button x-on:click={() => count++}>increment</button>
    </main>
  );
}
