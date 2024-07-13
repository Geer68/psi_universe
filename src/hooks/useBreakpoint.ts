import { useEffect, useState } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "dxl";

type Direction = "+" | "-";

const Resolution: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  dxl: 1536,
} as const;

const BREAKPOINTS = ["sm", "md", "lg", "xl", "dxl"];

const Query = {
  isValid: (value: unknown) =>
    typeof value === "string" &&
    value.length >= 2 &&
    BREAKPOINTS.includes(value.slice(0, 2)) &&
    ["+", "-", ""].includes(value.slice(2)),

  parse: (query: string): [Breakpoint, Direction] => [
    query.slice(0, 2) as Breakpoint,
    query.slice(2) as Direction,
  ],
} as const;

export const useBreakpoint = (query: string): boolean => {
  if (!Query.isValid(query)) {
    throw Error("useBreakpoint: Invalid query");
  }

  const [matches, setMatches] = useState<boolean>(false);
  const [breakpoint, direction] = Query.parse(query);

  useEffect(() => {
    const rule = direction === "+" ? "min-width" : "max-width";
    const pixels = Resolution[breakpoint] + (direction === "+" ? 0 : -1);
    const mql = matchMedia(`(${rule}: ${pixels}px)`);

    const update = () => setMatches(mql.matches);

    update();
    mql.addEventListener("change", update);

    return () => mql.removeEventListener("change", update);
  }, [breakpoint, direction]);

  return matches;
};
