import type { NextPage } from 'next';
import Image from 'next/image';
import bookImg from '@/public/bitelist.png';

const RarityTracker: NextPage = () => {
  return (
    <div className='text-center'>
      <img src='bitelist.png' alt="book" className='w-full' />
    </div>
  );
};

export default RarityTracker;
