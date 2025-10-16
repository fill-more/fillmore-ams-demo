import styled from '@emotion/styled';

const AnnouncementIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--red);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const ContentContainer = styled.div`
  flex: 1;
  min-width: 0; /* Allow text to truncate */
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-right: 1px solid var(--gray);
`;

export default {
  AnnouncementIcon,
  ContentContainer,
};
