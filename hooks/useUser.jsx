import { useSession } from "next-auth/react";

const useUser = () => {
  const { data } = useSession();

  return data ? data.user : null;
};

export default useUser;
