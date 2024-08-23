

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { CustomButton, Loading, TextInput } from "../components";
import { NoProfile } from "../assets";
import { apiRequest, handleFileUpload } from "../utils";
import { Login } from "../redux/userSlice";
import UserSkills from "./UserSkills";
import { FaUserAstronaut } from "react-icons/fa";
import { Routes, useParams } from "react-router-dom";
import axios from 'axios';
import ViewCV from "./ViewCV";

const JobApplicants = () => {
  const [data, setData] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [job, setJob] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { jobId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);   
        // Getting Applications by ID
        const fetchData = async () => {
          const res = await apiRequest({
            url: "/getApplications/"+ user?._id,
            method: "GET",
          });
          console.log(res);
          setData(res);
          };

const ViewCV = async () => {
  window.location.replace(`/view-cv/${user?._id}`);
};
  return (
    <>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {data.map((dataObj, index) => (
      
      <div key={index} className="bg-white rounded-lg shadow-lg p-6">
      <p className="text-lg font-bold text-gray-800 mb-4">
        {dataObj?.status}
      </p>
      <p className="text-lg font-bold text-gray-800 mb-4">
        {dataObj?.job.jobTitle}
      </p>
      <div className="mb-4">
        <p className="text-gray-700 font-semibold mb-2">Job Quiz</p>
        <div className="space-y-2">
          <p><span className="font-semibold">{dataObj.job.question1}:</span> {dataObj.answer1}</p>
          <p><span className="font-semibold">{dataObj.job.question2}:</span> {dataObj.answer2}</p>
          <p><span className="font-semibold">{dataObj.job.question3}:</span> {dataObj.answer3}</p>
          <p><span className="font-semibold">{dataObj.job.question4}:</span> {dataObj.answer4}</p>
        </div>
      </div>
      <div className="mb-4">
        <button onClick={() => ViewCV()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          View CV
        </button>
      </div>
    </div>

  ))}
</div>

    </>
  );
};

export default JobApplicants;
