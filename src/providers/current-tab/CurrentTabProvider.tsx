import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

export enum Tab {
  Links,
  Profile,
}
interface CurrentTabContextValue {
  current: Tab;
  setCurrent: Dispatch<SetStateAction<number>>;
}

const CurrentTabContext = createContext<CurrentTabContextValue>({
  current: Tab.Links,
  setCurrent: () => {},
});

export function CurrentTabProvider({ children }: PropsWithChildren) {
  const [current, setCurrent] = useState(Tab.Links);

  return (
    <CurrentTabContext.Provider value={{ current, setCurrent }}>
      {children}
    </CurrentTabContext.Provider>
  );
}

export function useCurrentTabContext() {
  return useContext(CurrentTabContext);
}
