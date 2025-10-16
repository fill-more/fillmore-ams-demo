import styled from '@emotion/styled';

const TraineeListItemWrapper = styled.div<{ isCurrentUser: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px 36px 8px 20px;
  position: relative;
  cursor: pointer;
  background-color: ${({ isCurrentUser }) =>
    isCurrentUser ? 'var(--white)' : 'transparent'};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${({ isCurrentUser }) =>
      isCurrentUser
        ? 'linear-gradient(to bottom, var(--pink), var(--red))'
        : 'none'};
  }

  &:hover {
    background-color: ${({ isCurrentUser }) =>
      isCurrentUser ? 'var(--white)' : 'var(--black-10)'};
  }
`;

export default { TraineeListItemWrapper };
