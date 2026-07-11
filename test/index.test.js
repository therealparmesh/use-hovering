import { afterEach, describe, expect, test } from "bun:test";

import { act, createElement, useRef } from "react";
import { createRoot } from "react-dom/client";

import { useHovering } from "../src/index.js";

let root;
let container;

function renderHook(options) {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);

  function Fixture() {
    const ref = useRef(null);
    const hovering = useHovering(ref, options);

    return createElement("div", {
      ref,
      "data-hovering": String(hovering),
    });
  }

  act(() => root.render(createElement(Fixture)));
  return () => container.firstElementChild;
}

afterEach(() => {
  if (root) act(() => root.unmount());
  container?.remove();
  root = undefined;
  container = undefined;
  document.body.replaceChildren();
});

describe("useHovering", () => {
  test("stays false when the ref is not attached", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    function Fixture() {
      const ref = useRef(null);
      return createElement("output", null, String(useHovering(ref)));
    }

    act(() => root.render(createElement(Fixture)));
    expect(container.textContent).toBe("false");
  });

  test("tracks mouse and focus state", () => {
    const getNode = renderHook();

    act(() => getNode().dispatchEvent(new MouseEvent("mouseenter")));
    expect(getNode().dataset.hovering).toBe("true");
    act(() => getNode().dispatchEvent(new MouseEvent("mouseleave")));
    expect(getNode().dataset.hovering).toBe("false");
    act(() => getNode().dispatchEvent(new FocusEvent("focus")));
    expect(getNode().dataset.hovering).toBe("true");
    act(() => getNode().dispatchEvent(new FocusEvent("blur")));
    expect(getNode().dataset.hovering).toBe("false");
  });

  test("turns off when the pointer moves outside the element", () => {
    const getNode = renderHook();

    act(() => getNode().dispatchEvent(new MouseEvent("mouseenter")));
    act(() => document.body.dispatchEvent(new MouseEvent("mousemove", { bubbles: true })));
    expect(getNode().dataset.hovering).toBe("false");
  });

  test("applies configured enter and exit delays", async () => {
    const getNode = renderHook({ enterDelay: 5, exitDelay: 5 });

    act(() => getNode().dispatchEvent(new MouseEvent("mouseenter")));
    expect(getNode().dataset.hovering).toBe("false");
    await act(() => new Promise((resolve) => setTimeout(resolve, 10)));
    expect(getNode().dataset.hovering).toBe("true");

    act(() => getNode().dispatchEvent(new MouseEvent("mouseleave")));
    expect(getNode().dataset.hovering).toBe("true");
    await act(() => new Promise((resolve) => setTimeout(resolve, 10)));
    expect(getNode().dataset.hovering).toBe("false");
  });

  test("cancels a delayed operation during cleanup", () => {
    const getNode = renderHook({ enterDelay: 100 });
    const originalSetTimeout = globalThis.setTimeout;
    const originalClearTimeout = globalThis.clearTimeout;
    let cleared = false;

    globalThis.setTimeout = () => 123;
    globalThis.clearTimeout = (id) => {
      if (id === 123) cleared = true;
    };

    try {
      act(() => getNode().dispatchEvent(new MouseEvent("mouseenter")));
      act(() => root.unmount());
      root = undefined;
      expect(cleared).toBe(true);
    } finally {
      globalThis.setTimeout = originalSetTimeout;
      globalThis.clearTimeout = originalClearTimeout;
    }
  });
});
