import styled from '@emotion/styled';

const LeftNav = styled.nav`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const NavItem = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 24px 8px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--white-10);
  color: ${({ active }) => (active ? 'var(--white-10)' : 'var(--white)')};
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) =>
      active ? 'transparent' : 'var(--white-10)'};
  }
`;

export default {
  LeftNav,
  NavItem,
};
