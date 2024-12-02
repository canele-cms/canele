const DASH_ELEMENT_TAG = "canele-dash";

(async () => {
  const element = document.querySelector(DASH_ELEMENT_TAG);

  if (element?.getAttribute("render") === "true") {
    const [App, register] = await Promise.all([
      import("./app").then((m) => m.App),
      import("preact-custom-element").then((m) => m.default),
    ]);

    register(App, DASH_ELEMENT_TAG, [], { shadow: true });
  }
})();
