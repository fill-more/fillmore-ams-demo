import styled from '@emotion/styled';

const ProfileImageWrapper = styled.div<{
  size: number;
  borderColor?: string;
  clickable?: boolean;
}>`
  display: flex;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: var(--light-gray);
  flex-shrink: 0;
  border: ${({ borderColor }) =>
    borderColor ? `1px solid ${borderColor}` : 'none'};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  transition: transform 0.2s ease;

  &:hover {
    transform: ${({ clickable }) => (clickable ? 'scale(1.05)' : 'none')};
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default { ProfileImageWrapper, ProfileImage };
