import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { useMatchesState } from "../../../context/matches/context";
import { MatchDetails, MatchPreview } from "../../../types/types";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/theme";
import { API_ENDPOINT } from "../../../config/constants";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const LiveGames = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state: any = useMatchesState();
  const { theme } = useContext(ThemeContext);
  const { matches, isLoading, isError, errorMessage } = state;

  const previewMatches: MatchPreview[] = matches
    ? matches.slice(0, matches.length > 5 ? 5 : matches.length)
    : [];
  const allMatches: MatchPreview[] =
    matches && matches.length > 5 ? matches.slice(5, matches.length - 1) : [];

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
        {previewMatches.length > 0 &&
          previewMatches.map((match: MatchPreview) => (
            <LiveCard matchID={match.id} />
          ))}
        {allMatches.length > 0 &&
          allMatches.map((match: MatchPreview) => (
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

const LiveCard = ({ matchID }: { matchID: number }) => {
  const [fetchingScores, setFetchingScores] = useState(false);
  const [match, setMatch] = useState<MatchDetails>();

  const fetchMatch = async () => {
    setFetchingScores(true);
    await fetch(`${API_ENDPOINT}/matches/${matchID}`)
      .then((res) => res.json())
      .then((data) => {
        setMatch(data);
        setFetchingScores(false);
      });
  };

  useEffect(() => {
    fetchMatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchID]);

  return match ? (
    <div
      key={match.id}
      className="flex-shrink-0 bg-white p-3 rounded-md text-black dark:bg-black dark:text-white border dark:border-neutral-600"
    >
      <Link to={`/match/${match.id}`}>
        <div className="flex justify-between items-center mb-3 gap-6">
          <p className="text-sm dark:text-neutral-300">{match.sportName}</p>
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
        <div className="flex gap-2 font-semibold">
          <div className="flex items-center gap-2">
            <div
              className={`${
                match?.playingTeam === match?.teams[0].id &&
                "text-sky-700 dark:text-sky-300"
              }`}
            >
              <span className="font-semibold">
                {match?.teams[0].name}:{"  "}
              </span>
              {match?.score[match?.teams[0].name]}
            </div>
          </div>
          <span>VS</span>
          <div className="flex items-center gap-2">
            <div
              className={`${
                match?.playingTeam === match?.teams[1].id &&
                "text-sky-700 dark:text-sky-300"
              }`}
            >
              <span className="font-semibold">
                {match?.teams[1].name}:{"  "}
              </span>
              {match?.score[match?.teams[1].name]}
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-end justify-between">
        <div className="flex text-sm text-gray-500 gap-1 items-center mt-1 dark:text-neutral-300">
          <MapPinIcon className="w-4 h-4" />
          <p>{match.location}</p>
        </div>
        <button onClick={fetchMatch}>
          <ArrowPathIcon
            className={`w-4 h-4 ${
              fetchingScores && "rotate-180"
            } transition-all`}
          />
        </button>
      </div>
    </div>
  ) : (
    <div
      key={matchID}
      className={`flex-shrink-0 bg-white dark:bg-neutral-600 shadow-md p-3 rounded-md h-24 w-60 animate-pulse duration-75`}
    />
  );
};
