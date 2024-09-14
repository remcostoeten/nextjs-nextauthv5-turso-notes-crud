'use client';

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export function useSessionWithUpdate() {
    const { data: session, status, update: originalUpdate } = useSession();
    const [localSession, setLocalSession] = useState(session);

    useEffect(() => {
        setLocalSession(session);
    }, [session]);

    const update = useCallback(async (data: any) => {
        await originalUpdate(data);
        setLocalSession((prev) => {
            if (prev) {
                return {
                    ...prev,
                    user: { ...prev?.user, ...data },
                };
            }
            return prev;
        });
    }, [originalUpdate]);

    return { data: localSession, status, update };
}
