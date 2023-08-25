import { API_ENDPOINT } from "../../config/constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchSports = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

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

    dispatch({ type: "FETCH_SPORTS_SUCCESS", payload: data.sports });
  } catch (error) {
    console.log("Error fetching sports:", error);
    dispatch({
      type: "FETCH_SPORTS_FAILURE",
      payload: "Unable to load sports",
    });
  }
};
