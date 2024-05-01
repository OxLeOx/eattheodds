import type { FC } from 'react';
import { useState, useEffect } from 'react'
import Image from 'next/image';

const Counter: FC = () => {

  return (
    <div id='counter' className='relative w-full mx-auto'>
      <img src='Counter.png' alt="counter" className='w-full'/>
      <div className='absolute font-[special-elite] text-[10px] leading-3 sm:text-[15px] sm:leading-5 lg:text-[20px] lg:leading-6 left-[12%] top-[18.2%] w-[19.6%] h-[26.4%] overflow-auto'>
        Welcome Delinquents, Deviants, & Degenerate Scum to an all new NFT fine dinning extravaganza,
        where being viscous is delicious.
        <br />
        <br />
        So, get on the Bitelist today
        Reserve your seat at the table and enjoy the worlds most
        Brutal Battle Royale Buffet.
        <br />
        <br />
        Join us for 2 weeks of cannibalistic carnage
        as 8 192 oDD$ chew through the community,
        Improving their rarity and driving scarcity.
      </div>
      <div className='absolute font-[special-elite] text-[10px] leading-3 sm:text-[15px] sm:leading-5 lg:text-[20px] lg:leading-6 left-[40.4%] top-[18.2%] w-[19.6%] h-[25%] overflow-auto'>
        It’s simple, to win the competition,
        you must devour ALL the opposition.
        Revel in victory and laugh at defeat
        Cause your oDD$ get better.
        The more that you eat!
      </div>
      <div className='absolute left-[68.5%] top-[23.2%] w-[19.6%]'>
        <div className='flex flex-col justify-center text-[1.1vw] leading-[1.4vw]'>
          <p>Heads will roll</p>
          <p>as traits are hoarded</p>
          <p>for after each CHOWTIME</p>
          <p>the rarest odd gets rewarded</p>
        </div>
        <div className='grid grid-rows-6 grid-flow-col gap-x-1 mt-2 text-[1.1vw] leading-[1.4vw]'>
            <p>Day 1 - 1 ETH</p>
            <p>Day 2 - 1 ETH</p>
            <p>Day 3 - 1 ETH</p>
            <p>Day 4 - 1 ETH</p>
            <p>Day 5 - 2 ETH</p>
            <p>Day 6 - 2 ETH</p>
            <p>Day 7 - 2 ETH</p>
            <p>Day 8 - 3 ETH</p>
            <p>Day 9 - 3 ETH</p>
            <p>Day 10 - 3 ETH</p>
            <p>Day 11 - 5 ETH</p>
            <p>Day 12 - 10 ETH</p>
        </div>
        <p className='text-[2.7vw] 3xl:text-[52px] font-zomby text-white black-text-outline-sm'>DAY 13 - 30 ETH</p>
      </div>
    </div>
  )
}

export default Counter;