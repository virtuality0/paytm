import { auth, createClerkClient } from "@clerk/nextjs/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function getCurrentUserMetadata() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await clerkClient.users.getUser(userId);
  return (user.publicMetadata?.dbUserId as string) || null;
}
