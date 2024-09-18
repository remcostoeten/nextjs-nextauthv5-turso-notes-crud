import { toggleMessageStar } from "@/core/server/actions/messages";
import { Star } from "lucide-react";
import { Message } from "schema";

export default function MessageItem({ message }: { message: Message }) {
  const handleStarToggle = async () => {
    await toggleMessageStar(message.id, !message.isStarred);
  };

  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <div>
        <h3 className="font-bold">{message.title}</h3>
        <p className="text-sm text-gray-500">
          {message.content.substring(0, 50)}...
        </p>
      </div>
      <button onClick={handleStarToggle}>
        <Star
          className={message.isStarred ? "text-yellow-500" : "text-gray-300"}
        />
      </button>
    </div>
  );
}
