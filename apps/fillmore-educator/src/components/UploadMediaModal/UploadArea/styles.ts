import styled from '@emotion/styled';

const UploadArea = styled.div<{ isDragging: boolean }>`
  border: 1px solid var(--black-20);
  border-radius: 4px;
  padding: 100px 20px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.isDragging ? 'var(--dark-gray-10)' : '#f1f1f1'};
  transition: all 0.2s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  &:hover {
    border-color: var(--blue);
  }
`;

const UploadIcon = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);

  svg {
    width: 64px !important;
    height: 64px !important;
  }
`;

export default {
  UploadArea,
  UploadIcon,
};
