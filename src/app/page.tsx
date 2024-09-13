import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="h-[200vh]">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
