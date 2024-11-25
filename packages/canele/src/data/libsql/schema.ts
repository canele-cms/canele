export const createTableUsers = [
  /*sql*/ `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                password_hash TEXT NOT NULL
              )`,
  /*sql*/ `CREATE UNIQUE INDEX IF NOT EXISTS users_unique_email ON users(email);`,
];
