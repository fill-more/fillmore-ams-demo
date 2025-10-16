import { css } from '@emotion/react';
import styled from '@emotion/styled';

const UserHeader = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  background-color: var(--white-30);
  backdrop-filter: blur(10px);
`;

const LogoImage = styled.img<{ onClick?: () => void }>`
  width: 121px;
  height: 36px;
  object-fit: contain;

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.8;
      }
    `}
`;

const baseTextStyle = css`
  color: var(--black);
  font-size: 12px;
`;

const RoleText = styled.span`
  ${baseTextStyle}
  font-weight: 700;
`;

const NameText = styled.span`
  ${baseTextStyle}
  font-weight: 400;
`;

const ExperienceBarWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 4px;
  background-color: var(--black-80);
`;

const ExperienceBarFill = styled.div`
  height: 100%;
  background: var(linear-gradient(to right, #008fcc 0%, #0dd4e6 62.02%));
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center center;
`;

const Achievement = styled.img`
  width: 28px;
  height: 28px;
`;

export default {
  UserHeader,
  LogoImage,
  RoleText,
  NameText,
  ExperienceBarWrapper,
  ExperienceBarFill,
  Achievement,
};
