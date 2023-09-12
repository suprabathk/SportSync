import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";

const LiveGames = React.lazy(() => import("./sections/LiveGames"));
const LiveNews = React.lazy(() => import("./sections/LiveNews"));

const Dashboard = () => {
  return (
    <>
      <div className="pl-4 sm:pl-6 lg:pl-8 py-6 bg-sky-700 dark:bg-black">
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading...</div>}
          >
            <LiveGames />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white dark:bg-black">
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading...</div>}
          >
            <LiveNews />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Dashboard;
