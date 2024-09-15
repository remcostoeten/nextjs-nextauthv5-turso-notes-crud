import { assignRoleToUser } from "@/core/server/actions/auth/assign-role-to-user";
import { db } from "db";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import RoleAssignment from "./_components/role-assignment";
export default async function RolesPage() {
  const allRoles = await db.query.roles.findMany();
  const allUsers = await db.query.users.findMany({
    with: {
      roles: {
        with: {
          role: true
        }
      }
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">All Roles</h2>
          <ul className="list-disc pl-5">
            {allRoles.map((role: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
              <li key={role.id}>{role.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Assign Roles</h2>
          <RoleAssignment users={allUsers} roles={allRoles} onAssign={assignRoleToUser} />
        </div>
      </div>
    </div>
  );
}
