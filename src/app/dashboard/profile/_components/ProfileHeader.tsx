import { User } from "schema";
import { Avatar, AvatarFallback, AvatarImage } from "ui";

export function ProfileHeader({ user }: { user: User }) {
  return (
    <div className="mb-8 flex items-center space-x-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={user.avatar || undefined} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-xl text-muted-foreground">@{user.username}</p>
      </div>
    </div>
  );
}
