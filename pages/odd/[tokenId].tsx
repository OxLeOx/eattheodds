import type { NextPage } from 'next';
import type { FC } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useRouter } from 'next/router';

const Odd: NextPage = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  return (
    <div className='justify-center text-center'>
      {/* <div className='flex justify-center'>
        <ConnectButton />
      </div> */}
      <div className="container mx-auto">
        <h1 className="text-3xl">{tokenId}</h1>

      </div>

    </div>
  );
};

export default Odd;
