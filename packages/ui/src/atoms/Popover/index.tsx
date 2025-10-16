import { type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import S from './styles';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

interface PopoverProps {
  isOpen?: boolean;
  children: ReactNode;
  position?: PopoverPosition;
  backgroundColor?: string;
  onClose?: () => void;
}

function Popover({
  isOpen = false,
  children,
  position = 'bottom',
  backgroundColor = 'var(--white)',
  onClose,
}: PopoverProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <S.PopoverContainer
          position={position}
          backgroundColor={backgroundColor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          clickable={onClose !== undefined}
          onClick={onClose}
        >
          <S.PopoverContent>{children}</S.PopoverContent>
          <S.PopoverTail
            position={position}
            backgroundColor={backgroundColor}
          />
        </S.PopoverContainer>
      )}
    </AnimatePresence>
  );
}

export default Popover;
