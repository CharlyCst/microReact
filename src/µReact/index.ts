export { createElement, Component } from "./core";
export { render } from "./render";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
