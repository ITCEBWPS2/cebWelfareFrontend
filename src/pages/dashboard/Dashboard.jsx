import React from "react";
import { Link } from "react-router-dom";
import apply_loans from "../../assets/apply-loans.png";
import my_benefits from "../../assets/my-benefits.png";
import death_funds from "../../assets/death_funds.png";
import medical_benefits from "../../assets/medical_benefits.png";
import refunds from "../../assets/refunds.png";
import scholarship from "../../assets/scholarship.png";


const cards = [
  {
    icon: apply_loans,
    title: "Loans",
    description:
      "Review, approve, and manage loan applications submitted by members.",
    link: "/dashboard/loans",
  },
  {
    icon: death_funds,
    title: "Death Funds",
    description:
      "Administer and process death fund requests for eligible beneficiaries.",
    link: "/dashboard/benefits/deathfunds",
  },
  {
    icon: my_benefits,
    title: "Retirement Gifts",
    description:
      "Oversee retirement gift allocations and ensure proper disbursement.",
    link: "/dashboard/benefits/retirements",
  },
  {
    icon: scholarship,
    title: "Scholarships",
    description:
      "Manage scholarship applications and monitor award statuses for recipients.",
    link: "/dashboard/benefits/scholarships",
  },
  {
    icon: refunds,
    title: "Refunds",
    description:
      "Process and verify refund claims submitted by members efficiently.",
    link: "/dashboard/benefits/refunds",
  },
  {
    icon: medical_benefits,
    title: "Medical Benefits",
    description:
      "Administer medical benefit claims and maintain healthcare assistance records.",
    link: "/dashboard/benefits/medicals",
  },
];


const Dashboard = () => {
  return (
    <div className="pt-12 flex items-center justify-center">
      <div className="max-w-5xl w-full p-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="bg-white rounded-lg p-6 border"
          >
            <div className="flex items-start space-x-6">
              <img src={card.icon} className="w-12 h-12" />

              <div>
                <h3 className="text-xl font-semibold group-hover:text-blue-500 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
