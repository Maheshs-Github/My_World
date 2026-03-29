import React, { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Admin from "./pages/Admin/Admin";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/BASE_URL";
import {
  setAboutMe,
  setContact,
  setEducation,
  setExperiences,
  setIntro,
  setProjects,
} from "../redux/PortfolioSlice";
import Loader from "./components/Loader";
import Auth from "./components/Auth/Auth";
import LogIn from "./components/Auth/LogIn";
import SignUp from "./components/Auth/SignUp";
import Anime from "./pages/Anime_Section/Anime";
import { useLocation } from "react-router-dom";
import AnimeCard from "./pages/Anime_Section/AnimeCard";
import Anime_outlet from "./pages/Anime_Section/Anime_outlet";
import Manga from "./pages/Anime_Section/Manga";
import AllAnimeSection from "./pages/Anime_Section/AllAnimeSection";
import AllAnimeSection1 from "./pages/Anime_Section/AllAnimeSection1";
import Chars from "./pages/Anime_Section/Chars";
import CouplesDuos from "./pages/Anime_Section/CouplesDuos";
import FavList from "./pages/Anime_Section/FavList";
import AnimeList from "./pages/Anime_Section/AnimeList";
import MangaList from "./pages/Anime_Section/MangaList";
import LNList from "./pages/Anime_Section/LNList";
import MovieList from "./pages/Anime_Section/MovieList";
import AllAnime from "./pages/Anime_Section/AllAnime";
import DramaList from "./pages/Anime_Section/DramaList";

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const Dispatch = useDispatch();
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [introRes, aboutRes, expRes, proRes, eduRes, conRes] =
          await Promise.all([
            axios.get(`${BASE_URL}getIntro`),
            axios.get(`${BASE_URL}GetAboutMe`),
            axios.get(`${BASE_URL}GetExperience`),
            axios.get(`${BASE_URL}GetProject`),
            axios.get(`${BASE_URL}GetEducation`),
            axios.get(`${BASE_URL}GetContact`),
          ]);

        Dispatch(setIntro(introRes.data.Data?.[0] || {}));
        Dispatch(setAboutMe(aboutRes.data.Data?.[0] || {}));
        Dispatch(setExperiences(expRes.data?.Data || []));
        Dispatch(setProjects(proRes.data?.Data || []));
        Dispatch(setEducation(eduRes.data?.Data || []));
        Dispatch(setContact(conRes.data?.Data[0] || {}));
        toast.success("All Data has been fetched Successfully");
      } catch (error) {
        toast.error(" Error fetching data");
        console.error(" Error fetching data:", error);
      } finally {
        // ✅ Loader stops only after all API calls finish
        setLoading(false);
      }
    };

    fetchAllData();
  }, [Dispatch]);
  return (
    <div>
      {/* <BrowserRouter> */}
      <Toaster
        position="top-center"
        containerStyle={{
          margin: "60px", // or padding: '40px'
        }}
        reverseOrder={false}
      />
      <div className="overflow-x-hidden font-over">
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* {!location.pathname.startsWith("/anime") ? (
              <>
                {" "} */}
                <Header></Header>
                <div className="w-screen bg-primary "></div>{" "}
              {/* </>
            ) : null} */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />}>
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<LogIn />} />
              </Route>
                <Route path="/details" element={<AnimeCard />} />
              <Route path="/animeWorld" element={<Anime_outlet />}>
                <Route path="" element={<AllAnimeSection1 />} />
                {/* <Route path="anime" element={<FavList />} />
                <Route path="manga" element={<FavList />} />
                <Route path="lightnovel" element={<FavList />} />*/}
                <Route path="drama" element={<DramaList />} /> 
                <Route path="all" element={<AllAnime />} />
                <Route path="anime" element={<AnimeList />} />
                <Route path="manga" element={<MangaList />} />
                <Route path="lightnovel" element={<LNList />} />
                <Route path="movie" element={<MovieList />} />

                <Route path="chars" element={<Chars />} />
                <Route path="coplsDuo" element={<CouplesDuos />} />
                {/* <Route path="section" element={<AllAnimeSection />} /> */}
              </Route>
            </Routes>
          </>
        )}
      </div>
      {/* </BrowserRouter> */}
    </div>
  );
};

export default App;
