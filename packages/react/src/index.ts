"use client";

import { useEffect } from "react";
import type { CaneleProps } from "@canele/editor";

export function Canele(props: CaneleProps) {
  useEffect(() => {
    console.log(props);
    import("@canele/editor");
  }, []);

  return null;
}
