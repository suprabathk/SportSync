import { ArticlePreview } from "../../../types/types";
import { useArticlesState } from "../../../context/articles/context";

const LiveNews = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state: any = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;

  return (
    <div>
      <p className="font-bold text-xl mb-3">Live News</p>
      {isError && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex flex-col md:grid-cols-2 sm:grid-cols-1 gap-2 rounded-md">
        {articles &&
          articles.map((article: ArticlePreview) => (
            <div className="flex rounded-lg bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow dark:bg-neutral-700">
              <img
                className="w-32 rounded-l-lg object-cover h-auto"
                src={article.thumbnail}
                alt="thumbnail"
              />
              <div className="flex flex-col justify-start p-6">
                <p className="text-xs text-neutral-500 dark:text-neutral-300">
                  {article.sport.name}
                </p>
                <h5 className="mt-2 text-xl font-semibold text-neutral-800 dark:text-neutral-50">
                  {article.title}
                </h5>
                <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-200">
                  {article.summary}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-300">
                  {new Date(article.date).toDateString()}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LiveNews;
