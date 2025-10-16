import styled from '@emotion/styled';

const Bar = styled.div`
  position: relative;
  height: 2px;
  width: 100%;
  background-color: var(--black);
  overflow: hidden;
`;

const Fill = styled.div<{
  pct: number;
  accent?: string;
}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(p) => Math.min(100, Math.max(0, p.pct))}%;
  background: ${(p) =>
    p.accent
      ? 'linear-gradient(135deg, #0dd4e6 0%, #00e9be 100%)'
      : 'var(--white)'};
`;

export default {
  Bar,
  Fill,
};
