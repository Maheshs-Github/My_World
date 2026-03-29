import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimeCardsSection from "./AnimeCardsSection";
import { useDispatch, useSelector } from "react-redux";
import { setAnime } from "../../../redux/AnimeSlice";
import { useNavigate } from "react-router-dom";

const AnimeList = () => {
  const AnimeData = useSelector((state) => state?.Anime?.Anime);
  const Disptch = useDispatch();
  const Navigate=useNavigate()
  const Anime = [
    "Naruto",
    "Attack On Titan",
    "Frieren: Beyond Journey's End",
    "One Piece",
    "Oregairu",
    "Tensura",
    "Sword Art Online",
    "Relife",
    "Log Horizon",
    "The Rising Of Shield Hero",
    "Toradora",
    "Death Note",
    "Steins Gate",
    "Code Geass",
  ];
  const FetchSize = 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  // const fetch

  const FtechData = async () => {
    try {
      if (AnimeData?.length === Anime?.length) return;
      const DataToFtech = Anime.slice(currentIndex, currentIndex + FetchSize);
      console.log("DataToFtech: ", DataToFtech);
      const res = await Promise.all(
        DataToFtech?.map((Data) =>
          axios.get(
            `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
              Data
            )}&page[limit]=1`
          )
        )
      );
      console.log("Res: ", res);
      const NewAnime = res?.map((Data) => {
        const Data1 = Data?.data?.data[0]?.attributes;
        return {
          Title: Data1?.canonicalTitle || slicedList[idx],
          Image: Data1?.posterImage?.original,
          CoverImage: Data1?.coverImage?.original,
          Episodes: Data1?.episodeCount,
          Date: Data1?.startDate,
          Score: Data1?.averageRating,
        };
      });
      console.log("Anime Data: ", NewAnime);
      Disptch(setAnime([...AnimeData, ...NewAnime]));
      await new Promise((resolve, reject) => {
        // resolve(setTimeout(()=>{},1100))
        setTimeout(() => resolve(), 1100);
      });
      console.log("current: ", currentIndex);
      setCurrentIndex(currentIndex + FetchSize);
    } catch (error) {
      console.log("there is been Error: ", error);
    } finally {
    }
  };
  useEffect(() => {
    FtechData();
  }, [currentIndex]);

  // useEffect(()=>{
  //   if(AnimeData?.length>0 && AnimeData?.length<Anime?.length)
  // })
  const handleAnimeDetails = (Data) => {
    Navigate(`/details`,{state:{Data}})
  };
  return (
    <div>
      {/* <h2>Anime Section</h2> */}
      <AnimeCardsSection
        Data1={AnimeData}
        handleAnimeDetails={handleAnimeDetails}
        fetchingMore={
          AnimeData?.length > 0 && AnimeData?.length < Anime?.length
        }
        // initialLoading={loading && tabData.length === 0}
        // skeletonsCount={skeletonsToShow}
      />
    </div>
  );
};

export default AnimeList;
