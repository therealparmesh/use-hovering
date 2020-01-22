import React from 'react';
import memoizeOne from 'memoize-one';

const mergeRefs = memoizeOne((...refs) => {
  return value => {
    refs.forEach(resolvableRef => {
      if (typeof resolvableRef === 'function') {
        resolvableRef(value);
      } else if (resolvableRef) {
        resolvableRef.current = value;
      }
    });
  };
});

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

  const changeHoverStateAndCallIf = React.useCallback(
    memoizeOne((value, callback) => {
      return e => {
        changeHoverState(value);

        if (callback) {
          return callback(e);
        }
      };
    }),
    [changeHoverState],
  );

  const getTargetProps = React.useCallback(
    ({
      ref: resolvableRef,
      tabIndex,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      onFocus,
      onBlur,
    } = {}) => {
      return {
        ref: resolvableRef ? mergeRefs(ref, resolvableRef) : ref,
        tabIndex: tabIndex || 0,
        onMouseEnter: changeHoverStateAndCallIf(true, onMouseEnter),
        onMouseLeave: changeHoverStateAndCallIf(false, onMouseLeave),
        onMouseMove: changeHoverStateAndCallIf(true, onMouseMove),
        onFocus: changeHoverStateAndCallIf(true, onFocus),
        onBlur: changeHoverStateAndCallIf(false, onBlur),
      };
    },
    [changeHoverStateAndCallIf],
  );

  React.useEffect(() => {
    const listener = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        changeHoverState(false);
      }
    };

    document.addEventListener('mousemove', listener);

    return () => {
      document.removeEventListener('mousemove', listener);
    };
  }, [changeHoverState]);

  return [hovering, getTargetProps];
};
