export type PublishStatus = "draft" | "published" | "pending" | "archived";

export interface Publishable {
  status: PublishStatus;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface User extends Publishable {
  id: number;
  email: string;
  password_hashed: string;
}

export interface Site extends Publishable {
  id: number;
  name: string;
  root: string; // example.com | www.example.com | www.example.com/blog
}

export interface Page extends Publishable {
  id: number;
  site_id: number;
  name: string; // About
  path: string; // /about
}
