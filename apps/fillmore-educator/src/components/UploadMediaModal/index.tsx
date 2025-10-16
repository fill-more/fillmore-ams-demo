import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import {
  BaseModal,
  Button,
  CloseButton,
  TextField,
  HStack,
  IconButton,
  VStack,
  Text,
} from '@fillmore/ui';
import FilePreview from './FilePreview';
import UploadArea from './UploadArea';
import { isImageFile } from '@/lib/utils/fileUtils';
import { useContentGeneration } from '@/hooks/useContentGeneration';
import S from './styles';

interface UploadMediaModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function UploadMediaModal({ isOpen = false, onClose }: UploadMediaModalProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');

  const { generateContentWithStreaming } = useContentGeneration();

  const handleFileSelect = useCallback((file: File) => {
    setUploadedFile(file);

    // Generate preview for images
    if (isImageFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, []);

  const handleUploadAnother = useCallback(() => {
    setUploadedFile(null);
    setPreview(null);
  }, []);

  const handleClose = useCallback(() => {
    setUploadedFile(null);
    setPreview(null);
    setPrompt('');
    onClose?.();
  }, [onClose]);

  const handleGenerate = useCallback(() => {
    if (!uploadedFile || !prompt) return;

    generateContentWithStreaming({
      file: uploadedFile,
      prompt,
      fileName: uploadedFile.name,
      preview,
    });
    handleClose();
  }, [
    uploadedFile,
    prompt,
    preview,
    generateContentWithStreaming,
    handleClose,
  ]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="800px"
      zIndex={1001}
      gap="20px"
    >
      <HStack align="center" justify="space-between">
        <Text as="b" size={16} weight="bold">
          Upload Media
        </Text>
        <CloseButton onClick={handleClose} />
      </HStack>

      <VStack gap={8}>
        {!uploadedFile ? (
          <UploadArea onFileSelect={handleFileSelect} />
        ) : (
          <FilePreview file={uploadedFile} preview={preview} />
        )}

        {uploadedFile && (
          <HStack justify="space-between" align="center">
            <Text as="b" size={16} weight="bold">
              {uploadedFile.name}
            </Text>
            <HStack gap={4}>
              <Text as="span" size={12}>
                Upload another file
              </Text>
              <IconButton onClick={handleUploadAnother}>
                <FontAwesomeIcon size="lg" icon={faUpload} />
              </IconButton>
            </HStack>
          </HStack>
        )}

        <S.PromptSection isEmpty={!prompt.trim()} noFile={!uploadedFile}>
          <TextField
            placeholder="Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            filled={true}
            onClick={handleGenerate}
            disabled={!uploadedFile || !prompt.trim()}
          >
            Generate
          </Button>
        </S.PromptSection>
      </VStack>
    </BaseModal>
  );
}

export default UploadMediaModal;
