import { useAuth } from "@/api/authContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BASE_URL } from "@/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyLoans = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/loans/user/${user._id}`,
          {
            withCredentials: true,
          }
        );
        setLoans(response.data.loans);
        setLoading(false);
      } catch (err) {
        setError("Failed to load loans");
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) return <div className="text-center mt-6">Loading...</div>;
  if (error)
    return <div className="text-center mt-6 text-red-500">{error}</div>;

  return (
    <div className="py-16 px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loans.map((loan) => (
          <>
            <Dialog>
              <DialogTrigger className="text-left m-0 p-0">
                <div
                  key={loan.loanNumber}
                  className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-lg font-semibold mb-2">
                    Loan Number: {loan.loanNumber}
                  </h2>
                  <p className="text-gray-700">
                    <span className="font-medium">Amount:</span> Rs.
                    {loan.loanAmount}
                  </p>
                  <p
                    className={`text-sm mt-2 ${getStatusColor(
                      loan.loanStatus
                    )}`}
                  >
                    <span className="font-medium">Status:</span>{" "}
                    {loan.loanStatus}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                <DialogHeader className="border-b pb-4">
                  <DialogTitle className="text-2xl font-bold">
                    {loan.loanNumber}
                  </DialogTitle>
                  <DialogDescription>Complete Loan Details.</DialogDescription>
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
                    <strong>Date of Birth:</strong> {loan.dateOfBirth || "N/A"}
                  </p>
                  <p>
                    <strong>Retirement Date:</strong>{" "}
                    {loan.retirementDate || "N/A"}
                  </p>
                  <p>
                    <strong>Loan Status:</strong> {loan.loanStatus || "N/A"}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </>
        ))}
      </div>
    </div>
  );
};

// Helper function to determine status color
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "text-green-600";
    case "pending":
      return "text-yellow-600";
    case "rejected":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export default MyLoans;
