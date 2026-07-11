import type { RefObject } from "react";

export interface UseHoveringOptions {
  enterDelay?: number;
  exitDelay?: number;
}

export function useHovering<T extends Element>(
  ref: RefObject<T | null>,
  options?: UseHoveringOptions,
): boolean;
