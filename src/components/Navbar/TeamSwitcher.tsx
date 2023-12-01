'use client';

import * as React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const groups = [
  {
    label: 'Personal Account',
    teams: [
      {
        label: 'Jeff C.',
        value: 'jc',
      },
      {
        label: 'Felix M.',
        value: 'fm',
      },
      {
        label: 'Alex E.',
        value: 'ae',
      },
      {
        label: 'Yeem C.',
        value: 'yc',
      },
    ],
  },
  {
    label: 'Teams',
    teams: [
      {
        label: 'Admin',
        value: 'aa',
      },
      {
        label: 'Rivatlabs',
        value: 'rivatlabs',
      },
    ],
  },
];

type Team = (typeof groups)[number]['teams'][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(groups[1].teams[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a team'
          className={cn('w-[200px] justify-between', className)}
        >
          <Avatar className='mr-2 h-5 w-5'>
            <AvatarImage src={`https://avatar.vercel.sh/${selectedTeam.value}.png`} alt={selectedTeam.label} />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {selectedTeam.label}
          <CaretSortIcon className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search account...' />
            <CommandEmpty>No team found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.teams.map((team) => (
                  <CommandItem
                    key={team.value}
                    onSelect={() => {
                      setSelectedTeam(team);
                      setOpen(false);
                    }}
                    className='text-sm'
                  >
                    <Avatar className='mr-2 h-5 w-5'>
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${team.value}.png`}
                        alt={team.label}
                        className='grayscale'
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {team.label}
                    <CheckIcon
                      className={cn('ml-auto h-4 w-4', selectedTeam.value === team.value ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
