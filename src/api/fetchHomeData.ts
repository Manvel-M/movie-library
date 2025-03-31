import { Fetch, SearchResult } from "@/types/fetch";

export const fetchHomeData = async (params: Fetch) => {
  const URL = "https://movie-library-worker.mnoker.workers.dev";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  };

  try {
    const resp = await fetch(URL, options);
    if (!resp) {
      throw new Error("Failed to fetch data");
    }
    const data: SearchResult = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
