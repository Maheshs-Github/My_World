import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { TbBrandTelegram } from "react-icons/tb";
import { LiaLinkedin } from "react-icons/lia";
import { FaLinkedinIn } from "react-icons/fa";

import { BsGithub } from "react-icons/bs";

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
          <FaInstagram
            size={24}
            className="cursor-pointer hover:text-white hover:opacity-95 hover:scale-110 opacity-30"
          />
        </a>
        <a
          href="https://www.instagram.com/animee_lover_mahesh/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <TbBrandTelegram
            size={24}
            className="cursor-pointer hover:text-white hover:opacity-95 hover:scale-110 opacity-30"
          />
        </a>
        <a
          href="https://www.instagram.com/animee_lover_mahesh/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <FaLinkedinIn
            size={20}
            className="cursor-pointer hover:text-white hover:opacity-95 hover:scale-110 opacity-30"
          />
        </a>
        <a
          href="https://www.instagram.com/animee_lover_mahesh/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <HiOutlineMail
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
          <BsGithub
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
