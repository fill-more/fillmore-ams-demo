import styled from '@emotion/styled';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background: var(--black-50);
  backdrop-filter: blur(16px);
`;

const BackgroundLayer = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  pointer-events: none;
`;

const GradientVeil = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(30, 30, 30, 0) 0%,
    rgba(30, 30, 30, 0) 14.5%,
    rgba(30, 30, 30, 0.4) 50.35%,
    rgba(30, 30, 30, 0) 86%,
    rgba(30, 30, 30, 0) 100%
  );
  pointer-events: none;
  z-index: 0;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: linear-gradient(
    90deg,
    #b4b4b400 0%,
    #0dd4e6 49.5%,
    #b4b4b400 100%
  );
`;

export default {
  Overlay,
  BackgroundLayer,
  GradientVeil,
  Divider,
};
