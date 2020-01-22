interface Props {
  enterDelay?: number;
  exitDelay?: number;
}

interface TargetProps {
  ref: React.RefObject<any>;
  tabIndex: React.HTMLAttributes<any>['tabIndex'];
  onMouseEnter: React.MouseEventHandler<any>;
  onMouseLeave: React.MouseEventHandler<any>;
  onMouseMove: React.MouseEventHandler<any>;
  onFocus: React.FocusEventHandler<any>;
  onBlur: React.FocusEventHandler<any>;
}

export const useHovering: (
  args: Props,
) => [boolean, (args: TargetProps) => TargetProps];
