import { API_ENDPOINT } from "../../config/constants";
import { Sport, UserPreferences } from "../../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchSports = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  const userPreferences: UserPreferences = JSON.parse(localStorage.getItem("userData") ?? "").preferences;

  try {
    dispatch({ type: "FETCH_SPORTS_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/sports`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const filteredBySportData = data.sports.filter((sport: Sport)=>userPreferences.sports.includes(sport.name));

    dispatch({ type: "FETCH_SPORTS_SUCCESS", payload: filteredBySportData });
  } catch (error) {
    console.log("Error fetching sports:", error);
    dispatch({
      type: "FETCH_SPORTS_FAILURE",
      payload: "Unable to load sports",
    });
  }
};
