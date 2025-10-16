import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--white);
  padding: 8px 16px;
  border-radius: 24px;
  gap: 10px;
  box-shadow: 10px 10px 20px 0 rgba(0, 0, 0, 0.05);
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 16px;
  height: 16px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: var(--black);
  flex: 1;

  &::placeholder {
    color: var(--light-gray);
  }
`;

const TextArea = styled(TextareaAutosize)`
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: var(--black);
  flex: 1;
  resize: none;
  font-family: inherit;

  &::placeholder {
    color: var(--light-gray);
  }
`;

export default {
  Wrapper,
  Icon,
  Input,
  TextArea,
};
