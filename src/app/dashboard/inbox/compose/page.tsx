import { getAllUsers } from "@/core/server/actions";
import { auth } from "auth";
import MessageComposer from "../_components/message-composer";

export default async function ComposeMessagePage() {
  const session = await auth();
  const users = await getAllUsers();

  if (!session) {
    return <div>Please log in to compose a message.</div>;
  }

  const serializedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));

  return <MessageComposer users={serializedUsers} />;
}
