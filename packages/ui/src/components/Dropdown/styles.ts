import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const ButtonInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

const Arrow = styled.span<{ isOpen: boolean }>`
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 12px;
  will-change: transform;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  z-index: 900;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  background-color: var(--white-90);
  padding: 4px 0;
  margin-top: 4px;
  border-radius: 5px;
  box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.03);
  overflow: hidden;

  transition:
    transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top center;
  will-change: transform, opacity;

  ${({ isOpen }) =>
    isOpen
      ? css`
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        `
      : css`
          opacity: 0;
          transform: translateY(-8px) scale(0.95);
          pointer-events: none;
        `}
`;

const DropdownItem = styled.div`
  position: relative;
  width: 100%;
  transition: background-color 0.15s ease;
  color: var(--black);
  font-size: 12px;
  font-weight: 400;
  padding: 4px 10px;
  cursor: pointer;

  &:hover {
    background-color: #408cff80;
  }
`;

export default {
  Container,
  ButtonInner,
  Label,
  Arrow,
  DropdownMenu,
  DropdownItem,
};
