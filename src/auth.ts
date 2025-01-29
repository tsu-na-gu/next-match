import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { loginSchema } from "@/lib/loginSchema"
import { getUserByEmail } from "@/app/actions/authActions";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    session: async ({ session, token }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    authorized: async ({ auth}) => {
      return !!auth;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt"},
  providers: [
    Credentials({
      name: "credentials",
      async authorize(credentials) { // not useful type annotation because loginSchema check the t
        const validated =  await loginSchema.safeParseAsync(credentials);

        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getUserByEmail(email);

          if (!user || !(await compare(password, user.passwordHash))) return null;
        
          return user;
      }
      return null;
    }})
  ]
});
