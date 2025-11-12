import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-primary">
    <div className="text-6xl font-bold flex gap-6 ">
      <p className="text-secondary M1">M</p>
      <p className="text-white M2">M</p>
      <p className="text-tertiory M3">M</p>
    </div>
    </div> 
  );
};

export default Loader;
