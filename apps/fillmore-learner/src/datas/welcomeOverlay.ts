import {
  faBolt,
  faCalendar,
  faCommentDots,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';

import type { PriorityItemData } from '@/pages/MainPage/components/WelcomeOverlay/PriorityItem';

export const welcomeOverlayPriorityItems: PriorityItemData[] = [
  {
    id: 'message',
    title: 'Urgent message from Cpt. Patrick',
    description: 'Study group report',
    icon: faCommentDots,
  },
  {
    id: 'training',
    title: 'Training due in 2 days',
    description: 'Stage 1-4',
    icon: faBolt,
  },
  {
    id: 'calendar',
    title: 'High priority calendar item',
    description: '9:00 meeting',
    icon: faCalendar,
  },
  {
    id: 'news',
    title: 'Breaking News',
    description: '“Congress Passes Fiscal 2024 Defense Spending Bill...”',
    icon: faNewspaper,
  },
];
