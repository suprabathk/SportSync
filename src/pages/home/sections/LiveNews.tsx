import { ArticlePreview, Sport } from "../../../types/types";
import { useArticlesState } from "../../../context/articles/context";
import { Link } from "react-router-dom";
import { useSportsState } from "../../../context/sports/context";
import { useState } from "react";

const LiveNews = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const articlesState: any = useArticlesState();
  const sportsState: any = useSportsState();
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

  const [activeSports, setActiveSports] = useState<number[]>([]);

  const toggleSport = (sport: number) => {
    if (activeSports.includes(sport)) {
      setActiveSports((activeSports) =>
        activeSports.filter((activeSport) => activeSport !== sport)
      );
    } else {
      setActiveSports((activeSports) => [...activeSports, sport]);
    }
  };

  return (
    <div>
      <p className="font-bold text-xl mb-3">Live News</p>
      <div className="mb-4">
        <p className="text-md font-semibold mb-1">Filter by sport:</p>
        <div className="flex gap-2 items-center mb-3">
          {sports.map((sport: Sport) => {
            if (activeSports.includes(sport.id)) {
              return (
                <div
                  onClick={() => toggleSport(sport.id)}
                  className="cursor-pointer flex items-center gap-1 bg-sky-700 rounded-lg px-2 py-1 text-white text-sm"
                >
                  <span className="bg-white rounded-full p-1.5" />
                  <span>{sport.name}</span>
                </div>
              );
            } else {
              return (
                <div
                  onClick={() => toggleSport(sport.id)}
                  className="cursor-pointer flex items-center gap-1 border border-sky-600 rounded-lg px-2 py-1 text-sky-700 text-sm"
                >
                  <span className="bg-sky-700 rounded-full p-1.5" />
                  <span>{sport.name}</span>
                </div>
              );
            }
          })}
        </div>
      </div>
      {isArticlesError && (
        <p className="text-red-500">{articlesErrorMessage}</p>
      )}
      {isSportsError && <p className="text-red-500">{sportsErrorMessage}</p>}
      <div className="flex flex-col md:grid-cols-2 sm:grid-cols-1 gap-2 rounded-md">
        {isArticlesLoading &&
          [...Array(5).keys()].map((id) => (
            <div
              key={id}
              className={`flex rounded-lg w-full bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow h-24 animate-pulse duration-75`}
            />
          ))}
        {articles &&
          articles
            .filter(
              (article: ArticlePreview) =>
                activeSports.length === 0 ||
                activeSports.includes(article.sport.id)
            )
            .map((article: ArticlePreview) => (
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
            ))}
      </div>
    </div>
  );
};

export default LiveNews;
