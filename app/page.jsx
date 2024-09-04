"use client";

import useUser from "@/hooks/useUser";
import { spinner } from "@/components/atom";
import { useEffect, useState } from "react";

export default function Home() {
  const user = useUser();

  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        return await fetch(`/api/user`);
      } catch (e) {
        return e;
      }
    };

    fetchData()
      .then(async (res) => {
        let results = await res.json();
        setData(results);
      })
      .catch((err) => setError(err));
  }, []);

  console.log("data", data);
  console.log("error", error);

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
