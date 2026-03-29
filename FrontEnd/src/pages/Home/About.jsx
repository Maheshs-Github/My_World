import React from "react";
import SectionTitle from "../../components/SectionTitle";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Lottie from "lottie-react";
import devAnimation from "../../assets/developer skills.json";
import { Skills } from "../../Resources/Data";
import { useSelector } from "react-redux";

const About = () => {
  const AboutMe = useSelector((state) => state.PortFolio.AboutMe);
  console.log("AboutMe: ", AboutMe);
  return (
    <div className="bg-primary">
      <SectionTitle title={"About Me"}></SectionTitle>
      <div className="lg:flex-row lg:justify-between py-8 lg:items-center flex flex-col justify-start items-center gap-8">
        <Lottie
          className=" max-w-[60%] min-w-[100px] cursor-pointer"
          animationData={devAnimation}
          loop
          autoplay
          style={{ width: "100%", height: "auto" }}
        />
        <div className="text-white lg:max-w-[60%] sm:max-w-[90%] min-w-[100px]  text-sm/2 leading-12 text-xl">
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
          alias unde laborum commodi eaque enim recusandae dicta harum quos
          tenetur, quibusdam sunt doloremque. Cum aliquam natus molestiae neque
          deleniti quidem! Aperiam, sed voluptatum. Eius ad doloribus expedita
          debitis molestias ab eligendi non facilis cum, maiores exercitationem
          vitae. Neque maiores sit repellat, dolorem iusto accusamus eligendi.
          Non, deleniti aliquid? Quod, animi! Ea, debitis minus eius commodi
          necessitatibus laudantium tempore repellat velit, neque illo id
          nesciunt perferendis optio ullam rerum temporibus nulla nemo nihil. */}
          {/* {AboutMe?.Description} */}
          <div className=" w-full space-y-4">
            <h1 className="text-3xl font-semibold font-poppins">
              Hi, I’m Mahesh 👋
            </h1>

            <p className="text-lg text-gray-300 font-inter leading-relaxed">
              I enjoy building things, exploring ideas, and turning small
              thoughts into real projects.
            </p>

            <p className="text-lg text-gray-400 font-inter leading-relaxed">
              From writing code to understanding how things work behind the
              scenes, I learn by doing.
            </p>

            <p className="text-lg text-gray-300 font-inter leading-relaxed">
              This space —{" "}
              <span className="text-white font-medium">My World</span> — is
              where I share my journey.
            </p>

            <p className="text-lg text-gray-400 font-inter italic">
              Tech, anime, thoughts… a little bit of everything ✨
            </p>

            <p className="text-lg text-blue-400 font-medium">
              Learning, building, and sharing along the way 🚀
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-tertiory text-lg font-bold md:text-2xl  md:font-medium mt-[70px] cursor-pointer">
          Here are a few techonologies that i have been working with recently
        </p>
        <div className="mt-7 grid grid-cols-2 gap-[20px]  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 whitespace-nowrap ">
          {/* {Skills.map((Data, index) => { */}
          {AboutMe?.Skills?.map((Data, index) => {
            return (
              <span
                key={index}
                className="border rounded-md cursor-pointer text-tertiory border-tertiory px-4 py-2 text-md mr-10 "
              >
                {Data}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
