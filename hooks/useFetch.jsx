import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/${url}`);
      return res.json();
    };

    fetchData()
      .then((res) => setData(res))
      .catch((err) => setError(err));
  }, []);

  return {
    data: data ? data.data : null,
    length: data ? data.length : null,
    message: data ? data.message : null,
    error,
  };
};

export default useFetch;
