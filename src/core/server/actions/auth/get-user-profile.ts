'use server'

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "../../schema/users/users";

// Fetch user profile
export async function getUserProfile(userId: string) {
    const user = await db.query.findFirst({
        where: eq(users.id, userId),
        with: {
            settings: true,
            roles: {
                with: {
                    role: true
                }
            }
        }
    });
    return user;
}
