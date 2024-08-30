"use client";

import { useSession } from "next-auth/react";
import { spinner } from "@/components/atom";

export default function Home() {
  const { data } = useSession();

  return (
    <main>
      {data ? (
        <h1 className="text-3xl text-center p-5 font-bold">
          Welcome back {data.user.name}
        </h1>
      ) : (
        spinner()
      )}
    </main>
  );
}
