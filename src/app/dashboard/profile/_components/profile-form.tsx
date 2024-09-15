
'use client'

import { useState } from 'react';
export default function ProfileForm({ user }) {
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);
    const [theme, setTheme] = useState(user.settings?.theme || 'light');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateUserProfile(user.id, { name, bio });
        await updateUserSettings(user.id, { theme });
        alert('Profile updated successfully!');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
            <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>
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
                </select>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Update Profile
            </button>
        </form>
    );
}
function updateUserProfile(id: any, arg1: { name: any; bio: any; }) {
    throw new Error('Function not implemented.');
}

function updateUserSettings(id: any, arg1: { theme: any; }) {
    throw new Error('Function not implemented.');
}

