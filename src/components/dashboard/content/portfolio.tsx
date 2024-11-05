import React, { Fragment } from "react";
import {
  ArrowUpIcon,
  PlusIcon,
  BuildingLibraryIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { Tabs } from "@/components/ui/tabs";
import Image from "next/image";
import { useAppSelector } from "@/hooks/use-app-dispatch";
import { RootState } from "@/lib/store";
import { renderCredential } from "@/utils/render-cred";
import { withCredentials } from "@/hocs/with-credentials";
import { VerifiableCredential } from "@web5/credentials";

interface TabItem {
  label: string;
  content: React.ReactElement;
}

const unverifiedCredentials = [
  { name: "KYC Verification", issuer: "Global ID", date: "N/A", icon: "🔐" },
  { name: "Bank Account", issuer: "GHS Bank", date: "N/A", icon: "🏦" },
  { name: "Credit Score", issuer: "Credit Bureau", date: "N/A", icon: "📊" },
  { name: "Employment", issuer: "TechCorp Inc.", date: "N/A", icon: "💼" },
  { name: "Education", issuer: "University of Ghana", date: "N/A", icon: "🎓" },
];

const verifiedCredentials = [
  {
    name: "Credential Token",
    issuer: "Ultimate Identity",
    date: "N/A",
    icon: "🪙",
  },
];

const tabsData: TabItem[] = [
  {
    label: "Tokens",
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Available Tokens</h3>
        <ul className="space-y-2">
          {[
            {
              token: "USDC",
              amount: 100.5,
              usdRate: 1,
              image: `/images/currencies/usdc.png`,
            },
            {
              token: "USDT",
              amount: 75.25,
              usdRate: 1,
              image: `/images/currencies/usdt.png`,
            },
            {
              token: "GHS",
              amount: 500.0,
              usdRate: 0.0833,
              image: `/images/currencies/ghs.png`,
            },
            {
              token: "KES",
              amount: 10000.0,
              usdRate: 0.00694,
              image: `/images/currencies/kes.png`,
            },
          ].map((item, index) => {
            const usdEquivalent = item.amount * item.usdRate;
            return (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded"
              >
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.token}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  <span>{item.token}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-600">
                    {item.amount.toFixed(2)} {item.token}
                  </span>
                  <br />
                  <span className="text-xs text-gray-500">
                    (${usdEquivalent.toFixed(2)} USD @ {item.usdRate.toFixed(6)}
                    )
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="text-xs text-gray-500 mt-2">
          * USD rates provided by mock oracle
        </p>
      </div>
    ),
  },
  {
    label: "Verifiable Credentials",
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Verified Credentials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {verifiedCredentials &&
            verifiedCredentials.map((credential, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-lg shadow-lg text-white hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-2">{credential.icon}</div>
                <h4 className="text-xl font-bold mb-2">{credential.name}</h4>
                <p className="text-sm mb-1">Issuer: {credential.issuer}</p>
                <p className="text-sm">Issued: {credential.date}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                    Not Verified ✓
                  </span>
                  <button className="text-xs bg-white text-blue-600 px-2 py-1 rounded hover:bg-opacity-90 transition-colors duration-300">
                    Get Verified
                  </button>
                </div>
              </div>
            ))}
        </div>
        <h3 className="text-lg font-semibold mb-4">Unverified Credentials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unverifiedCredentials.map((credential, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-lg shadow-lg text-white hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-2">{credential.icon}</div>
              <h4 className="text-xl font-bold mb-2">{credential.name}</h4>
              <p className="text-sm mb-1">Issuer: {credential.issuer}</p>
              <p className="text-sm">Issued: {credential.date}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                  Unverified
                </span>
                <button className="text-xs bg-white text-blue-600 px-2 py-1 rounded hover:bg-opacity-90 transition-colors duration-300">
                  Verify Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-4">
          These credentials are securely stored and can be shared selectively.
        </p>
      </div>
    ),
  },
];

const Portfolio: React.FC = () => {
  // Use useSelector to get token balances from Redux state
  const { tokenBalances, customerCredentials } = useAppSelector(
    (state: RootState) => state.wallet
  );

  const totalBalance = tokenBalances.reduce((acc, item) => {
    return acc + item.amount * item.usdRate;
  }, 0);

  const tabsData: TabItem[] = [
    {
      label: "Tokens",
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Available Tokens</h3>
          <ul className="space-y-2">
            {tokenBalances.map((item, index) => {
              const usdEquivalent = item.amount * item.usdRate;
              return (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.token}
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    <span>{item.token}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-600">
                      {item.amount.toFixed(2)} {item.token}
                    </span>
                    <br />
                    <span className="text-xs text-gray-500">
                      (${usdEquivalent.toFixed(2)} USD @{" "}
                      {item.usdRate.toFixed(6)})
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            * USD rates provided by mock oracle
          </p>
        </div>
      ),
    },
    {
      label: "Verifiable Credentials",
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Verified Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customerCredentials.length > 0 &&
              customerCredentials.map(async (credential, index) => {
                const { title, name, countryCode, issuanceDate } =
                  await renderCredential(credential as VerifiableCredential);
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-lg shadow-lg text-white hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="text-4xl mb-2">{"🪙"}</div>
                    <h4 className="text-xl font-bold mb-2">{title}</h4>
                    <p className="text-sm mb-1">Name: {name}</p>
                    <p className="text-sm mb-1">Country Code: {countryCode}</p>
                    <p className="text-sm">Issued: {issuanceDate}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                        Verified ✓
                      </span>
                    </div>
                  </div>
                );
              })}

            {customerCredentials.length === 0 && <h4>No issued Credentials</h4>}
          </div>
          <h3 className="text-lg font-semibold mb-4 mt-8">
            Unverified Credentials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unverifiedCredentials.map((credential, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-lg shadow-lg text-white hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-2">{credential.icon}</div>
                <h4 className="text-xl font-bold mb-2">{credential.name}</h4>
                <p className="text-sm mb-1">Issuer: {credential.issuer}</p>
                <p className="text-sm">Issued: {credential.date}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                    Unverified
                  </span>
                  <button className="text-xs bg-white text-blue-600 px-2 py-1 rounded hover:bg-opacity-90 transition-colors duration-300">
                    Verify Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            These credentials are securely stored and can be shared selectively.
          </p>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      {/* Balance Information */}
      <div className="flex flex-col gap-4 sm:gap-8 bg-gradient-to-br from-blue-50 to-purple-100 p-4 sm:p-8 rounded-xl shadow-lg transition-shadow duration-300">
        <div className="flex-1 space-y-4 sm:space-y-8">
          <div className="flex flex-col gap-4 bg-gradient-to-r from-teal-400 to-blue-500 p-6 rounded-b-lg">
            <div>
              <h1 className="text-md font-bold text-white">Total balance</h1>
              <h2 className="text-4xl font-semibold text-white">
                ${totalBalance.toFixed(2)}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-green-100 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <span className="text-sm sm:text-md font-medium text-gray-600">
                  Transferable
                </span>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl sm:text-3xl font-semibold text-green-600">
                    $0
                  </span>
                  <span className="ml-2 text-xs text-gray-500">USD</span>
                </div>
              </div>
              <div className="flex-1 bg-red-100 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <span className="text-sm sm:text-md font-medium text-gray-600">
                  Locked
                </span>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl sm:text-3xl font-semibold text-orange-600">
                    ${totalBalance.toFixed(2)}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">USD</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            {/* Transferable Card */}
            <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <button className="p-2 text-gray-500 sm:p-4">
                  <PlusIcon
                    aria-hidden="true"
                    className="h-6 w-6 sm:h-8 sm:w-8"
                  />
                </button>
                <span className="mt-2 text-xs sm:text-sm font-medium text-gray-500">
                  Add
                </span>
              </div>
            </div>
            <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <button className="p-2 text-gray-500 sm:p-4">
                  <ArrowUpIcon
                    aria-hidden="true"
                    className="h-6 w-6 sm:h-8 sm:w-8"
                  />
                </button>
                <span className="mt-2 text-xs sm:text-sm font-medium text-gray-500">
                  Send
                </span>
              </div>
            </div>
            <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <button className=" p-2 text-gray-500 sm:p-4">
                  <ArrowPathIcon
                    aria-hidden="true"
                    className="h-6 w-6 sm:h-8 sm:w-8"
                  />
                </button>
                <span className="mt-2 text-xs sm:text-sm font-medium text-gray-500">
                  Swap
                </span>
              </div>
            </div>
            {/* Locked Card */}
            <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <button className="p-2 text-gray-500 sm:p-4">
                  <BuildingLibraryIcon
                    aria-hidden="true"
                    className="h-6 w-6 sm:h-8 sm:w-8"
                  />
                </button>
                <span className="mt-2 text-xs sm:text-sm font-medium text-gray-500">
                  Bank
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Tabs tabsData={tabsData} />
      </div>
    </Fragment>
  );
};

export default withCredentials(Portfolio);
