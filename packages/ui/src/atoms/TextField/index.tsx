import { useRef } from 'react';
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  KeyboardEvent,
  CSSProperties,
  CompositionEvent as ReactCompositionEvent,
} from 'react';
import type { TextareaAutosizeProps } from 'react-textarea-autosize';
import S from './styles';

interface TextFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement> &
      TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange'
  > {
  icon?: React.ReactNode;
  onEnterPress?: () => void;
  wrapperStyle?: CSSProperties;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

function TextField({
  icon,
  onEnterPress,
  wrapperStyle,
  multiline = false,
  minRows = 1,
  maxRows = 3,
  ...props
}: TextFieldProps) {
  const isComposingRef = useRef(false);

  const handleCompositionStart = (
    e: ReactCompositionEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    isComposingRef.current = true;
    props.onCompositionStart?.(e as ReactCompositionEvent<HTMLInputElement>);
  };

  const handleCompositionEnd = (
    e: ReactCompositionEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    isComposingRef.current = false;
    props.onCompositionEnd?.(e as ReactCompositionEvent<HTMLInputElement>);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && onEnterPress) {
      if (isComposingRef.current) return;
      // Multiline: Shift+Enter for new line, Enter for submit
      // Single line: Enter for submit
      if (multiline && e.shiftKey) {
        return; // Allow default behavior (new line) for Shift+Enter
      }
      e.preventDefault();
      onEnterPress();
    }
    props.onKeyDown?.(e as KeyboardEvent<HTMLInputElement>);
  };

  return (
    <S.Wrapper style={wrapperStyle}>
      {icon && <S.Icon>{icon}</S.Icon>}
      {multiline ? (
        <S.TextArea
          {...(props as Omit<TextareaAutosizeProps, 'ref'>)}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          minRows={minRows}
          maxRows={maxRows}
        />
      ) : (
        <S.Input
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
      )}
    </S.Wrapper>
  );
}

export default TextField;
