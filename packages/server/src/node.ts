import type { IncomingMessage, ServerResponse } from "node:http";
import { Http2ServerRequest as Http2 } from "node:http2";
import type { TLSSocket } from "node:tls";
import { Readable, Writable } from "node:stream";
import type { CaneleOptions } from "~/types";
import adapterFetch from "~/fetch";

export default function adapterNode(opts: CaneleOptions) {
  let origin: string;

  const handler = adapterFetch(opts);

  return async (
    req: IncomingMessage | Http2,
    res: ServerResponse
  ): Promise<void> => {
    if (!origin) origin = getOriginFromReq(req);

    const init: RequestInit & { headers: Headers } = {
      method: req.method,
      headers: new Headers(),
    };

    for (const [key, value] of Object.entries(req.headers)) {
      if (key && value) init.headers.set(key, value.toString());
    }

    if (!(init.method === "GET" || init.method === "HEAD")) {
      init.body = Readable.toWeb(req) as ReadableStream<Uint8Array>;
    }

    const request = new Request(new URL(req.url || "/", origin), init);

    const response = await handler(request);

    res.statusCode = response.status;
    res.statusMessage = response.statusText;

    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (!response.body) {
      res.end();
      return;
    }

    await response.body.pipeTo(Writable.toWeb(res));
  };
}

function getOriginFromReq(req: IncomingMessage | Http2) {
  const host = req instanceof Http2 ? req.authority : req.headers.host;

  if (!host) throw new Error("Cannot find host");

  let protocol = "http";

  if (
    req instanceof Http2 ||
    (req.socket && (req.socket as TLSSocket).encrypted)
  ) {
    protocol = "https";
  }

  return `${protocol}://${host}`;
}
