import BenefitsTable from "@/components/benefits/BenefitsTable";
import RefundForm from "@/components/benefits/RefundForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

const ManageRefunds = () => {
  return (
    <div className="p-8 my-8">
      <Dialog>
        <DialogTrigger>
          <button className="mb-8 font-semibold bg-red-900 hover:bg-red-800 text-white rounded-lg px-4 py-2 transition-colors duration-200">
            New Refund
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-2xl font-bold">New Refund</DialogTitle>
            <DialogDescription>
              Please fill this form to give a refund.
            </DialogDescription>
          </DialogHeader>
          <RefundForm />
        </DialogContent>
      </Dialog>

      <BenefitsTable benefit="refunds" benefitName="Refund" />
    </div>
  );
};

export default ManageRefunds;
