// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import AnimeSkeletonCard from "./AnimeSkeletonCard";
// import { useDispatch, useSelector } from "react-redux";
// import { setManga, setAnime, setLightNovel, setMovie} from "../../../redux/AnimeSlice";
// import AnimeCardsSection from "./AnimeCardsSection";

// const Manga = ({DataList,tab}) => {
//   // const [data, setData] = useState([]);
//   // const getSelector=()=>{
//   //   switch(tab){
//   //     case "anime":
//   //       return useSelector((state)=>state.Anime.Anime);
//   //     case "manga":
//   //       return useSelector((state)=>state.Anime.Manga);
//   //     case "lightnovel":
//   //       return useSelector((state)=>state.Anime.LightNovel);
//   //     case "movie":
//   //       return useSelector((state)=>state.Anime.Movie);
//   //     default:
//   //       return useSelector((state)=>state.Anime.Anime);
//   //   }
//   // }

//   // const getAction=()=>{
//   //   switch(tab){
//   //     case "anime":
//   //       return setAnime;
//   //     case "manga":
//   //       return setManga;
//   //     case "lightnovel":
//   //       return setLightNovel;
//   //     case "movie":
//   //       return setMovie;
//   //     default:
//   //       return setAnime;
//   //   }
//   // }
//   // const getSelector() = useSelector((state) => state.Anime.Manga);

//     const allStates = useSelector((state) => state.Anime);
  
//   // Track which state to use with ref
//   const stateRef = useRef({
//     tab: tab,
//     data: allStates.Anime, // Default
//     action: setAnime
//   });
  
//   // Update ref when tab changes
//   useEffect(() => {
//     switch(tab?.toLowerCase()) {
//       case "anime":
//         stateRef.current = { tab, data: allStates.Anime, action: setAnime };
//         break;
//       case "manga":
//         stateRef.current = { tab, data: allStates.Manga, action: setManga };
//         break;
//       case "lightnovel":
//       case "ln":
//         stateRef.current = { tab, data: allStates.LightNovel, action: setLightNovel };
//         break;
//       case "movie":
//         stateRef.current = { tab, data: allStates.Movie, action: setMovie };
//         break;
//       default:
//         stateRef.current = { tab, data: allStates.Anime, action: setAnime };
//     }
//   }, [tab, allStates]);

//   const Dispatch = useDispatch();
//   // const DataList = [
//   //   "Relife",
//   //   "Vinland Saga",
//   //   "Boarding School Juliet",
//   //   "Btooom",
//   //   "Horimiya",
//   //   "Vagabond manga",
//   //   "Yamada kun and 7 Witches",
//   //   "Blue Box",
//   //   "Fragrant Flowers Bloom With Dignity",
//   //   "Fragrant Flowers Bloom With Dignity",
//   //   "Fragrant Flowers Bloom With Dignity",
//   //   "Fragrant Flowers Bloom With Dignity",
//   //   "Fragrant Flowers Bloom With Dignity",
//   //   "Fragrant Flowers Bloom With Dignity",
//   //   "Fragrant Flowers Bloom With Dignity",
//   //   "Fragrant Flowers Bloom With Dignity",
//   //   "Fragrant Flowers Bloom With Dignity",
//   //   "Fragrant Flowers Bloom With Dignity",

//   // ];
//   const BATCH_SIZE = 3;
//   const [currentMIndex, setCurrentMIndex] = useState(0);
// const [initialLoading, setInitialLoading] = useState(true);
// const [fetchingMore, setFetchingMore] = useState(false);

//   const loadMoreRef = useRef(null);

