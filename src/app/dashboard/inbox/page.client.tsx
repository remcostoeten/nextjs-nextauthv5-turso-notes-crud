import { Button } from "@/components/ui/button";
import { auth } from "auth";
import { Send } from "lucide-react";
import Link from "next/link";

export default async function MessagePageClient() {
  const session = await auth();
  if (!session) {
    return <div>Please log in to view messages.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <Link href="/dashboard/inbox/compose" passHref>
          <Button>
            <Send
              style={{ marginRight: "8px", height: "16px", width: "16px" }}
            />{" "}
            Compose
          </Button>
        </Link>
      </div>
    </div>
  );
}
