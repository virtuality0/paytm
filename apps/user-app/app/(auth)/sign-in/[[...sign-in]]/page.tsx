"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{
            variables: {
              colorPrimary: "#000000",
              colorBackground: "#ffffff",
              colorText: "#000000",
              colorTextSecondary: "#6b7280",
              borderRadius: "0.5rem",
            },
            elements: {
              rootBox: "mx-auto",
              card: "bg-white border border-black-100 shadow-none",
              headerTitle: "text-2xl text-white",
              headerSubtitle: "text-xs text-black-100",
              socialButtonsBlockButton:
                "bg-white text-white border border-black-100 hover:bg-gray-50",
              socialButtonsBlockButtonText: "text-white",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-500",
              formFieldLabel: "text-white",
              formFieldInput: "bg-white text-white border-black-100",
              footer: "text-black-100",
              footerActionText: "text-black-100",
              footerActionLink: "text-blue-100 font-medium",
              formButtonPrimary: "bg-white text-black",
            },
          }}
        />
      </div>
    </main>
  );
}
