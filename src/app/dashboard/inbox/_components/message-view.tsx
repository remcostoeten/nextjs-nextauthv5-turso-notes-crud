"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllUsers, toggleMessageStar } from "@/core/server/actions/messages";
import { deleteMessage } from "@/core/server/actions/messages/delete-messages";
import { Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Message, User } from "schema";

export default function MessageView({ message }: { message: Message }) {
  const [isStarred, setIsStarred] = useState(message.isStarred);
  const [sender, setSender] = useState<User | null>(null);

  useEffect(() => {
    const fetchSender = async () => {
      const users = await getAllUsers();
      const foundSender = users.find((user) => user.id === message.senderId);
      setSender(foundSender || null);
    };
    fetchSender();
  }, [message.senderId]);
  const handleStarToggle = async () => {
    await toggleMessageStar(message.id, !isStarred);
    setIsStarred(!isStarred);
  };

  const handleDelete = async () => {
    await deleteMessage(message.id);
    // Redirect to messages list or show a confirmation
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={sender?.avatar} alt={sender?.name} />
            <AvatarFallback>{sender?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{message.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              From: {sender?.name}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={handleStarToggle}>
            <Star className={isStarred ? "text-yellow-500" : "text-gray-300"} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="text-red-500" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: message.content }} />
      </CardContent>
    </Card>
  );
}
