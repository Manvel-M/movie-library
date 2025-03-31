import { useFetchData } from "@/hooks/useFetch";
import { useState } from "react";
import MediaCard from "../ui/MediaCard";
import { Button } from "../ui/button";
import LoadingCard from "../LoadingCard";

function TopRated() {
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");
  const { data, isFetching, isError, error } = useFetchData({
    requestType: "top_rated",
    type: mediaType,
  });

  if (isError) return `Error: ${error.message}`;

  const topTenMedia = data?.results.filter((_, idx) => idx < 10);
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
  const loadingSkeletons = Array(10)
    .fill(null)
    .map(() => <LoadingCard />);
  return (
    <>
      <section className="max-w-[1440px] mx-auto px-5">
        <div className="flex justify-between items-center py-4">
          <h2>TOP RATED {mediaType === "movie" ? "MOVIES" : "TV"}</h2>
          <div></div>
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
    </>
  );
}

export default TopRated;
