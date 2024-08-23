import React, { useState, useEffect } from 'react'; 
import { useSelector } from "react-redux";
import { apiRequest } from "../utils";
import "./dashboard.css";



export default function Dashboard() {
  const { user } = useSelector((state) => state.user);
  const userInfo = user;

  const [data, setData] = useState([]);
  useEffect(() => {
    fetchProjects();
}, []);

   // Getting Applications by ID
   const fetchProjects = async () => {
    const res = await apiRequest({
      url: "/getComplain",
      method: "GET",
    });
    console.log(res);
    setData(res);
    };
 
    useEffect(() => {
      
      if (userInfo?.accountType !== "admin") {
        window.location.replace("/");
        }

  }, []);
  const handleDeletePost = async (id) => {

    try {
      if (window.confirm("Delete Job Post?")) {
        const res = await apiRequest({
          url: "/jobs/delete-job/" + id,
          token: user?.token,
          method: "DELETE",
        });
        if (res?.success) {
          alert("Deleted Successfully");
          window.location.reload();
        }
      }

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <>
    <div id="adminDashboard">
    <div className='page-name'>Admin Dashboard</div>
    <div className='section-name'>Jobs Marked as inappropriate!</div>

    <div className="complaints">
      
      {data.map((dataObj, index) => {
  return (
    <div className='complaint-card' key={index}> 
      <p className='complaint-job-name'>Job Name: {dataObj.job?.jobTitle}</p>
      <p className='complaint-user'>Marked By: {dataObj.user.firstName} {dataObj.user.lastName}</p>
      <p className='complaint-user'>Report: {dataObj.reportBody}</p>
      <div className="actions">
        <button onClick={() => handleDeletePost(dataObj.job?._id)} className='delete-btn'>Delete Job</button>
        <a href={`/job-detail/${dataObj.job?._id}`} ><button className='info-btn'>Visit Job</button></a>
      </div>
    </div>
  );
})}

  
            </div>

            </div>
    
    </>
  )
}
