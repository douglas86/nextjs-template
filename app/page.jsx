"use client";

import useUser from "@/hooks/useUser";
import { spinner } from "@/components/atom";
import { useEffect, useState } from "react";
import useAppContext from "@/hooks/useAppContext";

export default function Home() {
  const user = useUser();
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    dispatch({ type: "UPDATE_USER", payload: "Douglas" });
  }, [dispatch]);

  console.log("state", state);

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
