"use client";

import { Button } from "@repo/ui";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { status } = useSession();
  return (
    <header className="px-4 py-4 flex justify-between w-full border-b-1 border-gray-400">
      <span className="p-2"> PayTM </span>
      <Link href={"/signup"}>
        <Button>
          {status === "authenticated" ? "SignOut" : "SignIn"}
        </Button>
      </Link>
    </header>
  );
}
