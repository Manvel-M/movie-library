import { useFetchData } from "@/hooks/useFetch";
import LoadingCard from "../LoadingCard";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import MediaCard from "../ui/MediaCard";

function AiringToday() {
  const { data, isFetching, isError, error } = useFetchData({
    requestType: "airing_today",
  });
  if (isError) return `Error: ${error.message}`;

  const renderMedia = data?.results.map((media) => (
    <MediaCard key={media.id} media={media} mediaType="TV" />
  ));

  const loadingSkeletons = Array(20)
    .fill(null)
    .map((_, idx) => <LoadingCard key={idx} />);

  return (
    <section className="max-w-[1440px] mx-auto">
      <div className="px-5 py-4">
        <h2>AIRING TODAY</h2>
      </div>
      <ScrollArea className="w-full relative pb-4">
        <div className="flex gap-3 px-5">
          {isFetching ? loadingSkeletons : renderMedia}
        </div>
        <ScrollBar orientation="horizontal" className="z-10" />
        <div className="w-15 h-full absolute left-0 top-0 bg-linear-to-l from-background/0 to-background/100 pointer-events-none"></div>
        <div className="w-15 h-full absolute right-0 top-0 bg-linear-to-r from-background/0 to-background/100 pointer-events-none"></div>
      </ScrollArea>
    </section>
  );
}

export default AiringToday;
