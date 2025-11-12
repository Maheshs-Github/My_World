import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
// import { Experience } from "../../Resources/Data";
import { useSelector } from "react-redux";

const Experiences = ({ title }) => {
  const [expInx, setExpInx] = useState(0);
  const Experience=useSelector((state)=>state.PortFolio.Experiences)
  console.log("Experience: ",Experience)
  const current = Experience[expInx]; 
  return (
    <div>
      <SectionTitle title={title}></SectionTitle>
      <div className=" ">
        {/* <div className="my-[80px] mx-[15px] flex justify-between items-start text-white h[300px]">
          <div className="w-[35%]  flex flex-col gap-[30px] cursor-pointer  relative h-full">
            <div className="absolute top-0 left-[-10px] h-full w-[2px] bg-slate-400" />
            {Experience.map((Data, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setExpInx(index);
                    //             <div
                    //               className={`absolute left-0 top-[10px] h-[20px] w-[4px] rounded bg-white transition-all duration-300
                    //   ${index === expInx ? "bg-tertiory w-[6px]" : ""}
                    // `}
                    //             />;
                  }}
                  className={` text-2xl font-medium ${
                    index === expInx
                      ? "text-tertiory absolute left-0 top-[10px] h-[20px] w-[4px] rounded"
                      : "text-white"
                  }`}
                >
                  {Data.Time}
                </div>
              );
            })}
          </div>
          <div className="w-[65%]  flex flex-col  gap-[15px]">
            <div className="text-xl font-medium">{current.Role}</div>
            <div className="text-lg font-medium">{current.Company}</div>
            <div>{current.Description}</div>
          </div>
        </div> */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 xl:gap-20  py-20 w-full">
          <div className="text-white font-medium text-xl flex flex-row lg:flex-col gap-10 border-l-2 border-[#85d2f0] overflow-x-auto md:overflow-clip  ">
            {/* Explicit return */}
            {/* {Experience.map((Data) => {
              return (
                <div>
                  <h1>{Data.Time}</h1>
                </div>
              );
            })} */}
            {/* It is not a Explicit return but with the  () we can directly return , Implicit return*/}
            {Experience.map((Data, index) => (
              <div
                onClick={() => setExpInx(index)}
                className="cursor-pointer w-fit"
                key={index}
              >
                <h1
                  className={`text-xl px-5 py-3 text-nowrap ${
                    expInx === index
                      ? "border-tertiory text-tertiory border-l-4 -ml-[2px] bg-[#2fa4d32f] rounded-md"
                      : "text-white"
                  }`}
                >
                  {/* {Data.Time} */}
                  {Data.Period}
                </h1>
              </div>
            ))}
          </div>
          <div className=" text-white flex  flex-col gap-5 lg:gap-10 w-fit  ">
            <h2 className="text-2xl text-secondary font-medium">
              {current.Role}
            </h2>
            <h3 className="text-xl font-medium text-tertiory">
              {current.Company}
            </h3>
            <h3 className="text-md">{current.Description}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
