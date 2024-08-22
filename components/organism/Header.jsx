"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

import { button } from "@/components/atom";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="header">
      {session
        ? button(() => signOut(), "btn", "Sign Out")
        : button(() => signIn(), "btn", "Sign In")}
      <div className="max-w-md m-5 mx-auto overflow-hidden bg-white shadow-md rounded-xl md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              src={`/vercel.svg`}
              alt="Vercel"
              width={256}
              height={256}
              priority="high"
              className="object-cover w-full h-48 md:w-48"
            />
          </div>
          <div className="p-8">
            <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
              The cool store
            </div>
            <p className="mt-2 text-gray-500">
              Visit our cool store and find the best products for you.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
