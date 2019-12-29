export { createElement, Component, render } from "./core";

// Provide typechecking for event handler and style properties
type intrinsicElementsProps = any & {
  style?: Partial<CSSStyleDeclaration>;
} & Partial<GlobalEventHandlers>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: intrinsicElementsProps;
    }
  }
}
