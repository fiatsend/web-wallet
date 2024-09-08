'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { decryptPrivateKey } from '@/utils/retrieve-pk';

import { Drawer } from '@/components/ui/drawer';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function WebWallet() {

  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [walletCreated, setWalletCreated] = useState<boolean>(false);
  const [importedPrivateKey, setImportedPrivateKey] = useState<string>('');
  const [passphrase, setPassphrase] = useState<string>('');

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter()

  useEffect(() => {
    const storedDid = localStorage.getItem('customerDid');
    if (storedDid) {
      router.push("/home");
    }
  }, [router]);



  const handleImportWallet = async () => {
    try {
      setIsImporting(true);

      const privateKeyJwk = await decryptPrivateKey(importedPrivateKey, passphrase);

      // Assuming DID.restore() restores a DID from a private key
      //const did = await DID.restore(privateKeyJwk);

      // Now web5 should be configured with the restored DID
      //const web5 = new Web5({ did });

      setWalletCreated(true);
      setIsImporting(false);
    } catch (error) {
      console.error("Error importing wallet:", error);
      setIsImporting(false);
    }
  };


  return (
    <div className="h-lvh p-4">
      <div className="shadow-inner border-gray-200 border-solid border-2 h-full w-full sm:w-1/2 mx-auto rounded-xl">
        <div className="relative flex min-h-full flex-1 flex-col gap-10 px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              alt="Fiatsend wallet"
              src="/favicon.ico"
              width={100}
              height={100}
              className="mx-auto h-20 w-auto my-10"
            />
            <div className='flex flex-col text-center gap-3 m-3'>
              <h1 className="text-slate-900 text-2xl font-semibold">
                Unlocking the future of Web5:
              </h1>
              <h2 className="text-slate-700 text-xl font-semibold">
                Your Native Web5 wallet
              </h2>
              <p className='text-slate-500 text-md font-semibold'>{`Choose how you'd like to set up your wallet`}
              </p>
            </div>
          </div>

          <div className='btn-container flex xl:flex-row flex-col'>
            <Link href="/account/new-seed-phrase/" className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
              <div className="flex items-center space-x-3">
                <svg className="h-6 w-6 stroke-sky-500 group-hover:stroke-white" fill="none" viewBox="0 0 24 24"></svg>
                <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">Create New Wallet</h3>
              </div>
              <p className="text-slate-500 group-hover:text-white text-sm">Create a new account with fiatsend.</p>
            </Link>

            {/* <h2>{myDid}</h2> */}

            <button onClick={() => setIsOpen(true)} className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
              <div className="flex items-center space-x-3">
                <svg className="h-6 w-6 stroke-sky-500 group-hover:stroke-white" fill="none" viewBox="0 0 24 24"></svg>
                <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">Import an Account</h3>
              </div>
              <p className="text-slate-500 group-hover:text-white text-sm">Import an existing account from a did.json file.</p>
            </button>

          </div>
          <p className="mt-10 text-sm text-gray-500 absolute bottom-0 left-0 m-6">Web Wallet v 1.00</p>
        </div>
      </div>

      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />

    </div>
  )
}