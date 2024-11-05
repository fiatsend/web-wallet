import React from "react";
import { OfferingCard } from "./offering-card";
import { Offering } from "@/types/offering";
import { motion } from "framer-motion";

export const OfferingSection: React.FC<{
  offering: Offering;
  amount: string;
  isBestReturn?: boolean;
}> = ({ offering, amount, isBestReturn }) => {
  if (!offering) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 bg-gray-100 rounded-2xl text-center text-gray-600"
      >
        No offering available at the moment
      </motion.div>
    );
  }

  const receivedAmount = (
    Number(offering.data.payoutUnitsPerPayinUnit) * Number(amount)
  ).toFixed(2);
  const fees = (Number(receivedAmount) * 0.003).toFixed(2);

  return (
    <motion.div className="mb-6">
      <OfferingCard
        currency={offering.data.payout.currencyCode}
        returnAmount={`${receivedAmount} ${offering.data.payout.currencyCode}`}
        provider={offering.metadata.from}
        fees={`${fees} ${offering.data.payout.currencyCode}`}
        isBestReturn={isBestReturn}
      />
    </motion.div>
  );
};
