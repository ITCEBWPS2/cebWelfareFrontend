import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <div>
      <div
        className="relative bg-cover bg-center w-full min-h-[600px]" // Adjust min-h to increase height
        style={{
          backgroundImage: 'url("/footer.jpg")',
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Text content overlay */}
        <div className="container mx-auto py-12 text-black">
          <div className="flex flex-cols-1 sm:flex-cols-2 md:flex-cols-3 lg:flex-cols-4 gap-6">
            {/* Corporate Profile */}
            {/* <div>
              <h3 className="text-red-600 font-semibold mb-4">
                Corporate Profile
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-red-600">
                    Annual and Statistical Reports
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600">
                    Regulatory Documents
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600">
                    Planning Documents
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600">
                    Other Publications
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-600">
                    Correspondences with PUCSL
                  </a>
                </li>
              </ul>
            </div> */}

            {/* Corporate Responsibility */}
            {/* <div>
              <h3 className="text-red-600 font-semibold mb-4">Corporate Responsibility</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-red-600">Visit Our Power Plants</a></li>
                <li><a href="#" className="hover:text-red-600">How to Visit a Power Plant</a></li>
              </ul>
            </div> */}

            {/* Careers */}
            {/* <div>
              <h3 className="text-red-600 font-semibold mb-4">Careers</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-red-600">Tender Notices</a></li>
                <li><a href="#" className="hover:text-red-600">Tender Awards</a></li>
                <li><a href="#" className="hover:text-red-600">CEB Standard Specifications</a></li>
              </ul>
            </div> */}

            {/* CEB Social Work */}
            {/* <div>
              <h3 className="text-red-600 font-semibold mb-4">CEB Social Work</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-red-600">Our Power Plants</a></li>
                <li><a href="#" className="hover:text-red-600">Reservoirs</a></li>
                <li><a href="#" className="hover:text-red-600">Distribution Sector</a></li>
                <li><a href="#" className="hover:text-red-600">Public Relations</a></li>
                <li><a href="#" className="hover:text-red-600">Down the Memory Lane</a></li>
              </ul>
            </div> */}

            {/* Business with CEB */}
            {/* <div>
              <h3 className="text-red-600 font-semibold mb-4">Business with CEB</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-red-600">What is NCRE</a></li>
                <li><a href="#" className="hover:text-red-600">National Energy Policy</a></li>
                <li><a href="#" className="hover:text-red-600">Service Agreements</a></li>
                <li><a href="#" className="hover:text-red-600">More Details</a></li>
              </ul>
            </div> */}

            {/* Knowledge Hub */}
            {/* <div>
              <h3 className="text-red-600 font-semibold mb-4">Knowledge Hub</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-red-600">History of Electricity in Sri Lanka</a></li>
                <li><a href="#" className="hover:text-red-600">How Does a Power Plant Operate</a></li>
                <li><a href="#" className="hover:text-red-600">What is Demand Side Management</a></li>
                <li><a href="#" className="hover:text-red-600">Introduction to Renewable Energy</a></li>
              </ul>
            </div> */}

            {/* New Customer */}
            {/* <div>
              <h3 className="text-red-600 font-semibold mb-4">New Customer</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-red-600">How Can I Get an Electricity Connection</a></li>
                <li><a href="#" className="hover:text-red-600">Other Instructions</a></li>
                <li><a href="#" className="hover:text-red-600">New Connection Request</a></li>
                <li><a href="#" className="hover:text-red-600">Download Application</a></li>
              </ul>
            </div> */}

            {/* Existing Customer */}
            {/* <div>
              <h3 className="text-red-600 font-semibold mb-4">Existing Customer</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-red-600">Applications & Guidelines</a></li>
                <li><a href="#" className="hover:text-red-600">Tariff Category</a></li>
                <li><a href="#" className="hover:text-red-600">Safety</a></li>
                <li><a href="#" className="hover:text-red-600">Let's Save Electricity!</a></li>
                <li><a href="#" className="hover:text-red-600">Customer Service</a></li>
                <li><a href="#" className="hover:text-red-600">Bill Calculation</a></li>
                <li><a href="#" className="hover:text-red-600">Instant Payment</a></li>
              </ul>
            </div> */}

            {/* Contact Us */}
            {/* <div>
              <h3 className="text-red-600 font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-red-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-red-600">Right to Information</a></li>
              </ul>
            </div> */}

            {/* Follow Us */}
            <div className="lg:col-span-2">
              <h3 className="text-red-600 font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-red-600">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="hover:text-red-600">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-red-600">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container p-4 flex gap-x-9 justify-between items-center text-white">
          <div className="space-x-2 p-4 grid rounded-3xl w-35 bg-red-900">
            <a
              href="https://www.powermin.gov.lk"
              className="hover:text-yellow-400 w-60"
            >
              Ministry of Power and Energy
            </a>
          </div>
          <div className="space-x-2 p-4 grid rounded-3xl w-35 bg-red-900">
            <a
              href="https://www.leco.lk"
              className="hover:text-yellow-400 w-60"
            >
              Lanka Electricity Company Pvt Ltd
            </a>
          </div>
          <div className="space-x-2 p-4 grid rounded-3xl w-35 bg-red-900 ">
            <a
              href="https://www.ltl.lk"
              className="hover:text-yellow-400 w-60 "
            >
              LTL Holdings
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-red-900 py-6">
        <div className="text-yellow-300 text-lg font-semibold flex items-center justify-center">
          <p>Welfare Society WPS II </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
