"use client";

import { spinner } from "@/components/atom";

import useAppContext from "@/hooks/useAppContext";
import useFetch from "@/hooks/useFetch";

export default function Home() {
  const { user } = useAppContext();
  const data = useFetch("https://api.github.com/repos/vercel/swr");

  console.log("data1", data);

  return (
    <main>
      {user ? (
        <h1 className="text-3xl text-center p-5 font-bold">
          Welcome back {user.name}
        </h1>
      ) : (
        spinner()
      )}
      {data ? (
        <div className="flex flex-col items-center justify-center">
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <strong>👁 {data.subscribers_count}</strong>{" "}
          <strong>✨ {data.stargazers_count}</strong>{" "}
          <strong>🍴 {data.forks_count}</strong>
        </div>
      ) : (
        spinner
      )}
    </main>
  );
}
