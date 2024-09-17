import Layout from "@/components/base/layout/Layout";
import Badge from "@/components/landing/github-stats/badge";
import GitHubStats from "@/components/landing/github-stats/github-stats";
import Hero from "@/components/landing/hero";
import { auth } from "auth";

export default async function Home() {
  const session = await auth();

  return (
    <Layout>
      <Hero />
      <div className="flex justify-between items-center max-w-screen-xl mx-auto px-4 md:px-8">
        <Badge title='My github stats' number={""} />
        <GitHubStats />
      </div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </Layout >
  );
}
