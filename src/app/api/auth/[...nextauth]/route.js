import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Replace this with your own user verification logic (e.g., check against your database)
        const user = await verifyUser(email, password);

        if (user) {
          return { id: user.id, email: user.email };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Customize the sign-in page URL if needed
  },
  session: {
    strategy: "jwt", // Use JWT for session handling
  },
});

async function verifyUser(email, password) {
  // Replace this with your real authentication logic
  if (email === "user@example.com" && password === "password") {
    return { id: 1, email };
  }
  return null;
}

export { handler as GET, handler as POST };
