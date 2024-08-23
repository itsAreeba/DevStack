import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { apiRequest } from "../utils";
import './style.css'

function AllProjects() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await apiRequest({
      url: "/getAllProjects",
      method: "GET",
    });
    setData(res);
  };

  // Filter projects based on search query
  const filteredProjects = data.filter(project =>
    project.p_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="search-bar">
        <input className='searchfield'
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="projects">
        {filteredProjects.map((dataObj, index) => { // Use filteredProjects instead of data
          return (
            <a href={`/view-user/${dataObj.userId}`} key={index}>
              <div className="project-card">
                <img
                  className="project-image"
                  src={dataObj.p_imageUrl}
                  alt="Project Image"
                />
                <hr />
                <p className="project-title">{dataObj.p_title}</p>
                <p className="project-desc">{dataObj.p_desc}</p>
                <a target="_blank" href={dataObj.p_githubLink}><i><u>View on Github</u></i></a>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}

export default AllProjects;
