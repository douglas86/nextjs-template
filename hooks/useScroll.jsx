import useSWRInfinite from "swr/infinite";
import { useEffect, useRef } from "react";

const fetcher = (endpoint) => fetch(endpoint).then((res) => res.json());

const useScroll = (url, take = 10) => {
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) => `${url}?take=${take}&skip=${index * take}`,
    fetcher,
  );

  const issues = data ? [].concat(...data.map((page) => page.data)) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data.length < take);

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

  return { issues, loadMoreRef, isLoadingMore, isReachingEnd };
};

export default useScroll;
