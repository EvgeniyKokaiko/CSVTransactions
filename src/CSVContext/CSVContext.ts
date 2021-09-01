import React from "react";
import { Data } from "../Interfaces";

export type GlobalContent = {
  context: Data[];
  setContext: (c: unknown) => void;
};

export default React.createContext<GlobalContent>({
  context: [],
  setContext: () => {},
});
