declare function useHovering(): [
  boolean,
  {
    onMouseEnter: React.MouseEventHandler<any>;
    onMouseLeave: React.MouseEventHandler<any>;
    onFocus: React.FocusEventHandler<any>;
    onBlur: React.FocusEventHandler<any>;
    tabIndex: React.HTMLAttributes<any>['tabIndex'];
  },
];

export = useHovering;
