"use client";

import { useSession } from "next-auth/react";
import { spinner } from "@/components/atom";

export default function Home() {
  const { data } = useSession();

  // const [items, setItems] = useState([]);
  // const [hasMore, setHasMore] = useState(true);
  // const [index, setIndex] = useState(10);
  //
  // useEffect(() => {
  //   axios
  //     .get(`/api/user`)
  //     .then((res) => {
  //       console.log("res", res);
  //       setItems(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log("error", err);
  //     });
  // }, []);
  //
  // const fetchMoreData = () => {
  //   axios
  //     .get(`/api/user?skip=${index}`)
  //     .then((res) => {
  //       setItems((prevItems) => [...prevItems, ...res.data.data]);
  //       res.data.length > 0 ? setHasMore(true) : setHasMore(false);
  //     })
  //     .catch((err) => console.log("error", err));
  //
  //   setIndex((prevIndex) => prevIndex + 10);
  // };
  //
  // console.log("items", items);

  return (
    <main>
      {data ? (
        <h1 className="text-3xl text-center p-5 font-bold">
          Welcome back {data.user.name}
        </h1>
      ) : (
        spinner()
      )}

      {/*<InfiniteScroll*/}
      {/*  next={fetchMoreData}*/}
      {/*  hasMore={hasMore}*/}
      {/*  loader={<p>Loading...</p>}*/}
      {/*  dataLength={items.length - 1}*/}
      {/*>*/}
      {/*  <div className="container">*/}
      {/*    <div className="row">*/}
      {/*      {items && items.map((item) => <p key={item.id}>{item.name}</p>)}*/}
      {/*    </div>{" "}*/}
      {/*  </div>{" "}*/}
      {/*</InfiniteScroll>*/}
    </main>
  );
}
