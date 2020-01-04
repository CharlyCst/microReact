import { createElement, Component } from "./core";
import { render } from "./dom";

const µReact = {
  createElement,
  Component,
  render
};

export default µReact;

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
