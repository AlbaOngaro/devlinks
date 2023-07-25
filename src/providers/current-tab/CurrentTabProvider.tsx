import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface CurrentTabContextValue {
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
}

const CurrentTabContext = createContext<CurrentTabContextValue>({
  current: 0,
  setCurrent: () => {},
});

export function CurrentTabProvider({ children }: PropsWithChildren) {
  const [current, setCurrent] = useState(0);

  return (
    <CurrentTabContext.Provider value={{ current, setCurrent }}>
      {children}
    </CurrentTabContext.Provider>
  );
}

export function useCurrentTabContext() {
  return useContext(CurrentTabContext);
}
