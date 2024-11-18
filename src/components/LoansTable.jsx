import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { SquarePen, Trash2 } from "lucide-react";

const LoansTable = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/loans`, {
        withCredentials: true,
      });
      const sortedLoans = response.data.sort(
        (a, b) => a.welfareNo - b.welfareNo
      );
      setLoans(sortedLoans);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  const handleDelete = async (loanId) => {
    if (window.confirm("Are you sure you want to delete this loan?")) {
      try {
        await axios.delete(`${BASE_URL}/api/loans/${loanId}`, {
          withCredentials: true,
        });
        setLoans(loans.filter((loan) => loan._id !== loanId));
        alert("Loan deleted successfully.");
      } catch (error) {
        console.error("Error deleting loan:", error);
        alert("Failed to delete loan!!!");
      }
    }
  };

  return (
    <div className="p-8 my-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">search</div>
        <button
          className="bg-red-900 hover:bg-red-700 text-yellow-200 text-xl font-semibold rounded-lg px-8 py-2 transition duration-300"
          onClick={() => navigate("/dashboard/loans/apply")}
        >
          Apply a Loan
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-red-900 text-white text-xs md:text-sm">
            <tr>
              {[
                "EPF no",
                "Welfare no",
                "Name",
                "Date of Registered",
                "Date of Joined",
                "Payroll",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left font-semibold whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={loan._id}>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  td
                </td>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  td
                </td>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  {loan._id}
                </td>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  td
                </td>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  td
                </td>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  td
                </td>

                <td className="border px-4 py-2 text-sm whitespace-nowrap flex space-x-2">
                  <Dialog>
                    <DialogTrigger>
                      <div className="bg-green-500 hover:bg-green-700 text-white rounded-lg p-1">
                        <SquarePen className="p-0.5" />
                      </div>
                    </DialogTrigger>

                    <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                      Loan Update
                    </DialogContent>
                  </Dialog>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white rounded-lg p-1"
                    onClick={() => handleDelete(loan._id)}
                  >
                    <Trash2 className="p-0.5" />
                  </button>
                  <Link to={`/dashboard/members/${loan._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-3 py-1">
                      View Profile
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

export default LoansTable;
