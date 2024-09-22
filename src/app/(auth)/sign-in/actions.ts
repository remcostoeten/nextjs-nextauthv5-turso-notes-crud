'use server'

import { SignInSchema } from "@/core/models/sign-up-model.z";
import { db } from "@/core/server/db";
import { lucia } from "@/core/server/lucia";
import * as argon2 from "argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export const signIn = async (values: {
    username: string;
    password: string;
}) => {
    try {
        SignInSchema.parse(values);
    } catch (error: any) {
        return {
            error: error.message,
        };
    }

    const existingUser = await db.query.userTable.findFirst({
        where: (table) => eq(table.username, values.username),
    });

    if (!existingUser || !existingUser.hashedPassword) {
        return {
            error: "Incorrect username or password",
        };
    }

    const isValidPassword = await argon2.verify(
        existingUser.hashedPassword,
        values.password,
    );

    if (!isValidPassword) {
        return {
            error: "Incorrect username or password",
        };
    }

    const session = await lucia.createSession(existingUser.id, {
        expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );

    return {
        success: true,
    };
};
