import { useFetchTrending } from "@/hooks/useFetch";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data, isPending, isFetching } = useFetchTrending({
    requestType: "trending",
    type: "movie",
    time: "day",
  });
  if (isFetching || isPending) return ".............";
  console.log(data);
  return <div>Home</div>;
}

export default Index;
