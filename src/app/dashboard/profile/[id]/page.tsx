import { getUserProfile } from '@/core/server/actions';
import ProfileForm from '../_components/profile-form';

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const user = await getUserProfile(params.id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <ProfileForm user={user} />
    </div>
  );
}
