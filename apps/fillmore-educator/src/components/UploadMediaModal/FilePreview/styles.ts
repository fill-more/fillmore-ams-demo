import styled from '@emotion/styled';

const PreviewSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--light-gray);
  border-radius: 8px;
  background-color: var(--white-10);
`;

const PreviewImage = styled.img`
  max-width: 100%;
  object-fit: contain;
  border-radius: 4px;
`;

const FileIcon = styled.div`
  width: 64px;
  height: 64px;
  background: var(--light-gray);
  border-radius: 8px;
  position: relative;

  &::before {
    content: '📄';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
  }
`;

const PdfPreviewContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 60vh;

  .react-pdf__Page {
    max-width: 100% !important;
    max-height: 60vh !important;
    width: auto !important;
    height: auto !important;
    object-fit: contain;
  }

  .react-pdf__Page__canvas {
    max-width: 100% !important;
    max-height: 60vh !important;
    width: auto !important;
    height: auto !important;
    object-fit: contain;
  }
`;

const PdfNavigation = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--black-10);
  border-radius: 4px;
  backdrop-filter: blur(2px);
  opacity: 0.3;
  transition: opacity 0.3s ease;

  ${PdfPreviewContainer}:hover & {
    opacity: 1;
  }
`;

const NavButton = styled.button<{ disabled?: boolean }>`
  color: var(--black);
  background-color: transparent;
  border: none;
  border-radius: 4px;
  padding: 4px 2px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background-color: var(--light-gray);
  }
`;

export default {
  PreviewSection,
  PreviewImage,
  FileIcon,
  PdfPreviewContainer,
  PdfNavigation,
  NavButton,
};
