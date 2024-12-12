import type { PropsWithChildren } from "react";
import { Editor } from "canele/react/editor";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        {children}
        <Editor />
      </body>
    </html>
  );
}
