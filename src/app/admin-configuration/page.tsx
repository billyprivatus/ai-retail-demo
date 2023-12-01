import { SettingForm } from '@/components/AdminConfiguration/Form';
import { Separator } from '@/components/ui/separator';

const page = () => {
  return (
    <div className='md:container'>
      <div className='space-y-6 p-10 pb-16'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
          <p className='text-muted-foreground'>Manage your AI settings and upload documents</p>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <div className='flex-1 lg:max-w-2xl'>
            <SettingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
