import styled from '@emotion/styled';

const Badge = styled.img<{ locked?: boolean }>`
  width: 100%;
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: ${({ locked }) =>
    locked ? 'grayscale(1) brightness(0.35)' : 'none'};
  opacity: ${({ locked }) => (locked ? 0.4 : 1)};
`;

export default {
  Badge,
};
