import React, { useEffect, useState } from "react";
import BASE_URL from "../../../utils/BASE_URL";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Intro = () => {
  // const [intro,setIntro]=useState([]);

  // setIntro(res.data.Data[0])
  const Intro=useSelector((state)=>state.PortFolio.Intro)
  console.log("Intro: ",Intro);


  return (
    <>

      <div className="sm:h-[71vh] h-[81vh] flex flex-col justify-evenly  gap-[10px] sm:gap-[0px]">
      {/* {console.log("intro: ",intro)} */}
      {/* <h2>Intro</h2> */}
      <p className="text-white ">{Intro.WelcomeMSG ||"Hello There, I am"}</p>
      <h2 className="text-secondary text-3xl sm:text-5xl font-medium md:text-6xl">
      {Intro.FName && Intro.LName?
      <>
     <span>{Intro.FName }</span> <span> {Intro.LName }</span> 
      </>:"Mahesh Mane"}
      </h2>
      <h2 className="text-white  text-2xl md:text-4xl lg:text-5xl sm:text-2xl font-medium ">
        {Intro.Caption || "I build things for the web in default"}
      </h2>
      <p className="text-white text-md/4 lg:w-[85%] xl:w-[50%] md:w-[85%] sm:w-[100%] sm:text-md/2 md:text-md/4">
        {Intro.Description || `I am FullStack Web Developer, Currently working as MERN Stack Developer
        Intern, I enjoyed learning new things from basics and build something
        solid even it is not that measure`}
      </p>
      <button className="text-tertiory border-tertiory border-2 py-2 px-4 rounded-md w-[170px] h-[50px] hover:bg-tertiory hover:text-white text-lg">
        Get Started 1
      </button>
    </div>
    </>
  );
};

export default Intro;
