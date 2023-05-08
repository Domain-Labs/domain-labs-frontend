import { createContext } from "react";

const initialState = {
  theme: "day-theme",
  setTheme: () => {},
};

export const ThemeContext = createContext(initialState);
