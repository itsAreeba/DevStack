import { useEffect, useState } from "react";
import { Linkedin } from "../assets";
import moment from "moment";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { Routes, useParams } from "react-router-dom";
import { jobs } from "../utils/data";
import { CustomButton, JobCard, Loading } from "../components";
import { useSelector } from "react-redux";
import { apiRequest, handleFileUpload } from "../utils";
import { data } from "autoprefixer";
import axios from 'axios';
import "./style.css";

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [selected, setSelected] = useState("0");
  const [isFetching, setIsFetching] = useState(false);
  const [uploadCv, setUploadCv] = useState("");
  const [isCV, setisCV] = useState("");

  const [cvData, setCvData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    education: [{ institution: '', degree: '', graduationYear: '' }],
    experience: [{ company: '', position: '', startDate: '', endDate: '' }],
    skills: ['']
  });


  // SK

  const userInfo = user;
  const  userId = userInfo._id;

  useEffect(() => {
    async function fetchCV() {
      try {
        const response = await axios.get(`http://localhost:8800/api/cv/${userId}`);
        if (response.data) {
          setCvData(response.data);
          setisCV(true);
        }
      } catch (error) {
        console.error('Error fetching CV:', error);
      }
    }
    fetchCV();
    if (userInfo.accountType === "seeker") {
      document.getElementById("report-btn").classList.remove("hidden");
    }
  }, [userId]);

  const getApplicants = async () => {
    const url = `/job-detail/${job._id}/applicants`;

    window.location.replace(url);
   
  };

  const [formData, setFormData] = useState({
    userId: user?._id,
    jobId: job?._id,
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    cvUrl: "",
    status: "Pending",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      userId: user?._id,
      jobId: job._id,
      [name]: value,
    });
    // console.log(formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    applyForJob();
  };

  const nextStep = () => {
    if (formData.answer1  === "" || formData.answer2  === "" || formData.answer3  === "" || formData.answer4 === "") {
      
      alert("Please answer all questions before proceeding...!")
      
    }
    else{
      document.getElementById('step-1').classList.add('hidden');
      document.getElementById('step-btn').classList.add('hidden');
      document.getElementById('step-2').classList.remove('hidden');

    }
  }



  const toggleForm = () => {
    document.getElementById("application-form").classList.toggle("hidden");
    document.getElementById("toggle-btn-apply").classList.add("hidden");
  };

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReportData({
      userId: user?._id,
      jobId: job._id,
      [name]: value,
    });
    // console.log(formData);
  };


  const toggleReportForm = () => {
    document.getElementById("reportToggleBtn").classList.add("hidden");
    document.getElementById("reportForm").classList.remove("hidden");
  };

  const markJob = () => {
    let text =
      "Are you sure to mark this job as inappropriate?\nEither OK or Cancel.";
    if (confirm(text) == true) {
      markit();
    }
  };

  const [reportData, setReportData] = useState({
    userId: user?._id,
    jobId: job?._id,
    complainReason: ""
  });


  const markit = async (e) => {
    console.log(reportData);
    try {
      const response = await fetch(
        "http://localhost:8800/api-v1/markComplain",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reportData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark");
      }
      const marked = await response.json();
      
      return marked;
    } catch (error) {
      console.error("Failed to mark:", error);
      throw error;
    }
  };

  const getJobDetails = async () => {
    setIsFetching(true);
    try {
      const res = await apiRequest({
        url: "/jobs/get-job-detail/" + id,
        method: "GET",
      });

      setJob(res?.data);
      // console.log(res?.data);
      setSimilarJobs(res?.similarJobs);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  const applyForJob = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    let data = formData;
    if (uploadCv) {
      const uri = await handleFileUpload(uploadCv);
      data = { ...data, cvUrl: uri };
    }
    // console.log(data);
    try {
      if (!job) {
        console.error("Job details are not available.");
        return;
      }

      const res = await apiRequest({
        url: "/jobs/applyjob",
        method: "POST",
        data: data,
        token: user?.token,
      });

      if (res?.success) {
        // Show a success message
        alert("Application submitted successfully!");

        // Reload the current page to stay on the same page
        window.location.reload();
      } else {
        // Show an error message if the application fails
        alert(res?.message || "Failed to submit application.");
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      setIsFetching(false);
      console.error(error);
    }
  };

  const handleDeletePost = async () => {
    setIsFetching(true);

    try {
      if (window.confirm("Delete Job Post?")) {
        const res = await apiRequest({
          url: "/jobs/delete-job/" + job?._id,
          token: user?.token,
          method: "DELETE",
        });
        if (res?.success) {
          alert(("Deleted Successfully"));
          window.location.replace('../');
        }
      }
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };

  useEffect(() => {
    id && getJobDetails();
    setJob(jobs[id ?? 0]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  const complainData = {
    userId: user?._id,
    jobId: job?._id,
  };
  return (


    




    <div className="container mx-auto">
   
    
      <div id="job-details" className="w-full flex flex-col md:flex-row gap-10">
        {/* LEFT SIDE */}

        {isFetching ? (
          <Loading />
        ) : (
          <div className="w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md">
            <div className="w-full flex items-center justify-between">
              <div className="w-3/4 flex gap-2">
                <img
                  src={job?.company?.profileUrl}
                  alt={job?.company?.name}
                  className="w-20 h-20 md:w-24 md:h-20 rounded"
                />

                <div className="flex flex-col">
                  <p className="text-xl font-semibold text-gray-600">
                    {job?.jobTitle}
                  </p>

                  <span className="text-base">{job?.location}</span>

                  <span className="text-base text-blue-600">
                    {job?.company?.name}
                  </span>

                  <span className="text-gray-500 text-sm">
                    {moment(job?.createdAt).fromNow()}
                  </span>
                </div>
              </div>

              <div className="">
                <AiOutlineSafetyCertificate className="text-3xl text-blue-500" />
              </div>
            </div>

            <div className="w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10">
              <div className="bg-[#bdf4c8] w-40 h-16 rounded-lg flex flex-col items-center justify-center">
                <span className="text-sm">Salary</span>
                <p className="text-lg font-semibold text-gray-700">
                  $ {job?.salary}
                </p>
              </div>

              <div className="bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center">
                <span className="text-sm">Job Type</span>
                <p className="text-lg font-semibold text-gray-700">
                  {job?.jobType}
                </p>
              </div>

              <div className="bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center">
                <span className="text-sm">No. of Applicants</span>
                <p className="text-lg font-semibold text-gray-700">
                  {job?.application?.length}
                </p>
              </div>

              <div className="bg-[#cecdff] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center">
                <span className="text-sm">No. of Vacancies</span>
                <p className="text-lg font-semibold text-gray-700">
                  {job?.vacancies}
                </p>
              </div>

              <div className="bg-[#ffcddf] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center">
                <span className="text-sm">Yr. of Experience</span>
                <p className="text-lg font-semibold text-gray-700">
                  {job?.experience}
                </p>
              </div>
            </div>

            <div className="w-full flex gap-4 py-5">
              <CustomButton
                onClick={() => setSelected("0")}
                title="Job Description"
                containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${
                  selected === "0"
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-300"
                }`}
              />

              <CustomButton
                onClick={() => setSelected("1")}
                title="Company"
                containerStyles={`w-full flex items-center justify-center  py-3 px-5 outline-none rounded-full text-sm ${
                  selected === "1"
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-300"
                }`}
              />
            </div>

            <div className="my-6">
              {selected === "0" ? (
                <>
                  <p className="text-xl font-semibold">Job Description</p>

                  <span className="text-base">{job?.detail[0]?.desc}</span>

                  {job?.detail[0]?.requirements && (
                    <>
                      <p className="text-xl font-semibold mt-8">Requirements</p>
                      <span className="text-base">
                        {job?.detail[0]?.requirements}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="mb-6 flex flex-col">
                    <p className="text-xl text-blue-600 font-semibold">
                      {job?.company?.name}
                    </p>
                    <span className="text-base">{job?.company?.location}</span>
                    <span className="text-sm">{job?.company?.email}</span>
                  </div>

                  <p className="text-xl font-semibold">About Company</p>
                  <span>{job?.company?.about}</span>
                </>
              )}
            </div>

            <div className="w-full flex space-x-4">
              {user?._id === job?.company?._id && (
                <CustomButton
                title="View Applicants"
                onClick={getApplicants}
                containerStyles={`flex-shrink-0 w-1/2 items-center justify-center text-white border border-white-700 py-3 px-5 outline-none rounded-full text-base bg-black`}
              />
              
              
                )}

              {user?._id === job?.company?._id ||
              user?.accountType === "admin" ? (
                <CustomButton
                  title="Delete Post"
                  onClick={handleDeletePost}
                  containerStyles={`flex-shrink-0 w-1/2 items-center justify-center text-white bg-red-800 py-3 px-5 outline-none rounded-full text-base`}
                />
              ) : (
                user?.accountType === "seeker" && (
                  <button
                    onClick={toggleForm}
                    id="toggle-btn-apply"
                    className="primary-btn"
                  >
                    Apply Now
                  </button>
                )
              )}
            </div>

            {/* // Show Applicants of this job */}

            <div>
              <div className="applications">
                {applicants.map((dataObj, index) => {
                  return (
                    <div className="application-div">
                      <p className="applicant-name">
                        <b>Applicant Name:</b> {dataObj.Appliname}
                      </p>
                      <p className="applicant-availability">
                        <b>Availability: </b>
                        {dataObj.availability}
                      </p>
                      <p className="applicant-coverletter">
                        <b>Cover Letter: </b>
                        {dataObj.cover_letter}
                      </p>
                      <p className="applicant-assessment">
                        <b>{job.question1}: </b>
                        {dataObj.answer1}
                      </p>
                      <p className="applicant-assessment">
                        <b>{job.question2}: </b>
                        {dataObj.answer2}
                      </p>
                      <p className="applicant-assessment">
                        <b>{job.question3}: </b>
                        {dataObj.answer3}
                      </p>
                      <p className="applicant-assessment">
                        <b>{job.question4}: </b>
                        {dataObj.answer4}
                      </p>

                      {user?._id === job?.company?._id && (
                      
                      <h1>Job Actions Here</h1>
                      
                      )}
                        <div className="links">
                          <a href={dataObj.cvUrl}>
                            <button className="flex-shrink-0 items-center justify-center text-white bg-green-700 py-3 px-5 outline-none rounded-full text-base">
                              Download CV
                            </button>
                          </a>
                          <a href={`/view-user/${dataObj.userId}`}>
                            <button className="flex-shrink-0 items-center justify-center text-white bg-green-700 py-3 px-5 outline-none rounded-full text-base">
                              Visit Profile
                            </button>
                          </a>
                        </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* // Job Application Form SK */}

            <div id="application-form" className="hidden">
              <form onSubmit={applyForJob}>
                <div id="step-1" className="step1">
                <div className="text-xl font-bold	">
                  Job Quiz
                </div>

                {/* // Step 1 */}

                
                <div className="mb-4">
                  <label
                    htmlFor="answer1"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    {job?.question1}
                  </label>
                  <textarea
                    name="answer1"
                    id="answer1"
                    required
                    placeholder="Answer 1"
                    value={formData.answer1}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="answer2"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    {job?.question2}
                  </label>
                  <textarea
                    name="answer2"
                    id="answer2"
                    required
                    placeholder="Answer 2"
                    value={formData.answer2}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="answer3"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    {job?.question3}
                  </label>
                  <textarea
                    name="answer3"
                    id="answer3"
                    required
                    placeholder="Answer 3"
                    value={formData.answer3}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="answer4"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    {job?.question4}
                  </label>
                  <textarea
                    name="answer4"
                    id="answer4"
                    required
                    placeholder="Answer 4"
                    value={formData.answer4}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div></div>
                  {/* // Step 2 */}
              <div id="step-2" className="mb-4 step2 hidden">

                  <div className="step2-options">

                  <div className="step2-option">
                  <label className="block text-gray-700 font-bold mb-2">
                      Create CV
                    </label>

                  <a className="use-cv-builder-btn"
                   href="/cv-builder" target="_blank">
                    Use CV Builder
                  </a>
                     </div>
                  <div className="step2-option">
                   
                    <label className="block text-gray-700 font-bold mb-2">
                      OR Upload CV
                    </label>
                    <input
                      type="file"
                      // accept=".pdf, .docx"
                      accept="image/docx"
                      onChange={(e) => setUploadCv(e.target.files[0])}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                     </div>
                <div className="flex items-center justify-center">
                
                
                {isCV && (
                   <button
                   type="submit"
                   className="inline-flex items-center w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm bg-black text-white "
                   >
                   Apply
                 </button>)
                 ||
                 uploadCv && (
                  <button
                  type="submit"
                  className="inline-flex items-center w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm bg-black text-white "
                  >
                  Apply
                </button>)
                 }
                  
                

                </div>
                    </div>
                
             
             
             
              </form>
            
              <button id="step-btn" onClick={nextStep}
                    className="inline-flex items-center w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm bg-black text-white"
                  >
                    Next Step
                  </button>
            
            </div>
          </div>
        )}

        {/* RIGHT SIDE */}

        <div className="w-full md:w-1/3 2xl:w-2/4 p-5 mt-20 md:mt-0">
          <div id="report-btn" className=" flex mb-8 hidden">
            <button id="reportToggleBtn"
              onClick={toggleReportForm}
              className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Report job
            </button>
          </div>

          <form onSubmit={markJob} id="reportForm" className="hidden">

          <textarea id="reportBody" name="reportBody" onChange={handleReportChange} value={reportData.complainReason} required placeholder="Please tell us more about this report..."  rows="4" cols="50">
            </textarea>

            <br />
          <button className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
             type="submit">Report Job</button>
          </form>

          <p className="text-gray-500 font-semibold">Similar Job Post</p>

          <div className="w-full flex flex-wrap gap-4">
            {similarJobs?.slice(0, 6).map((job, index) => {
              const data = {
                name: job?.company?.name,
                logo: job?.company?.profileUrl,
                ...job,
              };
              return <JobCard job={data} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
