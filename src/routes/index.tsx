import AiringToday from "@/components/home/AiringToday";
import TopRated from "@/components/home/TopRated";
import Trending from "@/components/home/Trending";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Trending />
      <TopRated />
      <AiringToday />
    </>
  );
}

export default Index;
