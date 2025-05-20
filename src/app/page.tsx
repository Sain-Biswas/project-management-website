import { ModeToggleButton } from "@/components/system/mode-toggle-button";
import { Button } from "@/components/ui/button";
import { apiServer } from "@/trpc/server";
import Link from "next/link";

export default async function Home() {
  const data = await apiServer.post.hello({ text: "my User." });

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <ol className="list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm/6 sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="rounded bg-black/[.05] px-1 py-0.5 font-[family-name:var(--font-geist-mono)] font-semibold dark:bg-white/[.06]">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <ModeToggleButton />

        <div>{data.greeting}</div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button className="h-10 rounded-full px-4 sm:h-12 sm:px-5">
            <Link
              className="flex gap-2"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            >
              Deploy now
            </Link>
          </Button>
          <Button
            variant={"outline"}
            className="h-10 rounded-full px-4 sm:h-12 sm:px-5"
          >
            <Link
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
            >
              Read our docs
            </Link>
          </Button>
        </div>
        <footer>
          <Button variant={"link"}>
            <Link href={"/signup"}>Signup</Link>
          </Button>
          <Button variant={"link"}>
            <Link href={"/signin"}>Signin</Link>
          </Button>
          <Button variant={"link"}>
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
        </footer>
      </main>
    </div>
  );
}
