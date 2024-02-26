import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
        };
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user, trigger, session }) {
  //     if (user) {
  //       token.role = user.role;
  //     }

  //     if (trigger === "update" && session?.name) {
  //       token.name = session.name;
  //     }

  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user.role = token.role;
  //     return session;
  //   },
  // },
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  }),
};
