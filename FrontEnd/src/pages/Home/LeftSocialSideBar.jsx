import React from "react";


import Icons from "../../Icons/Icons";

const LeftSocialSideBar = () => {
  return (
    <div className="hidden sm:inline-block sm:fixed sm:left-14 sm:bottom-0 ">
      <div className="text-white flex flex-col items-center gap-4 w-fit">
        <a
          href="https://www.instagram.com/animee_lover_mahesh/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <Icons.IG 
            size={24}
            className="cursor-pointer hover:text-white hover:opacity-95 hover:scale-110 opacity-30"
          />
        </a>

        <a
          href="https://t.me/SOLO_LYF_Lover"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <Icons.TG
            size={24}
            className="cursor-pointer hover:text-white hover:opacity-95 hover:scale-110 opacity-30"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/mahesh-mane-b14a79257/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <Icons.Linkedin
            size={20}
            className="cursor-pointer hover:text-white hover:opacity-95 hover:scale-110 opacity-30"
          />
        </a>
        <a
          href="mailto:maheshmane9075@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <Icons.Email
            size={24}
            className="cursor-pointer hover:text-white hover:opacity-95 hover:scale-110 opacity-30"
          />
        </a>
        <a
          href="https://github.com/Maheshs-Github"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <Icons.Github
            size={24}
            className="cursor-pointer hover:text-white hover:opacity-95 hover:scale-110 opacity-30"
          />
        </a>

        <div className="bg-white w-[1px] h-56 opacity-30"></div>
      </div>
    </div>
  );
};

export default LeftSocialSideBar;
