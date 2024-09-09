"use client";

import { createContext, useMemo, useReducer } from "react";

import { rootReducers } from "@/context/rootReducers";

const initialState = {
  dataReducers: {},
  formsReducers: {},
  userReducers: {},
};

export const Context = createContext(initialState);

const init = () => {
  const { dataReducers, userReducers, formsReducers } = initialState;

  return { dataReducers, userReducers, formsReducers };
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducers, initialState, init);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
