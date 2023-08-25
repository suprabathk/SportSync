import { API_ENDPOINT } from "../../config/constants";
import { MatchPreview, UserPreferences } from "../../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchMatches = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  const userPreferences: UserPreferences = JSON.parse(localStorage.getItem("userData") ?? "").preferences;

  try {
    dispatch({ type: "FETCH_MATCHES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    const filteredBySportData = data.matches.filter((match: MatchPreview)=>userPreferences.sports.includes(match.sportName));
    const filteredByTeamsData = filteredBySportData.filter((match: MatchPreview) => {
      let flag = false;
      for (let team of match.teams) {
        if (userPreferences.teams.includes(team.id)) {
          flag = true;
          break;
        }
      }
      return userPreferences.teams.length === 0 || flag;
    })

    dispatch({ type: "FETCH_MATCHES_SUCCESS", payload: filteredByTeamsData.reverse() });
  } catch (error) {
    console.log("Error fetching matches:", error);
    dispatch({
      type: "FETCH_MATCHES_FAILURE",
      payload: "Unable to load matches",
    });
  }
};
