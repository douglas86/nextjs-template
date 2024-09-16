"use client";

import { spinner } from "@/components/atom";
import useAppContext from "@/hooks/useAppContext";
import useSWR from "swr";

export default function Home() {
  const { user } = useAppContext();

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "https://api.github.com/repos/vercel/swr",
    fetcher,
  );

  if (error) return "An error occurred";
  if (isLoading) return "Loading...";

  console.log("data", data);

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
