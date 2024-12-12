export type Bindings = {
  LOCAL_DEV?: string;
  DB_LIBSQL_URL?: string;
  DB_LIBSQL_AUTH_TOKEN?: string;
};

export type Env = {
  Bindings: Bindings;
};
