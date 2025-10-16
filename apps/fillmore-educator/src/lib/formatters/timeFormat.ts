/**
 * Formats a timestamp to relative time format following the pattern:
 * 1-59S > 1-59M > 1-23H > 1-6D > 1-4W
 *
 * @param timestamp - The timestamp to format
 * @returns Formatted relative time string (e.g., "24M", "1H", "3D", "1W")
 */
export const formatRelativeTime = (timestamp: Date): string => {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - timestamp.getTime();

  // Convert to different time units
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  // Return appropriate format based on time difference
  if (diffInWeeks > 0 && diffInWeeks <= 4) {
    return `${diffInWeeks}W`;
  } else if (diffInDays > 0 && diffInDays <= 6) {
    return `${diffInDays}D`;
  } else if (diffInHours > 0 && diffInHours <= 23) {
    return `${diffInHours}H`;
  } else if (diffInMinutes > 0 && diffInMinutes <= 59) {
    return `${diffInMinutes}M`;
  } else if (diffInSeconds >= 0 && diffInSeconds <= 59) {
    return `${diffInSeconds}S`;
  }

  // Fallback for very old messages (> 4 weeks)
  return '4W+';
};

/**
 * Helper function to check if a message is recent (less than 1 minute old)
 */
export const isRecentMessage = (timestamp: Date): boolean => {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - timestamp.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

  return diffInMinutes < 1;
};

/**
 * Helper function to get readable timestamp for debugging
 */
export const getReadableTimestamp = (timestamp: Date): string => {
  return timestamp.toLocaleString();
};
