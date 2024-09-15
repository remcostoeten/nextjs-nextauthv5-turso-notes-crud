import FollowButton from "@/components/auth/FollowButton";
import { getUserProfile } from "@/core/server/actions";
import { getUserFollowers } from "@/core/server/actions/auth/get-user-followers";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";


export default async function UserPage({ params }: { params: { id: string } }) {
    const user = await getUserProfile(params.id);
    const followers = await getUserFollowers(params.id);

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{user.name}'s Profile</h1>
            <p className="mb-4">{user.bio}</p>
            <FollowButton currentUserId="current-user-id" targetUserId={user.id} />
            <h2 className="text-xl font-semibold mt-8 mb-4">Followers ({followers.length})</h2>
            <ul className="space-y-2">
                {followers.map((follower: { id: Key | null | undefined; user: { name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; }) => (
                    <li key={follower.id}>{follower.user.name}</li>
                ))}
            </ul>
        </div>
    );
}
