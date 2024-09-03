import React, { useState } from 'react';

const MemberBenefits = () => {
  const [pfNo, setPfNo] = useState('');
  const [name, setName] = useState('');
  const [benefitsTaken, setBenefitsTaken] = useState(true); // Set to true to show the message

  const handlePfNoChange = (e) => {
    setPfNo(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="flex flex-col items-center bg-yellow-100 min-h-screen p-4">
      <div className="w-full max-w-2xl p-4 bg-gray-200 rounded-md shadow-md">
        <div className="flex space-x-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="pfNo" className="mb-2 font-medium">
              PF No:
            </label>
            <input
              type="text"
              id="pfNo"
              value={pfNo}
              onChange={handlePfNoChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <button className="w-full p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600">
            Grade 5 scholarship
          </button>
          <button className="w-full p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600">
            Retirement gift
          </button>
          <button className="w-full p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600">
            Another Benefit
          </button>
          <button className="w-full p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600">
            Yet Another Benefit
          </button>
        </div>

        {benefitsTaken && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 font-medium rounded-md shadow-md">
            Member has already taken benefits!
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberBenefits;
