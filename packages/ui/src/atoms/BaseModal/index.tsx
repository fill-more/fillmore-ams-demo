import { type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import S from './styles';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
  zIndex?: number;
  gap?: string;
}

function BaseModal({
  isOpen,
  onClose,
  children,
  maxWidth = '800px',
  zIndex = 900,
  gap = '16px',
}: BaseModalProps) {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <S.ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={handleOverlayClick}
          style={{ zIndex }}
        >
          <S.ModalContainer
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            style={{ maxWidth, gap }}
          >
            {children}
          </S.ModalContainer>
        </S.ModalOverlay>
      )}
    </AnimatePresence>
  );
}

export default BaseModal;
