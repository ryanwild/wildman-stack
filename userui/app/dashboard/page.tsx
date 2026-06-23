import { authServer } from "../../lib/auth-server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

const Page = async () => {
  const session = await authServer.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/login");
  }
  return (
    <div>
      <div className="border-b p-3">
        <div className="mb-2">
          <Link href={"/"} passHref>
            <button className="flex items-center gap-1 text-sm cursor-pointer hover:underline">
              Back to Home
            </button>
          </Link>
        </div>
        <h1 className="text-2xl">Server-side</h1>
        <p>
          Protect resources using {""}
          <span className="underline">authServerClient</span> on server-side
        </p>
      </div>

      <div className="overflow-x-auto p-3">
        <pre className="font-mono text-xs">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Page;
