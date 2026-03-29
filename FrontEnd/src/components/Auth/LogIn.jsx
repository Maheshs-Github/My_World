import React, { useState } from "react";
import InputField from "../UI/InputField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../utils/BASE_URL";
import toast from "react-hot-toast";

const LogIn = () => {
  const navigate = useNavigate();
  const [logInData, setLoginData] = useState({
    Email: "",
    Password: "",
  });
  const HandleOnChnage = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const HandleSignUpCall = async (Data) => {
    try {
      const res = await axios.post(`${BASE_URL}Login`, Data);
      console.log("res: ", res);
      toast.success(res.data.MSG);
      navigate("/");
    } catch (error) {
      console.log("Error ", error);
      toast.error(error.response.data.MSG);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Log iN Data: ", logInData);
    HandleSignUpCall(logInData);
    setLoginData({
      Email: "",
      Password: "",
    });
  };
  return (
    <div className="flex justify-center items-center py-40">
      {/* <h2>Hello There from Sign Up</h2> */}
      <div className="border-2 p-10">
        <form className="sm:w-[440px]" onSubmit={handleSubmit}>
          <h2 className="w-full pb-2 text-center text-2xl font-semibold">
            Log In
          </h2>
          <hr className="pb-4 pt-1" />

          <InputField
            name={"Email"}
            label={"Email"}
            placeholder={"Enter Email"}
            onChange={HandleOnChnage}
            value={logInData.Email}
            type={"email"}
            required
          />
          <InputField
            name={"Password"}
            label={"Password"}
            placeholder={"Enter Password"}
            onChange={HandleOnChnage}
            value={logInData.Password}
            type={"password"}
            required
          />
          <button className="px-10 py-1.5 bg-primary rounded-md text-white text-lg font-medium hover:scale-105 my-6 mx-auto w-full">
            Log In
          </button>
        </form>
        <span>
          Don't have an Account? Create One{" "}
          <button
            className="text-URL-Blue font-medium"
            onClick={() => navigate("/auth/signup")}
          >
            Sign Up
          </button>
        </span>
      </div>
    </div>
  );
};

export default LogIn;
