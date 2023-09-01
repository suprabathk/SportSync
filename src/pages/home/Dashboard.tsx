import LiveGames from "./sections/LiveGames";
import LiveNews from "./sections/LiveNews";

const Dashboard = () => {
  return (
    <>
      <div className="pl-4 sm:pl-6 lg:pl-8 py-6 bg-sky-700 dark:bg-black">
        <LiveGames />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-white dark:bg-black">
        <LiveNews />
      </div>
    </>
  );
};

export default Dashboard;
