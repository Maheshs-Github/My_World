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
import { setAboutMe, setContact, setEducation, setExperiences, setIntro, setProjects } from "../redux/PortfolioSlice";
import Loader from "./components/Loader";

const App = () => {
    const [loading, setLoading] = useState(true);
  const Dispatch=useDispatch();
    useEffect(() => {
      const fetchAllData = async () => {
        try {
          const [introRes, aboutRes, expRes,proRes,eduRes,conRes] = await Promise.all([
            axios.get(`${BASE_URL}getIntro`),
            axios.get(`${BASE_URL}GetAboutMe`),
            axios.get(`${BASE_URL}GetExperience`),
            axios.get(`${BASE_URL}GetProject`),
            axios.get(`${BASE_URL}GetEducation`),
            axios.get(`${BASE_URL}GetContact`)
          ]);
  
          Dispatch(setIntro(introRes.data.Data?.[0] || {}));
          Dispatch(setAboutMe(aboutRes.data.Data?.[0] || {}));
          Dispatch(setExperiences(expRes.data?.Data || []));
          Dispatch(setProjects(proRes.data?.Data || []));
          Dispatch(setEducation(eduRes.data?.Data || []));
          Dispatch(setContact(conRes.data?.Data[0] || {}))
          toast.success("All Data has been fetched Successfully");
        } catch (error) {
          toast.error("❌ Error fetching data")
          console.error("❌ Error fetching data:", error);
        } finally {
          // ✅ Loader stops only after all API calls finish
          setLoading(false);
        }
      };
  
      fetchAllData();
    }, [Dispatch]);
  return (
    <div>
      <Toaster
        position="top-center"
        containerStyle={{
          margin: "60px", // or padding: '40px'
        }}
        reverseOrder={false}
      />
          <div className="overflow-x-hidden">
      {loading ? <Loader />:
      <>
      <Header></Header>
      <div className="w-screen bg-primary px-[20px] pt-[30px] sm:px-[150px] sm:pt-[80px]"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      </>
      }
      </div>
    </div>
  );
};

export default App;

//let's see about that Git Company Level flow, For PR are we selecting proper branch , when get time
//Also Shortcut for Find-> ctrl + F, replace-> ctrl + H(Actually it opened both Search and replace ones too )
// ctrl+ shift + F (To find in a file ), ctrl+ shift + E ->For File Section
// https://youtu.be/pdtzmGFoXSI?si=Ye6xpVhrW1vIgeeU
//Our Skills is Array so we don't need the to destruct it
// This is Nice effort, If we have the icon and when we hover on it, it is get filled
//Let's understand about the timeine code in experience
// So to make the content reponsive which approch is good setting , setting width to both or just setting to 1st then 2nd one will be have after the gap, what do u think GPT, what should i can try here

// Breakpoint prefix	Minimum width	CSS
// sm	40rem (640px)	@media (width >= 40rem) { ... }
// md	48rem (768px)	@media (width >= 48rem) { ... }
// lg	64rem (1024px)	@media (width >= 64rem) { ... }
// xl	80rem (1280px)	@media (width >= 80rem) { ... }
// 2xl	96rem (1536px)	@media (width >= 96rem) { ... }
