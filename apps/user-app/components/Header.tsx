"use client";
import { UserButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-center px-4 py-4 bg-gradient-to-r from-blue-50 to-white">
      <nav className="w-[90%] max-w-7xl rounded-2xl p-4 flex justify-between items-center bg-white/80 backdrop-blur-sm border border-blue-100 shadow-lg">
        <Link href={"/"}>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 text-2xl font-bold hover:from-blue-700 hover:to-blue-900 transition-all duration-300">
            PayWise
          </div>
        </Link>
        <ul className="list-none flex justify-between gap-8">
          <li>
            <Link href={"/dashboard"} className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-blue-50">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href={"/about"} className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-blue-50">
              About
            </Link>
          </li>
          <li>
            <Link href={"/contact"} className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-blue-50">
              Contact
            </Link>
          </li>
        </ul>
        <SignedIn>
          <div className="flex items-center">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-blue-200 hover:ring-blue-300 transition-all duration-300"
                }
              }}
            />
          </div>
        </SignedIn>
      </nav>
    </header>
  );
}
