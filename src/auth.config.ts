import { NextAuthConfig } from "next-auth";
import { loginSchema } from "@/lib/loginSchema"
import { getUserByEmail } from "@/app/actions/authActions";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
 
export const authConfig: NextAuthConfig = {
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
}
