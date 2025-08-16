"use client";
import { SessionProvider } from "next-auth/react";
import Landing from "../components/Landing";

export default function Home() {
  return (
    <div>
      <SessionProvider>
        <Landing />
      </SessionProvider>
    </div>
  );
}
