import { isTreasurerOrAssistantTreasurer } from "@/authorization";
import LoansTable from "@/components/LoansTable";
import { useAuth } from "@/api/authContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoanApplication from "@/components/LoanApplication";

const Loans = () => {
  const { user } = useAuth();

  return (
    <div className="p-8 my-8">
      {isTreasurerOrAssistantTreasurer(user) && (
        <Dialog>
          <DialogTrigger>
            <button className="mb-8 font-semibold bg-red-900 hover:bg-red-800 text-white rounded-lg px-4 py-2 transition-colors duration-200">
              New Loan
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-2xl font-bold">New Loan</DialogTitle>
              <DialogDescription>
                Please fill this form to give a loan.
              </DialogDescription>
            </DialogHeader>
            <LoanApplication />
          </DialogContent>
        </Dialog>
      )}
      <LoansTable status="all" />
    </div>
  );
};

export default Loans;
