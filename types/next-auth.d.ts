import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string | number;
  }

  interface Session {
    supabaseAccessToken?: string;
    user: DefaultSession["user"];
  }
}
