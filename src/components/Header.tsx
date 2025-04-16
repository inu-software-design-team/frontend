import HeaderLogo from "../assets/HeaderLogo.svg?react"
import NavBtn from "../assets/NavBtn.svg?react"
import News from "../assets/News.svg?react"
import HeaderImg from "../assets/HeaderImg.svg?react"

const Header = () =>  {
    return(
        <div className="flex flex-row bg-white items-center justify-between">
            <div className="flex flex-row items-center">
                <NavBtn className="ml-2 w-10"/>
                <HeaderLogo className="ml-2 w-22"/>
            </div>
            <div className="flex flex-row items-center">
                <News className="w-16 mr-2"/>
                <HeaderImg className="mr-16"/>
                <p className="font-normal text-[#121212]/38 mr-8 text-lg">님</p>
            </div>
        </div>

    )    
}

export default Header;