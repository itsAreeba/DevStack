// CvBuilder.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

const CvBuilder = ({ userId }) => {
const { user } = useSelector((state) => state.user);
userId = user?._id;
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

  useEffect(() => {
    async function fetchCV() {
      try {
        const response = await axios.get(`http://localhost:8800/api/cv/${userId}`);
        if (response.data) {
          setCvData(response.data);
        }
      } catch (error) {
        console.error('Error fetching CV:', error);
      }
    }
    fetchCV();
  }, [userId]);

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    const updatedCvData = { ...cvData };
    if (type === 'education' || type === 'experience') {
      updatedCvData[type][index][name] = value;
    } else if (type === 'skills') {
      updatedCvData[type][index] = value;
    } else {
      updatedCvData[name] = value;
    }
    setCvData(updatedCvData);
  };

  const handleAddField = (type) => {
    const updatedCvData = { ...cvData };
    if (type === 'education') {
      updatedCvData.education.push({ institution: '', degree: '', graduationYear: '' });
    } else if (type === 'experience') {
      updatedCvData.experience.push({ company: '', position: '', startDate: '', endDate: '' });
    } else if (type === 'skills') {
      updatedCvData.skills.push('');
    }
    setCvData(updatedCvData);
  };

  const handleRemoveField = (index, type) => {
    const updatedCvData = { ...cvData };
    updatedCvData[type].splice(index, 1);
    setCvData(updatedCvData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8800/api/cv/${userId}`, cvData);
      alert('CV saved successfully! \nNow you can apply for jobs.');
    } catch (error) {
      console.error('Error saving CV:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl mb-6 font-semibold">CV Builder</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={cvData.fullName}
            onChange={(e) => handleChange(e)}
            placeholder="Full Name"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={cvData.email}
            onChange={(e) => handleChange(e)}
            placeholder="Email"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={cvData.phone}
            onChange={(e) => handleChange(e)}
            placeholder="Phone"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={cvData.address}
            onChange={(e) => handleChange(e)}
            placeholder="Address"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            value={cvData.summary}
            onChange={(e) => handleChange(e)}
            placeholder="Summary"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Education</h3>
          {cvData.education.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor={`institution${index}`} className="block text-sm font-medium text-gray-700">
                  Institution
                </label>
                <input
                  type="text"
                  id={`institution${index}`}
                  name="institution"
                  value={edu.institution}
                  onChange={(e) => handleChange(e, index, 'education')}
                  placeholder="Institution"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor={`degree${index}`} className="block text-sm font-medium text-gray-700">
                  Degree
                </label>
                <input
                  type="text"
                  id={`degree${index}`}
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleChange(e, index, 'education')}
                  placeholder="Degree"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor={`graduationYear${index}`} className="block text-sm font-medium text-gray-700">
                  Graduation Year
                </label>
                <input
                  type="text"
                  id={`graduationYear${index}`}
                  name="graduationYear"
                  value={edu.graduationYear}
                  onChange={(e) => handleChange(e, index, 'education')}
                  placeholder="Graduation Year"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {index > 0 && (
                <div className="col-span-1 flex justify-end">
                  <button type="button" className="text-red-600" onClick={() => handleRemoveField(index, 'education')}>
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
          <button type="button" className="mt-2 bg-gray-200 py-1 px-2 rounded-md text-sm text-gray-700" onClick={() => handleAddField('education')}>
            Add Education
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Experience</h3>
          {cvData.experience.map((exp, index) => (
            <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor={`company${index}`} className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  id={`company${index}`}
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleChange(e, index, 'experience')}
                  placeholder="Company"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor={`position${index}`} className="block text-sm font-medium text-gray-700">
                  Position
                </label>
                <input
                  type="text"
                  id={`position${index}`}
                  name="position"
                  value={exp.position}
                  onChange={(e) => handleChange(e, index, 'experience')}
                  placeholder="Position"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor={`startDate${index}`} className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="text"
                  id={`startDate${index}`}
                  name="startDate"
                  value={exp.startDate}
                  onChange={(e) => handleChange(e, index, 'experience')}
                  placeholder="Start Date"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor={`endDate${index}`} className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="text"
                  id={`endDate${index}`}
                  name="endDate"
                  value={exp.endDate}
                  onChange={(e) => handleChange(e, index, 'experience')}
                  placeholder="End Date"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {index > 0 && (
                <div className="col-span-1 flex justify-end">
                  <button type="button" className="text-red-600" onClick={() => handleRemoveField(index, 'experience')}>
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
          <button type="button" className="mt-2 bg-gray-200 py-1 px-2 rounded-md text-sm text-gray-700" onClick={() => handleAddField('experience')}>
            Add Experience
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Skills</h3>
          {cvData.skills.map((skill, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleChange(e, index, 'skills')}
                placeholder="Skill"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {index > 0 && (
                <button type="button" className="text-red-600 ml-2" onClick={() => handleRemoveField(index, 'skills')}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" className="mt-2 bg-gray-200 py-1 px-2 rounded-md text-sm text-gray-700" onClick={() => handleAddField('skills')}>
            Add Skill
          </button>
        </div>
        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Save CV
        </button>
      </form>
    </div>
  );
};

export default CvBuilder;
