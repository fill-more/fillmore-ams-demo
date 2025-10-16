import {
  BaseModal,
  CloseButton,
  HStack,
  VStack,
  Button,
  TextField,
  Text,
} from '@fillmore/ui';
import TaskCard from '@/components/TaskCard';
import FilePreview from '@/components/UploadMediaModal/FilePreview';
import { useState, useEffect } from 'react';
import { useContentGeneration } from '@/hooks/useContentGeneration';
import S from './styles';

interface GeneratedContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function GeneratedContentModal({
  isOpen,
  onClose,
}: GeneratedContentModalProps) {
  const {
    fileName,
    prompt,
    uploadedFile,
    preview,
    parsedTasks,
    generateContentWithStreaming,
  } = useContentGeneration();

  const [editablePrompt, setEditablePrompt] = useState(prompt || '');

  useEffect(() => {
    setEditablePrompt(prompt || '');
  }, [prompt]);

  const handleRegenerate = () => {
    if (!uploadedFile) return;

    generateContentWithStreaming({
      file: uploadedFile,
      prompt: editablePrompt,
      fileName: fileName || uploadedFile.name,
      preview: preview,
    });
    onClose();
  };

  const handleAddSelectedTasks = () => {
    // TODO: Implement add tasks logic
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="1000px"
      zIndex={1001}
      gap="20px"
    >
      <HStack align="center" justify="space-between">
        <Text as="b" size={16} weight="bold">
          Generated Content
        </Text>
        <CloseButton onClick={onClose} />
      </HStack>

      <VStack gap={20}>
        <S.ContentSection>
          <S.PreviewContainer>
            {uploadedFile && (
              <FilePreview file={uploadedFile} preview={preview} />
            )}
          </S.PreviewContainer>

          <S.ContentDetails>
            <VStack gap={10}>
              <Text as="b" size={16} weight="bold">
                {fileName}
              </Text>
              <VStack>
                <Text as="b" size={10} weight="bold">
                  PROMPT
                </Text>
                <S.PromptSection isEmpty={!editablePrompt.trim()}>
                  <TextField
                    placeholder="Prompt"
                    value={editablePrompt}
                    onChange={(e) => setEditablePrompt(e.target.value)}
                  />
                  <Button
                    variant="light"
                    size="small"
                    onClick={handleRegenerate}
                    disabled={!editablePrompt.trim()}
                  >
                    Re-generate
                  </Button>
                </S.PromptSection>
              </VStack>
            </VStack>
          </S.ContentDetails>
        </S.ContentSection>

        <S.TasksSection>
          <VStack gap={16}>
            <Text as="b" size={10} weight="bold">
              NEW TASK RECOMMENDATIONS
            </Text>

            <S.TaskGrid>
              {parsedTasks.map((task, index) => (
                <TaskCard
                  key={index}
                  title={task.title}
                  content={task.content}
                  type={task.type}
                />
              ))}
            </S.TaskGrid>
          </VStack>
        </S.TasksSection>

        <HStack
          gap={12}
          justify="center"
          style={{
            paddingTop: '16px',
            borderTop: '1px solid var(--light-gray)',
          }}
        >
          <Button variant="light" size="small" onClick={onClose}>
            Cancel
          </Button>
          <Button filled size="small" onClick={handleAddSelectedTasks}>
            Add Selected Tasks
          </Button>
        </HStack>
      </VStack>
    </BaseModal>
  );
}

export default GeneratedContentModal;
