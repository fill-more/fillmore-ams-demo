import styled from '@emotion/styled';

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
`;

const ContentSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

const PreviewContainer = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  background: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
`;

const PreviewImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  background-image:
    radial-gradient(
      circle at 25% 25%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    linear-gradient(
      45deg,
      transparent 40%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 60%
    );
  background-size:
    200px 200px,
    100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '📄';
    font-size: 48px;
    opacity: 0.6;
  }
`;

const ContentDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const PromptBox = styled.div`
  background: #f8f9fa;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 12px;
  min-height: 60px;
`;

const PromptSection = styled.div<{ isEmpty?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  > div {
    flex: 1;

    width: 100%;
    border-radius: 4px;
    border: 1px solid var(--black-20);
    box-shadow: none;
  }

  > button {
    opacity: ${({ isEmpty }) => (isEmpty ? 0.2 : 1)};
    pointer-events: ${({ isEmpty }) => (isEmpty ? 'none' : 'auto')};
  }
`;

const TasksSection = styled.div`
  width: 100%;
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
`;

export default {
  ModalContent,
  ContentSection,
  PreviewContainer,
  PreviewImage,
  ContentDetails,
  PromptBox,
  PromptSection,
  TasksSection,
  TaskGrid,
};
