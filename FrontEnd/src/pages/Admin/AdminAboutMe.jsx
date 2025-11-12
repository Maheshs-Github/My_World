import React, { useEffect, useState } from "react";
import InputField from "../../components/UI/InputField";
import TextAreaField from "../../components/UI/TextAreaField";
import { MdOutlineClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../../../utils/BASE_URL";
import { setAboutMe } from "../../../redux/PortfolioSlice";
import toast from "react-hot-toast";

const AdminAboutMe = () => {
  const Dispatch=useDispatch()
  const AboutData = useSelector((state) => state.PortFolio.AboutMe);
  // const [Skills, setSkill] = useState([]);
  const [about, setAbout] = useState({
    _id:AboutData._id || "",
    Description: AboutData.Description || "",
    Skills: AboutData.Skills || [],
  });
  useEffect(() => {
    // console.log("Skills: ", Skills);
    // console.log("AboutData: ", AboutData);
    // console.log("About: ", about);
  }, [about]);
  const handleKeyDown = (e) => {
    // console.log("e: ",e);
    if (e.key === "Enter") {
      // console.log("e.target.value: ", e.target.value);
      const NewSkill = e.target.value;
      setAbout((prev) => ({ ...prev, Skills:[...prev.Skills,NewSkill] }));
      // console.log("Skills: ", Skills);
      e.target.value = "";
    }
  };
  const handleDeleteSkill = (DSkill) => {
    // console.log("DESKill: ", DSkill);
    setAbout((prev) => ({
      ...prev,
      Skills: about.Skills.filter((skills) => skills !== DSkill),
    }));
  };
  const handleAPICall=async(Data)=>{
    try {
      const res= await axios.put(`${BASE_URL}UpdateAboutMe`,Data);
      console.log("res: ",res)
      toast.success(res.data.MSG)
    } catch (error) {
      console.log("There is been Error: ",error);
      toast.error("Error Occured Updating About")

    }

  }
  const handleAbout = () => {
    console.log("About : ", about);
    handleAPICall(about);
    Dispatch(setAboutMe(about))
    setAbout({
      Description:"",
      Skills:[]
    })
  };
  const handleDescChnage = (e) => {
    // console.log(e.target.value);
    // console.log("About: ",about.Description)
    setAbout((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        {/* <InputField name={"Skills"} label={"Skills"} /> */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="Skills" className="font-medium">
            Skills
          </label>
          <div className="flex gap-2">
            {about.Skills.map((data, index) => {
              return (
                <span
                  className="p-2 rounded-lg border-2 text-gray-600 bg-white w-fit flex gap-2  items-center"
                  key={index}
                >
                  <span className="">{data}</span>
                  <MdOutlineClear
                    size={20}
                    onClick={() => handleDeleteSkill(data)}
                    className="cursor-pointer"
                  />
                </span>
              );
            })}
          </div>
          <input
            type="text"
            name="Skills"
            className="p-2 border-2 rounded-sm"
            onKeyDown={handleKeyDown}
            placeholder="Enter Skills"
          />
        </div>
        <TextAreaField
          name={"Description"}
          label={"Description "}
          placeholder={"Enter the Description"}
          value={about.Description}
          onChange={handleDescChnage}
        />
        <div className="flex justify-end ">
          <button
            className="px-10 py-1.5 bg-primary rounded-md text-white text-lg font-medium hover:scale-105 hover"
            onClick={handleAbout}
          >
            SAVE
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminAboutMe;
