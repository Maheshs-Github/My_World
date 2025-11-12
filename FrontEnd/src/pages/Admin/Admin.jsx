import React, { useState } from "react";
import Header from "../../components/Header";
import AdminIntro from "./AdminIntro";
import AdminAboutMe from "./AdminAboutMe";
import AdminExperience from "./AdminExperience";
import AdminEducation from "./AdminEducation";
import AdminProject from "./AdminProject";
import AdminContact from "./AdminContact";

const Admin = () => {
  const [tab, setTab] = useState("Intro");
  return (
    <div>
      {/* <h1>Admin</h1> */}
      {/* <Header /> */}
      <div className="px-[10px]  py-[10px] sm:py-[30px]">
        <button
          className={` text-2xl font-semibold cursor-pointer p-2 mr-4
          ${tab === "Intro" ? "border-b-primary  border-b-4" : null}`}
          onClick={() => setTab("Intro")}
        >
          Intro
        </button>
        <button
          className={` text-2xl font-semibold  cursor-pointer  p-2 mr-4 ${
            tab === "About" ? "border-b-primary  border-b-4" : null
          }`}
          onClick={() => setTab("About")}
        >
          About
        </button>
        <button
          className={` text-2xl font-semibold  cursor-pointer  p-2 mr-4 ${
            tab === "Experience" ? "border-b-primary  border-b-4" : null
          }`}
          onClick={() => setTab("Experience")}
        >
          Experience
        </button>
        <button
          className={` text-2xl font-semibold  cursor-pointer  p-2 mr-4 ${
            tab === "Education" ? "border-b-primary  border-b-4" : null
          }`}
          onClick={() => setTab("Education")}
        >
          Education
        </button>
               
                  <button
          className={` text-2xl font-semibold  cursor-pointer  p-2 mr-4 ${
            tab === "Project" ? "border-b-primary  border-b-4" : null
          }`}
          onClick={() => setTab("Project")}
        >
          Project
        </button>
                          <button
          className={` text-2xl font-semibold  cursor-pointer  p-2 mr-4 ${
            tab === "Contact" ? "border-b-primary  border-b-4" : null
          }`}
          onClick={() => setTab("Contact")}
        >
          Contact
        </button>
        
        <div className="pt-[10px] sm:pt-[30px] ">
          <div className="border-2 px-6 py-10">
            {tab === "Intro" ? <AdminIntro /> : null}
            {tab === "About" ? <AdminAboutMe /> : null}
            {tab === "Experience" ? <AdminExperience /> : null}
            {tab === "Education" ? <AdminEducation /> : null}
            {tab === "Project" ? <AdminProject /> : null}
            {tab === "Contact" ? <AdminContact /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
