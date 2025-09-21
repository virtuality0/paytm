"use client";
import Landing from "../components/Landing";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="flex flex-col h-full bg-black-100">
      <ToastContainer
        position="top-right"
        limit={2}
        autoClose={3000}
        newestOnTop={true}
      />
      <Landing />
    </div>
  );
}
