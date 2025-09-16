"use client";
import { SessionProvider } from "next-auth/react";
import Landing from "../components/Landing";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        limit={2}
        autoClose={3000}
        newestOnTop={true}
      />
      <SessionProvider>
        <Landing />
      </SessionProvider>
    </div>
  );
}
