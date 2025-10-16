import React, { useState } from 'react';
import S from './styles';

interface ToggleProps {
  isOn?: boolean;
  onChange?: (isOn: boolean) => void;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  isOn = false,
  onChange,
  disabled = false,
}) => {
  const [internalState, setInternalState] = useState(isOn);
  const isControlled = onChange !== undefined;
  const currentState = isControlled ? isOn : internalState;

  const handleToggle = () => {
    if (disabled) return;

    if (isControlled) {
      onChange?.(!currentState);
    } else {
      setInternalState(!internalState);
    }
  };

  return (
    <S.ToggleWrapper
      onClick={handleToggle}
      disabled={disabled}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      <S.ToggleBackground isOn={currentState} />
      <S.ToggleHandle isOn={currentState} />
    </S.ToggleWrapper>
  );
};

export default Toggle;
