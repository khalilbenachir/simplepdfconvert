'use client';

import { useDropzone, type DropzoneOptions, type FileRejection } from 'react-dropzone';
import { useTranslations } from 'next-intl';
import { Upload, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DropzoneProps extends Omit<DropzoneOptions, 'onDrop'> {
  onDrop?: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
  className?: string;
  showFileList?: boolean;
}

export function Dropzone({
  onDrop,
  className,
  showFileList = true,
  accept = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  },
  multiple = true,
  maxSize = 25 * 1024 * 1024, // 25MB default
  ...options
}: DropzoneProps) {
  const t = useTranslations('Dropzone');
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize,
    ...options,
  });

  const removeFile = (fileToRemove: File) => {
    const newFiles = acceptedFiles.filter((file) => file !== fileToRemove);
    onDrop?.(newFiles, [...fileRejections]);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={cn(
          'relative group rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          isDragActive && !isDragReject && 'border-primary bg-primary/5 scale-[1.02]',
          isDragReject && 'border-destructive bg-destructive/5',
          !isDragActive && 'border-border hover:border-primary/50 bg-card/50 backdrop-blur-sm'
        )}
        aria-label={t('dropzoneLabel')}
      >
        <input {...getInputProps()} aria-describedby="dropzone-instructions" />

        <div className="p-8 md:p-12 text-center space-y-6">
          {/* Upload Icon */}
          <div
            className={cn(
              'inline-flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300',
              'bg-linear-to-br from-primary/20 to-secondary/20',
              'group-hover:scale-110'
            )}
            aria-hidden="true"
          >
            <Upload
              className={cn(
                'w-10 h-10 text-primary transition-transform',
                isDragActive && 'scale-110'
              )}
              aria-hidden="true"
            />
          </div>

          {/* Upload Text */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              {isDragActive
                ? isDragReject
                  ? t('title.reject')
                  : t('title.active')
                : t('title.idle')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isDragActive
                ? isDragReject
                  ? t('subtitle.reject')
                  : t('subtitle.active')
                : t('subtitle.idle')}
            </p>
            <p id="dropzone-instructions" className="text-xs text-muted-foreground">
              {t('maxSize', { size: Math.round(maxSize / 1024 / 1024) })}
            </p>
          </div>
        </div>
      </div>

      {/* Live region for screen reader announcements */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {isDragActive && !isDragReject && t('title.active')}
        {isDragReject && t('title.reject')}
        {acceptedFiles.length > 0 && t('selectedFiles', { count: acceptedFiles.length })}
      </div>

      {/* File List */}
      {showFileList && acceptedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            {t('selectedFiles', { count: acceptedFiles.length })}
          </h4>
          <ul className="space-y-2" role="list" aria-label={t('selectedFiles', { count: acceptedFiles.length })}>
            {acceptedFiles.map((file) => (
              <li
                key={file.name}
                className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <FileText className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t('fileSize', { size: (file.size / 1024).toFixed(1) })}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file);
                  }}
                  className="p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label={t('removeFile', { filename: file.name })}
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Error List */}
      {fileRejections.length > 0 && (
        <div className="space-y-2" role="alert" aria-live="assertive">
          <h4 className="text-sm font-medium text-destructive">{t('rejectedFiles')}</h4>
          <ul className="space-y-2" role="list" aria-label={t('rejectedFiles')}>
            {fileRejections.map(({ file, errors }) => (
              <li
                key={file.name}
                className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20"
              >
                <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  {errors.map((error) => (
                    <p key={error.code} className="text-xs text-destructive/80">
                      {error.message}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
