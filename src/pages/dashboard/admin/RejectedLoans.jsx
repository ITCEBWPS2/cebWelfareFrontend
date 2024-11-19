import LoansTable from "@/components/LoansTable";
import React from "react";

const RejectedLoans = () => {
  return (
    <div className="p-8 my-8">
      <LoansTable status="approved" />
    </div>
  );
};

export default RejectedLoans;
