'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCallback, useState } from 'react';

export default function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleToggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <>
      <nav className={cn('hidden md:flex items-center space-x-4 lg:space-x-6', className)} {...props}>
        <Link href='/' className='text-sm font-medium transition-colors hover:text-primary'>
          Demo
        </Link>
        <Link
          href='/admin-configuration'
          className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
        >
          Admin Configuration
        </Link>
      </nav>

      <Popover open={isOpen} onOpenChange={handleToggleMenu}>
        <PopoverTrigger asChild className='ml-auto md:hidden'>
          <Button variant={null}>
            <div className='ml-auto space-y-2'>
              <span className='block w-8 h-0.5 bg-gray-600'></span>
              <span className='block w-8 h-0.5 bg-gray-600'></span>
              <span className='block w-6 h-0.5 bg-gray-600'></span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Link
                href='/'
                className='text-sm font-medium transition-colors hover:text-primary'
                onClick={handleToggleMenu}
              >
                Demo
              </Link>
              <Link
                href='/admin-configuration'
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
                onClick={handleToggleMenu}
              >
                Admin Configuration
              </Link>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
