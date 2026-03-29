// import axios from "axios";
// import React, { useEffect, useState, useRef } from "react";
// import DummyImg from "D:/Downloads/dummy-image-grey-e1398449111870.jpg";
// import AnimeCard from "./AnimeCard";
// import { Outlet, useNavigate } from "react-router-dom";
// import Anime_Header from "./Anime_Header";
// import AnimeSkeletonCard from "./AnimeSkeletonCard";
// import { useDispatch, useSelector } from "react-redux";
// import { setAllAnime } from "../../../redux/AnimeSlice";
// const Anime = () => {
//   const navigate = useNavigate();
//   const Dispatch=useDispatch();
//   const AnimeData=useSelector((state)=>state?.Anime?.All);
//   const Tabs = ["All", "Manga List", "Anime List", "Fav Characters"];
// const AnimeName1 = [
//   "Naruto",
//   "Attack On Titan",
//   "Frieren: Beyond Journey's End",
//   "One Piece",
//   "Oregairu",
//   "Tensura",
//   "Sword Art Online",
//   "Relife",
//   "Log Horizon",
//   "The Rising Of Shield Hero",
//   "Toradora",
//   "Your name",
//   "Death Note",
//   "Steins Gate",
//   "Code Geass",

// ];

//   // const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [index, setIndex] = useState(0);

//   const loadMoreRef = useRef(null);
//   const BATCH_SIZE = 3;

//   const animeIDs = [16498, 51009, 21];
//   // const [singleAnimeData, setSingleAnimeData] = useState([
//   //   {
//   //     Title: "",
//   //     Score: "",
//   //     Genre: [],
//   //     Episodes: "",
//   //     Images: "",
//   //     URL: "",
//   //     Year: "",
//   //   },
//   // ]);
//   // const [anime, setAnime] = useState(AnimeData || []);
//   useEffect(() => {
//     if (AnimeData && AnimeData.length > 0) {
//       // setAnime(AnimeData);
//       setIndex(AnimeData.length);
//     }
//   }, []);

//   const [selectedAnime, setSelectedAnime] = useState({});
//   const handleAnimeDetails = (Data) => [
//     navigate(`anime_details`, { state: { Data } }),
//   ];
//   // useEffect(() => {
//   //   const getAnime = async () => {
//   //     try {

//   //       const FetchAnimeData = await axios.all(
//   //         AnimeName.map((Name) => {
//   //           return axios.get(
//   //             `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
//   //               Name
//   //             )}&limit=1&fields=title,images,score,episodes,synopsis,genres`
//   //           );
//   //         })
//   //       );
//   //       console.log("Data: ", FetchAnimeData);

//   //       setSingleAnimeData(
//   //         FetchAnimeData.map(async (Data) => {
//   //           const D1 = Data?.data?.data[0];
//   //           const ID = D1?.mal_id;
//   //           const IDRes = await axios.get(
//   //             `https://api.jikan.moe/v4/anime/${ID}/pictures`
//   //           );
//   //           console.log("ID Res: ", IDRes);
//   //           return {
//   //             Title: D1.title_english,
//   //             Score: D1.score,
//   //             Genre: D1.genres,
//   //             Episodes: D1.episodes,
//   //             Images: D1.images?.webp?.large_image_url,
//   //             URL: D1.url,
//   //             Year: D1.year,
//   //           };
//   //         })
//   //       );

//   //     } catch (err) {
//   //       console.log("There is been a Error");
//   //     }
//   //   };
//   //   getAnime();
//   // }, []);
//   // useEffect(()=>{
//   //   const fetchAnime=async()=>{
//   //     try {
//   //             const res=await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent("Naruto")}&page[limit]=1`);
//   //     console.log("res: ",res);
//   //     } catch (error) {
//   //       console.log("There is been a Error: ",error)
//   //     }
//   //   }
//   //   fetchAnime();
//   // },[])

//   // useEffect(() => {
//   //   const fetchAnime = async () => {
//   //     try {
//   //       setLoading(true);
//   //       const res = await Promise.all(
//   //         AnimeName1.map((Name) => {
//   //           return axios.get(
//   //             `https://kitsu.io/api/edge/anime?page[limit]=12&filter[text]=${encodeURIComponent(
//   //               Name
//   //             )}&page[offset]=${
//   //         (page - 1) * 12}`
//   //           );
//   //         })
//   //       );
//   //       console.log("res: ", res);
//   //       console.log("res: ", res[0]?.data?.data[0]?.attributes?.canonicalTitle);
//   //       setAnime((prev)=>
//   //         [...prev,

