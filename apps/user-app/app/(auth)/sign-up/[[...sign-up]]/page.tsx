"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen w-full bg-black-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignUp 
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          appearance={{
            variables: {
              colorPrimary: '#000000',
              colorBackground: '#ffffff',
              colorText: '#000000',
              colorTextSecondary: '#6b7280',
              borderRadius: '0.5rem',
            },
            elements: {
              rootBox: "mx-auto",
              card: "bg-white border border-gray-100 shadow-none",
              headerTitle: "text-2xl text-black-100",
              headerSubtitle: "text-xs text-gray-100",
              socialButtonsBlockButton: "bg-white text-black-100 border border-gray-100 hover:bg-gray-50",
              socialButtonsBlockButtonText: "text-black-100",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-500",
              formFieldLabel: "text-black-100",
              formFieldInput: "bg-white text-black-100 border-gray-100",
              footer: "text-gray-100",
              footerActionText: "text-gray-100",
              footerActionLink: "text-blue-100 font-medium",
              formButtonPrimary: "bg-black-100 text-white",
            },
          }}
        />
      </div>
    </main>
  );
}

