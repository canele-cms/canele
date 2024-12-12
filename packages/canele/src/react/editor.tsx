/** @jsxImportSource react */
"use client";
import { useLayoutEffect, useRef } from "react";

const LOCAL_DEV = process.env.LOCAL_DEV;

export function Editor() {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    if (!mounted.current) {
      mounted.current = true;

      if (!LOCAL_DEV) {
        // cause vite to ignore bundling
        import(`${"canele/editor"}`);
      }
    }
  }, []);

  return (
    <>
      <div id="canele" />

      {LOCAL_DEV && (
        <>
          <script type="module" src="http://localhost:5173/@vite/client" />
          <script type="module" src="http://localhost:5173/src/editor/index.tsx" />
        </>
      )}
    </>
  );
}
