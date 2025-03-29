export type Fetch = {
  requestType: "trending" | "top_rated" | "search";
  type?: "movie" | "tv";
  time?: "week" | "day";
};
