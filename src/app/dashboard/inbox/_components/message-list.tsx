import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import {
  deleteMessage,
  getMessagesForUser,
  markMessageAsRead,
  toggleMessageStar,
} from "@/core/server/actions/messages";
import { Star, Trash2 } from "lucide-react";

type Message = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  senderId: string;
  recipientId: string;
  isRead: boolean;
  isStarred: boolean;
  mentions: string | null;
};

async function MessageList({
  userId,
  filter,
}: {
  userId: string;
  filter: "all" | "starred" | "unread";
}) {
  const messages = await getMessagesForUser(userId);
  const filteredMessages = messages.filter((message: Message) => {
    if (filter === "starred") return message.isStarred;
    if (filter === "unread") return !message.isRead;
    return true;
  });

  return (
    <div className="space-y-4">
      {filteredMessages.map((message: Message) => (
        <MessageCard key={message.id} message={message} />
      ))}
    </div>
  );
}

function MessageCard({ message }: { message: Message }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{message.title}</CardTitle>
        <div className="flex space-x-2">
          <MessageAction action={toggleMessageStar} messageId={message.id}>
            <Star
              className={
                message.isStarred ? "text-yellow-400" : "text-gray-400"
              }
            />
          </MessageAction>
          <MessageAction action={deleteMessage} messageId={message.id}>
            <Trash2 className="text-red-400" />
          </MessageAction>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {message.content.substring(0, 100)}...
        </p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            {message.createdAt.toLocaleString()}
          </span>
          <MessageAction action={markMessageAsRead} messageId={message.id}>
            <Button type="submit" variant="link" className="text-xs">
              {message.isRead ? "Mark as Unread" : "Mark as Read"}
            </Button>
          </MessageAction>
        </div>
      </CardContent>
    </Card>
  );
}

function MessageAction({
  action,
  messageId,
  children,
}: {
  action: any;
  messageId: number;
  children: React.ReactNode;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="messageId" value={messageId.toString()} />
      <Button type="submit" variant="ghost" size="icon">
        {children}
      </Button>
    </form>
  );
}

export default MessageList;
