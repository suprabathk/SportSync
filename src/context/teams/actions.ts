import { API_ENDPOINT } from "../../config/constants";
import { Team, UserPreferences } from "../../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchTeams = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  const userPreferences: UserPreferences = JSON.parse(localStorage.getItem("userData") ?? "").preferences;

  try {
    dispatch({ type: "FETCH_TEAMS_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const filteredByTeamData = data.filter((team: Team)=>userPreferences.teams.includes(team.id));

    dispatch({ type: "FETCH_TEAMS_SUCCESS", payload: filteredByTeamData });
  } catch (error) {
    console.log("Error fetching teams:", error);
    dispatch({
      type: "FETCH_TEAMS_FAILURE",
      payload: "Unable to load teams",
    });
  }
};
