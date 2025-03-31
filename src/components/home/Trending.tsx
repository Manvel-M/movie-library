import { useState } from "react";
import MediaCard from "../ui/MediaCard";
import { useFetchData } from "@/hooks/useFetch";
import { Button } from "../ui/button";
import LoadingCard from "../LoadingCard";

function Trending() {
  const [mediaType, setMediaType] = useState<"movie" | "tv">("tv");
  const [time, setTime] = useState<"week" | "day">("week");

  const { data, isFetching, isError, error } = useFetchData({
    requestType: "trending",
    type: mediaType,
    time: time,
  });

  if (isError) return `Error: ${error.message}`;
  const movies = data?.results.filter((_, idx) => idx < 10);
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

  const loadingSkeletons = Array(10)
    .fill(null)
    .map(() => <LoadingCard />);
  return (
    <section className="max-w-[1440px] mx-auto px-5">
      <div className="flex justify-between items-center py-4">
        <h2>
          TRENDING {mediaType === "movie" ? "MOVIES" : "TV"}{" "}
          {time === "day" ? "TODAY" : "THIS WEEK"}
        </h2>
        <div>
          <Button variant="left" disabled={time === "day"} onClick={handleTime}>
            Today
          </Button>
          <Button
            variant="right"
            disabled={time === "week"}
            onClick={handleTime}
          >
            Week
          </Button>
        </div>
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
      </div>
      <div className="flex justify-center flex-wrap gap-3">
        {isFetching ? loadingSkeletons : renderMedia}
      </div>
    </section>
  );
}

export default Trending;
