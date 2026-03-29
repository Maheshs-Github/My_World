import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimeCardsSection from "./AnimeCardsSection";
import { useDispatch, useSelector } from "react-redux";
import { setAnime } from "../../../redux/AnimeSlice";
import { useLocation, useNavigate } from "react-router-dom";

const AllAnime = () => {
  // const AnimeData = useSelector((state) => state?.Anime?.Anime);
  const Disptch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();
  console.log("location: ", location);
  const AnimeData = location?.state?.Data?.[0];
  console.log("All Anime Dtaa: ", AnimeData);
  const FetchSize = 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [anime, setAnime] = useState([]);

  // const fetch

  const FtechData = async () => {
    try {
      // if (AnimeData?.length === Anime?.length) return;
      console.log("Data Bww: ", AnimeData?.anime);
      const DataToFtech = AnimeData?.anime.slice(
        currentIndex,
        currentIndex + FetchSize
      );
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
      // Disptch(setAnime([...AnimeData, ...NewAnime]));
      setAnime((prev) => [...prev,...NewAnime]);
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
    Navigate(`/details`, { state: { Data } });
  };
  return (
    <div>
      {/* <h2>Anime Section</h2> */}
      {console.log("Anime: ",anime)}
      <AnimeCardsSection
        Data1={anime}
        handleAnimeDetails={handleAnimeDetails}
        fetchingMore={
          AnimeData?.anime?.length > 0 && AnimeData?.anime?.length > anime?.length
        }
        // initialLoading={loading && tabData.length === 0}
        // skeletonsCount={skeletonsToShow}
      />
    </div>
  );
};

export default AllAnime;
