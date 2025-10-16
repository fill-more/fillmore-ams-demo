import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCalendar,
  faCommentDots,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { HStack, VStack, IconButton, Text } from '@fillmore/ui';
import { PATHNAME } from '@/lib/constants';

function WelcomeHeader() {
  const navigate = useNavigate();

  const handleCalendarClick = () => {
    navigate(PATHNAME.CALENDAR);
  };

  return (
    <HStack
      align="center"
      justify="space-between"
      style={{ marginLeft: '12px' }}
    >
      <VStack gap={12}>
        <Text as="h1" size={34} weight="bold" color="var(--white)">
          Welcome Captain Patrick.
        </Text>
        <Text as="span" size={14} color="var(--white)">
          Your training focus this week will be on Introduction to
          Cybersecurity, Section 3: Maintaining A Secure Infrastructure. Topics
          covered: cybersecurity laws and security.
        </Text>
      </VStack>
      <HStack gap={4}>
        <div style={{ position: 'relative' }}>
          <IconButton title="Messages">
            <FontAwesomeIcon
              size="lg"
              icon={faCommentDots}
              color="var(--white)"
            />
          </IconButton>
        </div>
        <IconButton title="Alerts">
          <FontAwesomeIcon size="lg" icon={faBell} color="var(--white)" />
        </IconButton>
        <IconButton title="Calendar" onClick={handleCalendarClick}>
          <FontAwesomeIcon size="lg" icon={faCalendar} color="var(--white)" />
        </IconButton>
        <IconButton title="Upload">
          <FontAwesomeIcon size="lg" icon={faUpload} color="var(--white)" />
        </IconButton>
      </HStack>
    </HStack>
  );
}

export default WelcomeHeader;
