"use client";

import React, { useState } from 'react';
import axios from 'axios';

interface ShortUrlResponse {
    message: string,
    data: {
        _id: string,
        originalUrl: string,
        shortCode: string,
        _v: number
    }
}

const InputForm: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState<ShortUrlResponse | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://url-shortner-smoky.vercel.app/api/shortUrl", {
        url: inputValue,
      });
      console.log(response);
      
      setResponseData(response.data); // Store the response data
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your URL"
          className="px-6 py-3 w-96 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>

      {/* Display the response data below the form */}
      {responseData && (
        <div className="mt-4 p-4 border border-gray-300 rounded-lg">
          <h2 className="font-bold">Response:</h2>
          <p>{responseData.message}</p>
          <p><strong>Original URL:</strong> {responseData.data.originalUrl}</p>
          <p><strong>Short Code:</strong> https://url-shortner-smoky.vercel.app/api/{responseData.data.shortCode}</p>
        </div>
      )}
    </div>
  );
};

export default InputForm;
