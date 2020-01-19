import React from 'react';

export const useHovering = () => {
  const ref = React.useRef();
  const [hovering, setHovering] = React.useState(false);

  const bind = React.useMemo(
    () => ({
      ref,
      onMouseEnter: () => {
        setHovering(true);
      },
      onMouseLeave: () => {
        setHovering(false);
      },
      onMouseMove: () => {
        setHovering(true);
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

  React.useEffect(() => {
    const listener = e => {
      const minX = ref.current.offsetLeft;
      const maxX = minX + ref.current.offsetWidth;
      const minY = ref.current.offsetTop;
      const maxY = minY + ref.current.offsetHeight;

      if (
        !(
          e.clientX >= minX &&
          e.clientX <= maxX &&
          e.clientY >= minY &&
          e.clientY <= maxY
        )
      ) {
        setHovering(false);
      }
    };

    document.addEventListener('mousemove', listener);

    return () => {
      document.removeEventListener('mousemove', listener);
    };
  }, []);

  return [hovering, bind];
};
