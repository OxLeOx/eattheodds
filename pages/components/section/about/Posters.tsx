import type { FC } from 'react';
import { useState, useEffect } from 'react'
import Image from 'next/image';

const Counter: FC = () => {

  return (
    <div id='counter' className='relative w-full mx-auto text-white'>
      <img src='Posters.png' alt='posters' className='w-full' />
      <div className='absolute left-[8.2%] top-0 w-[27.4%] h-[99%] poster'>
        <div className='relative h-full'>
          <div className='absolute text-[16px] leading-[20px] lg:text-[20px] lg:leading-[24px] text-left left-[12.5%] top-[10.6%] w-3/4 h-[70%] overflow-auto'>
            1) Each day, every oDD will automatically go up against another random oDD in the eatery.
            <br />
            <br />
            2) In the eatery, one oDD will eat the other. (Rarest oDD wins)
            <br />
            <br />
            3) The losing oDD will be removed from the game and returned in the form of a ghost
            <br />
            <br />
            4) The winning oDD will gain the rarest trait of the losing oDD, improving its rarity.
            <br />
            <br />
            5) The higher an oDD$ rarity the greater its chance of surviving the Eatery the next time it enters.
          </div>
        </div>
        <img src='posters/poster_1.png' className='absolute w-full top-0 left-0 poster-image' />
      </div>
      <div className='absolute left-[36.3%] top-0 w-[27.4%] h-[99%] poster'>
        <div className='absolute text-[16px] leading-[20px] lg:text-[20px] lg:leading-[24px] text-left left-[12.5%] top-[10.6%] w-3/4 h-[70%] overflow-auto'>
          1) On top of the daily automatic dinner at the eatery, any oDD may snack at any time.
          <br />
          <br />
          2) To snack an oDD enters the Eatery & goes up against another random oDD
          <br />
          <br />
          3) In the eatery, one oDD will snack on the other. (Rarest oDD wins)
          <br />
          <br />
          4) The oDD that is snacked on will swap its rarest trait with the corresponding trait of the winning oDD, but will NOT be removed from the game.
          <br />
          <br />
          5) The more you eat the better your oDD$.
        </div>
        <img src='posters/poster_2.png' className='absolute w-full top-0 left-0 poster-image' />
      </div>
      <div className='absolute left-[64.25%] top-0 w-[27.4%] h-[99%] poster'>
        <div className='absolute text-[16px] leading-[20px] lg:text-[20px] lg:leading-[24px] text-left left-[12.5%] top-[10.6%] w-3/4 h-[70%] overflow-auto'>
          1) When a oDD loses at dinner, it will be removed from the game and returned to its holder in the form of a ghost.
          <br />
          <br />
          2) A ghost is no longer eligible to win prizes withing the game.
          <br />
          <br />
          3) Ghosts can be redemmed for Bitelist reservations for the next round of the game.
        </div>
        <img src='posters/poster_3.png' className='absolute w-full top-0 left-0 poster-image' />
      </div>
    </div>
  )
}

export default Counter;