//   //         ...res.map((Data) => {
//   //           const D2 = Data?.data?.data[0]?.attributes;

//   //           return {
//   //             Title: D2?.canonicalTitle,
//   //             Image: D2?.posterImage?.original,
//   //             CoverImage: D2?.coverImage,
//   //             Episodes: D2?.episodeCount,
//   //             Date: D2?.startDate,
//   //             Score: D2?.averageRating,
//   //           };
//   //         })]
//   //       );
//   //       console.log("Anime: ", anime);
//   //     } catch (error) {
//   //       console.log("There is been a Error: ", error);
//   //     }
//   //     finally{
//   //       setLoading(false)
//   //     }
//   //   };
//   //   fetchAnime();
//   // }, [page]);

//   //   useEffect(() => {
//   //   const fetchAnime = async () => {
//   //     if (index >= AnimeName1.length) return;

//   //     try {
//   //       setLoading(true);

//   //       const name = AnimeName1[index];
//   //       const res = await axios.get(
//   //         `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(name)}&page[limit]=1`
//   //       );

//   //       const a = res.data.data[0]?.attributes;
//   //       if (!a) return;

//   //       setAnime((prev) => [
//   //         ...prev,
//   //         {
//   //           Title: a.canonicalTitle,
//   //           Image: a.posterImage?.original,
//   //           CoverImage: a.coverImage,
//   //           Episodes: a.episodeCount,
//   //           Date: a.startDate,
//   //           Score: a.averageRating,
//   //         },
//   //       ]);
//   //     } catch (err) {
//   //       console.log(err);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchAnime();
//   // }, [index]);

//   useEffect(() => {
//         if (AnimeData?.length > 0 && index < AnimeData.length) {
//       return;
//     }
//     const fetchAnimeBatch = async () => {
//       if (index >= AnimeName1.length) return;

//       try {
//         setLoading(true);

//         // Take next 3 names
//         const batch = AnimeName1.slice(index, index + BATCH_SIZE);

//         const responses = await Promise.all(
//           batch.map((name) =>
//             axios.get(
//               `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
//                 name
//               )}&page[limit]=1`
//             )
//           )
//         );

//         const newAnime = responses
//           .map((res) => res.data.data[0]?.attributes)
//           .filter(Boolean)
//           .map((a) => ({
//             Title: a.canonicalTitle,
//             Image: a.posterImage?.original,
//             CoverImage: a.coverImage,
//             Episodes: a.episodeCount,
//             Date: a.startDate,
//             Score: a.averageRating,
//           }));
//           // setAnime((prev) => [...prev, ...newAnime]);
//     // Dispatch(setAllAnime([...(AnimeData || []), ...newAnime]))
//             const existingTitles = new Set(AnimeData?.map(anime => anime.Title) || []);
//         const uniqueNewAnime = newAnime.filter(anime => !existingTitles.has(anime.Title));

//         // Only dispatch if we have new unique anime
//         if (uniqueNewAnime.length > 0) {
//           Dispatch(setAllAnime([...(AnimeData || []), ...uniqueNewAnime]));
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnimeBatch();
//   }, [index]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !loading) {
//           setIndex((prev) => prev + BATCH_SIZE);
//         }
//       },
//       { threshold: 1 }
//     );

//     if (loadMoreRef.current) observer.observe(loadMoreRef.current);

//     return () => observer.disconnect();
//   }, [loading]);

//   return (
//     <>
//       <div className="font-over">
//         <Anime_Header />
//         <div className="flex justify-center items-center py-2 bg-tabs-bg gap-x-3">
//           {Tabs?.map((Data, idx) => {
//             return (
//               <div
//                 className="px-4 py-4 text-xl text-gray-400 font-semibold cursor-pointer"
//                 key={idx}
//               >
//                 {Data}
//               </div>
//             );
//           })}
//         </div>
//         {/* {console.log("singleAnimeData: ", singleAnimeData)} */}
//         {/* <div className="grid grid-cols-3 py-10 px-4">
//           {singleAnimeData?.map((Data, idx) => {
//             return (
//               <div
//                 key={idx}
//                 onClick={() => {
//                   handleAnimeDetails(Data);
//                 }}
//                 className="cursor-pointer flex flex-col gap-3 items-center"
//               >
//                 <img
//                   src={Data.Images}
//                   alt="Image"
//                   className="object-cover w-96 h-[400px] border rounded"
//                 />
//                 <h2 className="text-center font-semibold text-lg hover:text-secondary">
//                   {Data.Title}
//                 </h2>

