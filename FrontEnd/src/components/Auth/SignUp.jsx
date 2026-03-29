import React, { useState } from "react";
import InputField from "../UI/InputField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../utils/BASE_URL";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [SignUpData, setSignUpData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });
  const HandleOnChnage = (e) => {
    setSignUpData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const HandleSignUp = async (e) => {
    try {
      const res = await axios.post(`${BASE_URL}Signup`, SignUpData);
      console.log("Res: ",res);
      toast.success(res.data.MSG)
    } catch (error) {
      console.log("Error: ",error);
      toast.error(error.response.data.MSG)
    }
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log("SignUpData: ", SignUpData);
    HandleSignUp();
    setSignUpData({
      Name: "",
      Email: "",
      Password: "",
    });
  };
  return (
    <div className="flex justify-center items-center py-40">
      {/* <h2>Hello There from Sign Up</h2> */}
      <div className="border-2 p-10">
        <form className="sm:w-[440px]" onSubmit={HandleSubmit}>
          <h2 className="w-full pb-2 text-center text-2xl font-semibold">
            Sign Up
          </h2>
          <hr className="pb-4 pt-1" />
          <InputField
            name={"Name"}
            label={"Name"}
            placeholder={"Enter Name"}
            onChange={HandleOnChnage}
            value={SignUpData.Name}
            required
          />
          <InputField
            name={"Email"}
            label={"Email"}
            placeholder={"Enter Email"}
            onChange={HandleOnChnage}
            value={SignUpData.Email}
            type={"email"}
            required
          />
          <InputField
            name={"Password"}
            label={"Password"}
            placeholder={"Enter Password"}
            onChange={HandleOnChnage}
            value={SignUpData.Password}
            type={"password"}
            required
          />
          <button className="px-10 py-1.5 bg-primary rounded-md text-white text-lg font-medium hover:scale-105 my-6 mx-auto w-full">
            Sign Up
          </button>
        </form>
        <span>
          Already have an Account? Just{" "}
          <button
            className="text-URL-Blue font-medium"
            onClick={() => navigate("/auth/login")}
          >
            Log In
          </button>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
