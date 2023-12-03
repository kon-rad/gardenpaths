"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useTransition,
} from "react";
import axios from "axios";

type GlobalState = {
  // Define your global state properties here
  exampleProperty: string;
  setExampleProperty: (value: string) => void;
};

const defaultState: GlobalState = {
  exampleProperty: "",
  setExampleProperty: () => {},
};

const GlobalContext = createContext<GlobalState>(defaultState);

export const useGlobalState = (): any => useContext(GlobalContext);

type GlobalStateProviderProps = {
  children: ReactNode;
};

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [refreshEditor, setRefreshEditor] = useState<string>(
    `${Math.random() * 10000000}`
  );
  const [doc, setDoc] = useState<any>({});
  const [style, setStyle] = useState<string>("");
  const [context, setContext] = useState<string>("");
  let [isPendingSaving, startTransitionSaving] = useTransition();
  const [initDoc, setInitDoc] = useState<any>({});

  const callAutocomplete = async () => {
    console.log("callAutocomplete called");

    const resp = await axios.post("/api/autocomplete", {
      context,
      style,
      content: doc,
    });
    console.log("resp: ", resp);
  };
  return (
    <GlobalContext.Provider
      value={
        {
          doc,
          setDoc,
          isPendingSaving,
          startTransitionSaving,
          refreshEditor,
          setRefreshEditor,
          initDoc,
          context,
          setContext,
          style,
          setStyle,
          callAutocomplete,
        } as any
      }
    >
      {children}
    </GlobalContext.Provider>
  );
};
