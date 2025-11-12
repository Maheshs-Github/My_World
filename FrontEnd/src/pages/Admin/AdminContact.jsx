import React, { useEffect, useState } from "react";
import InputField from "../../components/UI/InputField";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../../../utils/BASE_URL";
import toast from "react-hot-toast";
import { setContact } from "../../../redux/PortfolioSlice";

const AdminContact = () => {
  const Contact = useSelector((state) => state.PortFolio.Contact);
  // console.log("Contact: ", Contact);
  const Dispatch = useDispatch();

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    getCountries();
  }, []);

  // useEffect(() => {
  //   // console.log("Countries: ", countries);
  // }, [countries]);

  const getCountries = async () => {
    try {
      const Country = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name"
      );
      // console.log("Country: ", Country);
      const CVal = Country.data.map((Data) => {
        // console.log("Data: ", Data.name.common);
        return Data.name.common;
      });
      setCountries(CVal);
      // console.log("Countries: ", countries);
    } catch (error) {
      console.log("There is been Error : ", error);
    }
  };

  const [contactData, setContactData] = useState({
    _id: Contact._id || "",
    Name: Contact.Name || "",
    Age: Contact.Age || "",
    Gender: Contact.Gender || "",
    Email: Contact.Email || "",
    Mobile: Contact.Mobile || "",
    Country: Contact.Country || "",
  });
  const [ageError, setAgeError] = useState(false);
  const HandleOnChnage = (e) => {
    setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const HandleAgeChnage = (e) => {
    // console.log(e.target.value)
    setAgeError(true);
    const Age = e.target.value.slice(0, 2);
    // console.log("Age: ",Age)
    setContactData((prev) => ({ ...prev, [e.target.name]: Age }));
    if (Age > 15 && Age < 60) {
      setAgeError(false);
      return;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log("ContactData: ", contactData);
      const res = await axios.put(`${BASE_URL}UpdateContact`, contactData);
      // console.log("rez: ", res);
      Dispatch(setContact(res?.data?.Data));

      setContactData({
        Name: "",
        Age: "",
        Gender: "",
        Email: "",
        Mobile: "",
        Country: "",
      });
      toast.success(res?.data?.MSG);
    } catch (error) {
      console.log(error?.response?.data?.MSG);
      toast.error(error?.response?.data?.MSG);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      {/* <h2>Hemlo</h2> */}
      <InputField
        name={"Name"}
        label={"Name"}
        placeholder={"Enter your Name"}
        onChange={HandleOnChnage}
        value={contactData.Name}
      />
      <InputField
        name={"Age"}
        label={"Age"}
        placeholder={"Enter your Age"}
        onChange={HandleAgeChnage}
        value={contactData.Age}
      />
      {ageError && (
        <p className="text-primary-red text-sm">
          Age can be only In BTW 15 to 60
        </p>
      )}
      <label>Gender</label>
      {/* <div>
      <label className="flex gap-2 cursor-pointer">
      <input
        type="radio"
        name="Gender"
        value="Male"
        onChange={HandleOnChnage}
        checked={contactData.Gender === "Male"}
      />
      Male
      </label>
      <label className="flex gap-2 cursor-pointer">
      <input
        type="radio"
        name="Gender"
        value="Female"  
        onChange={HandleOnChnage}
        checked={contactData.Gender === "Female"}

      />
      Female</label>
      
      </div> */}
      <div className="flex gap-4">
        <button
          className={`p-2 border border-primary text-primary rounded-md  ${
            contactData.Gender === "Male" ? "bg-primary text-white " : ""
          }`}
          onClick={() =>
            setContactData((prev) => ({ ...prev, Gender: "Male" }))
          }
        >
          Male
        </button>
        <button
          className={`p-2 border border-primary text-primary rounded-md  ${
            contactData.Gender === "Female" ? "bg-primary text-white " : ""
          } `}
          onClick={() =>
            setContactData((prev) => ({ ...prev, Gender: "Female" }))
          }
        >
          Female
        </button>
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="Email" className="font-medium">
          Email
        </label>
        <input
          type="email"
          name="Email"
          required
          className="p-2 border-2 rounded-sm"
          placeholder="Enter your Email"
          value={contactData.Email}
          onChange={HandleOnChnage}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="Mobile" className="font-medium">
          Mobile No
        </label>
        <input
          type="tel"
          name="Mobile"
          maxLength={10}
          required
          className="p-2 border-2 rounded-sm"
          placeholder="Enter your Mobile"
          value={contactData.Mobile}
          onChange={(e) => {
            const Val = e.target.value.replace(/\D/g, "");
            setContactData((prev) => ({ ...prev, Mobile: Val }));
          }}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="Country" className="font-medium">
          Country
        </label>

        <select
          name="Country"
          id=""
          className="border p-3"
          value={contactData.Country}
          onChange={(e) =>
            setContactData((prev) => ({ ...prev, Country: e.target.value }))
          }
        >
          {countries.length < 0 ? (
            <div className="flex justify-center items-center">Loading...</div>
          ) : (
            <>
              <option>Select the Country</option>
              {countries.map((Data, index) => {
                return (
                  <option value={Data} key={index}>
                    {Data}
                  </option>
                );
              })}
            </>
          )}
        </select>
      </div>
      <div className="flex justify-end ">
        <button className="px-10 py-1.5 bg-primary rounded-md text-white text-lg font-medium hover:scale-105 hover">
          SAVE
        </button>
      </div>
    </form>
  );
};

export default AdminContact;
