import * as Progress from '@radix-ui/react-progress';

interface UploadProgressProps {
  value: number;
}

export const UploadProgress = ({ value }: UploadProgressProps) => (
  <Progress.Root className="relative h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700" value={value}>
    <Progress.Indicator className="h-full bg-red-600 transition-all" style={{ width: `${value}%` }} />
  </Progress.Root>
);
