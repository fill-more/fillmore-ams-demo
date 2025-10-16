import { useState } from 'react';
import S from './styles';
import { Popover } from '@fillmore/ui';
import manufacturing from '@/assets/manufacturing.png';

interface ShipbuildingIconProps {
  icon: string;
  name: string;
  top: string;
  left: string;
}

function ShipbuildingIcon({ icon, name, top, left }: ShipbuildingIconProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetailedPopover, setIsOpenDetailedPopover] = useState(false);

  return (
    <S.Container top={top} left={left}>
      <S.Icon
        src={icon}
        alt={name}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpenDetailedPopover(!isOpenDetailedPopover)}
        onTouchStart={() => setIsOpenDetailedPopover(!isOpenDetailedPopover)}
      />
      <Popover
        isOpen={isOpen && !isOpenDetailedPopover}
        position="top"
        backgroundColor="var(--black)"
      >
        <p style={{ color: 'var(--white)', fontSize: 12, margin: 0 }}>{name}</p>
      </Popover>
      <Popover
        isOpen={isOpenDetailedPopover}
        position="top"
        backgroundColor="var(--white)"
        onClose={() => setIsOpenDetailedPopover(false)}
      >
        <img
          src={manufacturing}
          alt={name}
          style={{ width: 262, height: 98 }}
        />
      </Popover>
    </S.Container>
  );
}

export default ShipbuildingIcon;
