import React, { useEffect, useState } from "react";
import InputField from "../../components/UI/InputField";
import TextAreaField from "../../components/UI/TextAreaField";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import BASE_URL from "../../../utils/BASE_URL";
import { setIntro } from "../../../redux/PortfolioSlice";
import toast from "react-hot-toast";

const AdminIntro = () => {
  const dispatch = useDispatch();
  const IntroDataDefault = useSelector((state) => state.PortFolio.Intro);
  // useEffect(() => {
  //   console.log("IntroDataDefault: ", IntroDataDefault);
  // }, [IntroDataDefault]);

  const [IntroData, setIntroData] = useState({
    _id: IntroDataDefault._id || "",
    WelcomeMSG: IntroDataDefault.WelcomeMSG || "",
    FirstName: IntroDataDefault.FName || "",
    LastName: IntroDataDefault.LName || "",
    Caption: IntroDataDefault.Caption || "",
    Description: IntroDataDefault.Description || "",
  });

  const handleChange = (e) => {
    // console.log("e: ",e)
    // console.log("e: ",e.target.value)
    setIntroData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateCall = async (Data) => {
    try {
      const res = await axios.put(`${BASE_URL}UpdateIntro`, Data);
      // console.log("res: ", res);
      toast.success(res.data.MSG);
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("introData: ", IntroData);
    // console.log("e: ",e);
    // e.target.reset()
    // e.target.WelcomeMSG.value = "";
    // e.target.FirstName.value = "";
    // e.target.LastName.value = "";
    // e.target.Caption.value = "";
    // e.target.Description.value = "";
    dispatch(setIntro(IntroData));
    handleUpdateCall(IntroData);
    setIntroData({
      WelcomeMSG: "",
      FirstName: "",
      LastName: "",
      Caption: "",
      Description: "",
    });
  };
  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputField
          name={"WelcomeMSG"}
          label={"Welcome MSG"}
          placeholder={"Welcome MSG"}
          value={IntroData.WelcomeMSG}
          onChange={handleChange}
        />
        <InputField
          name={"FirstName"}
          label={"First Name"}
          placeholder={"First Name"}
          value={IntroData.FirstName}
          onChange={handleChange}
        />
        <InputField
          name={"LastName"}
          label={"Last Name "}
          placeholder={"Last Name"}
          value={IntroData.LastName}
          onChange={handleChange}
        />
        <InputField
          name={"Caption"}
          label={"Caption "}
          placeholder={"Caption"}
          value={IntroData.Caption}
          onChange={handleChange}
        />
        <TextAreaField
          name={"Description"}
          label={"Description "}
          placeholder={"Description"}
          value={IntroData.Description}
          onChange={handleChange}
        />
        <div className="flex justify-end ">
          <button className="px-10 py-1.5 bg-primary rounded-md text-white text-lg font-medium hover:scale-105 hover">
            SAVE
          </button>
        </div>
      </form>
    </>
  );
};

export default AdminIntro;
