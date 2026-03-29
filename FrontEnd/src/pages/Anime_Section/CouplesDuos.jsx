import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCoplsDuos } from "../../../redux/AnimeSlice";

// Skeleton Component for Couples/Duos
const CoupleDuoSkeleton = ({ type }) => {
  return (
    <div
      className={`flex ${
        type === "couple" ? "gap-6 items-center" : "gap-8"
      } bg-white rounded-3xl p-8 shadow-sm`}
    >
      <div className="flex flex-col items-center gap-3 flex-1">
        <div className="w-40 h-52 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse" />
        <div className="w-32 h-6 bg-gray-200 rounded-lg animate-pulse" />
      </div>
      <div className="flex items-center justify-center">
        <div
          className={`${
            type === "couple" ? "w-12 h-12" : "w-10 h-10"
          } bg-gray-200 rounded-full animate-pulse`}
        />
      </div>
      <div className="flex flex-col items-center gap-3 flex-1">
        <div className="w-40 h-52 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse" />
        <div className="w-32 h-6 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};

// Couple Card Component
const CoupleCard = ({ couple, onClick }) => {
  return (
    <div
      onClick={() => onClick(couple)}
      className="cursor-pointer bg-gradient-to-br from-pink-50 to-red-50 rounded-3xl p-8 
                 shadow-md hover:shadow-2xl transition-all duration-300 ease-out
                 transform hover:-translate-y-1 border-2 border-pink-100"
    >
      <div className="flex gap-6 items-center justify-center">
        <div className="flex flex-col items-center gap-3 flex-1 group">
          <div className="relative">
            <img
              src={couple.char1.Image}
              alt={couple.char1.Title}
              className="w-40 h-52 object-cover rounded-2xl shadow-lg
                       transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-center font-semibold text-lg text-gray-800 group-hover:text-pink-600 transition-colors">
            {couple.char1.Title}
          </h3>
        </div>
        <div className="flex items-center justify-center">
          <svg
            className="w-12 h-12 text-pink-500 animate-pulse"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="flex flex-col items-center gap-3 flex-1 group">
          <div className="relative">
            <img
              src={couple.char2.Image}
              alt={couple.char2.Title}
              className="w-40 h-52 object-cover rounded-2xl shadow-lg
                       transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-center font-semibold text-lg text-gray-800 group-hover:text-pink-600 transition-colors">
            {couple.char2.Title}
          </h3>
        </div>
      </div>
    </div>
  );
};

// Duo Card Component
const DuoCard = ({ duo, onClick }) => {
  return (
    <div
      onClick={() => onClick(duo)}
      className="cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 
                 shadow-md hover:shadow-2xl transition-all duration-300 ease-out
                 transform hover:-translate-y-1 border-2 border-blue-100"
    >
      <div className="flex gap-8 items-center justify-center">
        <div className="flex flex-col items-center gap-3 flex-1 group">
          <div className="relative">
            <img
              src={duo.char1.Image}
              alt={duo.char1.Title}
              className="w-40 h-52 object-cover rounded-2xl shadow-lg
                       transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-center font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
            {duo.char1.Title}
          </h3>
        </div>
        <div className="flex items-center justify-center">
          <svg
            className="w-10 h-10 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div className="flex flex-col items-center gap-3 flex-1 group">
          <div className="relative">
            <img
              src={duo.char2.Image}
              alt={duo.char2.Title}
              className="w-40 h-52 object-cover rounded-2xl shadow-lg
                       transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-center font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
            {duo.char2.Title}
          </h3>
        </div>
      </div>
    </div>
  );
};

// Main Component
const CouplesDuos = () => {
  const [fetchingMore, setFetchingMore] = useState(false);
  const [showDuos, setShowDuos] = useState(false);
  const [loadingCouples, setLoadingCouples] = useState(true);
  const [loadingDuos, setLoadingDuos] = useState(false);
  // Remove state for indices, use refs instead
  const currentCoupleIndexRef = useRef(0);
  const currentDuoIndexRef = useRef(0);
  const lastFetchTime = useRef(0);
  const isFetchingRef = useRef(false);
  const fetchChainStartedRef = useRef(false);

  const ColDuoData = useSelector((state) => state?.Anime?.CoplsDuo);
  const Dispatch = useDispatch();

  const couples = [
    ["Taki Tachibana", "Mitsuha Miyamizu"],
    ["Kazuto Kirigaya", "Asuna Yuuki"],
    ["Edward Elric", "Winry Rockbell"],
    ["Naruto Uzumaki", "Hinata Hyuga"],
  ];

  const duos = [
    ["Monkey D. Luffy", "Roronoa Zoro"],
    ["Gon Freecss", "Killua Zoldyck"],
    ["Natsu Dragneel", "Gray Fullbuster"],
    ["Goku", "Vegeta"],
  ];

  const FetchData = async () => {
    const totalPairs = couples.length + duos.length;
    const currentDataCount = ColDuoData.length;

    if (currentDataCount >= totalPairs) {
      console.log("Already have all data, skipping fetch");
      setLoadingDuos(false);
      setLoadingCouples(false);
      return;
    }
    if (isFetchingRef.current) {
      console.log("Already fetching, skipping...");
      return;
    }

    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTime.current;

    if (lastFetchTime.current > 0 && timeSinceLastFetch < 1100) {
      console.log("Rate limit protection - too fast");
      return;
    }

    try {
      isFetchingRef.current = true;
      setFetchingMore(true);
      lastFetchTime.current = Date.now();

      let pairToFetch;
      let pairType;

      // Use refs instead of state
      if (currentCoupleIndexRef.current < couples.length) {
        pairToFetch = couples[currentCoupleIndexRef.current];
        pairType = "couple";
        currentCoupleIndexRef.current += 1;
      } else if (currentDuoIndexRef.current < duos.length) {
        if (!showDuos) {
          setShowDuos(true);
          setLoadingCouples(false);
          setLoadingDuos(true);
        }
        pairToFetch = duos[currentDuoIndexRef.current];
        pairType = "duo";
        currentDuoIndexRef.current += 1;
      } else {
        // All data fetched
        setLoadingDuos(false);
        setLoadingCouples(false);
        isFetchingRef.current = false;
        setFetchingMore(false);
        return;
      }

      console.log("Fetching pair:", pairToFetch, "Type:", pairType);

      // Fetch with staggered requests
      const char1Res = await axios.get(
        `https://api.jikan.moe/v4/characters?q=${pairToFetch[0]}`
      );

      await new Promise((resolve) => setTimeout(resolve, 500));

      const char2Res = await axios.get(
        `https://api.jikan.moe/v4/characters?q=${pairToFetch[1]}`
      );

      const char1Data = {
        Title: char1Res?.data?.data[0]?.name,
        Image: char1Res?.data?.data[0]?.images?.webp?.image_url,
      };

      const char2Data = {
        Title: char2Res?.data?.data[0]?.name,
        Image: char2Res?.data?.data[0]?.images?.webp?.image_url,
      };

      const newPair = {
        char1: char1Data,
        char2: char2Data,
        type: pairType,
      };

      // Dispatch with callback to get current state
      Dispatch((dispatch, getState) => {
        const currentData = getState()?.Anime?.CoplsDuo || [];
        dispatch(setCoplsDuos([...currentData, newPair]));
      });
    } catch (error) {
      console.log("Error fetching data:", error);

      if (error.response?.status === 429) {
        console.log("Rate limited, waiting 2 seconds before retry...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } finally {
      // Schedule next fetch automatically
      const nextFetchDelay = 1100;

      setTimeout(() => {
        isFetchingRef.current = false;
        setFetchingMore(false);

        // Check if we should fetch more using refs
        const stillHasCouples = currentCoupleIndexRef.current < couples.length;
        const stillHasDuos = currentDuoIndexRef.current < duos.length;

        if (stillHasCouples || stillHasDuos) {
          FetchData();
        } else {
          // All data loaded
          setLoadingDuos(false);
          setLoadingCouples(false);
        }
      }, nextFetchDelay);
    }
  };

  // Start fetching chain when component mounts
  // Add a ref to track if data has been fetched
  const hasFetchedRef = useRef(false);

  // Update your useEffect that starts the fetch
  useEffect(() => {
    // Check if we have data AND if we haven't fetched yet
    if (
      ColDuoData.length === 0 &&
      !fetchChainStartedRef.current &&
      !hasFetchedRef.current
    ) {
      fetchChainStartedRef.current = true;
      hasFetchedRef.current = true; // Mark as fetched
      console.log("Starting fetch chain...");

      // Start fetching immediately
      FetchData();
    }
  }, [ColDuoData]);

  // Also update your skeleton trigger effect to check hasFetchedRef
  useEffect(() => {
    if (
      (loadingCouples || loadingDuos) &&
      !isFetchingRef.current &&
      !fetchingMore &&
      hasFetchedRef.current
    ) {
      const stillHasCouples = currentCoupleIndexRef.current < couples.length;
      const stillHasDuos = currentDuoIndexRef.current < duos.length;

      if (
        (loadingCouples && stillHasCouples) ||
        (loadingDuos && stillHasDuos)
      ) {
        const timer = setTimeout(() => {
          if (!isFetchingRef.current && !fetchingMore) {
            FetchData();
          }
        }, 200);

        return () => clearTimeout(timer);
      }
    }
  }, [loadingCouples, loadingDuos, ColDuoData]);

  const handleClick = (data) => {
    console.log("Clicked:", data);
  };

  // In your render, update how you show skeletons
  const couplesData = ColDuoData.filter((item) => item.type === "couple");
  const duosData = ColDuoData.filter((item) => item.type === "duo");

  // Calculate how many skeletons to show - FIXED LOGIC
  const couplesSkeletonsToShow = loadingCouples
    ? Math.max(0, 2 - (couplesData.length % 2))
    : 0;

  const duosSkeletonsToShow = loadingDuos
    ? Math.max(0, 2 - (duosData.length % 2))
    : 0;

  // But also check if we actually need skeletons
  const needCouplesSkeletons =
    loadingCouples && couplesData.length < couples.length;
  const needDuosSkeletons = loadingDuos && duosData.length < duos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Favorite Couples & Duos
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Legendary partnerships from anime
        </p>

        {/* Couples Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-pink-600 mb-8 flex items-center gap-3">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Romantic Couples
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {couplesData.map((couple, idx) => (
              <CoupleCard key={idx} couple={couple} onClick={handleClick} />
            ))}
            {needCouplesSkeletons &&
              Array.from({ length: couplesSkeletonsToShow }).map((_, i) => (
                <CoupleDuoSkeleton key={`couple-skeleton-${i}`} type="couple" />
              ))}
          </div>
        </section>

        {/* Duos Section */}
        {(duosData.length > 0 || loadingDuos) && (
          <section>
            <h2 className="text-3xl font-bold text-blue-600 mb-8 flex items-center gap-3">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Epic Duos
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {duosData.map((duo, idx) => (
                <DuoCard key={idx} duo={duo} onClick={handleClick} />
              ))}
              {needDuosSkeletons &&
                Array.from({ length: duosSkeletonsToShow }).map((_, i) => (
                  <CoupleDuoSkeleton key={`duo-skeleton-${i}`} type="duo" />
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CouplesDuos;
