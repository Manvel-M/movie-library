import { useState } from "react";
import MediaCard from "../ui/MediaCard";
import { useFetchData } from "@/hooks/useFetch";
import { Button } from "../ui/button";
import LoadingCard from "../LoadingCard";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Menu } from "lucide-react";
import { Switch } from "../ui/switch";

function Trending() {
  const [mediaType, setMediaType] = useState<"movie" | "tv">("tv");
  const [time, setTime] = useState<"week" | "day">("week");

  const { data, isFetching, isError, error } = useFetchData({
    requestType: "trending",
    type: mediaType,
    time: time,
  });

  if (isError) return `Error: ${error.message}`;
  const movies = data?.results.filter((_, idx) => idx < 20);
  const renderMedia = movies?.map((media) => {
    if (mediaType === "movie" && "title" in media) {
      return <MediaCard key={media.id} media={media} mediaType={mediaType} />;
    }
    if (mediaType === "tv" && "name" in media) {
      return <MediaCard key={media.id} media={media} mediaType={mediaType} />;
    }
  });

  function handleTime() {
    setTime((previous) => (previous === "day" ? "week" : "day"));
  }
  function handleMediaType() {
    setMediaType((previous) => (previous === "movie" ? "tv" : "movie"));
  }

  const loadingSkeletons = Array(20)
    .fill(null)
    .map(() => <LoadingCard />);
  return (
    <section className="max-w-[1440px] mx-auto ">
      <div className="flex justify-between items-center py-4 px-5">
        <h2 className="text-center">
          TRENDING {mediaType === "movie" ? "MOVIES" : "TV"}{" "}
          {time === "day" ? "TODAY" : "THIS WEEK"}
        </h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40">
            <div className="flex items-center justify-between text-sm">
              <Button
                variant="left"
                size="fixed"
                disabled={time === "day"}
                onClick={handleTime}
              >
                Today
              </Button>
              <Button
                variant="right"
                size="fixed"
                disabled={time === "week"}
                onClick={handleTime}
              >
                Week
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant="left"
                size="fixed"
                disabled={mediaType === "movie"}
                onClick={handleMediaType}
              >
                Movie
              </Button>
              <Button
                variant="right"
                size="fixed"
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
  );
}

export default Trending;
