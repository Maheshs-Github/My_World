import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/UI/InputField";
import { useState } from "react";
import TextAreaField from "../../components/UI/TextAreaField";
import Icons from "../../Icons/Icons";
import axios from "axios";
import BASE_URL from "../../../utils/BASE_URL";
import toast from "react-hot-toast";
import { setEducation } from "../../../redux/PortfolioSlice";

const AdminEducation = () => {
  const Dispatch = useDispatch();

  const EducationData = useSelector((state) => state.PortFolio.Education);

  // console.log("EducationData: ", EducationData);
  const [addEducation, setAddEducation] = useState({
    _id: "",
    CourseTitle: "",
    SchoolorCollgeName: "",
    StartYear: "",
    EndYear: "",
    PercentageOrCGPA: "",
  });
  const [popUp, setPopUp] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleInputChnage = (e) => {
    setAddEducation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async () => {
    try {
      console.log("addEducation: ", addEducation);
      const res = await axios.post(`${BASE_URL}PostEducation`, addEducation);
      console.log("res: ", res);
      Dispatch(setEducation([...EducationData, res.data.Data]));
      toast.success(res.data.MSG);
      setAddEducation({
        CourseTitle: "",
        SchoolorCollgeName: "",
        StartYear: "",
        EndYear: "",
        PercentageOrCGPA: "",
      });
      setPopUp(false);
    } catch (error) {
      console.log("There is been Error: ", error);
      toast.error("There is been Error");
    }
  };
  const handleCancel = () => {
    setEdit(false);
    setAddEducation({
      CourseTitle: "",
      SchoolorCollgeName: "",
      StartYear: "",
      EndYear: "",
      PercentageOrCGPA: "",
    });
  };
  const handleEdit = (Id) => {
    // if(EducationData?._id===Id)console.log("EducationData: ",EducationData)
    const EditingEdu = EducationData.filter((Data) => Data._id === Id);
    console.log("EditingEdu: ", EditingEdu);
    console.log("EditingEdu: ", EditingEdu[0]?.CourseTitle);
    setAddEducation({
      _id: EditingEdu[0]._id,
      CourseTitle: EditingEdu[0].CourseTitle,
      SchoolorCollgeName: EditingEdu[0].SchoolorCollgeName,
      StartYear: EditingEdu[0].StartYear,
      EndYear: EditingEdu[0].EndYear,
      PercentageOrCGPA: EditingEdu[0].PercentageOrCGPA,
    });
    setPopUp(true);
  };
  const handleUpdate = async () => {
    try {
      // console.log("addEducation: ", addEducation);
      const res = await axios.put(`${BASE_URL}UpdateEducation`, addEducation);
      // console.log("res: ", res);
      const NonEditedExp = EducationData.filter(
        (Data) => Data._id !== res.data.Data._id
      );
      Dispatch(setEducation([...NonEditedExp, res.data.Data]));
      setAddEducation({
        CourseTitle: "",
        SchoolorCollgeName: "",
        StartYear: "",
        EndYear: "",
        PercentageOrCGPA: "",
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
      console.log("_id: ", id);
      const res = await axios.delete(`${BASE_URL}DeleteEducation/${id}`);
      console.log("res: ", res);
      const NewExp = EducationData.filter((Data) => Data._id !== id);
      Dispatch(setEducation(NewExp));
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
          Add Education
        </button>
      </div>
      <div className="flex gap-4 items-center flex-wrap">
        {EducationData?.map((Data, index) => {
          return (
            <div
              className="p-6 border-2 flex flex-col gap-2 text-xl"
              key={index}
            >
              <h2 className="font-bold text-2xl">{Data?.CourseTitle}</h2>
              <hr />
              <div>{Data?.SchoolorCollgeName}</div>
              <div className="flex gap-1">
                <span> {Data?.StartYear} </span>
                <span>-</span>
                <span> {Data?.EndYear} </span>
              </div>
              {/* <p>Course Title: {Data?.CourseTitle}</p> */}
              <p className="text-lg">{Data?.PercentageOrCGPA} CGPA</p>
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
          <div className="bg-white p-6 sm:w-[550px]">
            <div className="flex justify-between mb-4">
              <p className="text-lg font-semibold">{edit ? "Edit Education" : "Add Education"}</p>
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
              name={"CourseTitle"}
              placeholder={"Course Title"}
              label={"Course Title"}
              onChange={handleInputChnage}
              value={addEducation.CourseTitle}
            />
            <InputField
              name={"SchoolorCollgeName"}
              label={"College Name"}
              placeholder={"College Name"}
              onChange={handleInputChnage}
              value={addEducation.SchoolorCollgeName}
            />
            <InputField
              name={"StartYear"}
              label={"Start Year"}
              placeholder={"Start Year"}
              onChange={handleInputChnage}
              value={addEducation.StartYear}
            />{" "}
            <InputField
              name={"EndYear"}
              label={"End Year"}
              placeholder={"End Year"}
              onChange={handleInputChnage}
              value={addEducation.EndYear}
            />{" "}
            <InputField
              name={"PercentageOrCGPA"}
              label={"Percentage/CGPA"}
              placeholder={"Percentage/CGPA"}
              onChange={handleInputChnage}
              value={addEducation.PercentageOrCGPA}
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

export default AdminEducation;
