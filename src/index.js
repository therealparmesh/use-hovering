import React from 'react';

export const useHovering = ({ enterDelay, exitDelay } = {}) => {
  const op = React.useRef(null);
  const [node, setNode] = React.useState(null);
  const [hovering, setHovering] = React.useState(false);

  const ref = React.useCallback(n => {
    if (n) {
      setNode(n);
    }
  }, []);

  const bind = React.useMemo(() => {
    return {
      ref,
      tabIndex: 0,
    };
  }, [ref]);

  const changeHoveringState = React.useCallback(
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

  React.useEffect(() => {
    if (!node) {
      return;
    }

    const on = () => {
      changeHoveringState(true);
    };

    const off = () => {
      changeHoveringState(false);
    };

    const outsideOff = e => {
      if (node && !node.contains(e.target)) {
        changeHoveringState(false);
      }
    };

    node.addEventListener('mouseenter', on);
    node.addEventListener('mouseleave', off);
    node.addEventListener('mousemove', on);
    node.addEventListener('focus', on);
    node.addEventListener('blur', off);
    document.addEventListener('mousemove', outsideOff);

    return () => {
      if (!node) {
        return;
      }

      node.removeEventListener('mouseenter', on);
      node.removeEventListener('mouseleave', off);
      node.removeEventListener('mousemove', on);
      node.removeEventListener('focus', on);
      node.removeEventListener('blur', off);
      document.removeEventListener('mousemove', outsideOff);
    };
  }, [node, changeHoveringState]);

  return [hovering, bind];
};
