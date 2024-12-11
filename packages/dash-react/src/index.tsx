const root = document.getElementById("root") as HTMLElement;

(async () => {
  const App = (await import("./app")).App;
  const StrictMode = (await import("react")).StrictMode;
  const createRoot = (await import("react-dom/client")).createRoot;

  createRoot(root).render(StrictMode({ children: App() }));
})();
