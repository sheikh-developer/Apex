/******************************************************************************
Copyright (c) Likhon Sheikh - @likhonsheikh on Telegram

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const SidebarContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openMobile: boolean;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: true,
  setOpen: () => {},
  openMobile: false,
  setOpenMobile: () => {},
});

const sidebarVariants = cva(
  'fixed top-0 z-50 h-screen transition-all duration-300 ease-in-out',
  {
    variants: {
      side: {
        left: 'left-0',
        right: 'right-0',
      },
    },
    defaultVariants: {
      side: 'left',
    },
  },
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, side, ...props }, ref) => {
    const { open, openMobile } = React.useContext(SidebarContext);
    return (
      <div
        ref={ref}
        className={cn(
          sidebarVariants({ side }),
          open ? 'w-64' : 'w-16',
          openMobile ? 'w-64' : 'w-0',
          'md:w-auto',
          className,
        )}
        {...props}
      />
    );
  },
);
Sidebar.displayName = 'Sidebar';

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex h-16 items-center px-4', className)}
    {...props}
  />
));
SidebarHeader.displayName = 'SidebarHeader';

const SidebarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center', className)} {...props} />
));
SidebarMenu.displayName = 'SidebarMenu';

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 overflow-y-auto px-4', className)}
    {...props}
  />
));
SidebarContent.displayName = 'SidebarContent';

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-auto border-t p-4', className)}
    {...props}
  />
));
SidebarFooter.displayName = 'SidebarFooter';

const SidebarProvider = ({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = React.useState(defaultOpen);
  const [openMobile, setOpenMobile] = React.useState(false);
  return (
    <SidebarContext.Provider
      value={{ open, setOpen, openMobile, setOpenMobile }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { open, openMobile } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-300 ease-in-out',
        open ? 'md:pl-64' : 'md:pl-16',
        openMobile ? 'pl-64' : 'pl-0',
        className,
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = 'SidebarInset';

export {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  useSidebar,
  SidebarInset,
};
