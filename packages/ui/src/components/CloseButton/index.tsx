import type { FC } from 'react';
import S from './styles';

interface CloseButtonProps {
  onClick: () => void;
  style?: React.CSSProperties;
}

const CloseButton: FC<CloseButtonProps> = ({ onClick, style }) => {
  return (
    <S.CloseButton onClick={onClick} type="button" style={style}>
      <S.XIcon viewBox="0 0 20 20" fill="none">
        <path d="M1 1L19 19M19 1L1 19" stroke="#FAFAFA" strokeWidth="1.5" />
      </S.XIcon>
    </S.CloseButton>
  );
};

export default CloseButton;
