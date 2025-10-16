import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HStack, IconButton, Text } from '@fillmore/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCommentDots,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import arrowLeft from '@/assets/arrow-left.svg';
import UploadMediaModal from '@/components/UploadMediaModal';
import Messenger from '@/components/Messenger';
import { useModal } from '@/hooks/useModal';

const CalendarHeader: React.FC = () => {
  const navigate = useNavigate();
  const uploadModal = useModal();
  const messengerModal = useModal();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <HStack align="center" justify="space-between">
      <HStack align="center">
        <img
          src={arrowLeft}
          width={48}
          height={48}
          style={{
            cursor: 'pointer',
          }}
          onClick={handleBackClick}
          alt="Back"
        />
        <Text as="b" size={16} weight="bold">
          Calendar
        </Text>
      </HStack>
      <HStack gap={4}>
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
};

export default CalendarHeader;
