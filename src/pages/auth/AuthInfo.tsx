import React from "react";
import MatchDay from "../../assets/illustrations/MatchDay.svg";

const AuthInfo: React.FC = () => {
  return (
    <div className="bg-sky-600 px-24 py-24 flex flex-col text-white gap-2 items-center">
      <span className="bg-white rounded-full w-fit text-sky-600 px-2 py-1 text-xs self-start">
        Games, Matches and more
      </span>
      <h3 className="text-3xl font-semibold">
        Delivering sports news around the globe.
      </h3>
      <p className="font-light text-sm">
        Get the live scores and latest news about Cricket, Football and all your
        favorite sports.
      </p>
      <img src={MatchDay} alt="Illustration" className="w-96 h-96" />
    </div>
  );
};

export default AuthInfo;
