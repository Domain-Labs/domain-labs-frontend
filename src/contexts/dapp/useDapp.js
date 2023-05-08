import { useContext } from "react";
import { DappContext } from "./DappContext";

export default function useDappContext() {
  return useContext(DappContext)
}