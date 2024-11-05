import React from "react";
import { motion } from "framer-motion";
import { CurrencyDollarIcon, UserIcon } from "@heroicons/react/24/outline";
import { mockProviderDids } from "@/constants/mockDids";

interface OfferingCardProps {
  currency: string;
  returnAmount: string;
  provider: string;
  fees: string;
  isBestReturn?: boolean;
}

export const OfferingCard: React.FC<OfferingCardProps> = ({
  currency,
  returnAmount,
  provider,
  fees,
  isBestReturn,
}) => {
  const providerName =
    Object.values(mockProviderDids).find((p) => p.uri === provider)?.name ||
    provider;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col rounded-2xl my-4 bg-gradient-to-br from-blue-600 to-purple-700 p-6 shadow-lg"
    >
      {isBestReturn && ( // Conditionally render the "Best Return" label
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="rounded-full max-w-fit bg-green-400 px-3 py-1 mb-4 text-sm font-semibold text-gray-800"
        >
          Best Return
        </motion.div>
      )}
      <div className="flex items-center gap-6">
        <motion.img
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
          src={`/images/currencies/${currency.toLowerCase()}.png`}
          width={60}
          height={60}
          alt={currency}
          className="rounded-full shadow-md"
        />
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-white mb-2">{returnAmount}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-200">
            {fees !== "N/A" && (
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-5 w-5 mr-2 text-green-300" />
                <span>Fees: {fees}</span>
              </div>
            )}
            {/* {slippage !== "N/A" && (
              <div className="flex items-center">
                <ScaleIcon className="h-5 w-5 mr-2 text-yellow-300" />
                <span>Slippage: {slippage}</span>
              </div>
            )} */}
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2 text-blue-300" />
              <span>Provider: {providerName}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
