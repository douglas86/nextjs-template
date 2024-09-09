"use client";

import { createContext, useMemo, useReducer } from "react";

import { rootReducers } from "@/context/rootReducers";

const initialState = {
  userReducer: null,
  dataReducer: null,
  formsReducer: null,
};

export const Context = createContext(initialState);

const init = () => {
  const { userReducer, dataReducer, formReducer } = initialState;

  return { userReducer, dataReducer, formReducer };
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducers, initialState, init);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
