import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import toast from "react-hot-toast";

const LoansTable = () => {
  const [loans, setLoans] = useState([]);
  const [loanStatus, setLoanStatus] = useState("");
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const navigate = useNavigate();

  const allowedStatuses = ["pending", "approved", "rejected"];

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

  // Update loan status
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${BASE_URL}/api/loans/${selectedLoanId}/status`,
        { loanStatus },
        {
          withCredentials: true,
        }
      );

      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan._id === selectedLoanId ? { ...loan, loanStatus } : loan
        )
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setSelectedLoanId(null);
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
        <div className="flex items-center space-x-2"></div>
        <button
          className="bg-red-900 hover:bg-red-700 text-yellow-200 text-xl font-semibold rounded-lg px-8 py-2 transition duration-300"
          onClick={() => navigate("/dashboard/loans/apply")}
        >
          Apply to a Loan
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-red-900 text-white text-xs md:text-sm">
            <tr>
              {[
                "EPF no",
                "Welfare no",
                "Loan Number",
                "Name",
                "Loan Amount",
                "Status",
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
                  {loan.epfNumber}
                </td>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  {loan.memberNumber}
                </td>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  {loan.loanNumber}
                </td>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  {loan.name}
                </td>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  {loan.loanAmount}
                </td>
                <td className="border px-4 py-2 text-sm whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    {loan.loanStatus}
                    <Popover>
                      <PopoverTrigger>
                        <SquarePen
                          className="text-gray-600"
                          onClick={() => {
                            setSelectedLoanId(loan._id);
                            setLoanStatus(loan.loanStatus);
                          }}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="shadow-none">
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium">
                              Loan Status
                            </label>
                            <select
                              value={loanStatus}
                              onChange={(e) => setLoanStatus(e.target.value)}
                              className="w-full px-4 py-2 border rounded"
                            >
                              <option value="">Select Status</option>
                              {allowedStatuses.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </div>
                          <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                          >
                            Update Status
                          </button>
                        </form>
                      </PopoverContent>
                    </Popover>
                  </div>
                </td>

                <td className="border px-4 py-2 text-sm whitespace-nowrap flex space-x-2">
                  <Dialog>
                    <DialogTrigger>
                      <div className="bg-green-500 hover:bg-green-700 text-white rounded-lg p-1">
                        <SquarePen className="p-0.5" />
                      </div>
                    </DialogTrigger>

                    <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                      <DialogHeader className="border-b pb-4">
                        <DialogTitle className="text-2xl font-bold">
                          {loan.loanNumber}
                        </DialogTitle>
                        <DialogDescription>
                          Update Loan Details.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white rounded-lg p-1"
                    onClick={() => handleDelete(loan._id)}
                  >
                    <Trash2 className="p-0.5" />
                  </button>
                  <Dialog>
                    <DialogTrigger>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-lg px-3 py-1">
                        View Details
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                      <DialogHeader className="border-b pb-4">
                        <DialogTitle className="text-2xl font-bold">
                          {loan.loanNumber}
                        </DialogTitle>
                        <DialogDescription>
                          View Loan Details.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-2 text-gray-700 space-y-2">
                        <p>
                          <strong>Member No:</strong> {loan.memberNumber}
                        </p>
                        <p>
                          <strong>EPF No:</strong> {loan.epfNumber}
                        </p>
                        <p>
                          <strong>Loan No:</strong> {loan.loanNumber}
                        </p>
                        <p>
                          <strong>Loan Amount:</strong> {loan.loanAmount}
                        </p>
                        <p>
                          <strong>Member Name:</strong> {loan.name || "N/A"}
                        </p>
                        <p>
                          <strong>Address:</strong> {loan.address || "N/A"}
                        </p>
                        <p>
                          <strong>Position:</strong> {loan.position || "N/A"}
                        </p>
                        <p>
                          <strong>Branch:</strong> {loan.branch || "N/A"}
                        </p>
                        <p>
                          <strong>Contact Number:</strong>{" "}
                          {loan.contactNo?.mobile || "N/A"}
                        </p>
                        <p>
                          <strong>WhatsApp Number:</strong>{" "}
                          {loan.contactNo?.landline || "N/A"}
                        </p>
                        <p>
                          <strong>NIC:</strong> {loan.nationalIdNumber || "N/A"}
                        </p>
                        <p>
                          <strong>Reason for Loan:</strong>{" "}
                          {loan.reasonForLoan || "N/A"}
                        </p>
                        <p>
                          <strong>Required Loan Date:</strong>{" "}
                          {loan.requiredLoanDate || "N/A"}
                        </p>
                        <p>
                          <strong>Date of Birth:</strong>{" "}
                          {loan.dateOfBirth || "N/A"}
                        </p>
                        <p>
                          <strong>Retirement Date:</strong>{" "}
                          {loan.retirementDate || "N/A"}
                        </p>
                        <p>
                          <strong>Loan Status:</strong>{" "}
                          {loan.loanStatus || "N/A"}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
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
