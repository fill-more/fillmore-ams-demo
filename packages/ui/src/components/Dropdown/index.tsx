import { useState } from 'react';
import S from './styles';
import Button from '../../atoms/Button';

interface DropdownProps {
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  onChange: (value: string) => void;
  buttonVariant?: 'light' | 'dark';
  buttonFilled?: boolean;
  size?: 'small' | 'medium';
}

function Dropdown({
  options,
  value,
  onChange,
  buttonVariant = 'light',
  buttonFilled = false,
  size = 'small',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  if (!options || options.length === 0) {
    return null;
  }

  return (
    <S.Container>
      <Button
        onClick={handleToggle}
        variant={buttonVariant}
        filled={buttonFilled}
        size={size}
        style={{ whiteSpace: 'nowrap', width: '100%' }}
      >
        <S.ButtonInner>
          <S.Label>{selectedOption?.label}</S.Label>
          <S.Arrow isOpen={isOpen}>▼</S.Arrow>
        </S.ButtonInner>
      </Button>

      <S.DropdownMenu isOpen={isOpen}>
        {options.map((option) => (
          <S.DropdownItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </S.DropdownItem>
        ))}
      </S.DropdownMenu>
    </S.Container>
  );
}

export default Dropdown;
