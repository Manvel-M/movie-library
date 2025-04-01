import { useFetchData } from "@/hooks/useFetch";
import { useState } from "react";
import MediaCard from "../ui/MediaCard";
import { Button } from "../ui/button";
import LoadingCard from "../LoadingCard";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Menu } from "lucide-react";

function TopRated() {
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");
  const { data, isPending, isFetching, isError, error } = useFetchData({
    requestType: "top_rated",
    type: mediaType,
  });

  if (isError) return `Error: ${error.message}`;

  const topTenMedia = data?.results.filter((_, idx) => idx < 20);
  const renderMedia = topTenMedia?.map((media) => {
    if (mediaType === "movie" && "title" in media) {
      return <MediaCard key={media.id} media={media} mediaType={mediaType} />;
    }
    if (mediaType === "tv" && "name" in media) {
      return <MediaCard key={media.id} media={media} mediaType={mediaType} />;
    }
  });
  function handleMediaType() {
    setMediaType((previous) => (previous === "movie" ? "tv" : "movie"));
  }
  const loadingSkeletons = Array(20)
    .fill(null)
    .map((_, idx) => <LoadingCard key={idx} />);
  return (
    <>
      <section className="max-w-[1440px] mx-auto px-5">
        <div className="flex justify-between items-center py-4">
          <h2>TOP RATED {mediaType === "movie" ? "MOVIES" : "TV"}</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">
              <div>
                <Button
                  variant="left"
                  disabled={mediaType === "movie"}
                  onClick={handleMediaType}
                >
                  Movie
                </Button>
                <Button
                  variant="right"
                  disabled={mediaType === "tv"}
                  onClick={handleMediaType}
                >
                  TV
                </Button>
              </div>
            </PopoverContent>
          </Popover>
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
    </>
  );
}

export default TopRated;
