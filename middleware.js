import { clerkMiddleware } from "@clerk/nextjs/server";

// The map itself is public -- nobody has to sign in to use or share it.
// This middleware only keeps Clerk's session in sync; it does not block
// any route. Sign-in is required just to save a prediction (see SaveBar.js).
export default clerkMiddleware();

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
