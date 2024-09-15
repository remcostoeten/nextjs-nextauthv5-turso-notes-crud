import { getUserProfile, updateUserSettings } from '@/app/actions/user-actions';
import SettingsForm from './SettingsForm';

export default async function SettingsPage({ params }: { params: { id: string } }) {
  const user = await getUserProfile(params.id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>
      <SettingsForm user={user} updateSettings={updateUserSettings} />
    </div>
  );
}

// app/dashboard/settings/SettingsForm.tsx
'use client'

import { useState } from 'react';

export default function SettingsForm({ user, updateSettings }) {
  const [theme, setTheme] = useState(user.settings?.theme || 'light');
  const [emailNotifications, setEmailNotifications] = useState(user.settings?.emailNotifications ?? true);
  const [language, setLanguage] = useState(user.settings?.language || 'en');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSettings(user.id, { theme, emailNotifications, language });
    alert('Settings updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Theme</label>
        <select
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
      <div>
        <label htmlFor="emailNotifications" className="flex items-center">
          <input
            type="checkbox"
            id="emailNotifications"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm text-gray-700">Receive email notifications</span>
        </label>
      </div>
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Update Settings
      </button>
    </form>
  );
}
