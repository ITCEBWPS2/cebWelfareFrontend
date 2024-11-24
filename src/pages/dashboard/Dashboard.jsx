import React from "react";
import { Link } from "react-router-dom";

const cards = [
  {
    icon: "📦",
    title: "Apply Loans",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: "/dashboard/apply-loan",
  },
  {
    icon: "📦",
    title: "My Loans",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: "/dashboard/my-loans",
  },
  {
    icon: "📦",
    title: "Apply Benefits",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: "/dashboard/apply-benefits",
  },
  {
    icon: "📦",
    title: "My Benefits",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: "/dashboard/my-benefits",
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
            <div className="flex items-center space-x-4">
              <div className="text-4xl group-hover:text-blue-500 transition-colors duration-300">
                {card.icon}
              </div>
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
