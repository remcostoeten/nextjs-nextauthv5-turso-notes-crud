"use client";

import { useState } from "react";

export default function FollowButton({
  currentUserId,
  targetUserId,
}: {
  currentUserId: string;
  targetUserId: string;
}) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    await createUserRelationship(currentUserId, targetUserId, "follow");
    setIsFollowing(true);
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isFollowing}
      className={`px-4 py-2 rounded-md ${
        isFollowing ? "bg-gray-300" : "bg-blue-500 text-white"
      }`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}
