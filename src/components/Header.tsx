import { HeaderImg, HeaderLogo, NavBtn, News } from '@assets';

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-white">
      <div className="flex flex-row items-center">
        <NavBtn className="ml-2 w-10" />
        <HeaderLogo className="ml-2 w-22" />
      </div>
      <div className="flex flex-row items-center">
        <News className="mr-2 w-16" />
        <HeaderImg className="mr-16" />
        <p className="mr-8 text-lg font-normal text-[#121212]/38">님</p>
      </div>
    </div>
  );
};

export default Header;
