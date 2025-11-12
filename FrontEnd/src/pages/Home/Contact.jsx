import React from "react";
import SectionTitle from "../../components/SectionTitle";
import Lottie from "lottie-react";
import Welcome from "../../assets/Welcome.json";
import { useSelector } from "react-redux";
const Contact = ({ title }) => {
  const UserData = useSelector((state) => state.PortFolio.Contact);
  const userInfo = `{
  "name": "Mahesh Mane M.",
  "age": null,
  "gender": "Male",
  "email": "maheshmane9075@gmail.com",
  "mobile": 7709944702,
  "country": "INDIA"
}`;
  // const UserData = {
  //   name: "Mahesh Mane M.",
  //   age: "null",
  //   gender: "Male",
  //   email: "maheshmane9075@gmail.com",
  //   mobile: 7709944702,
  //   country: "INDIA",
  // };

  return (
    <div>
      <SectionTitle title={title} />
      <div className="flex flex-col-reverse lg:flex-row gap-10 items-center justify-between">
        {/* <p className="text-lg text-tertiory whitespace-pre">{userInfo}</p> */}
        {/* Let's try with key and value pair */}
        <div className="text-lg text-tertiory">
          <h2>{`{`}</h2>
          {/* {console.log("Object.keys(UserData): ",Object.keys(UserData))} */}
          {Object.keys(UserData)
            .filter((key) => !["_id", "__v", "lottieImgURL"].includes(key))
            .map((Key, index) => {
              return (
                <h2 key={index}>
                  <span>{Key} :</span>
                  <span>{UserData[Key]}</span>
                </h2>
              );
            })}
          {/* {Object.keys(UserData).map((Key, index) => (
            <h2 key={index}>
              <span>{Key} :</span>
              <span>{UserData[Key]}</span>
            </h2>
          ))}*/}
          <h2>{`}`}</h2>
        </div>

        <Lottie
          className=" max-w-[50%] min-w-[100px] cursor-pointer"
          animationData={Welcome}
          loop
          autoplay
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default Contact;
