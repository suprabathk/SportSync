import { API_ENDPOINT } from "../../config/constants";
import { Team } from "../../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchTeams = async (dispatch: any) => {
  const userPreferedSports: string[] = JSON.parse(localStorage.getItem("userData") ?? JSON.stringify({"preferences":{}})).preferences.sports ?? [];
  const userPreferedTeams: number[] = JSON.parse(localStorage.getItem("userData") ?? JSON.stringify({"preferences":{}})).preferences.teams ?? [];

  try {
    dispatch({ type: "FETCH_TEAMS_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    const filteredByTeamData = data.filter((team: Team)=>userPreferedSports.length===0 || userPreferedSports.includes(team.plays??"") || userPreferedTeams.includes(team.id));

    dispatch({ type: "FETCH_TEAMS_SUCCESS", payload: filteredByTeamData });
  } catch (error) {
    console.log("Error fetching teams:", error);
    dispatch({
      type: "FETCH_TEAMS_FAILURE",
      payload: "Unable to load teams",
    });
  }
};
