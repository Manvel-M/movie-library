import { Movie, TV } from "@/types/fetch";
type MediaCardProps =
  | { media: Movie; mediaType: "movie" }
  | { media: TV; mediaType: "tv" };

function MediaCard({ media, mediaType }: MediaCardProps) {
  return (
    <div className="flex-none min-lg:w-[230px] min-lg:h-[410px] h-[330px] w-[180px] bg-card rounded-md flex flex-col">
      <img
        className="rounded-t-md object-cover min-lg:h-[345px] h-[270px]"
        src={`https://image.tmdb.org/t/p/w342/${media.poster_path}`}
        alt=""
      />
      <div className="flex-1 flex flex-col justify-evenly">
        <p className="px-3 text-sm line-clamp-1">
          {mediaType === "movie" ? media.title : media.name}
        </p>
        <p className="px-3 text-xs opacity-60">
          {mediaType === "movie"
            ? media.release_date.split("-")[0]
            : media.first_air_date.split("-")[0]}
        </p>
      </div>
    </div>
  );
}

export default MediaCard;
