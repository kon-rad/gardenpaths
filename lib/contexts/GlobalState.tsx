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
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [paths, setPaths] = useState<string[][]>([]);
  const [selectedNodes, setSelectedNodes] = useState<number[] | undefined>();
  const [style, setStyle] = useState<string>("");
  const [context, setContext] = useState<string>("");
  let [isPendingSaving, startTransitionSaving] = useTransition();
  const [initDoc, setInitDoc] = useState<any>({});
  // [0, 1, 2]
  // [[], [], ['a', 'b', 'c']]

  const callAutocomplete = async () => {
    console.log("callAutocomplete called");
    try {
      console.log("callAutocomplete called");

      const autocompleteCalls = [
        axios.post("/api/autocomplete", {
          context,
          style,
          content: doc?.content,
        }),
        axios.post("/api/autocomplete", {
          context,
          style,
          content: doc?.content,
        }),
        axios.post("/api/autocomplete", {
          context,
          style,
          content: doc?.content,
        }),
      ];

      const responses = await Promise.all(autocompleteCalls);
      const newResults = responses.map((response) => response.data.result);

      setPaths((prevPaths) => [...prevPaths, newResults]);
      console.log("newResults: ", newResults);
    } catch (error) {
      console.error("Error in callAutocomplete:", error);
    }
  };
  console.log("new paths: ", paths);

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
          paths,
          setPaths,
          activeLayer,
          setActiveLayer,
          selectedNodes,
          setSelectedNodes,
        } as any
      }
    >
      {children}
    </GlobalContext.Provider>
  );
};
