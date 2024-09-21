import { getProfile, updateProfile } from "@/core/server/actions/users/profile";
import { validateRequest } from "@/core/utils/auth.helpers";
import { Suspense } from "react";
import SettingsForm from "./_components/settings-form";

export default async function SettingsPage() {
  const { user } = await validateRequest();

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  const profile = await getProfile(user.id);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Suspense fallback={<div>Loading...</div>}>
              <SettingsForm
                user={user}
                profile={profile}
                updateProfile={updateProfile}
              />
            </Suspense>
          </div>
          <div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Help and Support</h2>
              <p className="mb-2">Looking for info about us?</p>
              <a href="#" className="text-blue-400 hover:underline">
                Learn more
              </a>
              <p className="mt-4 mb-2">Tips on how to use pandora?</p>
              <a href="#" className="text-blue-400 hover:underline">
                Learn more
              </a>
              <h3 className="text-lg font-semibold mt-6 mb-2">
                Need something else?
              </h3>
              <a href="#" className="text-blue-400 hover:underline block mb-2">
                Contact support
              </a>
              <a href="#" className="text-blue-400 hover:underline">
                FAQ's
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
