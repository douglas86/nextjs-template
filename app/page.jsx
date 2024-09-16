"use client";

import { spinner } from "@/components/atom";

import useAppContext from "@/hooks/useAppContext";
import useScroll from "@/hooks/useScroll";

export default function Home() {
  const { user } = useAppContext();
  const { issues, loadMoreRef, isLoadingMore, isReachingEnd } = useScroll(
    `/api/user`,
    10,
  );

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
      {isLoadingMore && spinner()}
      {isReachingEnd && !isLoadingMore && <p>No more issues to load.</p>}
    </main>
  );
}
