import React from "react";

const SectionTitle = ({ title }) => {
  return (
    // <div className="flex justify-start">
    //   <h2 className="text-white text-4xl mr-[40px]">{title}</h2>
    //   <div className="flex  items-center">
    //     <div className="bg-tertiory h-[2px] w-[300px] inline-block"></div>
    //   </div>
    // </div>
    <div className="flex items-center w-full mt-[100px]">
      <h2 className="text-secondary text-2xl sm:text-4xl whitespace-nowrap">
        {title}
      </h2>
      <div className="bg-tertiory h-[2px] flex-grow w-[300px] mx-11"></div>
    </div>
  );
};

export default SectionTitle;
