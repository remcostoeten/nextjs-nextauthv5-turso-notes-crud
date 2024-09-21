"use server";

import { db } from "@/core/server/db";
import { lucia } from "@/core/server/lucia";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { userProfiles } from "schema";

interface UserInfo {
  user: {
    id: string;
    name: string;
    email: string;
  };
  profile: {
    id: string;
    userId: string;
    firstName: string | null;
    lastName: string | null;
    bio: string | null;
    dateOfBirth: string | null;
    address: string | null;
    language: string;
    appTheme: string;
    email: string | null;
  } | null;
  session: {
    id: string;
    expiresAt: number;
  };
}

export async function getUserInfo(): Promise<UserInfo | null> {
  try {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value;
    if (!sessionId) {
      return null;
    }

    const { user, session } = await lucia.validateSession(sessionId);
    if (!user) {
      return null;
    }

    let userProfile = null;
    if (db.query && db.query.userProfiles) {
      userProfile = await db.query.userProfiles.findFirst({
        where: eq(userProfiles.userId, user.id),
      });
    } else {
      console.error(
        "Drizzle ORM query for userProfiles is not properly set up",
      );
      // Fallback to raw SQL query if the Drizzle query API is not available
      const [profile] = await db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.userId, user.id))
        .limit(1);
      userProfile = profile;
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      profile: userProfile,
      session: {
        id: session.id,
        expiresAt: session.expiresAt,
      },
    };
  } catch (error) {
    console.error("Error in getUserInfo:", error);
    return null;
  }
}
