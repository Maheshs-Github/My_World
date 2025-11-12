import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
// import { ProjectsData } from "../../Resources/Data";
import { useSelector } from "react-redux";

const Projects = ({ title }) => {
  const [proInx, setProInx] = useState(0);
  const ProjectsData = useSelector((state) => state.PortFolio.Projects);
  const current = ProjectsData[proInx];
  return (
    <div>
      <SectionTitle title={title}></SectionTitle>
      <div className=" ">
        <div className="flex flex-col lg:flex-row justify-between gap-16 xl:gap-20  py-20 w-full">
          <div className="text-white font-medium text-xl flex flex-row lg:flex-col gap-10 border-l-2 border-[#85d2f0] overflow-x-auto lg:overflow-clip  ">
            {ProjectsData.map((Data, index) => (
              <div
                onClick={() => setProInx(index)}
                className="cursor-pointer w-fit"
                key={index}
              >
                <h1
                  className={`text-xl px-5 py-3 text-nowrap ${
                    proInx === index
                      ? "border-tertiory text-tertiory border-l-4 -ml-[2px] bg-[#2fa4d32f] rounded-md"
                      : "text-white"
                  }`}
                >
                  {Data.Title}
                </h1>
              </div>
            ))}
          </div>
          <div className="flex xl:flex-row flex-col gap-5">
            <img
              // src={current.Image}
              src={current.ProjectImgURL}
              alt="Project Image "
              className="max-w-72 object-contain"
            />
            <div className=" text-white flex  flex-col gap-5 lg:gap-10 w-fit  ">
              <h2 className="text-2xl text-secondary font-medium">
                {current.Title}
              </h2>
              <h3 className="text-xl font-medium text-tertiory">
                {/* {current.Description} */}
                {current.ProjectSummary}
              </h3>
              <h3 className="text-md">
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                quasi quam, dolor hic, eum delectus porro libero sit, doloremque
                dolorem fugiat asperiores quisquam iusto possimus unde nihil
                nulla aliquam vitae. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Eum beatae asperiores necessitatibus porro
                quas sunt ab, culpa quae, quis modi sit quisquam tenetur velit
                est impedit inventore veniam, officiis cupiditate. */}
                {current.ProjectDescription}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
