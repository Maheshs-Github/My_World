import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChars } from "../../../redux/AnimeSlice";
import AnimeCardsSection from "./AnimeCardsSection";

const Chars = () => {
  const charRData = useSelector((state) => state?.Anime?.Chars);
  const Dispatch = useDispatch();

  const MChar = [
    "Itachi Uchiha",
    "Shikhamaru Nara",
    "Kazuto Kirigaya",
    "Hachiman Hikigaya",
    "Roronoa Zoro",
    "Kyōjurō Rengoku",
    "Kamado Tanjiro",
    "Kiyoka Kudo",
    "Miyamura",
    "Naoufumi Iwatani",
    "Kou Mabuchi"

  ];
  const FChar = [
    "Hinata Hyuoga",
    "Tohru Honda",
    "Yukinon Yukinoshita",
    "Kuronuma Sawaka",
    "Chizuru Hishiro",
  ];

  // const [charData, setCharData] = useState();
  const BATCH_SIZE = 3;
 const [currentMIndex, setCurrentMIndex] = useState(
  () => Math.min(charRData?.length, MChar.length)
);
const [currentFIndex, setCurrentFIndex] = useState(
  () => Math.max(0, (charRData?.length ?? 0) - MChar.length)
);
const [loadFChar, setLoadFChar] = useState(
  () => (charRData?.length ?? 0) > MChar.length
);

  // const loadMoreRef = useRef(null);
  // const lastFetchTime = useRef(0);

//   const FetchData = async () => {
//     // if (currentMIndex >= CharsArray.length) return;
//     // if(loading) return;
//     // if (fetchingMore || initialLoading) return;

//     //     const now = Date.now();
//     // const timeSinceLastFetch = now - lastFetchTime.current;
    
//     // if (timeSinceLastFetch < 1000) {
//     //   console.log("Too fast! Waiting...");
//     //   return;
//     // }
//     if(currentFIndex+currentMIndex===FChar?.length+MChar?.length) return;
//     try {
//       // const isFirstLoad = charRData.length === 0;
//       // isFirstLoad ? setInitialLoading(true) : setFetchingMore(true);
//       let SlicedML;

//       if (currentMIndex < MChar.length) {
//         SlicedML = MChar.slice(currentMIndex, currentMIndex + BATCH_SIZE);
//         // setCurrentMIndex((prev) => prev + BATCH_SIZE);
//       } else if (currentFIndex < FChar.length) {
//         if (!loadFChar) setLoadFChar(true);
//         // isFirstLoad ? setInitialLoading(true) : setFetchingMore(true);
//         SlicedML = FChar.slice(currentFIndex, currentFIndex + BATCH_SIZE);
//         // setCurrentFIndex((prev) => prev + BATCH_SIZE);
//       } else {
//         return;
//       }

//       // lastFetchTime.current = Date.now();
//       // const res = await Promise.all(
//       //   SlicedML.map((Data) =>
//       //     axios.get(`https://api.jikan.moe/v4/characters?q=${Data}
//       //     `)
//       //   )
//       // );
//       for (let Data of SlicedML) {
//   const response = await axios.get(
//     `https://api.jikan.moe/v4/characters?q=${Data}`
//   );

//   res.push(response);

//   // VERY IMPORTANT: delay AFTER EACH request
//   await new Promise((resolve) => setTimeout(resolve, 350));
// }
//       const NewChar = res?.map((Data) => {
//         const Ans = Data?.data?.data[0];
//         return {
//           Title: Ans?.name,
//           Image: Ans?.images?.webp?.image_url,
//         };
//       });
//       console.log("Ans: ", res);
//       Dispatch(setChars([...charRData, ...NewChar]));
//       // await new Promise.resolve(setTimeout(()=>{},1000))
//       await new Promise(resolve => setTimeout(()=>resolve(), 1100));
//       // setCharData(NewChar);
//                 if (currentMIndex < MChar.length) {
//         setCurrentMIndex((prev) => prev + BATCH_SIZE);
//       } else if (currentFIndex < FChar.length) {
//         // isFirstLoad ? setInitialLoading(true) : setFetchingMore(true);
//         setCurrentFIndex((prev) => prev + BATCH_SIZE);
//       }
//     } catch (error) {
//       console.log("There is been some Error: ", error);
//     } finally {
//       // setInitialLoading(false);
//       // setFetchingMore(false);
//     }
//   };



useEffect(() => {
  const totalFetched = charRData?.length ?? 0;
  const totalNeeded = MChar.length + FChar.length;
  if (totalFetched >= totalNeeded) return; // already have everything
  FetchData();
}, [currentFIndex, currentMIndex]);
  useEffect(() => {
    console.log("charRData: ", charRData);
  }, [charRData]);

  const FetchData = async () => {
  if (currentMIndex >= MChar.length && currentFIndex >= FChar.length) return;

  try {
    let SlicedML;

    if (currentMIndex < MChar.length) {
  SlicedML = MChar.slice(currentMIndex, currentMIndex + BATCH_SIZE);
} else if (currentFIndex < FChar.length) {
  if (!loadFChar) setLoadFChar(true);
  SlicedML = FChar.slice(currentFIndex, currentFIndex + BATCH_SIZE);
} else {
  return; // both done
}

    if (!SlicedML.length) return;
    const res = []; // ✅ IMPORTANT

    // ✅ Sequential API calls (NO rate limit)
    for (let Data of SlicedML) {
      const response = await axios.get(
        `https://api.jikan.moe/v4/characters?q=${Data}`
      );

      res.push(response);

      // ✅ delay between each request
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    const NewChar = res.map((Data) => {
      const Ans = Data?.data?.data[0];
      return {
        Title: Ans?.name,
        Image: Ans?.images?.webp?.image_url,
      };
    });

    Dispatch(setChars([...charRData, ...NewChar]));

// ✅ Wait after every batch before triggering next useEffect
await new Promise((resolve) => setTimeout(resolve, 1100));

// move index forward
if (currentMIndex < MChar.length) {
  setCurrentMIndex((prev) => Math.min(prev + BATCH_SIZE, MChar.length));
} else {
  setCurrentFIndex((prev) => Math.min(prev + BATCH_SIZE, FChar.length));
}
  } catch (error) {
    console.log("Error:", error);
  }
};


  // useEffect(() => {
  //   let timeoutId;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && !initialLoading && !fetchingMore) {
  //         // Clear any pending fetch
  //         clearTimeout(timeoutId);
  //         // Wait 300ms before fetching
  //         timeoutId = setTimeout(() => {
  //           FetchData();
  //         }, 1100);
  //       }
  //     },
  //     { threshold: 0.5 }
  //   );

  //   if (loadMoreRef.current) {
  //     observer.observe(loadMoreRef.current);
  //   }

  //   return () => {
  //     clearTimeout(timeoutId);
  //     if (loadMoreRef.current) {
  //       observer.unobserve(loadMoreRef.current);
  //     }
  //   };
  // }, [initialLoading, fetchingMore, currentMIndex, charRData]);
  const handleAnimeDetails = (Data) => {};

  return (
    <div>
      <h2 className=" flex justify-center items-center text-2xl p-10">
        {" "}
        {/* Fav Chars */}
      </h2>
      {/* <h3 className="text-xl">Male Charcters</h3> */}
      <AnimeCardsSection
        Data1={charRData.slice(0, MChar.length)}
        handleAnimeDetails={handleAnimeDetails}
        // initialLoading={initialLoading && currentMIndex === 0}
        // fetchingMore={currentMIndex?.length<MChar?.length && !loadFChar}
        fetchingMore={currentMIndex<MChar?.length && !loadFChar}

      />
      {loadFChar && (
        <>
          {/* <h3 className="text-xl">FeMale Charcters</h3> */}
          <AnimeCardsSection
            Data1={charRData.slice(MChar.length)}
            handleAnimeDetails={handleAnimeDetails}
            // initialLoading={initialLoading}
            // fetchingMore={currentFIndex?.length<FChar?.length && loadFChar}
            fetchingMore={currentFIndex<FChar?.length && loadFChar}

          />
        </>
      )}
    </div>
  );
};

export default Chars;
