# use-hovering

> Simple, accessible React hook for tracking hover state.

## Install

```sh
npm install use-hovering
```

```sh
yarn add use-hovering
```

## Usage

```jsx
import { useHovering } from 'use-hovering';

const Example = () => {
  const [hovering, bind] = useHovering();

  return (
    <>
      <div {...bind}>Hover over me!</div>
      {hovering && <div>Now you see me!</div>}
    </>
  );
};
```
