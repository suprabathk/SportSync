import { Outlet } from "react-router-dom";
import Appbar from "../../components/AppBar";
import Dashboard from "./Dashboard";
import { useMatchesDispatch } from "../../context/matches/context";
import { useEffect } from "react";
import { fetchMatches } from "../../context/matches/actions";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import { useSportsDispatch } from "../../context/sports/context";
import { fetchSports } from "../../context/sports/actions";
import { useTeamsDispatch } from "../../context/teams/context";
import { fetchTeams } from "../../context/teams/actions";

const HomeLayout = () => {
  const matchesDispatch = useMatchesDispatch();
  const articlesDispatch = useArticlesDispatch();
  const sportsDispatch = useSportsDispatch();
  const teamsDispatch = useTeamsDispatch();

  useEffect(() => {
    fetchMatches(matchesDispatch);
    fetchArticles(articlesDispatch);
    fetchSports(sportsDispatch);
    fetchTeams(teamsDispatch);
  }, []);

  return (
    <>
      <Appbar />
      <main>
        <Dashboard />
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
