import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import type { PopoverPosition } from './index';

interface PopoverContainerProps {
  position: PopoverPosition;
  backgroundColor: string;
  clickable?: boolean;
}

interface PopoverTailProps {
  position: PopoverPosition;
  backgroundColor: string;
}

const PopoverContainer = styled(motion.div)<PopoverContainerProps>`
  z-index: 1000;
  position: absolute;
  display: flex;
  background-color: ${(props) => props.backgroundColor};
  padding: 4px 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};

  ${(props) => {
    const { position } = props;

    switch (position) {
      case 'top':
        return `
          bottom: calc(100% + 5px);
          left: 50%;
          transform: translateX(-50%);
        `;
      case 'bottom':
        return `
          top: calc(100% + 5px);
          left: 50%;
          transform: translateX(-50%);
        `;
      case 'left':
        return `
          right: calc(100% + 5px);
          top: 50%;
          transform: translateY(-50%);
        `;
      case 'right':
        return `
          left: calc(100% + 5px);
          top: 50%;
          transform: translateY(-50%);
        `;
      default:
        return '';
    }
  }}
`;

const PopoverContent = styled.div`
  position: relative;
  z-index: 1;
`;

const PopoverTail = styled.div<PopoverTailProps>`
  position: absolute;
  width: 0;
  height: 0;

  ${(props) => {
    const { position, backgroundColor } = props;

    switch (position) {
      case 'top':
        return `
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 5px solid ${backgroundColor};
        `;
      case 'bottom':
        return `
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-bottom: 5px solid ${backgroundColor};
        `;
      case 'left':
        return `
          right: -5px;
          top: 50%;
          transform: translateY(-50%);
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
          border-left: 5px solid ${backgroundColor};
        `;
      case 'right':
        return `
          left: -5px;
          top: 50%;
          transform: translateY(-50%);
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
          border-right: 5px solid ${backgroundColor};
        `;
      default:
        return '';
    }
  }}
`;

export default {
  PopoverContainer,
  PopoverContent,
  PopoverTail,
};
