import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLightNovel } from "../../../redux/AnimeSlice";
import AnimeCardsSection from "./AnimeCardsSection";
import { useNavigate } from "react-router-dom";

const LNList = () => {
  const LNData = useSelector((state) => state?.Anime?.LightNovel);
  const Dispatch = useDispatch();
  const Naviagte=useNavigate();
  const Lightnovel = [
    "My Youth Romantic Comedy Is Wrong, As I Expected",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const Fetch_Size = 3;
  const Fetch = async () => {
    try {
      if(LNData?.length=== Lightnovel?.length) return;
      const DataToFetch = Lightnovel.slice(
        currentIndex,
        currentIndex + Fetch_Size
      );
      const res = await Promise.all(
        DataToFetch.map((Data) =>
          axios.get(
            `https://kitsu.io/api/edge/manga?filter[subtype]=novel&filter[text]=${encodeURIComponent(
              Data
            )}&page[limit]=1`
          )
        )
      );
      console.log("Res: ", res);
      const NewLN = res.map((Data) => {
        const Data1 = Data?.data?.data[0]?.attributes;
        return {
          Title: Data1?.canonicalTitle,
          Image: Data1?.posterImage?.original,
          CoverImage: Data1?.coverImage?.original,
          Episodes: Data1?.volumeCount,
          Date: Data1?.startDate,
          Score: Data1?.averageRating,
        };
      });
      Dispatch(setLightNovel([...LNData, ...NewLN]));
      await new Promise((resolve) => setTimeout(() => resolve(), 1100));
      setCurrentIndex(currentIndex + Fetch_Size);
    } catch (error) {
      console.log("There is been some Error: ", error);
    }
  };
  useEffect(() => {
    Fetch();
  }, [currentIndex]);
  const handleAnimeDetails = (Data) => {
    Naviagte(`/details`,{state:{Data}})
  };
  return (
    <div>
      {/* <h2>LN Section</h2> */}
      <AnimeCardsSection
        Data1={LNData}
        handleAnimeDetails={handleAnimeDetails}
        fetchingMore={LNData?.length > 0 && Lightnovel?.length > LNData?.length}
        // initialLoading={loading && tabData.length === 0}
        // skeletonsCount={skeletonsToShow}
      />
    </div>
  );
};

export default LNList;
