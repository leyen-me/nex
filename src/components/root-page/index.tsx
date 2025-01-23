"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function RootPage() {
  const { data: session, status } = useSession();

  return (
    <main className="flex items-center justify-center h-full gap-4">
      {status}
      <Link className="hover:underline" href="/home">
        Home
      </Link>
      <Link className="hover:underline" href="/admin">
        Admin
      </Link>
      <Link className="hover:underline" href="/docs">
        Docs
      </Link>
    </main>
  );
}
