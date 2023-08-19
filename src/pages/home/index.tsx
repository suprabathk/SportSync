import { Outlet } from "react-router-dom";
import Appbar from "../../components/AppBar";
import Dashboard from "./Dashboard";
import { useMatchesDispatch } from "../../context/matches/context";
import { useEffect } from "react";
import { fetchMatches } from "../../context/matches/actions";

const HomeLayout = () => {
  const matchesDispatch = useMatchesDispatch();

  useEffect(() => {
    fetchMatches(matchesDispatch);
  }, []);

  return (
    <>
      <Appbar />
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <Dashboard />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default HomeLayout;
