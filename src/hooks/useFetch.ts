import { fetchHomeData } from "@/api/fetchHomeData";
import { Fetch } from "@/types/fetch";
import { useQuery } from "@tanstack/react-query";

export const useFetchData = ({ requestType, type, time }: Fetch) => {
  return useQuery({
    queryKey: [`${type}Trending`, { requestType, type, time }],
    queryFn: () => fetchHomeData({ requestType, type, time }),
    staleTime: 60 * 1000 * 30,
  });
};
