import { useEffect, useState } from 'react';
import { useGenerationStore } from '@/stores/generationStore';

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) {
    return '0:00';
  }
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const useGenerationProgress = () => {
  const { status, startGeneration, stopGeneration, streamingContent } =
    useGenerationStore();

  // State for task count tracking
  const [estimatedTaskCount, setEstimatedTaskCount] = useState<number>(0);
  const [currentTaskCount, setCurrentTaskCount] = useState<number>(0);

  const [progress, setProgress] = useState<number>(0);
  const [streamingStartProgress, setStreamingStartProgress] = useState<
    number | null
  >(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(180); // 3 minutes in seconds

  // Parse streaming content for task count tracking with debouncing
  useEffect(() => {
    if (!streamingContent || status !== 'streaming') {
      setEstimatedTaskCount(0);
      setCurrentTaskCount(0);
      return;
    }

    // Debounce the parsing to prevent excessive updates
    const timer = setTimeout(() => {
      // During streaming, extract partial information using regex only
      // Try to extract count from partial JSON
      const countMatch = streamingContent.match(/"count":\s*(\d+)/);
      if (countMatch) {
        setEstimatedTaskCount(parseInt(countMatch[1], 10));
      }

      // Count the number of complete task objects
      const taskMatches = streamingContent.match(/\{\s*"title":/g);
      setCurrentTaskCount(taskMatches ? taskMatches.length : 0);
    }, 25); // 25ms debounce

    return () => clearTimeout(timer);
  }, [streamingContent, status]);

  // Progress calculation effect
  useEffect(() => {
    if (status === 'idle' || status === 'error') {
      setProgress(0);
      setTimeRemaining(180);
      setEstimatedTaskCount(0);
      setCurrentTaskCount(0);
      setStreamingStartProgress(null);
      return;
    }

    if (status === 'completed') {
      setProgress(100);
      setTimeRemaining(0);
      return;
    }

    if (status === 'pending') {
      const interval = setInterval(() => {
        const randomIncrement = Math.floor(Math.random() * 2); // Random 0 or 1 to add
        setProgress((prev) => prev + randomIncrement);

        setTimeRemaining((prev) => Math.max(0, prev - 1));
      }, 1000); // Update every second

      return () => clearInterval(interval);
    }

    if (status === 'streaming') {
      // Capture streaming start progress only once
      if (streamingStartProgress === null) {
        setStreamingStartProgress(progress);
        return;
      }

      // Calculate progress based on actual task completion
      if (estimatedTaskCount > 0) {
        // Remaining progress = 100 - streamingStartProgress
        // Each task contributes equally: remainingProgress / estimatedTaskCount
        const remainingProgress = 100 - streamingStartProgress;
        const progressPerTask = remainingProgress / estimatedTaskCount;
        const streamingProgress =
          streamingStartProgress + currentTaskCount * progressPerTask;

        setProgress(streamingProgress);

        // Time estimation based on remaining tasks
        const remainingTasks = estimatedTaskCount - currentTaskCount;
        const estimatedSeconds = Math.max(0, remainingTasks * 2); // 2 seconds per task

        // If progress reaches 100%, clear the time remaining
        if (streamingProgress >= 100 || remainingTasks <= 0) {
          setTimeRemaining(0);
        } else {
          setTimeRemaining(estimatedSeconds);
        }
      }
    }
  }, [
    status,
    estimatedTaskCount,
    currentTaskCount,
    streamingStartProgress,
    progress,
  ]);

  return {
    progress,
    status,
    timeRemaining: formatTime(timeRemaining),
    startGeneration,
    stopGeneration,
  };
};
