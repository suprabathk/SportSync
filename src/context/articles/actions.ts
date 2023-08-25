import { API_ENDPOINT } from "../../config/constants";
import { ArticlePreview } from "../../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchArticles = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  const userPreferedSports: string[] = JSON.parse(localStorage.getItem("userData") ?? "").preferences.sports ?? [];
  const userPreferedTeams: number[] = JSON.parse(localStorage.getItem("userData") ?? "").preferences.teams ?? [];

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

    const filteredBySportData = data.filter((article: ArticlePreview)=>userPreferedSports.length===0 || userPreferedSports.includes(article.sport.name));
    const filteredByTeamsData = filteredBySportData.filter((article: ArticlePreview) => {
      let flag = false;
      for (let team of article.teams) {
        if (userPreferedTeams.includes(team.id)) {
          flag = true;
          break;
        }
      }
      return userPreferedTeams.length === 0 || flag;
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
