"use client";

import useUser from "@/hooks/useUser";
import { spinner } from "@/components/atom";

export default function Home() {
  const user = useUser();

  console.log("user", user);

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
