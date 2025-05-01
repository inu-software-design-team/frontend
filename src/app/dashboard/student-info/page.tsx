import { INTRO_ITEMS } from 'data';

import { DashboardIntroBox } from 'layouts';

export default function StudentInfoIntro() {
  return <DashboardIntroBox {...INTRO_ITEMS['student-info']} />;
}
