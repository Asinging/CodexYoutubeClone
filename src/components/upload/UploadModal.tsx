import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { UploadProgress } from './UploadProgress';
import { useUploadStore } from '../../store/useUploadStore';

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
});

type UploadForm = z.infer<typeof schema>;

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UploadModal = ({ open, onOpenChange }: UploadModalProps) => {
  const [step, setStep] = useState(1);
  const { uploadProgress, uploadStatus, fileName, setUploadState, reset } = useUploadStore();
  const { register, handleSubmit } = useForm<UploadForm>({ resolver: zodResolver(schema) });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'video/*': ['.mp4', '.mov', '.m3u8'] },
    maxFiles: 1,
    onDrop: (files) => {
      const file = files[0];
      if (file) {
        setUploadState({ fileName: file.name });
        setStep(2);
      }
    },
  });

  const onSubmit = handleSubmit(async () => {
    setUploadState({ uploadStatus: 'uploading', uploadProgress: 15 });
    for (let p = 15; p <= 100; p += 15) {
      await new Promise((resolve) => setTimeout(resolve, 120));
      setUploadState({ uploadProgress: p });
    }
    setUploadState({ uploadStatus: 'success' });
    setTimeout(() => {
      reset();
      setStep(1);
      onOpenChange(false);
    }, 300);
  });

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Upload video">
      {step === 1 && (
        <div {...getRootProps()} className="rounded-xl border-2 border-dashed p-10 text-center dark:border-zinc-700">
          <input {...getInputProps()} />
          <p className="font-medium">Drop your video file here</p>
        </div>
      )}
      {step === 2 && (
        <form onSubmit={onSubmit} className="space-y-3">
          <p className="text-sm text-zinc-500">Selected file: {fileName}</p>
          <input {...register('title')} placeholder="Title" className="w-full rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-900" />
          <textarea {...register('description')} placeholder="Description" className="w-full rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-900" rows={4} />
          <UploadProgress value={uploadProgress} />
          <Button type="submit" disabled={uploadStatus === 'uploading'}>{uploadStatus === 'uploading' ? 'Uploading...' : 'Submit'}</Button>
        </form>
      )}
    </Modal>
  );
};
