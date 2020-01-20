# use-hovering 🧞

> Simple, accessible React hook for tracking hover state.

## Install

```sh
npm install use-hovering
```

```sh
yarn add use-hovering
```

## Usage

### Plain

```jsx
import { useHovering } from 'use-hovering';

export const Example = () => {
  const [hovering, bind] = useHovering();

  return (
    <>
      <div {...bind}>Hover over me!</div>
      {hovering && <div>Now you see me!</div>}
    </>
  );
};
```

### Delay

```jsx
import { useHovering } from 'use-hovering';

export const Example = () => {
  const [hovering, bind] = useHovering({ enterDelay: 250, exitDelay: 250 });

  return (
    <>
      <div {...bind}>Hover over me!</div>
      {hovering && <div>Now you see me!</div>}
    </>
  );
};
```
