# use-hovering

[![npm version](https://img.shields.io/npm/v/use-hovering.svg)](https://www.npmjs.com/package/use-hovering)
[![npm downloads](https://img.shields.io/npm/dt/use-hovering.svg)](https://www.npmjs.com/package/use-hovering)
[![Bun CI](https://github.com/therealparmesh/use-hovering/actions/workflows/ci.yml/badge.svg)](https://github.com/therealparmesh/use-hovering/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/use-hovering.svg)](LICENSE)

Track whether a React element is hovered or focused, with optional enter and
exit delays and no runtime dependencies.

## Installation

```sh
npm install use-hovering
```

Other package managers:

```sh
yarn add use-hovering
pnpm add use-hovering
bun add use-hovering
```

## Usage

```jsx
import * as React from "react";
import { useHovering } from "use-hovering";

export function Example() {
  const firstRef = React.useRef(null);
  const secondRef = React.useRef(null);
  const firstHovering = useHovering(firstRef);
  const secondHovering = useHovering(secondRef, {
    enterDelay: 500,
    exitDelay: 100,
  });

  return (
    <>
      <div ref={firstRef} tabIndex={0}>
        HOVER OVER ME 1{firstHovering && <span> HOVERING</span>}
      </div>
      <div ref={secondRef} tabIndex={0}>
        HOVER OVER ME 2{secondHovering && <span> HOVERING</span>}
      </div>
    </>
  );
}
```

The element should be focusable when the same feedback needs to be available to
keyboard users.

TypeScript declarations are included with the package.

## API

### `useHovering(ref, options?)`

Returns a boolean indicating whether the element is hovered or focused.

#### `ref`

A React ref attached to the element to observe.

#### `options`

| Option       | Default | Description                                    |
| ------------ | ------- | ---------------------------------------------- |
| `enterDelay` | `0`     | Milliseconds to wait before returning `true`.  |
| `exitDelay`  | `0`     | Milliseconds to wait before returning `false`. |

## Runtime requirements

- React 16.8 or newer
- An ESM-compatible runtime or bundler

## Development

Run the test suite:

```sh
bun run test
```

Inspect the package contents before publishing:

```sh
bun pm pack --dry-run
```

## License

[MIT](LICENSE)
