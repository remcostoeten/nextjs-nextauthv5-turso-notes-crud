"use client";

import Tiptap from "@/components/TipTap";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sendMessage } from "@/core/server/actions/messages";
import { User } from "@auth/core/types";
import { useState } from "react";
import EmojiPicker from "./emoji-picker";
import UserMentionAutocomplete from "./user-auto-complete";

export default function MessageComposer({ users }: { users: User[] }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !recipient) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await sendMessage({
        title,
        content,
        recipientId: recipient,
        senderId: "",
      });
      setTitle("");
      setContent("");
      setRecipient("");
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setContent((prevContent) => prevContent + emoji);
  };

  const handleMention = (userId: string) => {
    setContent((prevContent) => prevContent + `@${userId} `);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Compose Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Message Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
          <Select value={recipient} onValueChange={setRecipient}>
            <SelectTrigger>
              <SelectValue placeholder="Select Recipient" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name ?? "Unnamed User"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative">
            <Tiptap content={content} onChange={setContent} />
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              <UserMentionAutocomplete
                users={users}
                onMention={handleMention}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
