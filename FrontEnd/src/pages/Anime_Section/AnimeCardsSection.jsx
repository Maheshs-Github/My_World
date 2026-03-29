import React from "react";
import AnimeSkeletonCard from "./AnimeSkeletonCard";
import { useNavigate } from "react-router-dom";

// const AnimeCardsSection = ({ handleAnimeDetails, Data1, initialLoading,fetchingMore }) => {
//   return (
//     <div>
//       <div className="grid grid-cols-3 py-10 px-4 gap-8">

//           {Data1?.map((Data, idx) => {
//               return (
//                 <div
//                   key={`${Data.Title}-${idx}`}
//                   onClick={() => handleAnimeDetails(Data)}
//                   className="cursor-pointer flex flex-col gap-2 items-center"
//                 >
//                   <img
//                     src={Data.Image}
//                     alt={Data.Title}
//                     className="object-cover w-96 h-[400px] border rounded"
//                   />
//                   <h2 className="text-center font-semibold text-lg hover:text-secondary">
//                     {Data.Title}
//                   </h2>
//                 </div>
//               );
//             })}
//            {fetchingMore && Array.from({ length: 3 }).map((_, i) => (
//               <AnimeSkeletonCard key={i} />
//             ))}
//       </div>
//     </div>
//   );
// };

// export default AnimeCardsSection;


const AnimeCardsSection = ({ handleAnimeDetails, Data1, initialLoading, fetchingMore }) => {
//   const Navigate=useNavigate();
// const handleAnimeDetails=(Data)=>{
//   Navigate("anime_details",Data)
// }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Data1?.map((Data, idx) => (
            <div
              key={`${Data.Title}-${idx}`}
              onClick={() => handleAnimeDetails(Data)}
              className="group cursor-pointer flex flex-col gap-3 transform transition-all duration-300 hover:scale-105"
            >
              {/* Image Container with Hover Effects */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                
                <img
                  src={Data.Image}
                  alt={Data.Title}
                  className="w-full aspect-[3/4] object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Hover Overlay with Details */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-gradient-to-t from-black/90 to-transparent p-3 rounded-lg backdrop-blur-sm">
                    <p className="text-white/90 text-sm font-medium line-clamp-2">
                      Click to view details
                    </p>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </div>

              {/* Title Section */}
              <div className="px-2">
                <h2 className="text-white text-center font-semibold text-lg leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
                  {Data.Title}
                </h2>
              </div>
            </div>
          ))}
          
          {/* Loading Skeletons */}
          {fetchingMore && Array.from({ length: 3 }).map((_, i) => (
            <AnimeSkeletonCard key={`skeleton-${i}`} />
          ))}
        </div>

        {/* Loading State Message */}
        {/* {fetchingMore && (
          <div className="text-center mt-8">
            <p className="text-white/60 text-sm animate-pulse">Loading more anime...</p>
          </div>
        )} */}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimeCardsSection;