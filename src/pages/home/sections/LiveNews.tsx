import { ArticlePreview } from "../../../types/types";
import { useArticlesState } from "../../../context/articles/context";
import { Link } from "react-router-dom";

const LiveNews = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state: any = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;

  return (
    <div>
      <p className="font-bold text-xl mb-3">Live News</p>
      {isError && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex flex-col md:grid-cols-2 sm:grid-cols-1 gap-2 rounded-md">
        {isLoading &&
          [...Array(5).keys()].map((id) => (
            <div
              key={id}
              className={`flex rounded-lg w-full bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow h-24 animate-pulse duration-75`}
            />
          ))}
        {articles &&
          articles.map((article: ArticlePreview) => (
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
                <p className="text-xs text-neutral-500">{article.sport.name}</p>
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
