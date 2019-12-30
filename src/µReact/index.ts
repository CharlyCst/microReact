export { createElement, Component, render } from "./core";

// Provide typechecking for some event handler and style properties
type intrinsicElementsProps = {
  style: Partial<CSSStyleDeclaration>;
  onchange: (event: {
    target: HTMLElement & Partial<HTMLInputElement>;
  }) => void;
  onclick: () => void;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: {
        [attr: string]: any;
      } & Partial<intrinsicElementsProps>;
    }
  }
}
