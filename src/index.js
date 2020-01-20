import React from 'react';

export const useHovering = ({ enterDelay, exitDelay } = {}) => {
  const ref = React.useRef(null);
  const op = React.useRef(null);
  const [hovering, setHovering] = React.useState(false);

  const changeHoverState = React.useCallback(
    value => {
      clearTimeout(op.current);

      if ((value && enterDelay) || (!value && exitDelay)) {
        op.current = setTimeout(
          () => {
            setHovering(value);
          },
          value ? enterDelay : exitDelay,
        );
      } else {
        setHovering(value);
      }
    },
    [enterDelay, exitDelay],
  );

  const bind = React.useMemo(
    () => ({
      ref,
      tabIndex: 0,
      onMouseEnter: () => {
        changeHoverState(true);
      },
      onMouseLeave: () => {
        changeHoverState(false);
      },
      onMouseMove: () => {
        changeHoverState(true);
      },
      onFocus: () => {
        changeHoverState(true);
      },
      onBlur: () => {
        changeHoverState(false);
      },
    }),
    [changeHoverState],
  );

  React.useEffect(() => {
    const listener = e => {
      if (!ref.current) {
        return;
      }

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
        changeHoverState(false);
      }
    };

    document.addEventListener('mousemove', listener);

    return () => {
      document.removeEventListener('mousemove', listener);
    };
  }, [changeHoverState]);

  return [hovering, bind];
};
