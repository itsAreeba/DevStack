// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { HiLocationMarker } from "react-icons/hi";
// import { AiOutlineMail } from "react-icons/ai";
// import { FiPhoneCall, FiLink } from "react-icons/fi";
// import { CustomButton, Loading, TextInput } from "../components";
// import { NoProfile } from "../assets";
// import { apiRequest, handleFileUpload } from "../utils";
// import { Login } from "../redux/userSlice";
// import UserSkills from "./UserSkills";
// import { FaUserAstronaut } from "react-icons/fa";
// import "./style.css";
// import { useParams } from "react-router-dom";

// const ViewUser = () => {
//   const {id} = useParams();
//   const [user, setUser] = useState([]);
//   const [data, setData] = useState([]);
//   const [uploadCv, setUploadCv] = useState("");


//   useEffect(() => {
//     fetchUserDetails();
//     fetchProjects();
//   }, []);

//   // Getting Applications by ID
//   const fetchUserDetails = async () => {
//     const res = await apiRequest({
//       url: "/getUserbyId/" + id,
//       method: "GET",
//     });
//     // console.log(res);
//     setUser(res);
//   };
//   const fetchProjects = async () => {
//     const res = await apiRequest({
//       url: "/getProjectsByID/" + id,
//       method: "GET",
//     });
//     // console.log(res);
//     setData(res);
//   };

//   const userInfo = user;

//   return (
//     <>
//       <div className="container mx-auto flex items-center justify-center py-10">
//         <div className="w-full md:w-2/3 2xl:w-2/4 bg-white shadow-lg p-10 pb-20 rounded-lg">
//           <div className="flex flex-col items-center justify-center mb-4">
//             <h1 className="text-4xl font-semibold text-slate-600">
//               {userInfo?.firstName + " " + userInfo?.lastName}
//             </h1>

//             <h5 className="text-blue-700 text-base font-bold">
//               {userInfo?.jobTitle || "Job Title"}
//             </h5>

//             <div className="w-full flex flex-wrap lg:flex-row justify-between mt-8 text-sm">
//               <p className="flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full">
//                 <HiLocationMarker /> {userInfo?.location ?? "No Location"}
//               </p>
//               <p className="flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full">
//                 <AiOutlineMail /> {userInfo?.email ?? "No Email"}
//               </p>
//               <p className="flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full">
//                 <FiPhoneCall /> {userInfo?.contact ?? "No Contact"}
//               </p>
//               <a target="_blank" href={userInfo?.portfolioUrl}>
//                 <p className="flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full">
//                   <FiLink />{" "}
//                   {userInfo?.portfolioUrl
//                     ? "Visit Portfolio Website"
//                     : "No Portfolio Link"}
//                 </p>
//               </a>
//             </div>
//           </div>

//           <hr />

//           <div className="w-full py-10">
//             <div className="w-full flex flex-col-reverse md:flex-row gap-8 py-6">
//               <div className="w-full md:w-2/3 flex flex-col gap-4 text-lg text-slate-600 mt-20 md:mt-0">
//                 <p className="text-[#0536e7]  font-semibold text-2xl">ABOUT</p>
//                 <span className="text-base text-justify leading-7">
//                   {userInfo?.about ?? "No About Found"}
//                 </span>
//               </div>

//               <div className="w-full md:w-1/3 h-44">
//                 <img
//                   src={userInfo?.profileUrl || NoProfile}
//                   alt={userInfo?.firstName}
//                   className="w-full h-56 object-cover rounded-full object-center"
//                 />
            
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* // Projects */}
//       <div className="flex flex-row justify-evenly items-center">
//         <div className="heading">Projects</div>
       
//       </div>
//       <hr />
      

//       {/* Projects */}

//       <div className="projects">
//         {data.map((dataObj, index) => {
//           return (
//             <a target="_blank" href={dataObj.p_githubLink}>
//               <div className="project-card">
//                 <img
//                   className="project-image"
//                   src={dataObj.p_imageUrl}
//                   alt="Project Image"
//                 />
//                 <hr />
//                 <p className="project-title">{dataObj.p_title}</p>
//                 <p className="project-desc">{dataObj.p_desc}</p>
//                 View on Github
//               </div>
//             </a>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default ViewUser;
