'use server'

import { db } from "@/db";
import { userRoles } from "../../schema/users";

export async function assignRoleToUser(userId: string, roleId: number) {
    await db.insert(userRoles)
        .values({ userId, roleId })
        .onConflictDoNothing();
}
