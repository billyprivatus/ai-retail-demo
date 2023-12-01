import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const LoadingDialog = ({ title, description, open }: { title: string; description: string; open: boolean }) => {
  return (
    <Dialog open={open}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className='flex justify-center items-center my-4'>
          <div className='relative inline-flex'>
            <div className='w-8 h-8 bg-primary rounded-full'></div>
            <div className='w-8 h-8 bg-primary rounded-full absolute top-0 left-0 animate-ping'></div>
            <div className='w-8 h-8 bg-primary rounded-full absolute top-0 left-0 animate-pulse'></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
