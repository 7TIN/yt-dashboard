import NextAuth from "next-auth";
// Import the authOptions from your lib file
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };