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
    getJobDetails();
  }, []);


const acceptApplication = async (appId) => {
  try {
    // Make a POST request to the backend API endpoint
    const response = await axios.post(`http://localhost:8800/acceptApplication/${appId}`);

    // If the request is successful, log the response data
    console.log(response.data);
    alert("Marked");
    window.location.reload();
    // You can also perform further actions here based on the response
  } catch (error) {
    // If there's an error, log the error message
    console.error('Error accepting application:', error.message);
  }
};

const ignoreApplication = async (appId) => {
  try {
    // Make a DELETE request to the backend API endpoint
    const response = await axios.delete(`http://localhost:8800/ignoreApplication/${appId}`);

    // If the request is successful, log the response data
    console.log(response.data);
    window.location.reload();
    
    // You can also perform further actions here based on the response
  } catch (error) {
    // If there's an error, log the error message
    console.error('Error ignoring application:', error.message);
  }
};
const ViewCV = async (appId) => {
  window.location.replace(`/view-cv/${appId}`);
};


  const getJobDetails = async () => {
    try {
      const res = await apiRequest({
        url: "/jobs/get-job-detail/" + jobId,
        method: "GET",
      });

      console.log(res?.data);
      setJob(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const res = await apiRequest({
      url: "/getApplicants/" + jobId,
      method: "GET",
    });
    console.log(res);
    setApplicants(res);
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {applicants.map((dataObj, index) => (
      
      <div key={index} className="bg-white rounded-lg shadow-lg p-6">
      <p className="text-lg font-bold text-gray-800 mb-4">
        Applicant Name: {dataObj.user.firstName} {dataObj.user.lastName}
      </p>
      <div className="mb-4">
        <p className="text-gray-700 font-semibold mb-2">Job Quiz</p>
        <div className="space-y-2">
          <p><span className="font-semibold">{job?.question1}:</span> {dataObj.application.answer1}</p>
          <p><span className="font-semibold">{job?.question2}:</span> {dataObj.application.answer2}</p>
          <p><span className="font-semibold">{job?.question3}:</span> {dataObj.application.answer3}</p>
          <p><span className="font-semibold">{job?.question4}:</span> {dataObj.application.answer4}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-2 first-line:font-bold">Status: {dataObj.application.status}</p>
<div className="mb-4">
  <button 
    onClick={() => ViewCV(dataObj.user._id)} 
    className="border border-blue-500 text-blue-500 font-bold py-2 px-8 rounded mr-4 hover:bg-blue-500 hover:text-white"
  >
    View CV
  </button>
  <button 
    onClick={() => acceptApplication(dataObj.application._id)} 
    className="border border-green-500 text-green-500 font-bold py-2 px-8 rounded mr-4 hover:bg-green-500 hover:text-white"
  >
    Accept
  </button>
  <button 
    onClick={() => ignoreApplication(dataObj.application._id)} 
    className="border border-red-500 text-red-500 font-bold py-2 px-8 rounded hover:bg-red-500 hover:text-white"
  >
    Ignore
  </button>
</div>
<div className="flex justify-between">
  <a 
    target="_blank" 
    href={dataObj.application.cvUrl} 
    className="border border-green-500 text-green-500 font-bold py-2 px-4 rounded hover:bg-green-500 hover:text-white"
  >
    Download CV
  </a>
  <a 
    target="_blank" 
    href={`/view-user/${dataObj.user._id}`} 
    className="border border-green-500 text-green-500 font-bold py-2 px-4 rounded hover:bg-green-500 hover:text-white"
  >
    Visit Profile
  </a>
</div>

    </div>

  ))}
</div>

    </>
  );
};

export default JobApplicants;
