import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ThemeContext } from "./context/theme";
import { useContext } from "react";
import { MatchesProvider } from "./context/matches/context";
import { ArticlesProvider } from "./context/articles/context";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`font-lexend-deca ${
        theme === "dark" ? "dark" : ""
      } transition-colors`}
    >
      <MatchesProvider>
        <ArticlesProvider>
          <RouterProvider router={router} />
        </ArticlesProvider>
      </MatchesProvider>
    </div>
  );
}

export default App;