//   useEffect(()=>{
// console.log("Data List: ",DataList);
// console.log("Tab: ",tab);
//   },[DataList,tab])
//   const FetchData = async () => {
//     if (currentMIndex >= DataList.length) return;
//     // if(loading) return;
//       const isFirstLoad = getSelector().length === 0;
//     try {
//       isFirstLoad ? setInitialLoading(true) : setFetchingMore(true);
//       const SlicedML = DataList.slice(
//         currentMIndex,
//         currentMIndex + BATCH_SIZE
//       );
//       const res = await Promise.all(
//         SlicedML?.map((Name) =>
//           axios.get(
//             `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
//               Name
//             )}&page[limit]=1`
//           )
//         )
//       );
//       console.log("Data: ", res);
//       const NewMangaData = res.map((anime) => {
//         const Data = anime?.data?.data[0]?.attributes;
//         return {
//           Title: Data?.canonicalTitle,
//           Image: Data?.posterImage?.original,
//           CoverImage: Data?.coverImage,
//           Episodes: Data?.episodeCount,
//           Date: Data?.startDate,
//           Score: Data?.averageRating,
//         };
//       });
//       console.log("Manga lIst : ", NewMangaData);
//       // setData(getSelector());
//       // setManga((prev)=>([...prev,...getSelector()]))
//       Dispatch(getAction()([...getSelector(), ...NewMangaData]));
//       // setData((prev) => [...prev, ...NewMangaData]);
//       setCurrentMIndex((prev) => prev + BATCH_SIZE);
//     } catch (error) {
//       console.log("There is been some Error: ", error);
//     } finally {
//           setInitialLoading(false);
//     setFetchingMore(false);
//     }
//   };
//   // useEffect(()=>{setTimeout(()=>setCurrentMIndex((prev)=>prev+BATCH_SIZE),2000)},[])
//   useEffect(() => {
//     if (getSelector().length === 0) FetchData();
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !initialLoading && !fetchingMore) {
//           FetchData();
//         }
//       }, 
//       { threshold: 0.5 } // Trigger when 50% visible
//     );

//     if (loadMoreRef.current) {
//       observer.observe(loadMoreRef.current);
//     }

//     return () => {
//       if (loadMoreRef.current) {
//         observer.unobserve(loadMoreRef.current);
//       }
//     };
//   }, [initialLoading, currentMIndex, getSelector()]);
//   const handleAnimeDetails = (Data) => {};
//   return (
//     <div>
//       <h2 className=" flex justify-center items-center text-2xl p-10">
//         {" "}
//         Manga Page{" "}
//       </h2>
//       {/* {console.log("Data: ", data)} */}
//       {console.log("getSelector(): ", getSelector())}
//       {/* <div className="p-6 grid grid-cols-3 gap-10">
//         {getSelector()?.map((Data, idx) => {
//           return (
//             <div
//               key={`${Data?.Title}-${idx}`}
//               onClick={() => handleAnimeDetails(Data)}
//               className="cursor-pointer flex flex-col gap-2 items-center"
//             >
             
//               <img
//                 src={Data?.Image}
//                 alt={Data?.Title}
//                 className="object-cover w-96 h-[400px] border rounded"
//               />
//               <h2 className="text-center font-semibold text-lg hover:text-secondary">
//                 {Data?.Title}
//               </h2>
//             </div>
//           );
//         })}
//         {currentMIndex < DataList.length
//           ? Array.from({ length: 3 }).map((_, i) => (
//               <AnimeSkeletonCard key={i} />
//             ))
//           : null}
//       </div> */}
//       <AnimeCardsSection Data1={getSelector()} handleAnimeDetails={handleAnimeDetails} initialLoading={initialLoading} fetchingMore={fetchingMore}/>
//       {/* <div className="p-6 grid grid-cols-3">
//         <div className="flex flex-col gap-2 items-center">
//         <div className="w-[384px] h-[400px] border-white/20 bg-white/20 animate-pulse rounded"></div>
//         <div className="w-52 h-7 border-white/20 bg-white/20 animate-pulse rounded"></div>
//         </div>

//       </div> */}
//       <div ref={loadMoreRef} className="h-10" />
//     </div>
//   );
// };

// export default Manga;





// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setManga, setAnime, setLightNovel, setMovie } from "../../../redux/AnimeSlice";
// import AnimeCardsSection from "./AnimeCardsSection";

// const Manga = ({ DataList, tab }) => {
//   const allStates = useSelector((state) => state.Anime);
//   const dispatch = useDispatch();
  
//   // Track which state to use with ref
//   const stateRef = useRef({
//     tab: tab,
//     data: allStates.Anime, // Default
//     action: setAnime
//   });
  
//   // Update ref when tab changes
//   useEffect(() => {
//     switch(tab?.toLowerCase()) {
//       case "anime":
//         stateRef.current = { tab, data: allStates.Anime, action: setAnime };
//         break;
//       case "manga":
//         stateRef.current = { tab, data: allStates.Manga, action: setManga };
//         break;
//       case "lightnovel":
//       case "ln":
//         stateRef.current = { tab, data: allStates.LightNovel, action: setLightNovel };
//         break;
//       case "movie":
//         stateRef.current = { tab, data: allStates.Movie, action: setMovie };
//         break;
//       default:
//         stateRef.current = { tab, data: allStates.Anime, action: setAnime };
//     }
//     console.log("StateRef updated:", stateRef.current);
//   }, [tab, allStates]);
  
//   const BATCH_SIZE = 3;
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [fetchingMore, setFetchingMore] = useState(false);
//   const loadMoreRef = useRef(null);

//   useEffect(() => {
//     console.log("Data List: ", DataList);
//     console.log("Tab: ", tab);
//     console.log("Current state data:", stateRef.current.data);
//   }, [DataList, tab, allStates]);

//   // Reset when tab changes
//   useEffect(() => {
//     setCurrentIndex(0);
//     setInitialLoading(true);
//   }, [tab]);

//   const fetchData = async () => {
//     if (!DataList || currentIndex >= DataList.length) return;
    
//     const isFirstLoad = stateRef.current.data.length === 0;
    
//     try {
//       isFirstLoad ? setInitialLoading(true) : setFetchingMore(true);
      
//       const slicedList = DataList.slice(currentIndex, currentIndex + BATCH_SIZE);
      
//       const res = await Promise.all(
//         slicedList?.map((Name) =>
//           axios.get(
//             `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
//               Name
//             )}&page[limit]=1`
//           )
//         )
//       );
      
//       console.log("API Response: ", res);
      
//       const newData = res.map((anime) => {
//         const data = anime?.data?.data[0]?.attributes;
//         return {
//           Title: data?.canonicalTitle,
//           Image: data?.posterImage?.original,
//           CoverImage: data?.coverImage,
//           Episodes: data?.episodeCount,
//           Date: data?.startDate,
//           Score: data?.averageRating,
//         };
//       });
      
//       console.log("New Data: ", newData);
      
//       // Use stateRef to get current action and data
//       const { action, data: currentData } = stateRef.current;
//       dispatch(action([...currentData, ...newData]));
      
//       setCurrentIndex((prev) => prev + BATCH_SIZE);
//     } catch (error) {
//       console.log("There is been some Error: ", error);
//     } finally {
//       setInitialLoading(false);
//       setFetchingMore(false);
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     if (DataList && DataList.length > 0 && stateRef.current.data.length === 0) {
//       fetchData();
//     }
//   }, [DataList, tab, allStates]); // Added allStates to dependency

//   // Intersection observer
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !initialLoading && !fetchingMore && DataList && currentIndex < DataList.length) {
//           fetchData();
//         }
//       }, 
//       { threshold: 0.5 }
//     );

//     if (loadMoreRef.current) {
//       observer.observe(loadMoreRef.current);
//     }

//     return () => {
//       if (loadMoreRef.current) {
//         observer.unobserve(loadMoreRef.current);
//       }
//     };
//   }, [initialLoading, fetchingMore, currentIndex, DataList, tab]); // Added tab dependency

//   const handleAnimeDetails = (Data) => {
//     console.log("Clicked: ", Data);
//   };

//   return (
//     <div>
//       <h2 className="flex justify-center items-center text-2xl p-10 capitalize">
//         {tab || "Content"} Page
//       </h2>
      
//       {console.log("Current Tab Data in render: ", stateRef.current.data)}
      
//       <AnimeCardsSection 
//         Data1={stateRef.current.data} 
//         handleAnimeDetails={handleAnimeDetails} 
//         initialLoading={initialLoading} 
//         fetchingMore={fetchingMore}
//       />
      
//       {/* Show load more trigger only if there's more data */}
//       {DataList && currentIndex < DataList.length && (
//         <div ref={loadMoreRef} className="h-10" />
//       )}
      
//       {/* Show message when all loaded */}
//       {DataList && currentIndex >= DataList.length && stateRef.current.data.length > 0 && (
//         <div className="text-center py-4 text-gray-500">
//           All {tab} loaded ({stateRef.current.data.length} items)
//         </div>
//       )}
//     </div>
//   );
// };

// export default Manga;





import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setManga, setAnime, setLightNovel, setMovie } from "../../../redux/AnimeSlice";
import AnimeCardsSection from "./AnimeCardsSection";

const Manga = ({ DataList, tab }) => {
  const dispatch = useDispatch();
  
  // Get ALL states at the top level
  const allStates = useSelector((state) => state.Anime);
  
  // Get the correct Redux data for this tab
  const getTabData = () => {
    const tabLower = (tab || "anime").toLowerCase();
    switch(tabLower) {
      case "anime":
        return allStates.Anime;
      case "manga":
        return allStates.Manga;
      case "lightnovel":
      case "ln":
        return allStates.LightNovel;
      case "movie":
        return allStates.Movie;
      default:
        return allStates.Anime;
    }
  };
  
  // Get the correct action for this tab
  const getTabAction = () => {
    const tabLower = (tab || "anime").toLowerCase();
    switch(tabLower) {
      case "anime":
        return setAnime;
      case "manga":
        return setManga;
      case "lightnovel":
      case "ln":
        return setLightNovel;
      case "movie":
        return setMovie;
      default:
        return setAnime;
    }
  };
  
  // Get current tab data and action
  const tabData = getTabData();
  const tabAction = getTabAction();
  
  const BATCH_SIZE = 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastFetchTimeRef = useRef(0);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    console.log("=== Manga Component ===");
    console.log("Tab:", tab);
    console.log("DataList:", DataList?.length, "items");
    console.log("TabData:", tabData?.length, "items");
    console.log("CurrentIndex:", currentIndex);
    console.log("HasMore:", hasMore);
  }, [tab, DataList, tabData, currentIndex, hasMore]);

  // Reset everything when tab changes
  // useEffect(() => {
  //   console.log("Tab changed to:", tab, "- Resetting state");
  //   setCurrentIndex(0);
  //   setHasMore(true);
  //   setLoading(false);
  //   isFetchingRef.current = false;
  //   lastFetchTimeRef.current = 0;
  // }, [tab]);

  // Reset everything when tab changes
