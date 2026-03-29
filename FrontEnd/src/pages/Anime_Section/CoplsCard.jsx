import React from "react";
import AnimeSkeletonCard from "./AnimeSkeletonCard";

const CoplsCard = ({
  handleAnimeDetails,
  Data1,
  initialLoading,
  fetchingMore,
}) => {
  return (
    <div>
      <div className="flex justify-center items-center py-10 px-4 gap-8">
        {/* {!initialLoading */}
        {/* ? */}
        {Data1?.map((Data, idx) => {
          return (
            <div
              key={`${Data.Title}-${idx}`}
              onClick={() => handleAnimeDetails(Data)}
              className="        cursor-pointer 
        bg-white 
        rounded-3xl 
        p-6 
        flex flex-col items-center gap-4
        shadow-sm 
        hover:shadow-xl 
        transition-all duration-300 ease-out
        max-w-4xl w-full"
            >
              <img
                src={Data.Image}
                alt={Data.Title}
                className=" w-48 h-64 object-cover rounded-2xl
            transition-transform duration-300
            hover:scale-[1.02]"
              />
              <h2 className="text-center font-semibold text-2xl hover:text-secondary">
                {Data.Title}
              </h2>
            </div>
          );
        })}
        {/* {fetchingMore && Array.from({ length: 2 }).map((_, i) => (
              <AnimeSkeletonCard key={i} />
            ))} */}
      </div>
    </div>
  );
};

export default CoplsCard;


