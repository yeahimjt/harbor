import { Tooltip } from '@/components/ui/tooltip';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChevronRight, InfoIcon } from 'lucide-react';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface subSection {
  sub_title: string;
  redirect?: string;
  information?: string;
  children: ReactNode;
}
const SubSection = ({
  sub_title,
  redirect,
  children,
  information,
}: subSection) => {
  return (
    <div className='space-y-4 text-my-dark-gray'>
      <span className='flex gap-2'>
        {information && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon />
              </TooltipTrigger>
              <TooltipContent className='w-[200px]'>
                {information}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {!redirect ? (
          <h3 className='text-[18px]'>{sub_title}</h3>
        ) : (
          <Link
            href={redirect}
            className='flex w-fit items-center gap-2 text-[18px]'
          >
            {sub_title} <ChevronRight className='text-my-mid-gray' />
          </Link>
        )}
      </span>
      {children}
    </div>
  );
};

export default SubSection;
