import Hero from "@/components/landing/hero";
import { auth } from "auth";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Hero />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
