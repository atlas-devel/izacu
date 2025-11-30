import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { MyContext } from "../context/Context";
import { useContext } from "react";
import { BiMicrophone } from "react-icons/bi";
import { Link } from "react-router-dom";

const Translators = ({ arrowRotate, setArrowRotate, translators }) => {
  const { showSidebar } = useContext(MyContext);

  return (
    <section className=" flex flex-col flex-1 overflow-y-scroll scroll-style-one">
      <div className="flex  flex-col   cursor-pointer  py-3 hover:bg-red-800 px-2  rounded-md capitalize  ">
        <span
          onClick={() =>
            setArrowRotate((prev) => ({
              ...prev,
              interpretor: !prev.interpretor,
            }))
          }
          className="flex items-center "
        >
          <h1
            className={` ${
              showSidebar ? "block" : "hidden"
            } text-sm font-semibold text-gray-200 `}
          >
            <BiMicrophone className="mr-1 inline text-lg" />
            Interpretor
          </h1>
          <motion.span
            className="text-xl"
            initial={{ rotate: "0 deg" }}
            animate={{ rotate: arrowRotate.interpretor ? "-90deg" : "0 deg" }}
            transition={{ duration: 0.4, type: "tween" }}
          >
            <IoIosArrowDown />
          </motion.span>
        </span>
      </div>

      <div className={` ${arrowRotate.interpretor ? "block" : "hidden"} `}>
        {translators.map((translator) => (
          <Link
            key={translator.id}
            to={`/category?translator=${translator.name}&genre=None`}
          >
            <div className="py-2 px-4 ml-5 text-sm text-gray-100 rounded-md font-semibold hover:bg-red-800">
              {translator.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Translators;
