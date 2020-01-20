declare function useHovering(args: {
  enterDelay?: number;
  exitDelay?: number;
}): [
  boolean,
  {
    ref: React.RefObject<any>;
    tabIndex: React.HTMLAttributes<any>['tabIndex'];
    onMouseEnter: React.MouseEventHandler<any>;
    onMouseLeave: React.MouseEventHandler<any>;
    onMouseMove: React.MouseEventHandler<any>;
    onFocus: React.FocusEventHandler<any>;
    onBlur: React.FocusEventHandler<any>;
  },
];

export = useHovering;