useEffect(() => {
  console.log("Tab changed to:", tab);
  
  
  setLoading(false);
  isFetchingRef.current = false;
  lastFetchTimeRef.current = 0;
  
  // hasMore should be true only if we haven't fetched all items yet
  const itemsToFetch = DataList?.length || 0;
  setHasMore(currentIndex < itemsToFetch);
  
  console.log(`CurrentIndex: ${currentIndex}, DataList: ${itemsToFetch} items, hasMore: ${currentIndex < itemsToFetch}`);
}, [tab, DataList, currentIndex]);



  const fetchData = async () => {
    // Prevent multiple simultaneous fetches
    if (isFetchingRef.current) {
      console.log("Already fetching, skipping...");
      return;
    }
    
    // Rate limiting check
    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTimeRef.current;
    
    if (lastFetchTimeRef.current > 0 && timeSinceLastFetch < 1100) {
      console.log("Rate limit - too fast, waiting...");
      return;
    }
    
    if (!DataList || currentIndex >= DataList.length || !hasMore) {
      console.log("No more data to fetch");
      setHasMore(false);
      return;
    }
    
    isFetchingRef.current = true;
    setLoading(true);
    lastFetchTimeRef.current = Date.now();
    
    try {
      const endIndex = Math.min(currentIndex + BATCH_SIZE, DataList.length);
      const slicedList = DataList.slice(currentIndex, endIndex);
      
      console.log(`Fetching batch ${currentIndex} to ${endIndex}:`, slicedList);
      
      // Fetch 3 items at once (within rate limit)
      const res = await Promise.all(
        slicedList.map((name) =>
          axios.get(
            `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(name)}&page[limit]=1`
          )
        )
      );
      
      const newData = res.map((item, idx) => {
        const data = item?.data?.data[0]?.attributes;
        if (!data) {
          console.warn(`No data found for: ${slicedList[idx]}`);
          return null;
        }
        
        return {
          Title: data?.canonicalTitle || slicedList[idx],
          Image: data?.posterImage?.original,
          CoverImage: data?.coverImage,
          Episodes: data?.episodeCount,
          Date: data?.startDate,
          Score: data?.averageRating,
          id: `${tab}-${slicedList[idx]}-${Date.now()}`
        };
      }).filter(Boolean);
      
      console.log("Fetched new data:", newData);
      
      // Check for duplicates and append new data
      const existingTitles = new Set(tabData.map(item => item.Title));
      const uniqueNewData = newData.filter(item => !existingTitles.has(item.Title));
      
      if (uniqueNewData.length > 0) {
        // APPEND data (not replace)
        dispatch(tabAction([...tabData, ...uniqueNewData]));
        console.log(`Added ${uniqueNewData.length} items to ${tab}`);
      }
      
      // Update index
      const nextIndex = endIndex;
      setCurrentIndex(nextIndex);
      
      // Check if we have more data to fetch
      if (nextIndex >= DataList.length) {
        setHasMore(false);
        console.log(`All ${DataList.length} items loaded for ${tab}`);
      } else {
        console.log(`Next batch will start at index: ${nextIndex}`);
      }
      
    } catch (error) {
      console.error("Fetch error:", error);
      
      // If rate limited, wait longer
      if (error.response?.status === 429) {
        console.log("Rate limited by API, waiting 2 seconds...");
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  };

  // Auto-fetch initial batch when component mounts or tab changes
  useEffect(() => {
    if (DataList && DataList.length > 0 && tabData.length === 0 && hasMore && !loading) {
      console.log("Auto-fetching initial batch for", tab);
      const timer = setTimeout(() => {
        fetchData();
      }, 500); // Small delay to ensure component is ready
      
      return () => clearTimeout(timer);
    }
  }, [DataList, tab, tabData.length, hasMore, loading]);

  // Auto-fetch next batch after current one completes
  useEffect(() => {
    if (!loading && hasMore && DataList && currentIndex < DataList.length) {
      console.log("Scheduling next batch fetch...");
      const timer = setTimeout(() => {
        fetchData();
      }, 1200); // 1.2 seconds between batches (safe for rate limit)
      
      return () => clearTimeout(timer);
    }
  }, [loading, hasMore, currentIndex, DataList]);

  const handleAnimeDetails = (data) => {
    console.log("Clicked:", data);
  };

  // Calculate skeletons to show (always show 3 skeletons while loading)
  const skeletonsToShow = loading ? BATCH_SIZE : 0;
  
  // Calculate progress
  const loadedCount = tabData.length;
  const totalCount = DataList?.length || 0;
  const progress = totalCount > 0 ? Math.round((loadedCount / totalCount) * 100) : 0;

  return (
    <div>
      <h2 className="flex justify-center items-center text-2xl p-10 capitalize">
        {tab || "Content"} Page
      </h2>
      ``
      {/* Progress indicator */}
      {totalCount > 0 && (
        <div className="text-center mb-6">
          <div className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm">
            {loadedCount} of {totalCount} items loaded ({progress}%)
          </div>
        </div>
      )}
      
      {/* Show data with skeletons */}
      <AnimeCardsSection 
        Data1={tabData} 
        handleAnimeDetails={handleAnimeDetails} 
        initialLoading={loading && tabData.length === 0}
        fetchingMore={loading && tabData.length > 0}
        skeletonsCount={skeletonsToShow}
      />
      
      {/* Completion message */}
      {!hasMore && loadedCount > 0 && (
        <div className="text-center py-8 text-green-600 font-medium">
          ✓ All {loadedCount} {tab} items loaded successfully!
        </div>
      )}
      
      {/* Empty state */}
      {!hasMore && loadedCount === 0 && totalCount > 0 && (
        <div className="text-center py-8 text-gray-500">
          No data found for {tab}
        </div>
      )}
      
      {/* Debug info (optional) */}
      <div className="text-center text-xs text-gray-400 mt-4">
        Auto-fetching in batches of {BATCH_SIZE}...
      </div>
    </div>
  );
};

export default Manga;