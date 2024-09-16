import useSWR from "swr";

import { spinner } from "@/components/atom";

const useFetch = (url) => {
  const fetcher = (endpoint) => fetch(endpoint).then((res) => res.json());

  const { data, error, isLoading } = useSWR(url, fetcher);

  if (error) return "An error occurred.";
  if (isLoading) return spinner();

  return data;
};

export default useFetch;
