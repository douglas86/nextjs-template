import { useContext, useEffect } from "react";
import { Context } from "@/context/store";
import { SessionContext, useSession } from "next-auth/react";

const useAppContext = () => {
  const context = useContext(Context);
  const { state, dispatch } = context;

  return {
    state,
    dispatch,
    user: state.userReducers.user,
    data: state.dataReducers,
    forms: state.formsReducers,
  };
};

export default useAppContext;
