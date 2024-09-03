// src/pages/About.jsx
import React from 'react';
import Carousel from '../components/Carousel';

const About = () => {
  return (

    <div className="flex justify-center items-center  bg-yellow-50">
      <Carousel/>
      <div className="max-w-6xl p-8 bg-red-100 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-bold mb-8">About Us</h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1">
            <div className="bg-gray-200 w-200 h-65">
            <img src="../../../annual_general_meeting.JPG" alt="Banner 1" className="w-full  object-cover rounded mb-4" />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col space-y-4">
            <p className="text-lg">
              Welcome to our organization! We are committed to providing the best services to our members. Our mission is to support and enhance the well-being of our community through various programs and initiatives.
            </p>
            <p className="text-lg">
              Our team is dedicated to ensuring that our members receive the highest level of service and support. We believe in the power of community and strive to foster a sense of belonging and mutual support among our members.
            </p>
            <p className="text-lg">
              Thank you for being a part of our journey. Together, we can achieve great things!
            </p>
            <p className="text-lg">
              Welcome to our organization! We are committed to providing the best services to our members. Our mission is to support and enhance the well-being of our community through various programs and initiatives.
            </p>
            <p className="text-lg">
              Welcome to our organization! We are committed to providing the best services to our members. Our mission is to support and enhance the well-being of our community through various programs and initiatives.
            </p>
            <p className="text-lg">
              Welcome to our organization! We are committed to providing the best services to our members. Our mission is to support and enhance the well-being of our community through various programs and initiatives.
            </p>
            <p className="text-lg">
              Welcome to our organization! We are committed to providing the best services to our members. Our mission is to support and enhance the well-being of our community through various programs and initiatives.
            </p>
            <p className="text-lg">
              Welcome to our organization! We are committed to providing the best services to our members. Our mission is to support and enhance the well-being of our community through various programs and initiatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
