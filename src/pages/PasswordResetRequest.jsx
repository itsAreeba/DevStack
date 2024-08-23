import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/api/forgot-password', { email });
      setSuccessMessage(response.data.message);
      setEmail(''); // Clear email input after successful request
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
  <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
  {successMessage && <p className="text-green-500">{successMessage}</p>}
  <form onSubmit={handleSubmit} className="mb-4">
    <div className="mb-4">
    <input
  type="email"
  id="email"
  value={email}
  placeholder='Enter your email address'
  onChange={(e) => setEmail(e.target.value)}
  required
  className="mt-1 block w-full rounded-md border border-black focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
  style={{
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  }}
/>


    </div>
    <div className="text-center">
      <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Send Reset Instructions</button>
    </div>
  </form>
</div>

  );
};

export default PasswordResetRequest;
