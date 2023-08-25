import { API_ENDPOINT } from "../../config/constants";
import { ArticlePreview, UserPreferences } from "../../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchArticles = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  const userPreferences: UserPreferences = JSON.parse(localStorage.getItem("userData") ?? "").preferences;

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

    const filteredBySportData = data.filter((article: ArticlePreview)=>userPreferences.sports.includes(article.sport.name));
    const filteredByTeamsData = filteredBySportData.filter((article: ArticlePreview) => {
      let flag = false;
      for (let team of article.teams) {
        if (userPreferences.teams.includes(team.id)) {
          flag = true;
          break;
        }
      }
      return userPreferences.teams.length === 0 || flag;
    })

    dispatch({ type: "FETCH_ARTICLES_SUCCESS", payload: filteredByTeamsData });
  } catch (error) {
    console.log("Error fetching articles:", error);
    dispatch({
      type: "FETCH_ARTICLES_FAILURE",
      payload: "Unable to load articles",
    });
  }
};
