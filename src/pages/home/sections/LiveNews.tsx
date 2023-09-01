/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArticlePreview, Sport, Team } from "../../../types/types";
import { useArticlesState } from "../../../context/articles/context";
import { Link } from "react-router-dom";
import { useSportsState } from "../../../context/sports/context";
import { useState } from "react";
import { useTeamsState } from "../../../context/teams/context";

const LiveNews = () => {
  const articlesState: any = useArticlesState();
  const sportsState: any = useSportsState();
  const teamsState: any = useTeamsState();
  const {
    articles,
    isLoading: isArticlesLoading,
    isError: isArticlesError,
    errorMessage: articlesErrorMessage,
  } = articlesState;
  const {
    sports,
    isError: isSportsError,
    errorMessage: sportsErrorMessage,
  } = sportsState;
  const {
    teams,
    isError: isTeamsError,
    errorMessage: teamsErrorMessage,
  } = teamsState;

  const [activeSports, setActiveSports] = useState<string[]>([]);
  const [activeTeams, setActiveTeams] = useState<number[]>([]);

  const toggleSport = (sport: string) => {
    if (activeSports.includes(sport)) {
      setActiveSports((activeSports) =>
        activeSports.filter((activeSport) => activeSport !== sport)
      );
    } else {
      setActiveSports((activeSports) => [...activeSports, sport]);
    }
  };

  const toggleTeam = (team: number) => {
    if (activeTeams.includes(team)) {
      setActiveTeams((activeTeams) =>
        activeTeams.filter((activeTeam) => activeTeam !== team)
      );
    } else {
      setActiveTeams((activeTeams) => [...activeTeams, team]);
    }
  };

  return (
    <div>
      <p className="font-bold text-2xl mb-1">Live News</p>
      <div className="mb-1 custom-scrollbar -mr-4 sm:-mr-6 lg:-mr-8">
        <p className="text-md font-medium mb-1">Filter by sport:</p>
        <div className="overflow-x-auto flex gap-2 items-center mb-1 pb-1">
          {sports.map((sport: Sport) =>
            activeSports.includes(sport.name) ? (
              <div
                onClick={() => toggleSport(sport.name)}
                key={sport.id}
                className="flex-shrink-0 cursor-pointer flex items-center gap-1 bg-sky-700 rounded-lg px-2 py-1 text-white text-sm"
              >
                <span className="bg-white rounded-full p-1.5" />
                <span>{sport.name}</span>
              </div>
            ) : (
              <div
                onClick={() => toggleSport(sport.name)}
                key={sport.id}
                className="flex-shrink-0 cursor-pointer flex items-center gap-1 border border-sky-600 rounded-lg px-2 py-1 text-sky-700 text-sm"
              >
                <span className="bg-sky-700 rounded-full p-1.5" />
                <span>{sport.name}</span>
              </div>
            )
          )}
        </div>
      </div>
      <div className="mb-4 custom-scrollbar -mr-4 sm:-mr-6 lg:-mr-8">
        <p className="text-md font-medium mb-1">Filter by team:</p>
        <div className="flex gap-2 items-center mb-3 overflow-x-auto pb-1">
          {teams
            .filter(
              (team: Team) =>
                activeSports.length === 0 ||
                activeSports.includes(team.plays ?? "")
            )
            .map((team: Team) =>
              activeTeams.includes(team.id) ? (
                <div
                  onClick={() => toggleTeam(team.id)}
                  key={team.id}
                  className="flex-shrink-0 cursor-pointer flex items-center gap-1 bg-sky-700 rounded-lg px-2 py-1 text-white text-sm"
                >
                  <span className="bg-white rounded-full p-1.5" />
                  <span>{team.name}</span>
                </div>
              ) : (
                <div
                  onClick={() => toggleTeam(team.id)}
                  key={team.id}
                  className="flex-shrink-0 cursor-pointer flex items-center gap-1 border border-sky-600 rounded-lg px-2 py-1 text-sky-700 text-sm"
                >
                  <span className="bg-sky-700 rounded-full p-1.5" />
                  <span>{team.name}</span>
                </div>
              )
            )}
        </div>
      </div>
      {isArticlesError && (
        <p className="text-red-500">{articlesErrorMessage}</p>
      )}
      {isSportsError && <p className="text-red-500">{sportsErrorMessage}</p>}
      {isTeamsError && <p className="text-red-500">{teamsErrorMessage}</p>}
      <div className="flex flex-col md:grid-cols-2 sm:grid-cols-1 gap-2 rounded-md">
        {isArticlesLoading &&
          [...Array(5).keys()].map((id) => (
            <div
              key={id}
              className={`flex rounded-lg w-full bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow h-24 animate-pulse duration-75`}
            />
          ))}
        {articles &&
          (() => {
            const filteredArticles = articles
              .filter(
                (article: ArticlePreview) =>
                  activeSports.length === 0 ||
                  activeSports.includes(article.sport.name)
              )
              .filter((article: ArticlePreview) => {
                let flag = false;
                for (const team of article.teams) {
                  if (activeTeams.includes(team.id)) {
                    flag = true;
                    break;
                  }
                }
                return activeTeams.length === 0 || flag;
              });

            return filteredArticles.length > 0 ? (
              filteredArticles.map((article: ArticlePreview) => (
                <Link
                  to={`/article/${article.id}`}
                  key={article.id}
                  className="flex rounded-lg bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow"
                >
                  <img
                    className="w-32 rounded-l-lg object-cover h-auto"
                    src={article.thumbnail}
                    alt="thumbnail"
                  />
                  <div className="flex flex-col justify-start p-6">
                    <p className="text-xs text-neutral-500">
                      {article.sport.name}
                    </p>
                    <h5 className="mt-2 text-xl font-semibold text-neutral-800">
                      {article.title}
                    </h5>
                    <p className="mb-4 text-sm text-neutral-600">
                      {article.summary}
                    </p>
                    <div className="text-xs text-neutral-500 mb-1">
                      {article.teams.map((team, id) => (
                        <span key={id}>
                          <span>{team.name}</span>
                          {article.teams.length !== id + 1 && " VS "}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-neutral-500">
                      {new Date(article.date).toDateString()}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center my-6">
                <p>You have no updates currently :(</p>
                <p className="text-gray-400">
                  Please comeback later for latest updates about your favorite
                  sports
                </p>
              </div>
            );
          })()}
      </div>
    </div>
  );
};

export default LiveNews;