//               </div>
//             );
//           })}
//         </div> */}
//         <div className="grid grid-cols-3 py-10 px-4 gap-8">
//           {/* {console.log("Anime Data: ", anime)} */}
//           {AnimeData?.map((Data, idx) => {
//             return (
//               <div
//                 key={idx}
//                 onClick={() => {
//                   handleAnimeDetails(Data);
//                 }}
//                 className="cursor-pointer flex flex-col gap-2 items-center"
//               >
//                 <img
//                   src={Data.Image}
//                   alt="Image"
//                   className="object-cover w-96 h-[400px] border rounded"
//                 />
//                 <h2 className="text-center font-semibold text-lg hover:text-secondary">
//                   {Data.Title}
//                 </h2>
//               </div>
//             );
//           })}
//         </div>
//         {loading && (
//           <div className="grid grid-cols-3 gap-8 px-4">
//             {Array.from({ length: BATCH_SIZE }).map((_, i) => (
//               <AnimeSkeletonCard key={i} />
//             ))}
//           </div>
//         )}

//         <div ref={loadMoreRef} className="h-10" />
//       </div>
//     </>
//   );
// };

// export default Anime;

import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import AnimeCard from "./AnimeCard";
import { Outlet, useNavigate } from "react-router-dom";
import Anime_Header from "./Anime_Header";
import AnimeSkeletonCard from "./AnimeSkeletonCard";
import { useDispatch, useSelector } from "react-redux";
import { setAllAnime } from "../../../redux/AnimeSlice";

const Anime = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const animeData = useSelector((state) => state?.Anime?.All || []);

  const Tabs = ["All", "Manga List", "Anime List", "Fav Characters"];
  const AnimeName1 = [
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
    "Your name",
    "Death Note",
    "Steins Gate",
    "Code Geass",
  ];

  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const loadMoreRef = useRef(null);
  const BATCH_SIZE = 3;

  const handleAnimeDetails = (Data) => {
    navigate(`/details`, { state: { Data } });
  };

  // Fetch next batch
  const fetchNextBatch = async () => {
    if (currentIndex >= AnimeName1.length) return;

    if (loading) return;

    try {
      setLoading(true);

      const batch = AnimeName1.slice(currentIndex, currentIndex + BATCH_SIZE);

      if (batch.length === 0) return;

      const responses = await Promise.all(
        batch.map((name) =>
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

      dispatch(setAllAnime([...animeData, ...newAnime]));

      setCurrentIndex((prev) => prev + BATCH_SIZE);
    } catch (err) {
      console.error("Error fetching anime:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (animeData.length === 0) {
      fetchNextBatch();
    } else {
      setCurrentIndex(animeData.length);
    }
  }, []);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchNextBatch();
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loading, currentIndex, animeData]); // Re-run when these change

  return (
    <div className="font-over">
      {/* <Anime_Header />

      
      <div className="flex justify-center items-center py-2 bg-tabs-bg gap-x-3">
        {Tabs?.map((Data, idx) => (
          <div
            className="px-4 py-4 text-xl text-gray-400 font-semibold cursor-pointer"
            key={idx}
          >
            {Data}
          </div>
        ))}
      </div> */}

      {/* Anime Grid */}
      <div className="grid grid-cols-3 py-10 px-4 gap-8">
        {animeData?.map((Data, idx) => (
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
        ))}
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-3 gap-8 px-4 pb-10">
          {Array.from({ length: BATCH_SIZE }).map((_, i) => (
            <AnimeSkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Sentinel div for intersection observer */}
      <div ref={loadMoreRef} className="h-10" />

      {/* Show message when all loaded */}
      {currentIndex >= AnimeName1.length && !loading && (
        <div className="text-center py-8 text-gray-500">All anime loaded!</div>
      )}
    </div>
  );
};

export default Anime;
