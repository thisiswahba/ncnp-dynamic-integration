'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from './utils';

/**
 * Hardware-style toggle: chunky pill track with a wide rounded-pill thumb.
 * Matches the NCNP design: gray track, emerald thumb that slides between
 * the two ends of the track (no circular dot).
 *
 * Usage matches the standard Switch:
 *   <HwToggle checked={value} onCheckedChange={setValue} disabled={...} />
 */
function HwToggle({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="hw-toggle"
      className={cn(
        'hw-toggle inline-flex items-center shrink-0 cursor-pointer outline-none',
        'focus-visible:ring-2 focus-visible:ring-emerald-300/60',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="hw-toggle-thumb"
        className="hw-toggle-thumb pointer-events-none block"
      />
    </SwitchPrimitive.Root>
  );
}

export { HwToggle };
