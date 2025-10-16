import { keyframes } from '@emotion/react';

export const FadeIn = (toOpacity: number = 1) => keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: ${toOpacity};
  }
`;

export const Spin = keyframes`
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
`;

export const FadeInUpCentered = (
  translateY: number = 20,
  scaleFrom: number = 0.8
) => keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) translateY(${translateY}px) scale(${scaleFrom});
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) translateY(0) scale(1);
  }
`;
