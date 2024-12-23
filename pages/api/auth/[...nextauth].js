import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../utils/mongodb';

// Explicitly log environment variables for debugging
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Present' : 'Missing');
console.log('NODE_ENV:', process.env.NODE_ENV);

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { db } = await connectToDatabase();
        
        const user = await db.collection('users').findOne({ 
          email: credentials.email 
        });

        if (user && credentials.password === user.password) { // Note: Use proper password hashing in production
          return {
            id: user._id,
            email: user.email,
            role: user.role,
          };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || 'fallback_secret_that_should_never_be_used_in_production',
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  debug: true, // Force debug mode
  logger: {
    error(code, metadata) {
      console.error('NextAuth Error:', code, metadata);
      // Additional error logging
      if (code === 'NO_SECRET') {
        console.error('NEXTAUTH_SECRET is missing or undefined');
        console.error('Current environment variables:', {
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'PRESENT' : 'MISSING',
          NODE_ENV: process.env.NODE_ENV
        });
      }
    },
    warn(code) {
      console.warn('NextAuth Warning:', code);
    },
    debug(code, metadata) {
      console.debug('NextAuth Debug:', code, metadata);
    }
  }
});
