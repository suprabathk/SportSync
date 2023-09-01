import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { Sport, Team, UserPreferences } from "../../types/types";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { useArticlesDispatch } from "../../context/articles/context";
import { useMatchesDispatch } from "../../context/matches/context";
import { useSportsDispatch } from "../../context/sports/context";
import { useTeamsDispatch } from "../../context/teams/context";
import { fetchArticles } from "../../context/articles/actions";
import { fetchMatches } from "../../context/matches/actions";
import { fetchSports } from "../../context/sports/actions";
import { fetchTeams } from "../../context/teams/actions";
import { ThemeContext } from "../../context/theme";

const PreferencesModal = () => {
  const { theme } = useContext(ThemeContext);
  const [sports, setSports] = useState<Sport[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    sports: [],
    teams: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const matchesDispatch = useMatchesDispatch();
  const articlesDispatch = useArticlesDispatch();
  const sportsDispatch = useSportsDispatch();
  const teamsDispatch = useTeamsDispatch();

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const token = localStorage.getItem("authToken") ?? "";

  const fetchAllTeams = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/teams`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.log("Error fetching teams:", error);
    }
  };

  const fetchAllSports = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/sports`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSports(data.sports);
    } catch (error) {
      console.log("Error fetching sports:", error);
    }
  };

  const toggleSport = (sport: string) => {
    if (userPreferences.sports.includes(sport)) {
      setUserPreferences((userPreferences) => {
        return {
          ...userPreferences,
          sports: userPreferences.sports.filter(
            (activeSport) => activeSport !== sport
          ),
        };
      });
    } else {
      setUserPreferences((userPreferences) => {
        return {
          ...userPreferences,
          sports: [...userPreferences.sports, sport],
        };
      });
    }
  };

  const toggleTeam = (team: number) => {
    if (userPreferences.teams.includes(team)) {
      setUserPreferences((userPreferences) => {
        return {
          ...userPreferences,
          teams: userPreferences.teams.filter(
            (activeTeam) => activeTeam !== team
          ),
        };
      });
    } else {
      setUserPreferences((userPreferences) => {
        return {
          ...userPreferences,
          teams: [...userPreferences.teams, team],
        };
      });
    }
  };

  const fetchPreferences = async () => {
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUserPreferences(
      Object.keys(data.preferences).includes("sports") &&
        Object.keys(data.preferences).includes("teams")
        ? data.preferences
        : {
            sports: [],
            teams: [],
          }
    );
    setIsOpen(true);
  };

  const updatePreferences = async () => {
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        preferences: userPreferences,
      }),
    });
    const data = await response.json();
    const userData = localStorage.getItem("userData") ?? "";
    const userDataJSON = JSON.parse(userData);
    const updatedUserData = {
      ...userDataJSON,
      preferences: data.preferences,
    };
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    fetchMatches(matchesDispatch);
    fetchArticles(articlesDispatch);
    fetchSports(sportsDispatch);
    fetchTeams(teamsDispatch);
    navigate("/");
  };

  useEffect(() => {
    fetchAllSports();
    fetchAllTeams();
    fetchPreferences();
  }, []);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div
            className={`fixed inset-0 overflow-y-auto ${
              theme === "dark" && "dark"
            }`}
          >
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-sky-700 text-white p-6 text-left align-middle shadow-xl transition-all dark:bg-white dark:text-black dark:border dark:border-neutral-600">
                  <div className="flex justify-between items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold leading-6 mb-2"
                    >
                      Preferences
                    </Dialog.Title>
                    <button
                      onClick={updatePreferences}
                      className="bg-white dark:bg-black rounded-md px-2 py-1 text-sky-700 dark:text-neutral-100 flex items-center gap-1"
                    >
                      <BookmarkIcon className="h-4 w-4" />
                      <span className="font-semibold">Save</span>
                    </button>
                  </div>
                  <p className="mb-4 text-sm">
                    Select your favourite sports and teams for tailored feed.
                  </p>
                  <div className="mt-4 bg-white -m-6 p-6 text-black dark:bg-black dark:text-white">
                    <p className="font-medium text-lg mb-1">
                      Select your favorite sports
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      {sports.map((sport: Sport) =>
                        userPreferences.sports.includes(sport.name) ? (
                          <div
                            onClick={() => toggleSport(sport.name)}
                            key={sport.id}
                            className="select-none flex-shrink-0 cursor-pointer flex items-center gap-1 bg-sky-700 dark:bg-white rounded-lg px-2 py-1 text-white dark:text-black text-sm"
                          >
                            <span className="bg-white rounded-full p-1.5 dark:bg-black" />
                            <span>{sport.name}</span>
                          </div>
                        ) : (
                          <div
                            onClick={() => toggleSport(sport.name)}
                            key={sport.id}
                            className="select-none flex-shrink-0 cursor-pointer flex items-center gap-1 border border-sky-600 dark:border-neutral-200 rounded-lg px-2 py-1 text-sky-700 dark:text-neutral-200 text-sm"
                          >
                            <span className="bg-sky-700 rounded-full p-1.5 dark:bg-neutral-200" />
                            <span>{sport.name}</span>
                          </div>
                        )
                      )}
                    </div>
                    <p className="font-medium text-lg mb-1">
                      Select your favorite teams
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      {teams
                        .filter(
                          (team: Team) =>
                            userPreferences.sports.length === 0 ||
                            userPreferences.sports.includes(team.plays ?? "")
                        )
                        .map((team: Team) =>
                          userPreferences.teams.includes(team.id) ? (
                            <div
                              onClick={() => toggleTeam(team.id)}
                              key={team.id}
                              className="select-none flex-shrink-0 cursor-pointer flex items-center gap-1 bg-sky-700 dark:bg-white rounded-lg px-2 py-1 text-white dark:text-black text-sm"
                            >
                              <span className="bg-white rounded-full p-1.5 dark:bg-black" />
                              <span>{team.name}</span>
                            </div>
                          ) : (
                            <div
                              onClick={() => toggleTeam(team.id)}
                              key={team.id}
                              className="select-none flex-shrink-0 cursor-pointer flex items-center gap-1 border border-sky-600 dark:border-neutral-200 rounded-lg px-2 py-1 text-sky-700 dark:text-neutral-200 text-sm"
                            >
                              <span className="bg-sky-700 rounded-full p-1.5 dark:bg-neutral-200" />
                              <span>{team.name}</span>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PreferencesModal;
