import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCalendar,
  faCommentDots,
  faNewspaper,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { HStack, VStack, IconButton, Divider } from '@fillmore/ui';

import Messenger from '@/components/Messenger';
import UploadMediaModal from '@/components/UploadMediaModal';
import { useModal } from '@/hooks/useModal';
import { PATHNAME } from '@/lib/constants';

function WelcomeHeader() {
  const currentTime = dayjs();
  const navigate = useNavigate();
  const uploadModal = useModal();
  const messengerModal = useModal();

  const handleCalendarClick = () => {
    navigate(PATHNAME.CALENDAR);
  };

  return (
    <HStack
      align="center"
      justify="space-between"
      style={{ marginLeft: '12px' }}
    >
      <VStack>
        <h1>Welcome Captain Patrick.</h1>
        <HStack gap={6}>
          <p>{currentTime.format('h:mma')}</p>
          <Divider
            direction="vertical"
            length={20}
            color="var(--black-20)"
            style={{ margin: '0 4px' }}
          />
          <p>{currentTime.format('dddd, MMMM D. YYYY')}</p>
        </HStack>
      </VStack>
      <HStack gap={4}>
        <IconButton title="Calendar" onClick={handleCalendarClick}>
          <FontAwesomeIcon size="lg" icon={faCalendar} />
        </IconButton>
        <IconButton title="Generator">
          <FontAwesomeIcon size="lg" icon={faNewspaper} />
        </IconButton>
        <Divider
          direction="vertical"
          length={20}
          color="var(--black-20)"
          style={{ margin: '0 4px' }}
        />
        <div style={{ position: 'relative' }}>
          <IconButton title="Messages" onClick={messengerModal.toggle}>
            <FontAwesomeIcon size="lg" icon={faCommentDots} />
          </IconButton>
          <Messenger
            isOpen={messengerModal.isOpen}
            onClose={messengerModal.close}
          />
        </div>
        <IconButton title="Alerts">
          <FontAwesomeIcon size="lg" icon={faBell} />
        </IconButton>
        <IconButton title="Upload" onClick={uploadModal.open}>
          <FontAwesomeIcon size="lg" icon={faUpload} />
        </IconButton>
      </HStack>

      <UploadMediaModal
        isOpen={uploadModal.isOpen}
        onClose={uploadModal.close}
      />
    </HStack>
  );
}

export default WelcomeHeader;
