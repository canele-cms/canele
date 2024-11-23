declare namespace App {
  interface Locals {
    cnl_auth: import("./auth").Auth;
    cnl_db: import("./database").Database;
  }
}
