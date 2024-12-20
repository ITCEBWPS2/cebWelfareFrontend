import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const BenefitsTable = ({ benefit, benefitName }) => {
  const [benefits, setBenefits] = useState([]);
  const [selectedBenefitId, setSelectedBenefitId] = useState(null);

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/${benefit}`, {
        withCredentials: true,
      });

      setBenefits(response.data);
    } catch (error) {
      console.error("Error fetching benefits:", error);
    }
  };

  const handleDelete = async (benefitId) => {
    if (window.confirm("Are you sure you want to delete this benefit?")) {
      try {
        await axios.delete(`${BASE_URL}/api/${benefit}/${benefitId}`, {
          withCredentials: true,
        });
        setBenefits(benefits.filter((benefit) => benefit._id !== benefitId));
        alert("Benefit deleted successfully.");
      } catch (error) {
        console.error("Error deleting benefit:", error);
        alert("Failed to delete benefit!!!");
      }
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-red-900 text-white text-xs md:text-sm">
            <tr>
              {["Member ID", "Person", "Amount", "Date", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left font-semibold whitespace-nowrap"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {benefits.map((benefit, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  {benefit.memberId}
                </td>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  {benefit.personType}
                </td>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  {benefit.amount}
                </td>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  {benefit.date}
                </td>

                <td className="border px-4 py-2 text-sm whitespace-nowrap flex space-x-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white rounded-lg p-1"
                    onClick={() => handleDelete(benefit._id)}
                  >
                    <Trash2 className="p-0.5" />
                  </button>
                  <Dialog>
                    <DialogTrigger>
                      <button className="bg-yellow-500 hover:bg-yellow-700 text-white rounded-lg px-3 py-1">
                        View Details
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                      <DialogHeader className="border-b pb-4">
                        <DialogTitle className="text-2xl font-bold">
                          {benefitName} Details
                        </DialogTitle>
                        <DialogDescription>
                          View Benefit Details.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-2 text-gray-700 space-y-2">
                        <p>
                          <strong>Member ID:</strong> {benefit.memberId}
                        </p>
                        <p>
                          <strong>Person:</strong> {benefit.personType}
                        </p>
                        <p>
                          <strong>Amount:</strong> {benefit.amount}
                        </p>
                        <p>
                          <strong>Date:</strong> {benefit.date || "N/A"}
                        </p>
                        <p>
                          <strong>Notes:</strong>{" "}
                          {benefit.additionalNotes || "N/A"}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Link to={`/dashboard/members/${benefit.memberId}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-3 py-1">
                      View Member
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BenefitsTable;
