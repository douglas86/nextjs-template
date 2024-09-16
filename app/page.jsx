"use client";

import { spinner } from "@/components/atom";

import useAppContext from "@/hooks/useAppContext";
import useSWRInfinite from "swr/infinite";
import { useEffect, useRef } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 10;

export default function Home() {
  const { user } = useAppContext();

  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) => `/api/user?take=${PAGE_SIZE}&skip=${index * PAGE_SIZE}`,
    fetcher,
  );

  const issues = data ? [].concat(...data.map((page) => page.data)) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data.length < PAGE_SIZE);

  const loadMoreRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && !isReachingEnd) {
          setSize(size + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [isLoadingMore, isReachingEnd, size, setSize]);

  return (
    <main>
      {user ? (
        <h1 className="text-3xl text-center p-5 font-bold">
          Welcome back {user.name}
        </h1>
      ) : (
        spinner()
      )}
      {issues.map((issue) => {
        return (
          <p key={issue.id} style={{ margin: "6px 0" }}>
            - {issue.name}
          </p>
        );
      })}
      <div ref={loadMoreRef} />
      {isLoadingMore && <p>Loading more issues...</p>}
      {isReachingEnd && !isLoadingMore && <p>No more issues to load.</p>}
    </main>
  );
}
