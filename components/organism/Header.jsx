"use client";

import { useSession, signIn, signOut } from "next-auth/react";

import { button } from "@/components/atom";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="header">
      {session
        ? button(() => signOut(), "btn", "Sign Out")
        : button(() => signIn(), "btn", "Sign In")}
    </header>
  );
};

export default Header;
