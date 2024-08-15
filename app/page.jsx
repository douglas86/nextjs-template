"use client";

import Image from "next/image";
import styles from "./page.module.css";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(10);

  const { data: session } = useSession();

  useEffect(() => {
    axios
      .get(`/api/user`)
      .then((res) => {
        console.log("res", res);
        setItems(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const fetchMoreData = () => {
    axios
      .get(`/api/user?skip=${index}`)
      .then((res) => {
        setItems((prevItems) => [...prevItems, ...res.data.data]);
        res.data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log("error", err));

    setIndex((prevIndex) => prevIndex + 10);
  };

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }

  console.log("items", items);

  return (
    <main className={styles.main}>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign In</button>
      <InfiniteScroll
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        dataLength={items.length - 1}
      >
        <div className="container">
          <div className="row">
            {items && items.map((item) => <p key={item.id}>{item.name}</p>)}
          </div>{" "}
        </div>{" "}
      </InfiniteScroll>
    </main>
  );
}
