import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * Extends the built-in session.user object to include your custom properties.
   */
  interface User {
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    accessToken?: string; // This is directly on the session object
    user: User; // Overrides the default user type
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}