import React, { useEffect, useState } from "react";
import { OfferingCard } from "./offering-card";
import { useAppDispatch, useAppSelector } from "@/hooks/use-app-dispatch";
import { fetchOfferings } from "@/lib/offering-slice";
import LoadingPulse from "../animate/loading-pulse";

export const OfferingSection: React.FC = () => {
    const dispatch = useAppDispatch();
    const matchedOfferings = useAppSelector((state) => state.offering.matchedOfferings);
    const status = useAppSelector((state) => state.offering.status);
    const error = useAppSelector((state) => state.offering.error);

    useEffect(() => {
        dispatch(fetchOfferings());
    }, [dispatch]);

    console.log("matched loading", status);
    console.log("matched offfring", matchedOfferings);

    if (status === "loading") return <LoadingPulse />

    if (status === "succeeded")

        return (
            <div className="flex flex-col p-6 bg-blue-200 rounded-2xl">
                <div className="flex flex-row justify-between">
                    <h1>Receive</h1>
                    <div className="relative size-5" data-tooltip-target="tooltip-dark">

                        <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">

                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="2"></circle>

                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="75" stroke-linecap="round"></circle>
                        </svg>
                    </div>
                    <div id="tooltip-dark" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Tooltip content
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                {
                    matchedOfferings.map((offering) => {
                        return (
                            <div key={offering.metadata.id}>
                                <OfferingCard currency={offering.data.payout.currencyCode} returnAmount="$100" provider="Aqua Finance" fees="$0.07" slippage="0.03%" />
                            </div>
                        )
                    })
                }






            </div>
        );

    if (status === "failed") return <div>Failed to fetch offerings...</div>;
};