import HomeBtn from "../assets/HomeBtn.svg?react"
import GradeBtn from "../assets/GradeBtn.svg?react"
import StudentInfoBtn from "../assets/StudentInfoBtn.svg?react"
import MeetingBtn from "../assets/MeetingBtn.svg?react"
import FeedbackBtn from "../assets/FeedbackBtn.svg?react"


const SideNav = () =>  {
    return(
        <div className="flex flex-col bg-white items-center w-48 h-screen">
            <HomeBtn className=""/>
            <GradeBtn className=""/>
            <StudentInfoBtn className=""/>
            <MeetingBtn className=""/>
            <FeedbackBtn className=""/>
        </div>

    )    
}

export default SideNav;