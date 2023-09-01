import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { useMatchesState } from "../../../context/matches/context";
import { MatchPreview } from "../../../types/types";
import { Link } from "react-router-dom";

const LiveGames = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state: any = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;

  return (
    <div className="custom-scrollbar">
      <p className="font-bold text-2xl mb-1 text-white dark:text-black">
        Live Games
      </p>
      {isError && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex overflow-x-auto gap-2 pb-1 rounded-l-md">
        {isLoading &&
          [...Array(10).keys()].map((id) => (
            <div
              key={id}
              className={`flex-shrink-0 bg-white dark:bg-black shadow-md p-3 rounded-md  h-24 w-60 animate-pulse duration-75`}
            />
          ))}
        {matches &&
          matches.map((match: MatchPreview) => (
            <Link
              to={`/match/${match.id}`}
              key={match.id}
              className="flex-shrink-0 bg-white p-3 rounded-md text-black dark:bg-black dark:text-white"
            >
              <div className="flex justify-between items-center mb-3 gap-6">
                <p className="text-sm">{match.sportName}</p>
                {match.isRunning ? (
                  <div className="flex items-center gap-1">
                    <span className="p-1 rounded-full bg-sky-700 animate-pulse dark:bg-white" />
                    <p className="text-sky-700 text-sm dark:text-white">
                      Live now
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-gray-500 gap-1">
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
              <div className="flex text-sm text-gray-500 gap-1 items-center mt-1 dark:text-gray-300">
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
