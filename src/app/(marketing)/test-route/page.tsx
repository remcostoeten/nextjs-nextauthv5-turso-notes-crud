import { auth } from "auth";

import WhoAmIAPI from "./WhoAmIAPI";
import WhoAmIRSC from "./WhoAmIRSC";
import WhoAmIServerAction from "./WhoAmIServerAction";

export default async function TestRoute() {
  const session = await auth();

  async function onGetUserAction() {
    "use server";
    const session = await auth();
    return session?.user?.name ?? null;
  }

  return (
    <main>
      <h1 className="text-3xl mb-5">Test Route</h1>
      <div>User: {session?.user?.name}</div>
      <WhoAmIServerAction onGetUserAction={onGetUserAction} />
      <WhoAmIAPI />
      <WhoAmIRSC />
    </main>
  );
}
