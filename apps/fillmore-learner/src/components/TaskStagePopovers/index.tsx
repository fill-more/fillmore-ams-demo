import { Popover, Text, HStack } from '@fillmore/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import S from './styles';

export interface TaskStageCoordinate {
  id: number;
  label: string;
  percentLeft: number;
  percentTop: number;
  isCompleted?: boolean;
}

interface TaskStagePopoversProps {
  coordinates: TaskStageCoordinate[];
  onStageClick?: (coordinate: TaskStageCoordinate) => void;
}

function TaskStagePopovers({
  coordinates,
  onStageClick,
}: TaskStagePopoversProps) {
  const lastCoordinate =
    coordinates.length > 0 ? coordinates[coordinates.length - 1] : null;

  const handleStagePopoverClick = (coordinate: TaskStageCoordinate) => {
    if (!lastCoordinate || coordinate.id !== lastCoordinate.id) return;
    onStageClick?.(coordinate);
  };

  return (
    <S.Layer>
      {coordinates.map((coordinate) => {
        return (
          <S.StageAnchor
            key={coordinate.id}
            $animationDelay={coordinate.id}
            onClick={() => handleStagePopoverClick(coordinate)}
            style={{
              left: `${coordinate.percentLeft}%`,
              top: `${coordinate.percentTop}%`,
            }}
          >
            <Popover isOpen position="top" backgroundColor="var(--white)">
              {coordinate.id === lastCoordinate?.id && (
                <Text
                  as="b"
                  size={10}
                  color="var(--white)"
                  weight="bold"
                  style={{
                    position: 'absolute',
                    top: '-24px',
                    left: '-8px',
                    pointerEvents: 'none',
                  }}
                >
                  NEXT
                </Text>
              )}
              <HStack align="center" gap={4}>
                {coordinate.isCompleted && (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    color="var(--black)"
                    size="sm"
                  />
                )}
                <Text as="b" size={12} color="var(--black)" weight="bold">
                  {coordinate.label}
                </Text>
              </HStack>
            </Popover>
          </S.StageAnchor>
        );
      })}
    </S.Layer>
  );
}

export default TaskStagePopovers;
