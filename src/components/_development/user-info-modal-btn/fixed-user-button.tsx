"use client";

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useState } from "react";
import { UserInfoModal } from "./user-info-modal";

export function UserInfoButton(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full w-12 h-12"
        onClick={() => setIsOpen(true)}
      >
        <User className="h-6 w-6" />
      </Button>
      <UserInfoModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
