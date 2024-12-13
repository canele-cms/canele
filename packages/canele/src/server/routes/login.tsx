/** @jsxImportSource hono/jsx */
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { vValidator } from "@hono/valibot-validator";
import { object, pipe, string, email, minLength } from "valibot";
import type { Env } from "../types/env.js";
import type { User } from "../types/schema.js";
import { SESSION_COOKIE_NAME } from "../constants.js";
import { Login } from "../render/components/login.js";

const schema = object({
  email: pipe(string(), email()),
  password: pipe(string(), minLength(8)),
});

export const login = new Hono<Env>();

login.get((c) => c.render(<Login />, { title: "Login" }));

login.post(
  vValidator("form", schema, (result, c) => {
    if (!result.success) {
      const errors = result.issues.map((issue) => issue.message);
      return c.render(<Login errors={errors} />, { title: "Login" });
    }

    // TODO email/password check

    const session = "";

    setCookie(c, SESSION_COOKIE_NAME, session, {
      maxAge: 60,
    });

    return c.json({
      id: 1,
      email: result.output.email,
      password_hashed: "password_hashed",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: "published",
      version: 1,
    } satisfies User);
  }),
);
