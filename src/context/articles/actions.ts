import { API_ENDPOINT } from "../../config/constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchArticles = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_ARTICLES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    dispatch({ type: "FETCH_ARTICLES_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching articles:", error);
    dispatch({
      type: "FETCH_ARTICLES_FAILURE",
      payload: "Unable to load articles",
    });
  }
};
