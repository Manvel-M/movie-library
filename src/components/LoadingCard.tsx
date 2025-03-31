import { Skeleton } from "./ui/skeleton";

function LoadingCard() {
  return (
    <div className="min-lg:w-[230px] min-lg:h-[410px] h-[330px] w-[180px] bg-card rounded-md flex flex-col">
      <Skeleton className="min-lg:h-[345px] h-[270px] rounded-t-md " />
      <div className="flex-1 flex flex-col justify-evenly">
        <Skeleton className="mx-3 h-5 w-30" />

        <Skeleton className="mx-3 h-4 w-10" />
      </div>
    </div>
  );
}

export default LoadingCard;
