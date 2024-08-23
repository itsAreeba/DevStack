import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls
import { useParams } from 'react-router-dom'; // Assuming you're using react-router-dom

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // const { token } = useParams(); // Get reset token from URL params

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setErrorMessage('Passwords do not match');
    }

    try {
      const token = window.location.pathname.split("/").pop();
      const response = await axios.put(`http://localhost:8800/api/reset-password/${token}`, { newPassword });
      console.log({token})
      setSuccessMessage(response.data.message);
      setNewPassword(''); // Clear password inputs after successful reset
      setConfirmPassword('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    // Optional validation on token validity (can be done on the server-side as well)
    // ...
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
  <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
  {successMessage && <p className="text-green-500">{successMessage}</p>}
  <form onSubmit={handleSubmit} className="mb-4">
    <div className="mb-4">
      <label htmlFor="newPassword" className="block text-gray-700">New Password:</label>
      <input
  type="password"
  id="newPassword"
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
  required
  className="mt-1 block w-full rounded-md border border-black focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
  style={{
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  }}
/>

    </div>
    <div className="mb-4">
      <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password:</label>
      <input
  type="password"
  id="confirmPassword"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  required
  className="mt-1 block w-full rounded-md border border-black focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
  style={{
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  }}
/>

    </div>
    <div className="text-center">
      <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Reset Password</button>
    </div>
  </form>
</div>

  );
};

export default PasswordReset;
