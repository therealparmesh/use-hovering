# use-hovering 🧞

> Simple, accessible React hook for tracking hover state.

[![npm](https://img.shields.io/npm/v/use-hovering.svg)](https://www.npmjs.com/package/use-hovering)
[![npm](https://img.shields.io/npm/dt/use-hovering.svg)](https://www.npmjs.com/package/use-hovering)

## Install

```sh
npm install use-hovering
```

## Usage

### Plain

```jsx
import { useHovering } from 'use-hovering';

export const Example = () => {
  const ref = React.useRef();
  const hovering = useHovering(ref);

  return (
    <div ref={ref} tabIndex={0}>
      Hover over me!{hovering && ' Hovering!'}
    </div>
  );
};
```

### With delay

```jsx
import { useHovering } from 'use-hovering';

export const Example = () => {
  const ref = React.useRef();
  const hovering = useHovering(ref, {
    enterDelay: 250,
    exitDelay: 250,
  });

  return (
    <div ref={ref} tabIndex={0}>
      Hover over me!{hovering && ' Hovering!'}
    </div>
  );
};
```
