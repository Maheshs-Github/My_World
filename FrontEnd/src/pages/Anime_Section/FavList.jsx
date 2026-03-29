// import React, { useEffect, useState } from "react";
// import Manga from "./Manga";
// import { useLocation } from "react-router-dom";

// const FavList = () => {
//   const Loaction = useLocation();
//   const [tab, setTab] = useState("");

//     const MangaList = [
//     "Relife",
//     "Vinland Saga",
//     "Boarding School Juliet",
//     "Btooom",
//     "Horimiya",
//     "Vagabond manga",
//     "Yamada kun and 7 Witches",
//     "Blue Box",
//     "Fragrant Flowers Bloom With Dignity"

//   ];

//     const AnimeList = [
//     "Naruto",
//     "Attack On Titan",
//     "Frieren: Beyond Journey's End",
//     "One Piece",
//     "Oregairu",
//     "Tensura",
//     "Sword Art Online",
//     "Relife",
//     "Log Horizon",
//     "The Rising Of Shield Hero",
//     "Toradora",
//     "Death Note",
//     "Steins Gate",
//     "Code Geass",
//   ];

//     const LightNovelList = [
//     "Solo Leveling",
//     "Overlord",
//     "The Beginning After The End",
//     "Mushoku Tensei",
//     "Classroom of the Elite",
//     // Add more LN titles
//   ];

//   const MovieList = [
//     "Your Name",
//     "Spirited Away",
//     "Grave of the Fireflies",
//     "A Silent Voice",
//     "Howl's Moving Castle",
//     // Add more movie titles
//   ];

//   useEffect(() => {
//     const path = Loaction?.pathname || "";
//     const pathSeg=path.split("/").filter(seg=> seg);
//     console.log("PathSg: ",pathSeg[1])

//     const pathTab=pathSeg[1];
//         if (pathTab !== tab) {
//       setTab(pathTab);
//     }

//     // if (path.includes("anime")) setTab("anime");
//     // console.log("Tab: ", tab);
//     // console.log("Loacation: ", Loaction.pathname);
//   }, [Loaction]);

//     useEffect(() => {
//     console.log("Current tab: ", tab);
//   }, [tab]);

//   const getList=()=>{
//     switch(tab){
//       case "manga":
//         return MangaList
//       case "anime":
//         return AnimeList
//       case "lightnovel":
//         return LightNovelList
//       case "movie":
//         return MovieList
//       default:
//         return AnimeList
//     }
//   }
//   return (
//     <div>
//       {
//         <Manga DataList={getList()} tab={tab}/>
//     }

//     </div>
//   );
// };

// export default FavList;

import React, { useEffect, useState } from "react";
import Manga from "./Manga";
import { useLocation } from "react-router-dom";

const FavList = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  const lists = {
    manga: [
      "Relife",
      "Vinland Saga",
      "Boarding School Juliet",
      "Btooom",
      "Horimiya",
      "Vagabond manga",
      "Yamada kun and 7 Witches",
      "Blue Box",
      "Fragrant Flowers Bloom With Dignity",
    ],
    anime: [
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
    ],
    lightnovel: [
      "Solo Leveling",
      "Overlord",
      "The Beginning After The End",
      "Mushoku Tensei",
      "Classroom of the Elite",
    ],
    movie: [
      "Your Name",
      "Spirited Away",
      "Grave of the Fireflies",
      "A Silent Voice",
      "Howl's Moving Castle",
    ],
  };

  useEffect(() => {
    const path = location.pathname || "";
    const segments = path.split("/").filter(Boolean);

    // Get the last segment as tab
    const pathTab =
      segments.length > 0 ? segments[segments.length - 1] : "anime";

    console.log("URL path:", path);
    console.log("Detected tab:", pathTab);

    setTab(pathTab);
  }, [location]);

  const getList = () => {
    const currentTab = (tab || "anime").toLowerCase();

    if (currentTab.includes("manga")) return lists.manga;
    if (currentTab.includes("anime")) return lists.anime;
    if (currentTab.includes("lightnovel") || currentTab.includes("ln"))
      return lists.lightnovel;
    if (currentTab.includes("movie")) return lists.movie;

    return lists.anime; // Default
  };

  if (!tab) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div>
      <Manga DataList={getList()} tab={tab} key={tab} />
    </div>
  );
};

export default FavList;
