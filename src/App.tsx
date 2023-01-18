import ContextWrapper from "./ContextWrapper";
import { darkTheme } from "./theme";
import { CounterProvider, ThemeProvider } from "./utils/store";
import { DappContext } from "./utils/context";
import ContextProvider from "./utils/ContextProvider";

const App = () => {
  return (
    <ContextProvider>
      <CounterProvider>
        <ThemeProvider>
          < ContextWrapper />
        </ThemeProvider>
      </CounterProvider>
    </ContextProvider>
  );
};

export default App;