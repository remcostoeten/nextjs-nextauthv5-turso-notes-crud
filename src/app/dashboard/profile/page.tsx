import Spinner from "@/components/ui/Spinner";
import { users, userSettings } from "@/core/server/schema/users";
import { auth } from "auth";
import { db } from "db";
import { eq } from "drizzle-orm";
import { Suspense } from "react";
import { ProfileForm } from "./_components/ProfileForm";
import { ProfileHeader } from "./_components/ProfileHeader";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    return <div>Not authenticated</div>;
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .get();

  const settings = await db
    .select()
    .from(userSettings)
    .where(eq(userSettings.userId, session.user.id))
    .get();

  if (!user || !settings) {
    return <div>User or settings not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<Spinner />}>
        <ProfileHeader user={user} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <ProfileForm user={user} userSettings={settings} />
      </Suspense>
    </div>
  );
}
