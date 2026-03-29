import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setManga } from "../../../redux/AnimeSlice";
import AnimeCardsSection from "./AnimeCardsSection";
import { useNavigate } from "react-router-dom";

const MangaList = () => {
  const MangaData = useSelector((state) => state?.Anime?.Manga);
  const Dipatch = useDispatch();
  const Navigate=useNavigate();
  const Manga = [
    "Relife",
    "Vinland Saga",
    "Boarding School Juliet",
    "Btooom",
    "Horimiya",
    "Vagabond manga",
    "Yamada kun and 7 Witches",
    "Blue Box",
    "The Fragrant Flower Blooms with Dignity",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const Fetch_Size = 3;
  const FtechData = async () => {
    try {
      if (MangaData?.length === Manga?.length ) return;
      const DataToFetch = Manga?.slice(currentIndex, currentIndex + Fetch_Size);
      const res = await Promise.all(
        DataToFetch?.map((Data) =>
          axios.get(
            `https://kitsu.io/api/edge/manga?filter[text]=${encodeURIComponent(
              Data
            )}&page[limit]=1`
          )
        )
      );
      console.log("res: ", res);
      const NewManga = res?.map((Data) => {
        const Data1 = Data?.data?.data[0]?.attributes;
        return {
          Title: Data1?.canonicalTitle,
          Image: Data1?.posterImage?.original,
          CoverImage: Data1?.coverImage?.original,
          Volumes: Data1?.volumeCount,
          Date: Data1?.startDate,
          Score: Data1?.averageRating,
        };
      });
      console.log("New Mahnge: ", NewManga);
      Dipatch(setManga([...MangaData, ...NewManga]));

      await new Promise((resolve) => setTimeout(() => resolve(), 1100));
      setCurrentIndex(currentIndex + Fetch_Size);
    } catch (error) {
      console.log("there is been some Error: ", error);
    } 
  };
  useEffect(() => {
    FtechData();
  }, [currentIndex]);
  const handleAnimeDetails = (Data) => {
    Navigate(`/details`,{state:{Data}})
  };
  return (
    <div>
      {/* <h2>Manga Section </h2> */}
      <AnimeCardsSection
        Data1={MangaData}
        handleAnimeDetails={handleAnimeDetails}
        fetchingMore={
          MangaData?.length > 0 && Manga?.length > MangaData?.length
        }
        // initialLoading={loading && tabData.length === 0}
        // skeletonsCount={skeletonsToShow}
      />
    </div>
  );
};

export default MangaList;
