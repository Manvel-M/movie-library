import { Fetch } from "@/types/fetch";

export const fetchHomeData = async (params: Fetch) => {
  const URL = "http://localhost:8787";
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
    return resp.json();
  } catch (error) {
    console.error(error);
  }
};
