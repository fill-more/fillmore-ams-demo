import { useNavigate } from 'react-router-dom';
import { HStack, IconButton, Text } from '@fillmore/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCommentDots,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import arrowLeft from '@/assets/arrow-left.svg';
import CalendarNavigation from '../../components/CalendarNavigation';
import { Dayjs } from 'dayjs';
import S from './styles';

interface CalendarHeaderProps {
  currentDate: Dayjs;
  setCurrentDate: (date: Dayjs) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  setCurrentDate,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <HStack align="center" justify="space-between">
      <HStack align="center" gap={10}>
        <S.BackButton onClick={handleBackClick}>
          <S.BackIcon src={arrowLeft} alt="Back" />
          <Text as="b" size={34} weight="bold" color="var(--white)">
            Calendar
          </Text>
        </S.BackButton>
      </HStack>

      <CalendarNavigation
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />

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
        <IconButton title="Upload">
          <FontAwesomeIcon size="lg" icon={faUpload} color="var(--white)" />
        </IconButton>
      </HStack>
    </HStack>
  );
};

export default CalendarHeader;
