import { decrypt } from "@/utils/encrpyPassword";
import { supabase } from "@/utils/supabase";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import jwt from "jsonwebtoken";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 1,
  },
  jwt: {},
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "yuchi",
      credentials: {},
      async authorize(credentials, req) {
        const { account, password } = credentials as {
          account: string;
          password: string;
        };
        if (!account || !password) return null;

        const { data, error } = await supabase
          .from("tb_user")
          .select("uid, nickname, password, email, image")
          .eq("uid", account);
        if (!data?.[0] || error) return null;

        const isMatch = await decrypt(password, data[0]?.password ?? "");

        const user = {
          id: data[0].uid,
          name: data[0].nickname,
          email: data[0].email,
          image: data[0].image,
        };
        return isMatch ? user : null;
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.project_url ?? "",
    secret: process.env.secret_service_role ?? "",
  }),
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret && user) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
