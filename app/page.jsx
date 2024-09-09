"use client";

import { spinner } from "@/components/atom";
import useAppContext from "@/hooks/useAppContext";

export default function Home() {
  const { user } = useAppContext();

  return (
    <main>
      {user ? (
        <h1 className="text-3xl text-center p-5 font-bold">
          Welcome back {user.name}
        </h1>
      ) : (
        spinner()
      )}
    </main>
  );
}
