import styled from '@emotion/styled';

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CloseButton = styled.button`
  background: var(--red);
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PromptSection = styled.div<{ isEmpty?: boolean; noFile?: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 16px;

  > div {
    flex: 1;

    width: 100%;
    border-radius: 4px;
    border: 1px solid var(--black-20);
    box-shadow: none;
  }

  > button {
    align-self: flex-end;
    opacity: ${(props) => (props.isEmpty || props.noFile ? 0.2 : 1)};
    pointer-events: ${(props) =>
      props.isEmpty || props.noFile ? 'none' : 'auto'};
  }
`;

export default {
  ModalContent,
  CloseButton,
  PromptSection,
};
