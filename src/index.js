import React from 'react';

export const useHovering = (ref, { enterDelay = 0, exitDelay = 0 } = {}) => {
  const op = React.useRef(null);
  const [hovering, setHovering] = React.useState(false);

  const hoverOp = React.useCallback(
    (value) => {
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

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    const node = ref.current;

    const on = () => {
      hoverOp(true);
    };

    const off = () => {
      hoverOp(false);
    };

    const outsideOff = (e) => {
      if (node && !node.contains(e.target)) {
        hoverOp(false);
      }
    };

    node.addEventListener('mouseenter', on);
    node.addEventListener('mouseleave', off);
    node.addEventListener('mousemove', on);
    node.addEventListener('focus', on);
    node.addEventListener('blur', off);
    document.addEventListener('mousemove', outsideOff);

    return () => {
      node.removeEventListener('mouseenter', on);
      node.removeEventListener('mouseleave', off);
      node.removeEventListener('mousemove', on);
      node.removeEventListener('focus', on);
      node.removeEventListener('blur', off);
      document.removeEventListener('mousemove', outsideOff);
    };
  }, [hoverOp]);

  return hovering;
};
