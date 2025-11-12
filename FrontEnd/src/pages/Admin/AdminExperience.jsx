import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/UI/InputField";
import { useState } from "react";
import TextAreaField from "../../components/UI/TextAreaField";
import Icons from "../../Icons/Icons";
import axios from "axios";
import BASE_URL from "../../../utils/BASE_URL";
import toast from "react-hot-toast";
import { setExperiences } from "../../../redux/PortfolioSlice";

const AdminExperience = () => {
  const Dispatch = useDispatch();

  const ExperienceData = useSelector((state) => state.PortFolio.Experiences);

  // console.log("ExperienceData: ", ExperienceData);
  const [addExperience, setAddExperience] = useState({
    _id: "",
    Role: "",
    Period: "",
    Company: "",
    Description: "",
  });
  const [popUp, setPopUp] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleInputChnage = (e) => {
    setAddExperience((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async () => {
    try {
      // console.log("addExperience: ", addExperience);
      const res = await axios.post(`${BASE_URL}PostExperience`, addExperience);
      // console.log("res: ", res);
      Dispatch(setExperiences([...ExperienceData, res.data.Data]));
      toast.success(res.data.MSG);
      setAddExperience({
        Role: "",
        Period: "",
        Company: "",
        Description: "",
      });
      setPopUp(false);
    } catch (error) {
      console.log("There is been Error: ", error);
      toast.error("There is been Error");
    }
  };
  const handleCancel = () => {
    setEdit(false);
    setAddExperience({
      Role: "",
      Period: "",
      Company: "",
      Description: "",
    });
  };
  const handleEdit = (Id) => {
    // if(ExperienceData?._id===Id)console.log("ExperienceData: ",ExperienceData)
    const EditingExp = ExperienceData.filter((Data) => Data._id === Id);
    console.log("EditingExp: ", EditingExp);
    console.log("EditingExp: ", EditingExp[0]?.Role);
    setAddExperience({
      _id: EditingExp[0]._id,
      Role: EditingExp[0].Role,
      Period: EditingExp[0].Period,
      Company: EditingExp[0].Company,
      Description: EditingExp[0].Description,
    });
    setPopUp(true);
  };
  const handleUpdate = async () => {
    try {
      console.log("addExperience: ", addExperience);
      const res = await axios.put(`${BASE_URL}UpdateExperience`, addExperience);
      console.log("res: ", res);
      const NonEditedExp = ExperienceData.filter(
        (Data) => Data._id !== res.data.Data._id
      );
      Dispatch(setExperiences([...NonEditedExp, res.data.Data]));
      setAddExperience({
        Role: "",
        Period: "",
        Company: "",
        Description: "",
      });
      toast.success(res.data.MSG);
      setPopUp(false);
      setEdit(false);
    } catch (error) {
      console.log("Internal Error ", error);
      toast.error("Internal Error");
    }
  };
  const handleDelete = async (id) => {
    try {
      // console.log("_id: ", id);
      const res = await axios.delete(`${BASE_URL}DeleteExperience/${id}`);
      // console.log("res: ", res);
      const NewExp = ExperienceData.filter((Data) => Data._id !== id);
      Dispatch(setExperiences(NewExp));
      toast.success(res.data.MSG);
    } catch (error) {
      console.log("There is been Error: ", error);
      toast.error("Theer is been Error While Deleting ");
    }
  };
  return (
    <div>
      <div className="flex justify-end ">
        <button
          className="px-10 py-1.5 bg-primary rounded-md text-white text-lg font-medium hover:scale-105 mb-6"
          onClick={() => setPopUp(true)}
        >
          Add Experience
        </button>
      </div>
      <div className="flex gap-4 items-center flex-wrap">
        {ExperienceData?.map((Data, index) => {
          return (
            <div
              className="p-6 border-2 flex flex-col gap-2 text-xl"
              key={index}
            >
              <h2 className="font-bold text-2xl">{Data?.Period}</h2>
              <hr />
              <p>Company: {Data?.Company} </p>
              <p>Role: {Data?.Role}</p>
              <p className="text-lg">{Data?.Description}</p>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="px-10 py-1.5 bg-primary-red rounded-md text-white text-lg font-medium hover:scale-105 hover"
                  onClick={() => handleDelete(Data._id)}
                >
                  Delete
                </button>
                <button
                  className="px-10 py-1.5 bg-primary rounded-md text-white text-lg font-medium hover:scale-105 hover"
                  onClick={() => {
                    handleEdit(Data?._id);
                    setEdit(true);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {popUp && (
        <div className="fixed inset-0 bg-opacity-50 bg-black z-50 flex items-center justify-center">
          <div className="bg-white p-6 sm:w-[550px] rounded-md">
            <div className="flex justify-between mb-4">
              <p className="text-lg font-semibold">Add Experience</p>
              <Icons.Clear
                size={24}
                onClick={() => {
                  setPopUp(false);
                  handleCancel();
                }}
                className="cursor-pointer"
              />
            </div>
            <hr className="mb-6" />
            <InputField
              name={"Role"}
              placeholder={"Role"}
              label={"Role"}
              onChange={handleInputChnage}
              value={addExperience.Role}
            />
            <InputField
              name={"Company"}
              label={"Company"}
              placeholder={"Company"}
              onChange={handleInputChnage}
              value={addExperience.Company}
            />{" "}
            <InputField
              name={"Period"}
              label={"Period"}
              placeholder={"Period"}
              onChange={handleInputChnage}
              value={addExperience.Period}
            />
            <TextAreaField
              name={"Description"}
              label={"Description"}
              placeholder={"Description"}
              onChange={handleInputChnage}
              value={addExperience.Description}
            />
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-10 py-1.5 hover:bg-primary-red hover:text-white rounded-md bg-white text-primary-red border border-primary-red text-lg font-medium hover:scale-105 "
                onClick={() => {
                  setPopUp(false);
                  handleCancel();
                }}
              >
                Cancel
              </button>
              <button
                className="px-10 py-1.5 hover:bg-primary rounded-md hover:text-white border border-primary text-primary bg-white text-lg font-medium hover:scale-105 hover"
                onClick={!edit ? handleAdd : handleUpdate}
              >
                {!edit ? "Add" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminExperience;
