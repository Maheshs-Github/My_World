import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovie } from "../../../redux/AnimeSlice";
import AnimeCardsSection from "./AnimeCardsSection";
import { useNavigate } from "react-router-dom";

const MovieList = () => {
  const MovieData = useSelector((state) => state?.Anime?.Movie);
  const Dispatch = useDispatch();
  const Naviagte=useNavigate();

  const Movie = [
    "Your Name",
    "Spirited Away",
    "Grave of the Fireflies",
    "A Silent Voice",
    "Howl's Moving Castle",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const Fetch_Size = 3;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (MovieData?.length === Movie?.length) return;
        const DataToFetch = Movie.slice(
          currentIndex,
          currentIndex + Fetch_Size
        );
        const res = await Promise.all(
          DataToFetch?.map((Data) =>
            axios.get(
              `https://kitsu.io/api/edge/anime?filter[subtype]=movie&filter[text]=${encodeURIComponent(
                Data
              )}&page[limit]=1`
            )
          )
        );
        const NewMovie = res?.map((Data) => {
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
        Dispatch(setMovie([...MovieData, ...NewMovie]));
        await new Promise((resolve) => setTimeout(() => resolve(), 1100));
        setCurrentIndex(currentIndex + Fetch_Size);
      } catch (error) {
        console.log("There is been some Error: ", error);
      }
    };
    fetchData();
  }, [currentIndex]);
   const handleAnimeDetails = (Data) => {
    Naviagte(`/details`,{state:{Data}})
  };
  return (
    <div>
      {/* <h2>Movie Section </h2> */}
      <AnimeCardsSection
        Data1={MovieData}
        handleAnimeDetails={handleAnimeDetails}
        fetchingMore={
          MovieData?.length > 0 && Movie?.length > MovieData?.length
        }
        // initialLoading={loading && tabData.length === 0}
        // skeletonsCount={skeletonsToShow}
      />
    </div>
  );
};

export default MovieList;
