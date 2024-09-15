'use client'

import { useState } from 'react';

export default function RoleAssignment({ users, roles, onAssign }: { users: any[], roles: any[], onAssign: (user: string, role: number) => Promise<void> }) {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleAssign = async () => {
    if (selectedUser && selectedRole) {
      await onAssign(selectedUser, parseInt(selectedRole));
      alert('Role assigned successfully!');
      setSelectedUser('');
      setSelectedRole('');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="user" className="block text-sm font-medium text-gray-700">User</label>
        <select
          id="user"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <select
          id="role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAssign}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Assign Role
      </button>
    </div>
  );
}
