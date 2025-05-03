import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const getBreakpoint = (width: number): Breakpoint => {
  if (width < 576) return 'xs';
  if (width >= 576 && width < 768) return 'sm';
  if (width >= 768 && width < 992) return 'md';
  if (width >= 992 && width < 1200) return 'lg';
  return 'xl';
};

const useBreakpoint = (): { breakpoint: Breakpoint, isAbove: (bp: Breakpoint) => boolean, isBelow: (bp: Breakpoint) => boolean } => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => getBreakpoint(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isAbove = (bp: Breakpoint): boolean => {
    const breakpointsOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    return breakpointsOrder.indexOf(breakpoint) > breakpointsOrder.indexOf(bp);
  };

  const isBelow = (bp: Breakpoint): boolean => {
    const breakpointsOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    return breakpointsOrder.indexOf(breakpoint) < breakpointsOrder.indexOf(bp);
  };

  return { breakpoint, isAbove, isBelow };
};

export default useBreakpoint; 