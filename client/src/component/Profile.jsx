import React, { useContext } from "react";
import person from "../assets/images/slide4.jpg";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountTree } from "react-icons/md";
import { MyContext } from "../context/Context";
import { RiAdminLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { setshowSettings } = useContext(MyContext);
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, duration: 0.3 }}
      transition={{ duration: 0.2 }}
      onMouseLeave={() => setshowSettings(false)}
      className="absolute top-20 right-5 bg-blue-950 border border-white/40  z-100 rounded-md p-4 "
    >
      <div className="flex flex-col text-gray-300">
        <div className="capitalize  text-gray-100">
          <div className="flex items-center text-red-800 gap-1">
            <span className="text-xl">
              <RiAdminLine />
            </span>
            <h1 className=" font-semibold inline-block uppercase">Admins</h1>
          </div>
          <div className="ml-3 mt-2">
            <p
              onClick={() => navigate("/admin/login")}
              className="hover:text-gray-400 cursor-pointer"
            >
              login admin
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
