import { Outlet } from "react-router-dom";
import Appbar from "../../components/AppBar";
import Dashboard from "./Dashboard";
import { useMatchesDispatch } from "../../context/matches/context";
import { useEffect } from "react";
import { fetchMatches } from "../../context/matches/actions";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";

const HomeLayout = () => {
  const matchesDispatch = useMatchesDispatch();
  const articlesDispatch = useArticlesDispatch();

  useEffect(() => {
    fetchMatches(matchesDispatch);
    fetchArticles(articlesDispatch);
  }, []);

  return (
    <>
      <Appbar />
      <main>
        <div className="mx-auto max-w-7xl dark:bg-stone-950 h-screen dark:text-white">
          <Dashboard />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default HomeLayout;
