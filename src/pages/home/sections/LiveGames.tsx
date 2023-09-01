import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { useMatchesState } from "../../../context/matches/context";
import { MatchPreview } from "../../../types/types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../../context/theme";

const LiveGames = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state: any = useMatchesState();
  const { theme } = useContext(ThemeContext);
  const { matches, isLoading, isError, errorMessage } = state;

  return (
    <div
      className={
        theme === "dark" ? "custom-dark-scrollbar" : "custom-scrollbar"
      }
    >
      <p className="font-bold text-2xl mb-1 text-white">Live Games</p>
      {isError && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex overflow-x-auto gap-2 pb-1 rounded-l-md">
        {isLoading &&
          [...Array(10).keys()].map((id) => (
            <div
              key={id}
              className={`flex-shrink-0 bg-white dark:bg-neutral-600 shadow-md p-3 rounded-md h-24 w-60 animate-pulse duration-75`}
            />
          ))}
        {matches &&
          matches.map((match: MatchPreview) => (
            <Link
              to={`/match/${match.id}`}
              key={match.id}
              className="flex-shrink-0 bg-white p-3 rounded-md text-black dark:bg-black dark:text-white border dark:border-neutral-600"
            >
              <div className="flex justify-between items-center mb-3 gap-6">
                <p className="text-sm dark:text-neutral-300">
                  {match.sportName}
                </p>
                {match.isRunning ? (
                  <div className="flex items-center gap-1">
                    <span className="p-1 rounded-full bg-sky-700 animate-pulse dark:bg-neutral-300" />
                    <p className="text-sky-700 text-sm dark:text-neutral-300">
                      Live now
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-neutral-500 gap-1 dark:text-neutral-300">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <p>{new Date(match.endsAt).toDateString()}</p>
                  </div>
                )}
              </div>
              <div className="flex mt-2 items-center font-semibold gap-2">
                <span>{match.teams[0].name}</span>
                <span>VS</span>
                <span>{match.teams[1].name}</span>
              </div>
              <div className="flex text-sm text-gray-500 gap-1 items-center mt-1 dark:text-neutral-300">
                <MapPinIcon className="w-4 h-4" />
                <p>{match.location}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default LiveGames;
