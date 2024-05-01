import Footer from '../footer/Footer';
import Header from '../header/Header';

const Layout = ({ children }: any) => {
  return (
    <div className='relative min-w-screen min-h-screen bg-[url(../public/dotbg_2.png)]'>
      <Header />
      {/* <div className='pt-[108px] p-[120px]'> */}
      <div className="lg:hidden text-white pt-[140px] text-center">
        This site is a rich, graphical experience. Please view on desktop.
      </div>
      <div className="hidden lg:block pt-[100px]">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
