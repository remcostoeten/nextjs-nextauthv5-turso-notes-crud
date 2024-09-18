"use client";

import { useState } from "react";
import { Message } from "schema";
import { Button, Input } from "ui";
import MessageItem from "./message-item";
import { searchMessages } from "@/core/server/actions/messages/search-messages";

export default function SearchMessages({ userId }: { userId: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Message[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchResults = await searchMessages(userId, query);
    setResults(searchResults);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search messages..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </form>
      <div className="space-y-2">
        {results.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
