import {
  FeedbackBtn,
  GradeBtn,
  HomeBtn,
  MeetingBtn,
  StudentInfoBtn,
} from 'assets';

export default function SideNav() {
  return (
    <div className="flex h-screen w-48 flex-col items-center bg-white">
      <HomeBtn className="" />
      <GradeBtn className="" />
      <StudentInfoBtn className="" />
      <MeetingBtn className="" />
      <FeedbackBtn className="" />
    </div>
  );
}
