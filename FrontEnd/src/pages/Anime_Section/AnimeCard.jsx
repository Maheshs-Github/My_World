import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import DummyImg from "D:/Downloads/dummy-image-grey-e1398449111870.jpg";
import axios from "axios";

const AnimeCard = () => {
  const { state } = useLocation();
  const Data = state.Data;
  {
    console.log("State: ", state);
    console.log("Data: ", Data);
  }
  const [genre, setGenre] = useState([]);
  const [url, setURL] = useState("");
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    const getAnime = async () => {
      try {
        const FetchAnimeData = await axios.get(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(Data.Title)}`
        );

        console.log("Data: ", FetchAnimeData);
        console.log("Genre: ", FetchAnimeData?.data?.data[0]?.genres);
        setGenre(FetchAnimeData?.data?.data[0]?.genres);
        console.log("URL: ", FetchAnimeData?.data?.data[0]?.url);
        setURL(FetchAnimeData?.data?.data[0]?.url);
      } catch (err) {
        console.log("There is been a Error: ", err);
      }
      finally{
        setLoading(false);
      }
    };
    getAnime();
  }, []);
  return (
<>
{!loading?
    <div className="font-Montserrat p-4 bg-anime-bg  text-white pt-20">
      {/* <div
        className="w-full h-72 bg-cover bg-center"
        style={{ backgroundImage: `url(${Data?.CoverImage})` }}
      ></div> */}
      {console.log("Data: ",Data)}
      {console.log("Image: ",Data?.CoverImage)}
         {Data.CoverImage && (
          <div className="w-full h-64 relative">
            <img
              src={Data?.CoverImage}
              alt="cover"
              className="w-full h-full object-cover rounded-b-2xl"
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
          </div>                  
        )}
      <div className="flex gap-10 px-8 ">
        <img src={Data?.Image} alt="" className="h-[650px] rounded-3xl -mt-20 z-10" />
        <div className="p-16 flex flex-col gap-4">
          <h2 className="font-semibold text-3xl">{Data?.Title}</h2>
          {/* <div className="flex gap-4 text-lg font-medium">
          ⭐ <span>{Data.Score || "N/A"}</span>
          📅 <span>{Data.Date || "Unknown"}</span>
            </div> */}
            <div className="flex gap-6 text-lg font-medium flex-wrap">
  <div>⭐ <span>{Data.Score || "N/A"}</span></div>

  <div>📅 <span>{Data.Date || "Unknown"}</span></div>

  {Data.Episodes && (
    <div>📺 <span>{Data.Episodes} Episodes</span></div>
  )}

  {Data.Volumes && (
    <div>📚 <span>{Data.Volumes} Volumes</span></div>
  )}
</div>

          <div className="flex gap-4">
            {genre.map((Data, idx) => {
              return <span key={idx} className="px-4 py-2 text-lg  bg-white/20 backdrop-blur-sm border border-white/30 rounded-full">{Data.name}</span>;
            })}
          </div>
          <a href={url} className="text-URL-Blue font-semibold text-lg" target="_blank">More Info </a>
        </div>
      </div>
    </div>
    
    :<div className="animate-pulse p-4 font-Montserrat bg-anime-bg  text-white">
      <div className="w-full h-64 border-white/20 bg-white/20 rounded-b-2xl"></div>
            <div className="flex gap-10 px-8">
        <div src={Data?.Image} alt="" className="h-[650px] w-[460px] rounded-3xl border-white/20 bg-white/20 -mt-20 z-10" ></div>
        <div className="p-16 flex flex-col gap-5">
          <h2 className="bg-white/20 border-white/20 w-[250px] h-9"></h2>
          <div className="flex gap-4 ">
           <span className="bg-white/20 border-white/20 w-[50px] h-9"></span>
           <span className="bg-white/20 border-white/20 w-[50px] h-9"></span>
           <span className="bg-white/20 border-white/20 w-[100px] h-9"></span>
            </div>
          <div className="flex gap-4">
            {Array.from({length:3}).map((_, idx) => {
              return <span key={idx} className="px-4 py-2 bg-white/20 border-white/20 w-[100px] h-8 rounded-full"></span>;
            })}
          </div>
          <a className="bg-white/20 border-white/20 w-[240px] h-8" > </a>
        </div>
        </div>


    </div>}
    </>
  );
};

export default AnimeCard;
