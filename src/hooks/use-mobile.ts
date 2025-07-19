import * as React from "react";

// Breakpoints aligned with Tailwind CSS defaults
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * Hook to detect if the current viewport is below a specified breakpoint
 * @param breakpoint - The breakpoint to check against (default: 'md')
 * @returns boolean indicating if the viewport is below the specified breakpoint
 */
export function useIsMobile(breakpoint: BreakpointKey = "md") {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);
  const breakpointValue = BREAKPOINTS[breakpoint];

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpointValue - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < breakpointValue);
    };

    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < breakpointValue);

    return () => mql.removeEventListener("change", onChange);
  }, [breakpointValue]);

  return !!isMobile;
}

/**
 * Hook to detect the current breakpoint
 * @returns The current breakpoint key
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<BreakpointKey | null>(null);

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;

      if (width < BREAKPOINTS.sm) return setBreakpoint(null);
      if (width < BREAKPOINTS.md) return setBreakpoint("sm");
      if (width < BREAKPOINTS.lg) return setBreakpoint("md");
      if (width < BREAKPOINTS.xl) return setBreakpoint("lg");
      if (width < BREAKPOINTS["2xl"]) return setBreakpoint("xl");
      return setBreakpoint("2xl");
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);

    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}
