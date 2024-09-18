import dynamic from "next/dynamic";

const ClientComponent = dynamic(() => import("./page.client"), { ssr: false });

export default function InboxPage() {
  return (
    <div>
      <h1>Inbox</h1>
      <ClientComponent />
    </div>
  );
}
