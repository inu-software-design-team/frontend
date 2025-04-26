import { INTRO_ITEMS } from 'data';

import { DashboardIntroBox } from 'layouts';

export default function FeedbackIntro() {
  return <DashboardIntroBox {...INTRO_ITEMS.feedback} />;
}
