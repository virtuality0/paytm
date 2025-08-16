"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { status } = useSession();
  return (
    <header className="px-2 py-2 flex justify-between w-full border-b-1 border-gray-400">
      <span className="p-2"> PayTM </span>
      <button
        className="p-2 cursor-pointer"
        onClick={() => {
          status === "authenticated" ? signOut() : signIn();
        }}
      >
        {status === "authenticated" ? "SignOut" : "SignIn"}
      </button>
    </header>
  );
}
