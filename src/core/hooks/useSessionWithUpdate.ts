'use client';
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export function useSessionWithUpdate() {
  const { data: session, status, update } = useSession();
  const [updatedSession, setUpdatedSession] = useState(session);

  useEffect(() => {
    setUpdatedSession(session);
  }, [session]);

  const updateSession = useCallback(async () => {
    const updated = await update();
    setUpdatedSession(updated);
    return updated;
  }, [update]);

  return { session: updatedSession, status, update: updateSession };
}
