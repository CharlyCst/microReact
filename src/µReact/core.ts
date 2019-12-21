import { diff } from "./diff";

type baseProps = { style?: Partial<CSSStyleDeclaration> } & Partial<
  GlobalEventHandlers
> & { textContent?: string };

// Virtual nodes are the elements that compose µReact's virtual dom
export interface VNode<P = {}> {
  type: string;
  props: P & baseProps;
  children: VNode[];
  domElt?: HTMLElement;
  class?: new (props: P) => Component<P>;
  component?: Component<P>;
}

export abstract class Component<P = {}, S = {}> {
  props: P;
  abstract state: S;
  _vNode?: VNode<P>;
  _child?: VNode;

  constructor(props: P) {
    this.props = props;
    // this.setState = this.setState.bind(this);
  }

  setState(newState: S) {
    this.state = newState;
    console.log("Setting new state");
    console.log(newState);
    console.log(this);
    if (
      this._child &&
      this._vNode &&
      this._vNode.domElt &&
      this._vNode.domElt.parentElement
    ) {
      this._child = diff(
        this._vNode.domElt.parentElement,
        this.render(),
        this._child
      );
      this._child.domElt = this._vNode.domElt;
    }
  }

  abstract render(): VNode<any>;
}

// Create a new virtual node
export function createElement<P = {}>(
  type: string | (new (props: P) => Component<P>),
  props: P & baseProps,
  children?: VNode<any>[] | string | number
): VNode<P> {
  if (typeof type == "string") {
    if (typeof children == "string" || typeof children == "number") {
      props.textContent = `${children}`;
      return {
        type: type,
        props: props,
        children: []
      };
    }
    return { type: type, props: props, children: children || [] };
  } else {
    return {
      type: "",
      props: props,
      children: [],
      class: type
    };
  }
}
