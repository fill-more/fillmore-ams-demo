import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faCircleXmark,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { HStack, VStack, IconButton, Text } from '@fillmore/ui';
import TaskCard from '@/components/TaskCard';
import { useSuggestedTask } from '@/hooks/useSuggestedTask';

function SuggestedTask() {
  const { promptText, suggestedTask, isLoading, acceptTask, rejectTask } =
    useSuggestedTask();
  return (
    <VStack gap={10}>
      <VStack align="end">
        <Text as="b" size={10} weight="bold">
          PROMPT:
        </Text>
        <Text as="b" size={12} weight="bold" style={{ textAlign: 'right' }}>
          {promptText}
        </Text>
      </VStack>

      {isLoading ? (
        <VStack align="center" gap={8}>
          <Text as="span" size={12}>
            Generating task suggestion...
          </Text>
          <FontAwesomeIcon icon={faCircleNotch} spin size="lg" />
        </VStack>
      ) : suggestedTask ? (
        <>
          <Text as="span" size={12}>
            This task fits your request.
          </Text>
          <HStack gap={8}>
            <TaskCard
              title={suggestedTask.title}
              content={suggestedTask.content}
              type={suggestedTask.type}
            />
            <VStack>
              <IconButton onClick={acceptTask}>
                <FontAwesomeIcon size="lg" icon={faPaperPlane} />
              </IconButton>
              <IconButton onClick={rejectTask}>
                <FontAwesomeIcon
                  size="lg"
                  icon={faCircleXmark}
                  color="var(--red)"
                />
              </IconButton>
            </VStack>
          </HStack>
        </>
      ) : null}
    </VStack>
  );
}

export default SuggestedTask;
