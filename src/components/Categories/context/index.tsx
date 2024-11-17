import React, { createContext, useContext, useReducer } from "react";
import { CategoriesState, initState, reducer } from "../state";
import IAction from "../../../contracts/IAction";

interface CategoriesContextProps {
  state: CategoriesState;
  dispatch: React.Dispatch<IAction>;
}

export const CategoriesContext = createContext<CategoriesContextProps>(
  {} as CategoriesContextProps
);

export const CategoriesProvider = ({
  children,
}: React.PropsWithChildren<Record<never, unknown>>) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <CategoriesContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesState = () => {
  return useContext(CategoriesContext);
};
