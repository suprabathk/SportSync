import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ThemeContext } from "./context/theme";
import { useContext } from "react";
import { MatchesProvider } from "./context/matches/context";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`font-lexend-deca ${
        theme === "dark" ? "dark" : ""
      } transition-colors`}
    >
      <MatchesProvider>
        <RouterProvider router={router} />
      </MatchesProvider>
    </div>
  );
}

export default App;
