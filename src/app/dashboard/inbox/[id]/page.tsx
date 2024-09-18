import { getMessagesForUser } from "@/core/server/actions/messages";
import { auth } from "auth";
import MessageView from "../_components/message-view";

export default async function MessagePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session) {
    return <div>Please log in to view this message.</div>;
  }

  const messages = await getMessagesForUser(session.user.id);
  const message = messages.find((m) => m.id === parseInt(params.id));

  if (!message) {
    return <div>Message not found.</div>;
  }

  return <MessageView message={message} />;
}
