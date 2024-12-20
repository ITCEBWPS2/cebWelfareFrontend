import BenefitsTable from "@/components/benefits/BenefitsTable";
import MedicalForm from "@/components/benefits/MedicalForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

const ManageMedicals = () => {
  return (
    <div className="p-8 my-8">
      <Dialog>
        <DialogTrigger>
          <button className="mb-8 font-semibold bg-red-900 hover:bg-red-800 text-white rounded-lg px-4 py-2 transition-colors duration-200">
            New Medical
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-2xl font-bold">
              New Medical
            </DialogTitle>
            <DialogDescription>
              Please fill this form to give a medical.
            </DialogDescription>
          </DialogHeader>
          <MedicalForm />
        </DialogContent>
      </Dialog>

      <BenefitsTable benefit="medicals" benefitName="Medical" />
    </div>
  );
};

export default ManageMedicals;
