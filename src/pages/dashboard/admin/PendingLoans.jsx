import LoansTable from "@/components/LoansTable";
import React from "react";

const PendingLoans = () => {
  return (
    <div className="p-8 my-8">
      <LoansTable status="pending" />
    </div>
  );
};

export default PendingLoans;
