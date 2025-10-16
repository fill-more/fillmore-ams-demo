import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Document, Page } from 'react-pdf';
import Spinner from '@/components/Spinner';
import S from './styles';
import { Text, VStack } from '@fillmore/ui';
import { isPDFFile } from '@/lib/utils/fileUtils';

interface FilePreviewProps {
  file: File;
  preview?: string | null;
}

function FilePreview({ file, preview }: FilePreviewProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    []
  );

  const goToPrevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  }, [numPages]);

  return (
    <S.PreviewSection>
      {preview ? (
        <S.PreviewImage src={preview} alt="Upload preview" />
      ) : isPDFFile(file) ? (
        <S.PdfPreviewContainer>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <VStack
                align="center"
                justify="center"
                gap={16}
                style={{
                  height: '100%',
                  minHeight: '300px',
                }}
              >
                <Spinner />
                <Text as="b" size={12} weight="bold">
                  Loading PDF...
                </Text>
              </VStack>
            }
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={
                <VStack
                  align="center"
                  justify="center"
                  gap={16}
                  style={{
                    height: '100%',
                    minHeight: '300px',
                  }}
                >
                  <Spinner />
                  <Text as="b" size={12} weight="bold">
                    Loading page...
                  </Text>
                </VStack>
              }
            />
          </Document>
          {numPages > 1 && (
            <S.PdfNavigation>
              <Text as="span" size={12}>
                Page:
              </Text>
              <S.NavButton onClick={goToPrevPage} disabled={pageNumber <= 1}>
                <FontAwesomeIcon icon={faCaretLeft} />
              </S.NavButton>
              <Text as="span" size={12}>
                <b>{pageNumber}</b>/{numPages}
              </Text>
              <S.NavButton
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
              >
                <FontAwesomeIcon icon={faCaretRight} />
              </S.NavButton>
            </S.PdfNavigation>
          )}
        </S.PdfPreviewContainer>
      ) : (
        <S.FileIcon />
      )}
    </S.PreviewSection>
  );
}

export default FilePreview;
