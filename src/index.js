import React from 'react';

export const useHovering = () => {
  const [hovering, setHovering] = React.useState(false);

  const bind = React.useMemo(
    () => ({
      onMouseEnter: () => {
        setHovering(true);
      },
      onMouseLeave: () => {
        setHovering(false);
      },
      onFocus: () => {
        setHovering(true);
      },
      onBlur: () => {
        setHovering(false);
      },
      tabIndex: 0,
    }),
    [],
  );

  return [hovering, bind];
};
