import { getSession } from "../_lib/auth-server.ts";
import { redirect } from "next/navigation";
import Link from "next/link";

const Page = async () => {
  const { data, error } = await getSession();
  if (!data || error) {
    redirect("/login");
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
        <pre className="font-mono text-xs">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Page;
