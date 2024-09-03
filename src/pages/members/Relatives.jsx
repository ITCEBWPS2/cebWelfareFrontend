// src/pages/RelativeInformation.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Relatives = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Relative Information</h2>
      <div className="mb-2">
        <span className="font-semibold">Spouse Name:</span> Mrs. R.P Perera
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfChildren">
          Number of Children
        </label>
        <input
          type="number"
          id="numberOfChildren"
          name="numberOfChildren"
          defaultValue="2"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="aboutChildren">
          About Children (e.g., Age, Name)
        </label>
        <textarea
          id="aboutChildren"
          name="aboutChildren"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfAdults">
          Number of Adults
        </label>
        <input
          type="number"
          id="numberOfAdults"
          name="numberOfAdults"
          defaultValue="3"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="aboutAdults">
          About Adults (e.g., Age, Name)
        </label>
        <textarea
          id="aboutAdults"
          name="aboutAdults"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue="chandana@gmail.com"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};

export default Relatives;
