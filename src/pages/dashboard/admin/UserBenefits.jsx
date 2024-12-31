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
import { useParams } from "react-router-dom";

const UserBenefits = () => {
  const { memberId } = useParams();
  const [deathFunds, setDeathFunds] = useState([]);
  const [medicals, setMedicals] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [retirements, setRetirements] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeathFunds = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/deathfunds/benefits/${memberId}`,
          {
            withCredentials: true,
          }
        );
        setDeathFunds(response.data.benefits);
        setLoading(false);
      } catch (err) {
        setError("Failed to load benefits");
        setLoading(false);
      }
    };

    fetchDeathFunds();
  }, []);

  useEffect(() => {
    const fetchMedicals = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/medicals/benefits/${memberId}`,
          {
            withCredentials: true,
          }
        );
        setMedicals(response.data.benefits);
        setLoading(false);
      } catch (err) {
        setError("Failed to load benefits");
        setLoading(false);
      }
    };

    fetchMedicals();
  }, []);

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/refunds/benefits/${memberId}`,
          {
            withCredentials: true,
          }
        );
        setRefunds(response.data.benefits);
        setLoading(false);
      } catch (err) {
        setError("Failed to load benefits");
        setLoading(false);
      }
    };

    fetchRefunds();
  }, []);

  useEffect(() => {
    const fetchRetirements = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/retirements/benefits/${memberId}`,
          {
            withCredentials: true,
          }
        );
        setRetirements(response.data.benefits);
        setLoading(false);
      } catch (err) {
        setError("Failed to load benefits");
        setLoading(false);
      }
    };

    fetchRetirements();
  }, []);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/scholarships/benefits/${memberId}`,
          {
            withCredentials: true,
          }
        );
        setScholarships(response.data.benefits);
        setLoading(false);
      } catch (err) {
        setError("Failed to load benefits");
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) return <div className="text-center mt-6">Loading...</div>;
  if (error)
    return <div className="text-center mt-6 text-red-500">{error}</div>;

  return (
    <div className="p-8 my-8">
      <h1 className="mb-8 font-bold text-xl">Benefits</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deathFunds.map((deathFund) => (
          <>
            <Dialog>
              <DialogTrigger className="text-left m-0 p-0">
                <div
                  key={deathFund._id}
                  className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-lg font-semibold mb-2">Death Fund</h2>
                  <p className="text-gray-700">
                    <span className="font-medium">Amount:</span> Rs.
                    {deathFund.amount}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                <DialogHeader className="border-b pb-4">
                  <DialogTitle className="text-2xl font-bold">
                    Death Fund
                  </DialogTitle>
                  <DialogDescription>Full Benefit Details.</DialogDescription>
                </DialogHeader>
                <div className="py-2 text-gray-700 space-y-2">
                  <p>
                    <strong>Benefit Amount:</strong> {deathFund.amount}
                  </p>
                  <p>
                    <strong>Person:</strong> {deathFund.personType}
                  </p>
                  <p>
                    <strong>Date:</strong> {deathFund.date}
                  </p>
                  <p>
                    <strong>Notes:</strong> {deathFund.additionalNotes || "N/A"}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </>
        ))}
        {medicals.map((medical) => (
          <>
            <Dialog>
              <DialogTrigger className="text-left m-0 p-0">
                <div
                  key={medical._id}
                  className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-lg font-semibold mb-2">Medical</h2>
                  <p className="text-gray-700">
                    <span className="font-medium">Date:</span>
                    {medical.date}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                <DialogHeader className="border-b pb-4">
                  <DialogTitle className="text-2xl font-bold">
                    Medical
                  </DialogTitle>
                  <DialogDescription>Full Benefit Details.</DialogDescription>
                </DialogHeader>
                <div className="py-2 text-gray-700 space-y-2">
                  <p>
                    <strong>Date: </strong> {medical.date}
                  </p>
                  <p>
                    <strong>Reason: </strong> {medical.reason || "N/A"}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </>
        ))}
        {refunds.map((refund) => (
          <>
            <Dialog>
              <DialogTrigger className="text-left m-0 p-0">
                <div
                  key={refund._id}
                  className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-lg font-semibold mb-2">Refund</h2>
                  <p className="text-gray-700">
                    <span className="font-medium">Amount:</span> Rs.
                    {refund.amount}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                <DialogHeader className="border-b pb-4">
                  <DialogTitle className="text-2xl font-bold">
                    Refund
                  </DialogTitle>
                  <DialogDescription>Full Benefit Details.</DialogDescription>
                </DialogHeader>
                <div className="py-2 text-gray-700 space-y-2">
                  <p>
                    <strong>Benefit Amount:</strong> {refund.amount}
                  </p>
                  <p>
                    <strong>Reason:</strong> {refund.reason || "N/A"}
                  </p>
                  <p>
                    <strong>Message:</strong> {refund.message || "N/A"}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </>
        ))}
        {retirements.map((retirement) => (
          <>
            <Dialog>
              <DialogTrigger className="text-left m-0 p-0">
                <div
                  key={retirement._id}
                  className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-lg font-semibold mb-2">
                    Retirement Gift
                  </h2>
                  <p className="text-gray-700">
                    <span className="font-medium">Amount:</span> Rs.
                    {retirement.amount}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                <DialogHeader className="border-b pb-4">
                  <DialogTitle className="text-2xl font-bold">
                    Retirement Gift
                  </DialogTitle>
                  <DialogDescription>Full Benefit Details.</DialogDescription>
                </DialogHeader>
                <div className="py-2 text-gray-700 space-y-2">
                  <p>
                    <strong>Benefit Amount:</strong> {retirement.amount}
                  </p>
                  <p>
                    <strong>Date:</strong> {retirement.date}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </>
        ))}
        {scholarships.map((scholarship) => (
          <>
            <Dialog>
              <DialogTrigger className="text-left m-0 p-0">
                <div
                  key={scholarship._id}
                  className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-lg font-semibold mb-2">Scholarship</h2>
                  <p className="text-gray-700">
                    <span className="font-medium">Amount:</span> Rs.
                    {scholarship.amount}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                <DialogHeader className="border-b pb-4">
                  <DialogTitle className="text-2xl font-bold">
                    Scholarship
                  </DialogTitle>
                  <DialogDescription>Full Benefit Details.</DialogDescription>
                </DialogHeader>
                <div className="py-2 text-gray-700 space-y-2">
                  <p>
                    <strong>Benefit Amount:</strong> {scholarship.amount}
                  </p>
                  <p>
                    <strong>Person:</strong> {scholarship.indexNumber}
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

export default UserBenefits;
