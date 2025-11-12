import React, { useState } from "react";
import ProImg from "../../assets/image.png";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/UI/InputField";
import TextAreaField from "../../components/UI/TextAreaField";
import Icons from "../../Icons/Icons";
import axios from "axios";
import BASE_URL from "../../../utils/BASE_URL";
import toast from "react-hot-toast";
import { setProjects } from "../../../redux/PortfolioSlice";
const AdminProject = () => {
  const ProjectData = useSelector((state) => state.PortFolio.Projects);
  const Dispatch = useDispatch();
  // console.log("ProjectData: ", ProjectData);
  const [edit, setEdit] = useState();
  const [popUp, setPopUp] = useState(false);
  const [addProject, setAddProject] = useState({
    _id: "",
    Title: "",
    ProjectImgURL: "",
    ProjectDescription: "",
  });

  const handleChange = (e) => {
    setAddProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleDelete = async (Id) => {
    const DeletedPro = ProjectData.filter((Data) => Data._id !== Id);
    console.log("Deleted One: ", DeletedPro);
    try {
      const res = await axios.delete(`${BASE_URL}DeleteProject/${Id}`);
      console.log("res: ", res);
      Dispatch(setProjects(DeletedPro));
      toast.success(res.data.MSG);
    } catch (error) {
      console.log("Error: ", error);
      // toast.error(error.data.msg)
    }
  };
  const handleEdit = (Id) => {
    const EditingPro = ProjectData.filter((Data) => Data._id === Id);
    console.log("Editing Pro: ", EditingPro);
    setAddProject({
      _id: EditingPro[0]._id,
      Title: EditingPro[0].Title,
      ProjectImgURL: EditingPro[0].ProjectImgURL,
      ProjectDescription: EditingPro[0].ProjectDescription,
    });
    setPopUp(true);
  };
  const handleCancel = () => {
    setAddProject({
      Title: "",
      ProjectImgURL: "",
      ProjectDescription: "",
    });
    setPopUp(false);
  };
  const handleUpdate = async() => {
    try {
          console.log("addProject: ", addProject);
    const res= await axios.put(`${BASE_URL}UpdateProject`,addProject);
    // console.log("res: ",res);
    const NonUpdatedProject=ProjectData.filter((Data)=>Data._id!==addProject?._id)
    Dispatch(setProjects([...NonUpdatedProject,res.data.Data]));
    handleCancel();
    
    toast.success(res.data.MSG);
    } catch (error) {
     console.log("There is been some Error ",error)
     toast.error(error.response.data.MSG)
    }

    
  };
  const handleAdd = async () => {
    console.log("addProject: ", addProject);
    try {
      const res = await axios.post(`${BASE_URL}PostProject`,  addProject );
      // console.log("res: ", res);
      Dispatch(setProjects([...ProjectData,res.data.Data]))
      handleCancel();
      toast.success(res.data.MSG)
    } catch (error) {
      console.log("There is been some Error: ", error);
      toast.error(error.response.data.MSG)
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-end ">
        <button
          className="px-10 py-1.5 bg-primary rounded-md text-white text-lg font-medium hover:scale-105 mb-6"
          onClick={() => setPopUp(true)}
        >
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 items-center w-full">
        {ProjectData?.map((Data, index) => {
          return (
            <div
              className=" p-6 border-2 flex flex-col gap-2 text-xl"
              key={index}
            >
              <h2 className="font-bold text-2xl">{Data?.Title}</h2>
              {/* <hr /> */}
              {/* <img src={ProImg} className="cover my-2" alt="" /> */}
              <img
                src={Data?.ProjectImgURL}
                className="cover my-2 border rounded-sm p-3"
                alt=""
              />
              <p className="text-lg">
                {Data?.ProjectDescription ||
                  `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
                  tenetur rem ad molestiae illum dignissimos! Autem nemo impedit aliquam
                  quibusdam odio porro molestias nesciunt sint asperiores ullam.
                  Obcaecati, voluptas id!`}
              </p>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="px-10 py-1.5 bg-primary-red rounded-md text-white text-lg font-medium hover:scale-105 hover"
                  onClick={() => handleDelete(Data?._id)}
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
        <div className="fixed inset-0 flex flex-col bg-opacity-50 bg-black z-100 items-center justify-center ">
          <div className="rounded-md p-6 sm:w-[550px] bg-white">
            <div className="flex justify-between mb-6">
              {" "}
              <h3 className="text-lg font-semibold">Add Project</h3>
              <Icons.Clear
                size={24}
                className="cursor-pointer"
                onClick={() => {
                  
                  handleCancel();
                }}
              />
            </div>
            <InputField
              label={"Project Title"}
              name={"Title"}
              value={addProject.Title}
              placeholder={"Enter the Project Title"}
              onChange={handleChange}
            />
            <InputField
              label={"Project Image URL"}
              name={"ProjectImgURL"}
              value={addProject.ProjectImgURL}
              placeholder={"Enter the Project Image URL"}
              onChange={handleChange}
            />{" "}
            <TextAreaField
              label={"Project Description"}
              name={"ProjectDescription"}
              value={addProject.ProjectDescription}
              placeholder={"Enter the Project Description"}
              onChange={handleChange}
            />
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-10 py-1.5 hover:bg-primary-red hover:text-white rounded-md bg-white text-primary-red border border-primary-red text-lg font-medium hover:scale-105 "
                onClick={() => {
                  
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

export default AdminProject;
