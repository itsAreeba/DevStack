import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewCV() {
  const { id } = useParams();
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/cv/${id}`);
        setCvData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCV();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!cvData) {
    return <div>No CV found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-4">{cvData.fullName}'s CV</h1>
    <div className="mb-4">
      <p><span className="font-semibold">Email:</span> {cvData.email}</p>
      <p><span className="font-semibold">Phone:</span> {cvData.phone}</p>
      <p><span className="font-semibold">Address:</span> {cvData.address}</p>
      <p><span className="font-semibold">Summary:</span> {cvData.summary}</p>
    </div>
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Education</h2>
      {cvData.education.map((edu, index) => (
        <div key={index} className="mb-2">
          <p><span className="font-semibold">Institution:</span> {edu.institution}</p>
          <p><span className="font-semibold">Degree:</span> {edu.degree}</p>
          <p><span className="font-semibold">Graduation Year:</span> {edu.graduationYear}</p>
        </div>
      ))}
    </div>
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Experience</h2>
      {cvData.experience.map((exp, index) => (
        <div key={index} className="mb-2">
          <p><span className="font-semibold">Position:</span> {exp.position}</p>
          <p><span className="font-semibold">Company:</span> {exp.company}</p>
          <p><span className="font-semibold">Start Date:</span> {exp.startDate}</p>
          <p><span className="font-semibold">End Date:</span> {exp.endDate}</p>
        </div>
      ))}
    </div>
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Skills</h2>
      <ul className="list-disc pl-4">
        {cvData.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  </div>
  
  );
}
