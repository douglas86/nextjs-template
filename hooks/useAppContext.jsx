import { useContext } from "react";
import { Context } from "@/context/store";

const useAppContext = () => {
  return useContext(Context);
};

export default useAppContext;
