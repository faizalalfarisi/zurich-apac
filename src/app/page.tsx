import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import AppBars from "./components/AppBars";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="grid h-[80vh]">
        <div>
          <AppBars />
          <pre>{JSON.stringify(session)}</pre>
        </div>
      </div>
    </>
  );
}
