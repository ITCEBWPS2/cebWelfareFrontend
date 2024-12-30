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

const Retirements = () => {
  const { user } = useAuth();
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/retirements/benefits/${user._id}`,
          {
            withCredentials: true,
          }
        );
        setBenefits(response.data.benefits);
        setLoading(false);
      } catch (err) {
        setError("Failed to load benefits");
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  if (loading) return <div className="text-center mt-6">Loading...</div>;
  if (error)
    return <div className="text-center mt-6 text-red-500">{error}</div>;

  return (
    <div className="p-8 my-8">
      <h1 className="mb-8 font-bold text-xl">Retirement Gifts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit) => (
          <>
            <Dialog>
              <DialogTrigger className="text-left m-0 p-0">
                <div
                  key={benefit._id}
                  className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-lg font-semibold mb-2">{benefit.date}</h2>
                  <p className="text-gray-700">
                    <span className="font-medium">Amount:</span> Rs.
                    {benefit.amount}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                <DialogHeader className="border-b pb-4">
                  <DialogTitle className="text-2xl font-bold">
                    {benefit.epf}
                  </DialogTitle>
                  <DialogDescription>Full Benefit Details.</DialogDescription>
                </DialogHeader>
                <div className="py-2 text-gray-700 space-y-2">
                  <p>
                    <strong>Benefit Amount:</strong> {benefit.amount}
                  </p>
                  <p>
                    <strong>Date:</strong> {benefit.date}
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

export default Retirements;
