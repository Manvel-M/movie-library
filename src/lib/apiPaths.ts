const BASE_URL = "https://api.themoviedb.org/3/";
export type Trending = {
  type: "movie" | "tv";
  time: "week" | "day";
};
export const trending = ({ type, time }: Trending) => {
  return BASE_URL + `trending/${type}/${time}?language=en-US`;
};

export type TopRated = {
  type: "movie" | "tv";
};

export const topRated = (type: TopRated) => {
  return BASE_URL + `${type}/top_rated?language=en-US`;
};
