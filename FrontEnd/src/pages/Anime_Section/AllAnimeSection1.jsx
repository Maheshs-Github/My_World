import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimeSkeletonCard from "./AnimeSkeletonCard";
import Icons from "../../Icons/Icons";
import { useNavigate } from "react-router-dom";

const AllAnimeSection1 = () => {
  const SECTIONS_DATA = [
    {
      id: "romance-school",
      title: "Romance-School (Slice Of Life)",
      anime: [
        "Oregairu",
        "ReLIFE",
        "Tsurezure Children",
        "Horimiya",
        "Boarding School Juliet",
        "Komi San",
        "3D Girlfriend",
        "When Ayumu Will Make His Move",
        "Loving Yamada-kun",
        "Kubo Won't Let Me Be Invisible",
        "Rascal Does Not Dream of Bunny Girl Senpai",
        "From Me to You",
        "Tonikawa: Over the Moon for You",
        "Golden Time",
        "Tsuki ga Kirei",
        "Nisekoi",
        "Your Lie in April",
        "Clannad",
        "Toradora",
        "Kaguya-sama: Love Is War",
        "Ao Haru Ride",
        "Domestic Girlfriend",
        "Kokoro Connect",
        "Insomniacs After School",
        "Shikimori-san",
        "Masamune-kun's Revenge",
        "Maid Sama",
        "My Little Monster",
        "Wolf Girl & Black Prince",
        "Tamako Market",
        "Koikimo",
      ],
    },
    {
      id: "romance-fantasy",
      title: "Romance - Fantasy",
      anime: [
        "My Bride is a Mermaid",
        "A Lull in the Sea",
        "Snow White with the Red Hair",
        "The World is Still Beautiful",
        "Maoyuu: Archenemy & Hero",
        "Banished from the Hero's Party",
        "Our Last Crusade or the Rise of a New World",
        "Gosick",
        "Romeo x Juliet",
        "Yona of the Dawn",
        "The Duke of Death and His Maid",
      ],
    },
  ];

  const [sectionData, setSectionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const fetchSectionData = async (section) => {
    try {
      const SectionId = section?.id;
      setLoading(true);

      const responses = await Promise.all(
        section?.anime
          ?.slice(0, 4)
          ?.map((name) =>
            axios.get(
              `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
                name
              )}&page[limit]=1`
            )
          )
      );

      // Transform the data
      const newAnime = responses
        .map((res) => res.data.data[0]?.attributes)
        .filter(Boolean)
        .map((a) => ({
          Title: a.canonicalTitle,
          Image: a.posterImage?.original,
          CoverImage: a.coverImage,
          Episodes: a.episodeCount,
          Date: a.startDate,
          Score: a.averageRating,
        }));

      setSectionData((prev) => ({ ...prev, [section?.title]: newAnime }));
    } catch (err) {
      console.error("Error fetching anime:", err);
    } finally {
      // setTimeout(()=>
      // {
        setLoading(false);
      // },5000)
    }
  };
const handleViewAll=(key)=>{
  const Data=SECTIONS_DATA.filter((Data)=>Data?.title===key)
  console.log("Data Nav: ",Data)
navigate("all",{state:{Data}})
}
  useEffect(
    () => SECTIONS_DATA.forEach((section) => fetchSectionData(section)),
    []
  );
  return (
    <>
      {/* {console.log("Section Data: ", sectionData)}

      {/* {Object.keys(sectionData).map(Anime=>console.log("Anime: ",Anime))} */}
      {/* {Object.values(sectionData).map((Anime) => console.log("Anime: ", Anime))} */} 

      {/* <> */}
        {/* {SECTIONS_DATA?.map((Data, idx) => (
          <div className="flex justify-between" key={idx}>
            <h2>{Data?.title}</h2>
            <span className="flex flex-row gap-2 items-center">
              View All
              <Icons.RightArrow size={30} />
            </span>
          </div>
        ))} */}
        {/* <div className="grid grid-cols-4 py-10 px-4 gap-8"> */}
          {/* {SECTIONS_DATA?.map((Data, idx) => (
          <div className="flex justify-between" key={idx}>
            <h2>{Data?.title}</h2>
            <span className="flex flex-row gap-2 items-center">
              View All
              <Icons.RightArrow size={30} />
            </span>
          </div>
        ))} */}
        {/* for (const [key,values] of Object.entries(sect))  */}
          {/* { Object.values(sectionData).map((Data1, idx1) =>{ */}
        { Object.entries(sectionData).map(([key,values])=>{

              return(
                <div key={key}>
                {/* {console.log("D!: ",Data1)} */}
                {console.log("sectionData: ",sectionData)}
                {/* {SECTIONS_DATA?.map((Data, idx) => ( */}
                  {/* // <div> */}
          <div className="flex justify-between">
            {/* {console.log("Data: ",Data)} */}
            <h2>{key}</h2>
            <button className="flex flex-row gap-2 items-center cursor-pointer hover:scale-105" onClick={()=>handleViewAll(key)}>
              View All
              <Icons.RightArrow size={30} />
            </button>
          </div>
        {/* ))} */}
        <div className="grid grid-cols-4 py-10 px-4 gap-8">
                {!loading ? values?.map((Data, idx) => {
                  return (
                    <div
                      key={`${Data.Title}-${idx}`}
                      onClick={() => handleAnimeDetails(Data)}
                      className="cursor-pointer flex flex-col gap-2 items-center"
                    >
                      <img
                        src={Data.Image}
                        alt={Data.Title}
                        className="object-cover w-96 h-[400px] border rounded"
                      />
                      <h2 className="text-center font-semibold text-lg hover:text-secondary">
                        {Data.Title}
                      </h2>
                    </div>
                  );
                }):( Array.from({ length: 4 }).map((_, i) => (
                <AnimeSkeletonCard key={i} />
              )))}
                </div>
                {/* </div>))} */}
                </div>
                  )
                  }
              )
            }
        {/* </div> */}

        {/* {loading && (
          <div className="grid grid-cols-4 gap-8 px-4 pb-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <AnimeSkeletonCard key={i} />
            ))}
          </div>
        )} */}
      {/* </> */}
    </>
  );
};

export default AllAnimeSection1;



// All Anime List Fav Anime List Manga List, LN List , Fav Chars , Fav Couples 