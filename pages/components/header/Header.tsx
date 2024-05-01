import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';


const Header = () => {
  return (
    <header className='z-20 fixed lg:top-0 flex items-center w-full bg-[#121212] pt-4 pb-10 px-[50px] lg:px-[7%] drop-shadow-2xl overflow-hidden'>
      <div className='flex gap-10 items-center justify-between w-full'>
        <div className='links flex justify-center items-center gap-10 text-white text-2xl uppercase font-bold'>
          <Link href='/'>
              <img src="/EAT THE oDD$.png" alt="EAT THE oDDS" />
          </Link>
        </div>

        <div className='hidden sm:flex gap-10'>
          <div className='links flex items-center gap-4 text-white text-3xl uppercase font-zomby '>
            <Link className="cursor-pointer" href='/'>
              <span className="hover:text-[#EF03E7] cursor-pointer">
              About
              </span>
            </Link>
            <Link className="cursor-pointer" href='/bitelist'>
              <span className="hover:text-[#EF03E7] cursor-pointer">
              Bitelist
              </span>
            </Link>
            <Link className="cursor-pointer" href='/tracker'>
              <span className="hover:text-[#EF03E7] cursor-pointer">
              Tracker
              </span>
            </Link>
            <Link className="cursor-pointer" href='/eatery'>
              <span className="hover:text-[#EF03E7] cursor-pointer">
              Eatery
              </span>
            </Link>
            <Link className="cursor-pointer" href='/faq'>
              <span className="hover:text-[#EF03E7] cursor-pointer">
              FAQ
              </span>
            </Link>
          </div>
          <div className='flex items-center'>
            <ConnectButton />
          </div>
          <div className='flex gap-2 items-center'>
            <a href="https://twitter.com/eattheodds" className="cursor-pointer">
              <img src='/icon/twitter.png' alt="Twitter" />
            </a>
            <a className="cursor-pointer">
              <img src='/icon/discord.png' alt="Discord" />
            </a>
            <a className="cursor-pointer">
              <img src='/icon/opensea.png' alt="Opensea" />
            </a>
          </div>
        </div>
      </div>
      <img src='/NavBar.png' className='absolute bottom-0 left-0 w-full h-6 bg-headline bg-fill object-fill'/>
    </header>
  );
};

export default Header;
