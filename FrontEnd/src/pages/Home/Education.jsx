import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { EducationData } from "../../Resources/Data";
import { useSelector } from "react-redux";

const Education = ({ title }) => {
  const EducationData=useSelector((state)=>state.PortFolio.Education)
  const [eduInx, setEduInx] = useState(0);
  const current = EducationData[eduInx];
  return (
    <div>
      <SectionTitle title={title}></SectionTitle>
      <div className=" ">
        <div className="flex flex-col lg:flex-row justify-between gap-16 xl:gap-20  py-20 w-full">
          <div className="text-white font-medium text-xl flex flex-row lg:flex-col gap-10 border-l-2 border-[#85d2f0] overflow-x-auto lg:overflow-clip  ">
            {EducationData.map((Data, index) => (
              <div
                onClick={() => setEduInx(index)}
                className="cursor-pointer w-fit"
                key={index}
              >
                {/* {console.log("Data: ", Data)} */}
                <h1
                  className={`text-xl px-5 py-3 text-nowrap truncate max-w-xs ${
                    eduInx === index
                      ? "border-tertiory text-tertiory border-l-4 -ml-[2px] bg-[#2fa4d32f] rounded-md "
                      : "text-white"
                  }`}
                >
                  {Data.CourseTitle}
                </h1>
              </div>
            ))}
          </div>
          <div className=" text-white flex  flex-col gap-5 lg:gap-10 w-fit  ">
            <h2 className="text-2xl text-secondary font-medium">
              {current.CourseTitle}
            </h2>
            <h3 className="text-xl font-medium text-tertiory">
              {current.SchoolorCollgeName}
            </h3>
            <div className="flex gap-5 items-center">
            <div className="flex gap-2 items-center">
              {" "}
              <span className="bg-white w-2 h-2 rounded-[50%]"></span>
              <span>{current.StartYear}</span>
            </div>
            <div className="bg-white w-5 h-1"></div>
            <div className="flex gap-2 items-center">
              <span className="bg-white w-2 h-2 rounded-[50%]"> </span>{" "}
              <span>{current.EndYear}</span>
            </div>
            </div>
            <h2>
              {current.PercentageOrCGPA}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
