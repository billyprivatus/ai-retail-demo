'use client';

import React, { DragEvent, ChangeEvent } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { CrossCircledIcon, UploadIcon } from '@radix-ui/react-icons';

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const shortenString = (string: string) => string?.slice(0, 10) + '...' + string?.slice(-8, string?.length);

const FileUpload = ({
  files,
  onChange,
  onDelete,
  accept,
}: {
  files: File[];
  onChange: (file: File[]) => void;
  onDelete: (index: number) => void;
  accept?: string;
}) => {
  const { toast } = useToast();

  const handleSelectDocument = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!event.target.files || !event.target.files[0]) {
      return toast({
        variant: 'destructive',
        title: 'Failed',
        description: 'Please select a document',
      });
    }

    onChange(Array.from(event.target.files));
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    onChange(Array.from(event.dataTransfer.files));
  };

  return (
    <div>
      <div className='flex items-center justify-center w-full' onDragOver={handleDragOver} onDrop={handleDrop}>
        <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            <UploadIcon className='w-8 h-8 text-gray-500 dark:text-gray-400' />
            <p className='my-2 text-sm text-gray-500 dark:text-gray-400'>
              <span className='font-semibold'>Click to upload</span> or drag and drop
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>PDF (MAX. 4MB)</p>
          </div>
          <Input
            id='dropzone-file'
            type='file'
            accept={accept}
            className='hidden'
            onChange={handleSelectDocument}
            multiple
            hidden
          />
        </label>
      </div>
      <div className='mt-4 flex-col space-y-2'>
        {Array.from(files).map((doc, index) => (
          <div
            key={doc.name}
            className='w-full flex justify-between items-center border-2 border-gray-300 rounded-lg bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 p-4 text-sm text-gray-500 dark:text-gray-400'
          >
            <div className='hidden sm:block'>{doc.name}</div>
            <div className='block sm:hidden'>{shortenString(doc.name)}</div>
            <div className='flex items-center gap-2'>
              <div className='font-bold'>{formatBytes(doc.size)}</div>
              <CrossCircledIcon color='red' onClick={() => onDelete(index)} className='cursor-pointer' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
