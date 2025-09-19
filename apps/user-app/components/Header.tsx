"use client";
import { SignedOut, UserButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@repo/ui";

export default function Header() {
  return (
    <header className="flex items-center justify-center px-4 py-2">
      <nav className="w-[80%] rounded-2xl p-4 flex justify-between items-center bg-gray-100">
        <Link href={"/"}>
          <div className="text-white text-xl font-bold">PayShip</div>
        </Link>
        <ul className="list-none flex justify-between gap-8">
          <li className="text-white font-medium">
            <Link href={"/dashboard"}> Dashboard </Link>
          </li>
          <li className="text-white font-medium">
            <Link href={"/about"}>About </Link>
          </li>
          <li className="text-white font-medium">
            <Link href={"/contact"}>Contact</Link>
          </li>
        </ul>
        <SignedOut>
          <div className="flex gap-4 items-center">
            <Link href="/sign-in">
              <Button
                className="text-white font-medium cursor-pointer"
                variant={"ghost"}
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="text-white font-medium cursor-pointer rounded-md bg-blue-100 px-2 py-1">
                Get Started
              </Button>
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
