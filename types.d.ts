declare function useHovering(): [
  boolean,
  {
    ref: React.RefObject<any>;
    onMouseEnter: React.MouseEventHandler<any>;
    onMouseLeave: React.MouseEventHandler<any>;
    onMouseMove: React.MouseEventHandler<any>;
    onFocus: React.FocusEventHandler<any>;
    onBlur: React.FocusEventHandler<any>;
    tabIndex: React.HTMLAttributes<any>['tabIndex'];
  },
];

export = useHovering;
