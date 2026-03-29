import React from 'react'
import Icons from '../../Icons/Icons'

const Footer = () => {
  return (
    <div className=' pt-20 opacity-70'>
      <div className='w-full h-[1px] bg-gray-700'></div>
      <div className="text-white flex  items-center justify-end gap-4 w-full pt-6 sm:hidden">
        <a
          href="https://www.instagram.com/animee_lover_mahesh/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <Icons.IG
            size={24}
            className="cursor-pointer hover:text-white hover:opacity-95 hover:scale-110 opacity-30 "
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

      </div>

      <div className='text-lg text-white flex flex-col items-center gap-2 p-14 '>
      <h2>Designed and Develped By </h2>
      <h2>Mahesh Mane M.</h2>
      </div>
    </div>
  )
}

export default Footer
