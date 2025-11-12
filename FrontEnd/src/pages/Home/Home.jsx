import React, { useEffect } from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import About from "./About";
import SectionInfo from "./Experiences";
import Experiences from "./Experiences";
import Contact from "./Contact";
import Footer from "./Footer";
import LeftSocialSideBar from "./LeftSocialSideBar";
import Loader from "../../components/Loader";
import { useState } from "react";
import Projects from "./Projects";
import Education from "./Education";
// import axios from "axios";
// import BASE_URL from "../../../utils/BASE_URL";
// import { useDispatch } from "react-redux";
// import { setAboutMe, setContact, setEducation, setExperiences, setIntro, setProjects } from "../../../redux/PortfolioSlice";
// import toast from "react-hot-toast";

const Home = () => {
  // const [loading, setLoading] = useState(true);
  // const Dispatch=useDispatch();
  //   useEffect(() => {
  //   FetchIntro();
  //   FetchAboutMe();
  //   FetchExperience();
  //   setTimeout(()=>setLoading(false),2000)
  // }, []);

  // const FetchIntro = async () => {
  //   // console.log("BASE_URL: ", BASE_URL);
  //   const res = await axios.get(`${BASE_URL}getIntro`);
  //   // console.log("res: ", res.data.Data[0]);
  //   Dispatch(setIntro(res.data.Data[0]))
  // };
  // const FetchAboutMe=async()=>{
  //   const res= await axios.get(`${BASE_URL}GetAboutMe`);
  //   console.log("res: ",res);
  //   Dispatch(setAboutMe(res.data.Data[0]));
  // }
  // const FetchExperience=async()=>{
  //   const res=await axios.get(`${BASE_URL}GetExperience`)
  //   console.log("res: ",res);
  //   Dispatch(setExperiences(res.data.Data))
  // }

  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     try {
  //       const [introRes, aboutRes, expRes,proRes,eduRes,conRes] = await Promise.all([
  //         axios.get(`${BASE_URL}getIntro`),
  //         axios.get(`${BASE_URL}GetAboutMe`),
  //         axios.get(`${BASE_URL}GetExperience`),
  //         axios.get(`${BASE_URL}GetProject`),
  //         axios.get(`${BASE_URL}GetEducation`),
  //         axios.get(`${BASE_URL}GetContact`)
  //       ]);

  //       Dispatch(setIntro(introRes.data.Data?.[0] || {}));
  //       Dispatch(setAboutMe(aboutRes.data.Data?.[0] || {}));
  //       Dispatch(setExperiences(expRes.data?.Data || []));
  //       Dispatch(setProjects(proRes.data?.Data || []));
  //       Dispatch(setEducation(eduRes.data?.Data || []));
  //       Dispatch(setContact(conRes.data?.Data[0] || {}))
  //       toast.success("All Data has been fetched Successfully");
  //     } catch (error) {
  //       toast.error("❌ Error fetching data")
  //       console.error("❌ Error fetching data:", error);
  //     } finally {
  //       // ✅ Loader stops only after all API calls finish
  //       setLoading(false);
  //     }
  //   };

  //   fetchAllData();
  // }, [Dispatch]);


  return (
    // <div className="overflow-x-hidden">
    //   {loading ? <Loader />:
    //   <>
    //   <Header></Header>
      <div className="w-screen bg-primary px-[20px] pt-[30px] sm:px-[150px] sm:pt-[80px] ">
        <Intro></Intro>
        <About></About>
        <Experiences title={"Experiences"} />
        <Projects title={"Projects"} />
        {/* <Education title={"Education"} /> */}
        <Education title={"Education"} />
        <Contact title={"Say Hello"} />
        <Footer />
        <LeftSocialSideBar />
      </div>
    //   </>
    //      }
    // </div>
  );
};

export default Home;
