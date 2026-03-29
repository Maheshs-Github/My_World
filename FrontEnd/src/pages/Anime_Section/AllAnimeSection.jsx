// import React, { useState } from 'react'

// const AllAnimeSection = () => {

//   const [loading,setLoading]=useState(false);
//   const []
//   const All={
//     Section:"Romance-School (Slice Of Life)",
//     Titles:[
//         "Oregairu",
//   "ReLIFE",
//   "Tsurezure Children",
//   "Horimiya (Manga & Anime)",
//   "Boarding School Juliet (Manga & Anime)",
//   "Komi San",
//   "3D Girlfriend",
//   "When Ayumu Will Make His Move",
//   "Loving Yamada-kun",
//   "Kubo Won’t Let Me Be Invisible",
//   "Rascal Does Not Dream of Bunny Girl Senpai",
//   "From Me to You",
//   "Tonikawa: Over the Moon for You",
//   "Golden Time",
//   "Tsuki ga Kirei",
//   "Nisekoi",
//   "Your Lie in April",
//   "Clannad",
//   "Toradora",
//   "Kaguya-sama: Love Is War",
//   "Ao Haru Ride",
//   "Domestic Girlfriend",
//   "Kokoro Connect",
//   "Insomniacs After School",
//   "Shikimori-san",
//   "Masamune-kun’s Revenge",
//   "Maid Sama",
//   "My Little Monster",
//   "Wolf Girl & Black Prince",
//   "Tamako Market",
//   "Koikimo",
//     ]
//   }




//     const fetchNextBatch = async () => {
  
//       try {
//         setLoading(true);
  
//         const responses = await Promise.all(
//           batch.map((name) =>
//             axios.get(
//               `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
//                 name
//               )}&page[limit]=1`
//             )
//           )
//         );
  
//         // Transform the data
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
  
  
//       } catch (err) {
//         console.error("Error fetching anime:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//   return (
//     <div>
//             {/* Anime Grid */}
//       <div className="grid grid-cols-3 py-10 px-4 gap-8">
//         {animeData?.map((Data, idx) => (
//           <div
//             key={`${Data.Title}-${idx}`}
//             onClick={() => handleAnimeDetails(Data)}
//             className="cursor-pointer flex flex-col gap-2 items-center"
//           >
//             <img
//               src={Data.Image}
//               alt={Data.Title}
//               className="object-cover w-96 h-[400px] border rounded"
//             />
//             <h2 className="text-center font-semibold text-lg hover:text-secondary">
//               {Data.Title}
//             </h2>
//           </div>
//         ))}
//       </div>

//       {/* Loading Skeletons */}
//       {loading && (
//         <div className="grid grid-cols-3 gap-8 px-4 pb-10">
//           {Array.from({ length: BATCH_SIZE }).map((_, i) => (
//             <AnimeSkeletonCard key={i} />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllAnimeSection



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AnimeSkeletonCard from './AnimeSkeletonCard';

// ==================== DATA STRUCTURE ====================
const SECTIONS = [
  {
    id: 'romance-school',
    title: 'Romance-School (Slice Of Life)',
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
    ]
  },
  {
    id: 'romance-fantasy',
    title: 'Romance - Fantasy',
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
    ]
  },
  {
    id: 'action-adventure',
    title: 'Action & Adventure',
    anime: [
      "Attack on Titan",
      "One Piece",
      "Naruto",
      "Demon Slayer",
      "Jujutsu Kaisen",
      "Hunter x Hunter",
      "My Hero Academia",
      "Bleach",
      "Fullmetal Alchemist",
      "Chainsaw Man",
    ]
  },
  {
    id: 'isekai',
    title: 'Isekai & Fantasy',
    anime: [
      "Sword Art Online",
      "Re:Zero",
      "That Time I Got Reincarnated as a Slime",
      "Overlord",
      "Konosuba",
      "No Game No Life",
      "Log Horizon",
      "The Rising of the Shield Hero",
      "Mushoku Tensei",
      "Ascendance of a Bookworm",
    ]
  },
];

// ==================== ANIME CARD COMPONENT ====================
const AnimeCard = ({ data, onClick }) => (
  <div
    onClick={onClick}
    className="flex-shrink-0 w-[200px] cursor-pointer group"
  >
    <div className="relative overflow-hidden rounded-lg">
      <img
        src={data.Image || 'https://via.placeholder.com/200x300?text=No+Image'}
        alt={data.Title}
        className="w-full h-[280px] object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
      {data.Title}
    </h3>
    {data.Score && (
      <p className="text-xs text-gray-400 mt-1">
        ⭐ {data.Score}
      </p>
    )}
  </div>
);

// ==================== SKELETON CARD ====================
const HorizontalSkeleton = () => (
  <div className="flex-shrink-0 w-[200px] animate-pulse">
    <div className="bg-gray-700 h-[280px] rounded-lg" />
    <div className="bg-gray-700 h-4 rounded w-3/4 mt-2" />
  </div>
);

// ==================== SINGLE SECTION COMPONENT ====================
const AnimeSection = ({ section, animeData, loading, onViewAll }) => {
  const navigate = useNavigate();

  const handleAnimeClick = (anime) => {
    navigate(`/details`, { state: { Data: anime } });
  };

  return (
    <div className="mb-10">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-4 px-6">
        <h2 className="text-2xl font-bold text-white">{section.title}</h2>
        <button
          onClick={() => onViewAll(section)}
          className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
        >
          View All →
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative px-6">
        <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-4">
          {loading ? (
            // Show 5 skeleton cards while loading
            Array.from({ length: 5 }).map((_, i) => <HorizontalSkeleton key={i} />)
          ) : (
            animeData.map((anime, idx) => (
              <AnimeCard
                key={`${section.id}-${idx}`}
                data={anime}
                onClick={() => handleAnimeClick(anime)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const AllAnimeSection = () => {
  const navigate = useNavigate();
  const [sectionsData, setSectionsData] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  // Fetch data for a specific section
  const fetchSectionData = async (section) => {
    const sectionId = section.id;
    
    // Don't fetch if already loaded
    if (sectionsData[sectionId]?.length > 0) return;

    try {
      setLoadingStates(prev => ({ ...prev, [sectionId]: true }));

      // Fetch first 5 anime for horizontal scroll preview
      const responses = await Promise.all(
        section.anime.slice(0, 5).map((name) =>
          axios.get(
            `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
              name
            )}&page[limit]=1`
          )
        )
      );

      const animeList = responses
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

      setSectionsData(prev => ({
        ...prev,
        [sectionId]: animeList
      }));

    } catch (err) {
      console.error(`Error fetching ${sectionId}:`, err);
    } finally {
      setLoadingStates(prev => ({ ...prev, [sectionId]: false }));
    }
  };

  // Fetch all sections on mount
  useEffect(() => {
    SECTIONS.forEach(section => fetchSectionData(section));
  }, []);

  const handleViewAll = (section) => {
    // Navigate to full section page
    navigate(`/anime/section/${section.id}`, { 
      state: { 
        section: section,
        allAnime: section.anime 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-4xl font-bold text-white px-6 mb-8">
          Browse Anime
        </h1>

        {/* Render each section with horizontal scroll */}
        {SECTIONS.map((section) => (
          <AnimeSection
            key={section.id}
            section={section}
            animeData={sectionsData[section.id] || []}
            loading={loadingStates[section.id]}
            onViewAll={handleViewAll}
          />
        ))}
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;   
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default AllAnimeSection;