/**
 * Check if a file is an image based on MIME type
 * @param file - The file to check
 * @returns true if the file is an image, false otherwise
 */
export const isImageFile = (file: File): boolean => {
  if (!file || !file.type) return false;

  return file.type.startsWith('image/');
};

/**
 * Check if a file is a PDF based on MIME type
 * @param file - The file to check
 * @returns true if the file is a PDF, false otherwise
 */
export const isPDFFile = (file: File): boolean => {
  if (!file || !file.type) return false;

  return file.type === 'application/pdf';
};

/**
 * Convert a File object to Base64 data URL
 * @param file - The file to convert
 * @returns Promise that resolves to Base64 data URL string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Validate PDF file type and size
 * @param file - The PDF file to validate
 * @param maxSizeBytes - Maximum file size in bytes
 */

export const validatePDFFile = (
  file: File,
  maxSizeBytes: number
): { isValid: boolean; error?: string } => {
  // Check file type
  if (!isPDFFile(file)) {
    return {
      isValid: false,
      error: 'File type not supported. Only PDF files are allowed.',
    };
  }

  // Check file size
  if (file.size > maxSizeBytes) {
    const maxSizeMB = Math.round(maxSizeBytes / (1024 * 1024));
    return {
      isValid: false,
      error: `File size must be less than ${maxSizeMB}MB`,
    };
  }

  return { isValid: true };
};
