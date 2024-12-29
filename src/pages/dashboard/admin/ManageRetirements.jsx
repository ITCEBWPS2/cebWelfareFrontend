import BenefitsTable from "@/components/benefits/BenefitsTable";
import RetirementForm from "@/components/benefits/RetirementForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/api/authContext";
import { isTreasurerOrAssistantTreasurer } from "@/authorization";

const ManageRetirements = () => {
  const { user } = useAuth();

  return (
    <div className="p-8 my-8">
      {isTreasurerOrAssistantTreasurer(user) && (
        <Dialog>
          <DialogTrigger>
            <button className="mb-8 font-semibold bg-red-900 hover:bg-red-800 text-white rounded-lg px-4 py-2 transition-colors duration-200">
              New Retirement Gift
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-lg mx-auto max-h-[600px] overflow-y-scroll border-none shadow-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-2xl font-bold">
                New Retirement Gift
              </DialogTitle>
              <DialogDescription>
                Please fill this form to give a retirement gift.
              </DialogDescription>
            </DialogHeader>
            <RetirementForm />
          </DialogContent>
        </Dialog>
      )}

      <BenefitsTable benefit="retirements" benefitName="Retirement Gift" />
    </div>
  );
};

export default ManageRetirements;
