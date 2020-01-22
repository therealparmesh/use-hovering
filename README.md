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
  const [hovering, getTargetProps] = useHovering();

  return (
    <div {...getTargetProps()}>Hover over me!{hovering && ' Hovering!'}</div>
  );
};
```

### With delay

```jsx
import { useHovering } from 'use-hovering';

export const Example = () => {
  const [hovering, getTargetProps] = useHovering({
    enterDelay: 250,
    exitDelay: 250,
  });

  return (
    <div {...getTargetProps()}>Hover over me!{hovering && ' Hovering!'}</div>
  );
};
```
