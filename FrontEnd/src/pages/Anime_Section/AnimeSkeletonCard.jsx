// const AnimeSkeletonCard = () => {
//   return (
//     <div className="flex flex-col items-center gap-3  border-white/20">
      
//       {/* Image Skeleton */}
//       <div className="w-96 h-[400px] rounded-xl bg-white/20 border border-white/10 animate-pulse" />

//       {/* Title Skeleton */}
//       <div className="h-5 w-40 bg-white/20 rounded-md animate-pulse" />
      
//     </div>
//   );
// };

// export default AnimeSkeletonCard;


import React from "react";

const AnimeSkeletonCard = () => {
  return (
    <div className="group flex flex-col gap-3">
      {/* Image Skeleton with shimmer effect */}
      <div className="relative w-full aspect-[3/4] rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" 
             style={{
               animation: 'shimmer 2s infinite',
               backgroundSize: '200% 100%'
             }} />
      </div>

      {/* Title Skeleton */}
      <div className="space-y-2 px-2">
        <div className="h-5 w-3/4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-md animate-pulse" />
        {/* <div className="h-4 w-1/2 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-md animate-pulse" /> */}
      </div>
    </div>
  );
};
export default AnimeSkeletonCard;
