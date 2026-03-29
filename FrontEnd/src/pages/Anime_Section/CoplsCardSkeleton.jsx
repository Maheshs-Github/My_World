const AnimeSkeletonCard = () => {
  return (
    <div className="flex flex-col items-center gap-3  border-white/20">
      
      {/* Image Skeleton */}
      <div className="w-96 h-[400px] rounded-xl bg-white/20 border border-white/10 animate-pulse" />

      {/* Title Skeleton */}
      <div className="h-5 w-40 bg-white/20 rounded-md animate-pulse" />
      
    </div>
  );
};

export default AnimeSkeletonCard;
