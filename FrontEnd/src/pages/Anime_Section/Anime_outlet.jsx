import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Anime_Header from "./Anime_Header";

const Anime_outlet = () => {
  const Navigate = useNavigate();
  const Tabs = [
    { TabName: "All", Link: "" },
    { TabName: "Anime List", Link: "anime" },
    { TabName: "Manga List", Link: "manga" },
    { TabName: "LN List", Link: "lightnovel" },
    { TabName: "Movie List", Link: "movie" },
    { TabName: "Fav Characters", Link: "chars" },
    { TabName: "Couples & Duos", Link: "coplsDuo" },
    { TabName: "Drama List", Link: "drama" },
  ];

  return (
    // <div className='bg-anime-bg px-[10px] pt-[30px] sm:px-[50px] sm:pt-[80px] text-white min-h-screen w-full h-full'>
    <div className="bg-anime-bg  text-white min-h-screen w-full h-full font-over">
      <Anime_Header />

      {/* Tabs */}
      <div className="overflow-scroll w-full flex justify-between items-center py-8 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 gap-x-8 px-2">
        {Tabs?.map((Data, idx) => (
          // <button
          //   className="relative px-10 py-5 text-xl font-semibold cursor-pointer 
          //       backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl
          //       transition-all duration-500 hover:bg-white/10 hover:border-white/20
          //       hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20
          //       group overflow-hidden text-nowrap"
          //   key={idx}
          //   onClick={() => Navigate(Data?.Link)}
          // >
          <button
  className="
    relative cursor-pointer font-semibold
    backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl
    transition-all duration-500
    hover:bg-white/10 hover:border-white/20 hover:scale-105
    hover:shadow-2xl hover:shadow-purple-500/20
    group overflow-hidden text-nowrap
     min-w-fit
    px-5 py-3 text-sm
    sm:px-7 sm:py-4 sm:text-base
    md:px-9 md:py-5 md:text-lg
  "
  onClick={() => Navigate(Data?.Link)}
            key={idx}
>

            {/* Shine effect */}
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r 
                      from-transparent via-white/20 to-transparent 
                      group-hover:translate-x-full transition-transform duration-1000"
            />

            {/* Inner glow */}
            <span
              className="absolute inset-0 rounded-2xl 
                      group-hover:shadow-[inset_0_0_20px_rgba(168,85,247,0.3)] 
                      transition-shadow duration-300"
            />

            {/* Text with gradient */}
            <span
              className="relative z-10 text-transparent bg-clip-text 
                      bg-gradient-to-r from-gray-300 via-white to-gray-300
                      group-hover:from-white group-hover:via-purple-200 group-hover:to-white"
            >
              {Data?.TabName}
            </span>
          </button>
        ))}
      </div>
      <div className="p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Anime_outlet;
