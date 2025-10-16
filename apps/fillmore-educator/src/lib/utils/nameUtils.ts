export const formatDisplayName = (
  firstName: string,
  lastName: string
): string => {
  return `${firstName} ${lastName}`.trim();
};

export const formatLastNameFirst = (
  firstName: string,
  lastName: string
): string => {
  return `${lastName}, ${firstName}`.trim();
};

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
};

export const formatDisplayNameSafe = (
  firstName: string | null,
  lastName: string | null
): string => {
  const first = firstName || '';
  const last = lastName || '';
  return `${first} ${last}`.trim() || 'Unknown User';
};
