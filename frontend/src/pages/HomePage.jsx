import { FaChrome } from "react-icons/fa6"
import { FaUserLock } from "react-icons/fa6"
import { IoChatbubblesOutline } from "react-icons/io5"
import { FaUserFriends } from "react-icons/fa"
import { IoSearch } from "react-icons/io5"
import { FaRankingStar } from "react-icons/fa6"
import { IoLogoGithub } from "react-icons/io5"
import "../styles/links.css"

function HomePage() {
  return (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-medium">Welcome to Euroscore</h1>
          <div className="text-center"> View official Eurovision results from 2021 onwards, rank and rate the entries of each year to shape community rankings, and share and chat about your results with friends to compare favourites.</div>
        </div>

        <div className="flex flex-col gap-7">
          <h2 className="bg-[#646cff] rounded-3xl text-white shadow-lg self-center"> Features </h2>
          <div className="grid grid-cols-3">
            <div className="flex flex-col gap-5">
              <div className="bg-[#c7d2fe] w-fit p-3 rounded-4xl shadow-lg">
              <FaChrome size={30} />
              </div>
              Automated web scraping of official Eurovision entries and results (2021 onwards) from Wikipedia.
            </div>
            <div className="flex flex-col gap-5">
              <div className="bg-[#c7d2fe] w-fit p-3 rounded-4xl shadow-lg">
              <FaUserLock size={30} />
              </div>
              Secure authentication via JWTs and cookies, as well as reset password functionality through emails.
            </div>
            <div className="flex flex-col gap-5">
              <div className="bg-[#c7d2fe] w-fit p-3 rounded-4xl shadow-lg">
              <IoSearch size={30} />
              </div>
              Search for any Eurovision entry from 2021 onwards, based on country, artist, year or song name.
            </div>
            <div className="flex flex-col gap-5">
              <div className="bg-[#c7d2fe] w-fit p-3 rounded-4xl shadow-lg">
              <FaRankingStar size={30} />
              </div>
              View official results as well as community results from every user's submitted rankings.
            </div>
            <div className="flex flex-col gap-5">
              <div className="bg-[#c7d2fe] w-fit p-3 rounded-4xl shadow-lg">
              <FaUserFriends size={30} />
              </div>
              Add friends to share your rankings and ratings of entries.
            </div>
            <div className="flex flex-col gap-5">
              <div className="bg-[#c7d2fe] w-fit p-3 rounded-4xl shadow-lg">
              <IoChatbubblesOutline size={30} />
              </div>
              Real-time user chat via Socket.io.
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <a
            href="https://github.com/Pluto-999/eurovision-app"
            className="flex p-3 gap-3 self-center text-lg items-center bg-[#646cff] text-white w-fit rounded-4xl shadow-lg button_link"
          >
            <IoLogoGithub size={50} color="white"/>
            <div> Github Repository </div>
          </a>
          <div> Fully designed and built by Adam Wood. </div>
        </div>
      </div>
  );
}

export default HomePage