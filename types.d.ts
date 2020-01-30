interface Props {
  enterDelay?: number;
  exitDelay?: number;
}

interface Bind {
  ref: React.RefObject<any>;
  tabIndex: React.HTMLAttributes<any>['tabIndex'];
}

export const useHovering: (args: Props) => [boolean, Bind];
