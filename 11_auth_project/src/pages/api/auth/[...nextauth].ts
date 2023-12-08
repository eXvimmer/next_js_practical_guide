import supabase from "@/db";
import { verifyPassword } from "@/lib/auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 864000, // 10 days
  },

  providers: [
    CredentialsProvider({
      credentials: { email: { type: "email" }, password: { type: "password" } },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.email) {
            return null;
          }
          const { data: user, error } = await supabase
            .from("users")
            .select()
            .eq("email", credentials?.email)
            .single();
          if (error || !user) {
            return null;
          }
          if (!(await verifyPassword(credentials.password, user.password))) {
            return null;
          }
          return { id: user.id.toString(), email: user.email };
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
});
