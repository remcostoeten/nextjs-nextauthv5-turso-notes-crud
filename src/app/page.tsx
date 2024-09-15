import Header from "@/components/base/layout/header/header";
import Layout from "@/components/base/layout/Layout";
import Hero from "@/components/landing/hero";
import { auth } from "auth";

export default async function Home() {
  const session = await auth();

  return (
    <Layout>
      <Hero />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </Layout>
  );
}
